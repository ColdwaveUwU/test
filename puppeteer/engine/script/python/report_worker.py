import os
from queue import Queue
from threading import Thread


class ReportWorkerManager:
    """
    Manages asynchronous report generation and (optionally) ReportPortal logging using a worker pool.

    This class handles concurrent report creation and uploading of logs and attachments
    to ReportPortal. Reports are processed using a queue of tasks executed by background worker threads.

    Attributes:
        report_generator: Object responsible for generating test reports.
        report_portal_manager: Manager responsible for starting and finishing tests in ReportPortal.
        num_workers (int): Number of concurrent worker threads. One additional thread is used internally.
        report_queue (Queue): Internal queue storing report tasks.
        workers (list[Thread]): List of active worker threads.
        enable_portal (bool): Enables or disables ReportPortal integration.
    """

    def __init__(self, report_generator, report_portal_manager, num_workers=4, enable_portal=True):
        """
        Initializes the ReportWorkerManager.

        Args:
            report_generator: Instance that generates reports
            report_portal_manager: Instance handling interaction with ReportPortal.
            num_workers (int, optional): Number of worker threads for concurrent processing. Defaults to 4.
            enable_portal (bool, optional): Enables ReportPortal upload if True. Defaults to True.
        """
        self.report_generator = report_generator
        self.report_portal_manager = report_portal_manager
        self.num_workers = num_workers + 1
        self.report_queue = Queue()
        self.workers = []
        self.enable_portal = enable_portal

    def start_workers(self):
        """
        Starts background worker threads for processing report generation tasks.

        Each worker thread continuously retrieves report tasks from the internal queue
        and processes them until a `None` sentinel value is received.

        The worker performs the following steps:
          1. Calls `report_generator.generate_test_report` to create a test report.
          2. Sends log lines containing "[command]" or "[test]" to ReportPortal with TRACE level.
          3. Attaches the generated HTML report to the corresponding test in ReportPortal.
          4. Finishes the test in ReportPortal with an appropriate return code.
        """
        def worker():
            while True:
                item = self.report_queue.get()
                if item is None:
                    break

                report_object, report_portal_test, run_mode = item
                try:
                    report_info = self.report_generator.generate_test_report(
                        report_object=report_object, run_mode=run_mode
                    )

                    if self.enable_portal:
                        for line in report_info['time_log_content'].split("\n"):
                            if "[command]" in line or "[test]" in line:
                                report_portal_test.send_log(line.strip(), level="TRACE")

                        test_report_path = report_info['report_file_path']
                        with open(test_report_path, "rb") as file:
                            report_portal_test.send_log(
                                message=f"{report_object['file_name']} report attached.",
                                attachment={
                                    "name": os.path.basename(test_report_path),
                                    "data": file.read(),
                                    "mime": "text/html"
                                }
                            )

                        self.report_portal_manager.finish_test(
                            report_object['test_path'],
                            0 if report_object['return_code'] == 5 else report_object['return_code']
                        )
                except Exception as e:
                    print(f"Error processing report for {report_object['file_name']}: {e}")
                finally:
                    self.report_queue.task_done()

        for _ in range(self.num_workers):
            t = Thread(target=worker, daemon=True)
            t.start()
            self.workers.append(t)

    def submit_report(self, report_object, report_portal_test, run_mode):
        """
        Adds a new report generation task to the queue.

        Args:
            report_object (dict): Metadata of the test execution, including:
                - file_name (str): Test file name.
                - test_path (str): Path to the test.
                - return_code (int): Test execution status code.
            report_portal_test: Active ReportPortal test object for sending logs and attachments.
            run_mode (str): provider mode
        """
        self.report_queue.put((report_object, report_portal_test, run_mode))

    def finish_workers(self):
        """
        Waits for all pending tasks to complete and gracefully shuts down worker threads.

        This method:
          - Waits until all queued reports are processed.
          - Sends termination signals (`None`) to all workers.
          - Joins all threads to ensure clean shutdown.
        """
        self.report_queue.join()
        for _ in self.workers:
            self.report_queue.put(None)
        for t in self.workers:
            t.join()
