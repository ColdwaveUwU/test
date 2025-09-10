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
    RED = '\033[91m'
    GREEN = '\033[92m'
    RESET = '\033[0m'
    YELLOW = '\033[93m'

    def __init__(
            self, 
            report_portal_launcher: Type[ReportPortalLauncher], 
            report_portal_test: Type[ReportPortalTest]
            ):
        self.print_lock = threading.Lock()
        self.report_portal_launcher = report_portal_launcher
        self.report_portal_test = report_portal_test
        self.start_time = int(time.time() * 1000)
        self._send_log("TestRunner initialized.", level="INFO")

    def _send_log(self, message, level="INFO"):
        current_time = int(time.time() * 1000)
        elapsed = current_time - self.start_time
        full_message = f"{message} (Elapsed: {elapsed} ms)"
        self.report_portal_test.send_log(full_message, level=level)

    def start_server(self, server_script_path, port, directory, stdout, stderr):
        self._send_log(f"Starting server at port {port} using script {server_script_path}.", level="INFO")
        process = subprocess.Popen(
            ["node", server_script_path, str(port), directory],
            stdout=stdout,
            stderr=stderr,
        )
        self._send_log("Server process started.", level="INFO")
        return process

    def stop_server(self, process):
        if process and process.poll() is None:
            self._send_log("Stopping server process...", level="INFO")
            process.terminate()
            process.wait()
            self._send_log("Server process stopped.", level="INFO")

    def execute_script(self, run_path, test_path, out_dir_path, debug_flag, server_url, stdout_dest, stderr_dest):
        start_time = int(time.time() * 1000)
        self._send_log(f"Executing script {run_path} for test {test_path}.", level="INFO")

        command = ["node", "--no-warnings", run_path, server_url]
        if debug_flag:
            self._send_log("Debug mode enabled.", level="INFO")
            command.insert(1, "--inspect-brk")

        process = subprocess.Popen(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            stdin=subprocess.DEVNULL,
            text=True,
            encoding='utf-8',
            errors='replace'
        )

        self._send_log("Script process started.", level="INFO")
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
            self._send_log(message_plain, level=message_level)
            print(f'\r{message}')
            sys.stdout.flush()

        self._send_log(f"Script execution completed for {test_path}. Exit code: {exit_code}", level="INFO")
        return exit_code

    def _read_process_output(self, process, stdout_dest, stderr_dest) -> bool:
        verification_failed = False
        self._send_log("Reading process output...", level="INFO")

        def read_output(pipe, dest):
            nonlocal verification_failed
            for line in iter(pipe.readline, ''):
                if "[ver] Verification failed." in line:
                    verification_failed = True
                if dest:
                    dest.write(line)
                    dest.flush()

        stdout_thread = threading.Thread(target=read_output, args=(process.stdout, stdout_dest), daemon=True)
        stderr_thread = threading.Thread(target=read_output, args=(process.stderr, stderr_dest), daemon=True)
        stdout_thread.start()
        stderr_thread.start()

        process.wait()
        self._send_log("Process completed.", level="INFO")
        stdout_thread.join()
        stderr_thread.join()

        self._send_log("Process output reading completed.", level="INFO")
        return verification_failed

    def run(self, file_path, test_path, report_path, debug_flag, server_port, server_script_path, test_resource_dir, terminal_log, terminal_error):
        self._send_log(f"Starting full run for test {test_path}.", level="INFO")

        stdout_file = os.path.join(os.path.dirname(file_path), "log", "terminallog", "terminalstdout.txt")
        stderr_file = os.path.join(os.path.dirname(file_path), "log", "terminallog", "terminalerror.txt")

        if os.path.exists(stdout_file):
            os.remove(stdout_file)
            self._send_log("Old stdout log removed.", level="INFO")
        if os.path.exists(stderr_file):
            os.remove(stderr_file)
            self._send_log("Old stderr log removed.", level="INFO")

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
                self._send_log(f"Full run completed for test {test_path}.", level="INFO")
                return exit_code
            except Exception as e:
                error_message = str(e)
                self._send_log(f"Error occurred during run: {error_message}", level="INFO")
                print(f"Error occurred: {error_message}")
                return 1
            finally:
                self.stop_server(server_process)
