import os
from typing import List, Optional, Tuple
from tools.report_portal.report_portal_test import ReportPortalTest
from puppeteer.engine.script.python.report_portal.test_hierarchy_manager.test_node.test_node import TestNodes

class TestHierarchyManager:
    """
    Manages the hierarchy of test files and corresponding ReportPortal suite/test nodes.
    Builds a nested structure of test folders and nodes and coordinates reporting.
    """

    def __init__(self, test_files_map: List[dict], work_directory: str, run_modes: List[str]):
        """
        Initialize the test hierarchy manager.
        Args:
            test_files_map (List[dict]): A list of dictionaries containing test file information.
            work_directory (str): The root directory relative to which test paths will be resolved.
            run_modes (List[str]): List of run modes to be used for the tests.
        Raises:
            ValueError: If the test_files_map is empty.
        """
        if not test_files_map:
            raise ValueError("Test files map is empty. Cannot initialize test hierarchy.")
        
        self.test_files_map = test_files_map
        self.work_directory = work_directory
        self.run_modes = run_modes
        self.test_hierarchy = self._build_test_hierarchy()

    def _build_test_hierarchy(self) -> dict:
        """
        Build the internal hierarchical representation of test files grouped by run_mode.
        Returns:
            dict: A dictionary where keys are run_modes and values are the root node of the hierarchy for that mode.
        """
        hierarchy = {}

        for run_mode in self.run_modes:
            root = TestNodes.create_folder_node(run_mode, None)

            for entry in self.test_files_map:
                parts = self._get_relative_parts(entry["script"])
                full_parts = [run_mode] + parts

                node = root
                for part in full_parts[:-1]:
                    node = node["children"].setdefault(part, TestNodes.create_folder_node(part, node))
                node["children"][full_parts[-1]] = TestNodes.create_test_node(full_parts[-1], node)

            self._initialize_active_tests(root)
            hierarchy[run_mode] = root

        return hierarchy

    def _initialize_active_tests(self, node: dict):
        """
        Recursively initialize the active test count for each folder node.
        Args:
            node (dict): The current node in the hierarchy.
        """
        for child in node["children"].values():
            self._initialize_active_tests(child)
        if "active_tests" in node:
            node["active_tests"] = len(node["children"])

    def _get_relative_parts(self, test_path: str) -> List[str]:
        """
        Split a test path into parts relative to the working directory.
        Args:
            test_path (str): Absolute or relative path to the test script.
        Returns:
            List[str]: Path parts split by the file separator.
        """
        relative_path = os.path.relpath(test_path, self.work_directory)
        return os.path.normpath(relative_path).split(os.sep)

    def get_node(self, test_path: str, run_mode: str) -> Optional[dict]:
        """
        Retrieve a node in the test hierarchy by its path.
        Args:
            test_path (str): The full path to the test script.
        Returns:
            Optional[dict]: The node representing the test, or None if not found.
        """
        parts = self._get_relative_parts(test_path)
        node = self.test_hierarchy.get(run_mode)['children'][run_mode]
        for part in parts:
            node = node["children"].get(part)
            if node is None:
                return None
        return node

    def create_suite_chain(
        self,
        test_path: str,
        client: object,
        run_mode: str
    ) -> Tuple[dict, Optional[str]]:
        """
        Create ReportPortal suite hierarchy for the given test path.
        Args:
            test_path (str): Full path to the test script.
            client (object): ReportPortal client object used to start tests.
        Returns:
            Tuple[dict, Optional[str]]: The final test node and its parent suite's item ID.
        """
        parts = self._get_relative_parts(test_path)
        node = self.test_hierarchy.get(run_mode)['children'][run_mode]
        parent_id: Optional[str] = None

        if node["suite"] is None:
            suite = ReportPortalTest(client)
            suite.start_test(node["name"], parent_item_id=None, item_type="SUITE")
            node["suite"] = suite
            node["item_id"] = suite.get_item_id()
        parent_id = node["item_id"]

        for part in parts[:-1]:
            node = node["children"][part]
            if node["suite"] is None:
                suite = ReportPortalTest(client)
                suite.start_test(node["name"], parent_item_id=parent_id, item_type="SUITE")
                node["suite"] = suite
                node["item_id"] = suite.get_item_id()
            parent_id = node["item_id"]

        test_node = node["children"][parts[-1]]
        return test_node, parent_id

    def finish_test_and_parents(self, node: dict, return_code: int):
        """
        Finish a test node and recursively finish its parent suites if all children are completed.
        Args:
            node (dict): The node representing the finished test.
            return_code (int): The return code from the test execution.
        """
        node["isStarted"] = False
        node["item_id"] = None
        node["is_finished"] = True
        node["return_code"] = return_code

        parent = node.get("parent")
        while parent:
            parent["active_tests"] -= 1
            if parent["active_tests"] == 0 and not parent.get("is_finished", False):
                suite = parent.get("suite")
                if suite:
                    worst_return_code = self._get_worst_return_code_recursive(parent)
                    suite.finish_test(worst_return_code)
                    parent["suite"] = None
                    parent["item_id"] = None
                    parent["is_finished"] = True
            else:
                break
            parent = parent.get("parent")

    def _get_worst_return_code_recursive(self, node: dict) -> int:
        """
        Recursively determine the worst return code (non-zero) in a node's subtree.
        Args:
            node (dict): The current node to evaluate.
        Returns:
            int: The worst return code found in the subtree.
        """
        worst_code = 0
        for child in node["children"].values():
            child_code = (
                self._get_worst_return_code_recursive(child)
                if child.get("children")
                else child.get("return_code", 0)
            )
            if child_code != 0:
                worst_code = child_code
        return worst_code
