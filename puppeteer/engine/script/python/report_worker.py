import os
from queue import Queue
from threading import Thread

class ReportWorkerManager:
    def __init__(self, report_generator, report_portal_manager, num_workers=4, enable_portal=True):
        self.report_generator = report_generator
        self.report_portal_manager = report_portal_manager
        self.num_workers = num_workers + 1
        self.report_queue = Queue()
        self.workers = []
        self.enable_portal = enable_portal  # контроль отправки в ReportPortal

    def start_workers(self):
        def worker():
            while True:
                item = self.report_queue.get()
                if item is None:
                    break

                report_object, report_portal_test, run_mode = item
                try:
                    # Генерация отчета всегда
                    report_info = self.report_generator.generate_test_report(
                        report_object=report_object, run_mode=run_mode
                    )

                    # Отправка в ReportPortal только если подключение включено
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
        self.report_queue.put((report_object, report_portal_test, run_mode))

    def finish_workers(self):
        self.report_queue.join()
        for _ in self.workers:
            self.report_queue.put(None)
        for t in self.workers:
            t.join()
