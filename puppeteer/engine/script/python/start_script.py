import sys
import os
import subprocess
import threading
import time
import re

sys.path.append(os.path.abspath(os.path.join(__file__, "../../../../..")))
from typing import Type
from tools.report_portal.report_portal_launcher import ReportPortalLauncher
from tools.report_portal.report_portal_test import ReportPortalTest

class TestRunner:
    """
    A class to run tests with a specified configuration, start/stop a server, execute a script, and log results to ReportPortal.

    Attributes:
        print_lock (threading.Lock): A lock to prevent concurrent printing.
        report_portal_launcher (ReportPortalLauncher): An instance to handle launching the ReportPortal.
        report_portal_test (ReportPortalTest): An instance to handle test reporting to ReportPortal.
        RED (str): ANSI escape code for red color in terminal output.
        GREEN (str): ANSI escape code for green color in terminal output.
        RESET (str): ANSI escape code to reset terminal formatting.
    """
    RED = '\033[91m'
    GREEN = '\033[92m'
    RESET = '\033[0m'
    YELLOW = '\033[93m'

    def __init__(
            self, 
            report_portal_launcher: Type[ReportPortalLauncher], 
            report_portal_test: Type[ReportPortalTest]
            ):
        """
        Initializes the TestRunner instance and connects to the ReportPortal.

        Args:
            report_portal_launcher (ReportPortalLauncher): Report Portal launcher instance
            report_portal_test (ReportPortalTest): ReportPortal launch ID.
        """
        self.print_lock = threading.Lock()
        self.report_portal_launcher = report_portal_launcher
        self.report_portal_test = report_portal_test

    def start_server(
            self, 
            server_script_path, 
            port, 
            directory, 
            stdout, 
            stderr
            ):
        """
        Starts the server process using the specified server script.

        Args:
            server_script_path (str): Path to the server script.
            port (int): Port number for the server.
            directory (str): Directory where resources are located.
            stdout (file-like object): File-like object for capturing standard output.
            stderr (file-like object): File-like object for capturing standard error.

        Returns:
            subprocess.Popen: The process object representing the started server.
        """
        return subprocess.Popen(
            ["node", server_script_path, str(port), directory],
            stdout=stdout,
            stderr=stderr,
        )

    def stop_server(
            self, 
            process):
        """
        Stops the server process if it is still running.

        Args:
            process (subprocess.Popen): The server process to terminate.
        """
        if process and process.poll() is None:
            process.terminate()
            process.wait()

    def execute_script(
            self, 
            run_path, 
            test_path, 
            out_dir_path, 
            debug_flag, 
            server_url, 
            stdout_dest, 
            stderr_dest
        ):
        """
        Executes a Node.js test script and reports the result.
        Args:
            run_path (str): Path to the JavaScript entry point file (e.g., runner script).
            test_path (str): Path to the test file being executed (used in log messages).
            out_dir_path (str): Directory path where output reports like "report.html" are located.
            debug_flag (bool): If True, enables Node.js debug mode using `--inspect-brk`.
            server_url (str): URL of the server used during test execution.
            stdout_dest (IO): File-like object to write standard output stream.
            stderr_dest (IO): File-like object to write standard error stream.
        Returns:
            int: Exit code indicating the result of the script execution:
                - 0: Test passed
                - 1: Test failed
                - 2: Browser-related error
                - 3: Verification failed (detected in output)
                - 4: AscOnError
                - 5: asc_onErrorWarning
            """
        start_time = int(time.time() * 1000)

        command = ["node", "--no-warnings", run_path, server_url]
        if debug_flag:
            self.report_portal_launcher.send_log("Debug mode enabled...", level="DEBUG", print_output=False)
            print("Debug mode enabled...")
            command.insert(1, "--inspect-brk")

        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding='utf-8',
            errors='replace'
        )

        verification_failed = self._read_process_output(process, stdout_dest, stderr_dest)

        exit_code = process.returncode
        if verification_failed:
            exit_code = 3

        end_time = int(time.time() * 1000)
        duration = end_time - start_time

        with self.print_lock:
            status_messages = {
                0: f'{self.GREEN}Test Passed:{self.RESET} "{test_path}". Check "report.html" ({out_dir_path}). {duration} ms.',
                1: f'{self.RED}Test Failed:{self.RESET} "{test_path}". Check "report.html" ({out_dir_path}). {duration} ms.',
                2: f'{self.RED}Browser Error:{self.RESET} "{test_path}". Check "report.html" ({out_dir_path}). {duration} ms.',
                3: f'{self.RED}Verification failed:{self.RESET} "{test_path}". Check "report.html" ({out_dir_path}). {duration} ms.',
                4: f'{self.RED}asc_onError triggered:{self.RESET} "{test_path}". Check "report.html" ({out_dir_path}). {duration} ms.',
                5: f'{self.YELLOW}asc_onErrorWarning triggered:{self.RESET} "{test_path}". Check "report.html" ({out_dir_path}). {duration} ms.'
            }

            message = status_messages.get(exit_code, f'\rRunning "{test_path}" {self.GREEN}✔{self.RESET}. {duration} ms.')
            message_plain = re.sub(r'\033\[\d+m', '', message)
            message_level = "ERROR" if exit_code > 0 and exit_code != 5 else "WARN" if exit_code == 5 else "INFO"
            self.report_portal_launcher.send_log(message=message, level=message_level, print_output=False)
            self.report_portal_test.send_log(message=message_plain, level=message_level)
            print(f'\r{message}')
            sys.stdout.flush()

        return exit_code

    def _read_process_output(self, process, stdout_dest, stderr_dest) -> bool:
        """
        Reads process output streams and watches for verification failure.

        Args:
            process (subprocess.Popen): The running process.
            stdout_dest (IO): Destination for stdout.
            stderr_dest (IO): Destination for stderr.

        Returns:
            bool: True if verification failed was detected, False otherwise.
        """
        verification_failed = False

        def read_output(pipe, dest):
            nonlocal verification_failed
            for line in iter(pipe.readline, ''):
                if "[ver] Verification failed." in line:
                    verification_failed = True
                if dest:
                    dest.write(line)
                    dest.flush()

        stdout_thread = threading.Thread(target=read_output, args=(process.stdout, stdout_dest))
        stderr_thread = threading.Thread(target=read_output, args=(process.stderr, stderr_dest))
        stdout_thread.start()
        stderr_thread.start()

        process.wait()
        stdout_thread.join()
        stderr_thread.join()

        return verification_failed

    def run(
            self, 
            file_path, 
            test_path, 
            report_path, 
            debug_flag, 
            server_port, 
            server_script_path, 
            test_resource_dir, 
            terminal_log, 
            terminal_error
            ):
        """
        Runs the entire process: starts the server, executes the script, and reports the result.

        Args:
            file_path (str): Path to the file to run.
            test_path (str): Path to the test.
            report_path (str): Path for the report output.
            debug_flag (str): Flag to indicate whether to run in debug mode.
            server_port (int): Port for the server to run on.
            server_script_path (str): Path to the server script.
            test_resource_dir (str): Directory with test resources.
            terminal_log (str): Flag to log output to terminal.
            terminal_error (str): Flag to log errors to terminal.
        """
        stdout_file = os.path.join(os.path.dirname(file_path), "log", "terminallog", "terminalstdout.txt")
        stderr_file = os.path.join(os.path.dirname(file_path), "log", "terminallog", "terminalerror.txt")

        if os.path.exists(stdout_file):
            os.remove(stdout_file)
        if os.path.exists(stderr_file):
            os.remove(stderr_file)

        with open(stdout_file, 'w', encoding='utf-8') as stdout, open(stderr_file, 'w', encoding='utf-8') as stderr:
            if 'True' == terminal_log:
                stdout = sys.stdout
            if 'True' == terminal_error:
                stderr = sys.stdout

            server_process = None
            try:
                server_process = self.start_server(server_script_path, server_port, test_resource_dir, stdout, stderr)
                server_url = f"http://localhost:{server_port}"
                exit_code = self.execute_script(file_path, test_path, report_path, debug_flag, server_url, stdout, stderr)
                return exit_code
            except Exception as e:
                error_message = str(e)  
                print(f"Error occurred: {error_message}")  
                return 1
            finally:
                self.stop_server(server_process)
