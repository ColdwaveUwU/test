from typing import Optional

class TestNodes:
    """
    Utility class for creating test and folder nodes used in the test hierarchy.
    Each node is represented as a dictionary and contains metadata used to track 
    test execution status and hierarchy within ReportPortal.
    """

    @staticmethod
    def create_folder_node(name: str, parent: Optional[dict]) -> dict:
        """
        Create a folder node representing a test suite or directory.
        Args:
            name (str): Name of the folder or suite.
            parent (Optional[dict]): Parent node in the hierarchy, or None if this is the root.
        Returns:
            dict: A dictionary representing the folder node.
        """
        return {
            "name": name,
            "suite": None,
            "item_id": None,
            "children": {},
            "parent": parent,
            "active_tests": 0,
            "is_finished": False
        }

    @staticmethod
    def create_test_node(name: str, parent: dict) -> dict:
        """
        Create a leaf node representing an individual test.
        Args:
            name (str): Name of the test.
            parent (dict): Parent folder node in the hierarchy.
        Returns:
            dict: A dictionary representing the test node.
        """
        return {
            "name": name,
            "suite": None,
            "item_id": None,
            "children": {},
            "parent": parent,
            "isStarted": False,
            "is_finished": False,
            "return_code": 0
        }
