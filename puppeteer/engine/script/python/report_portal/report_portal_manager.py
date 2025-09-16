import threading
import sys
import os
from typing import List
from typing import Any
from puppeteer.engine.script.python.report_portal.test_hierarchy_manager.test_hierarchy_manager import TestHierarchyManager

sys.path.append(os.path.abspath(os.path.join(__file__, "../../../..")))
from tools.report_portal.report_portal_launcher import ReportPortalLauncher
from tools.report_portal.report_portal_test import ReportPortalTest


class ReportPortalManager:
    """
    Manages the execution and reporting of tests to ReportPortal with support for hierarchical test structures.
    """
    def __init__(self, launcher: 'ReportPortalLauncher', test_files_map: List[dict], work_directory: str):
        """
        Initialize the ReportPortalManager.
        :param launcher: Instance of ReportPortalLauncher used to communicate with ReportPortal.
        :param test_files_map: List of test file mappings (each must include 'script' key).
        :param work_directory: Root directory used to determine relative test paths.
        """
        self.launcher = launcher
        self.test_files_map = test_files_map
        self.work_directory = work_directory
        self.lock = threading.Lock()
        self.hierarchy = TestHierarchyManager(test_files_map, work_directory)

    def start_test(self, test_path: str) -> 'ReportPortalTest':
        """
        Start a test and create any missing parent suites.
        :param test_path: Path to the test file to start.
        :return: Instance of ReportPortalTest representing the started test.
        """
        with self.lock:
            test_node, parent_id = self.hierarchy.create_suite_chain(
                test_path=test_path,
                client=self.launcher.get_client()
            )

            if test_node.get("isStarted"):
                return test_node["test"]

            test = ReportPortalTest(client=self.launcher.get_client())
            test.start_test(test_node["name"], parent_item_id=parent_id, item_type="STEP")

            test_node["test"] = test
            test_node["item_id"] = test.get_item_id()
            test_node["isStarted"] = True
            test_node["is_finished"] = False
            test_node["return_code"] = 0

            return test

    def finish_test(self, test_path: str, return_code: int, **kwargs: Any):
        """
        Finish a test and automatically finish its parent suites if all their child tests are done.
        :param test_path: Path to the test file to finish.
        :param return_code: Return code of the test (0 = success, non-zero = failure).
        """
        with self.lock:
            node = self.hierarchy.get_node(test_path)
            if node is None:
                raise ValueError(f"Node for test path '{test_path}' not found in hierarchy.")

            test = node.pop("test", None)
            if test:
                test.finish_test(return_code, **kwargs)

            self.hierarchy.finish_test_and_parents(node, return_code)

class NullReportPortalLauncher:
    def start_launch(self, *args, **kwargs):
        pass
    
    def send_log(self, *args, **kwargs):
        pass
    
    def get_client(self, *args, **kwargs):
        return None
    
    def finish_launch(self, *args, **kwargs):
        pass


class NullReportPortalManager:
    def start_test(self, *args, **kwargs):
        return NullReportPortalTest()
    
    def finish_test(self, *args, **kwargs):
        pass


class NullReportPortalTest:
    def get_item_id(self, *args, **kwargs):
        return "null_item_id"
    
    def start_test(self, *args, **kwargs):
        pass
    
    def finish_test(self, *args, **kwargs):
        pass
    
    def send_log(self, *args, **kwargs):
        pass