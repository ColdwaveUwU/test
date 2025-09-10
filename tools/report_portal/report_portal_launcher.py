import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../safe_import")))

import json
from typing import Dict, Any, Optional, Union
from safe_import import safe_import

class ReportPortalLauncher:
    """
    Class for managing launches in Report Portal.
    Allows creating a new launch, connecting to an existing launch,
    finishing it, and sending logs.
    """
    def __init__(self, config_path: str = "./config.json"):
        """
        Initializes ReportPortalLauncher with the provided configuration for RPClient.

        :param config_path: Path to the configuration file (JSON format).
        """
        if not os.path.isabs(config_path):
            script_dir = os.path.dirname(os.path.abspath(__file__))
            config_path = os.path.join(script_dir, config_path)
        self.config_path = config_path
        self.rp_client_config = self._load_config()
        self.__need_connection = bool(self.rp_client_config.get('api_key', False))
        self.__is_started = False
        self.client = None
        self.launch_id = None
        self.reportportal_client = None
        self.RPClient = None
        self.timestamp = None
        self.version = None
        self._initialize_reportportal_client()
    
    @property
    def need_connection(self) -> bool:
        """Whether connection to Report Portal is required.
        Returns:
            bool: True if API key exists and connection should be established
        """
        return self.__need_connection

    @property 
    def launch_is_started(self) -> bool:
        """Current launch status (read-only).
        Returns:
            bool: True if launch is currently active
        """
        return self.__is_started

    @launch_is_started.setter
    def launch_is_started(self, value: bool) -> None:
        """Set the launch status.
        Args:
            value: New launch status
        Raises:
            TypeError: If value is not boolean
        """
        if not isinstance(value, bool):
            raise TypeError("Launch status must be boolean")
        self.__is_started = value

    @launch_is_started.deleter
    def launch_is_started(self) -> None:
        """Prevent deletion of the launch status."""
        raise AttributeError("Cannot delete launch status attribute")
    
    def _initialize_reportportal_client(self):
        """
        Initializes report portal client with version specified in the config.
        """
        self.version = self.rp_client_config.get("client_version")
        self.reportportal_client = safe_import('reportportal_client', version=self.version)
        self.RPClient = self.reportportal_client.RPClient
        self.timestamp = self.reportportal_client.helpers.timestamp

    def _create_client(self):
        """
        Creates an instance of RPClient with merged configuration.
        """
        config = {**self.rp_client_config, "project": self.rp_client_config['project_name']}
        client = self.RPClient(**config)
        client.timestamp = self.timestamp
        client.version = self.version
        return client
    
    def _load_config(self) -> Dict[str, Any]:
        """
        Loads the configuration from the JSON file.

        :return: Dictionary with configuration parameters.
        """
        try:
            with open(self.config_path, "r") as config_file:
                return json.load(config_file)
        except (FileNotFoundError, json.JSONDecodeError) as e:
            raise RuntimeError(f"Failed to load config from {self.config_path}: {e}")
    
    def get_client(self):
        """
        Retrieves the initialized ReportPortal client.

        :raises RuntimeError: If the client is not initialized.
        :return: The initialized RPClient instance.
        """
        if not self.client:
            raise RuntimeError("Client is not initialized.")
        return self.client

    def connect_to_launch(self, launch_id: str, **kwargs):
        """
        Connects to an existing launch in Report Portal.
        
        :param launch_id: Identifier of the existing launch.
        :param kwargs: Additional parameters to override the launch config.
        """
        self.launch_id = launch_id
        self.client = self._create_client(launch_uuid=self.launch_id, **kwargs)
        try:
            self.client.start_launch(name=self.launch_name, start_time=self.timestamp())
            launch_info = self.client.get_launch_info()
            if not launch_info:
                raise RuntimeError(f"Launch with ID {self.launch_id} does not exist.")
        except Exception as e:
            raise RuntimeError(f"Failed to connect to existing launch with ID {self.launch_id}: {e}")

    def start_launch(
        self, 
        launch_name: str = "", 
        start_time: Optional[str] = None,
        description: Optional[str] = None, 
        attributes: Optional[Union[list, dict]] = None,
        rerun: bool = False,
        rerun_of: Optional[str] = None,
        **kwargs
    ) -> str:
        """
        Starts a new launch or connects to an existing one.
        
        :param launch_name: Name of the launch.
        :param start_time: Start time of the launch (optional, defaults to current timestamp).
        :param description: Description of the launch (optional).
        :param attributes: Attributes for the launch (optional).
        :param rerun: Whether this is a rerun of a previous launch.
        :param rerun_of: ID of the launch being rerun.
        :param kwargs: Additional parameters for the client configuration.
        :return: Identifier of the created or connected launch.
        """
        start_time = start_time or self.timestamp()  
        launch_name = launch_name or self.rp_client_config.get("launch_name") or "default_launch_name"
        attributes = attributes or {}

        self.client = self._create_client(**kwargs)
        
        try:
            self.launch_id = self.client.start_launch(
                name=launch_name,
                start_time=start_time,
                description=description,
                attributes=attributes,
                rerun=rerun,
                rerun_of=rerun_of,
                **kwargs
            )
            self.launch_is_started = True
            return self.launch_id
        except Exception as e:
            raise RuntimeError(f"Failed to start launch '{launch_name}': {e}")

    def finish_launch(
        self,
        end_time: Optional[str] = None,
        status: Optional[str] = "PASSED",
        attributes: Optional[Union[list, dict]] = None,
        **kwargs: Any
    ):
        """
        Finishes the current launch.
        
        :param end_time: End time of the launch (defaults to current timestamp).
        :param status: Completion status (e.g., "PASSED" or "FAILED").
        :param attributes: Attributes for the launch (optional).
        :param kwargs: Additional parameters for the finish request.
        """
        if not self.launch_id:
            raise RuntimeError("No active launch to finish.")

        end_time = end_time or self.timestamp() 
        attributes = attributes or {}

        try:
            self.client.finish_launch(
                end_time=end_time,
                status=status,
                attributes=attributes,
                **kwargs  
            )
            self.client.terminate()
            self.launch_is_started = False
            self.launch_id = None
        except Exception as e:
            raise RuntimeError(f"Failed to finish launch '{self.launch_id}': {e}")

    def send_log(
            self, 
            message: str, 
            level: Optional[Union[int, str]] = "INFO", 
            attachment: Optional[dict] = None, 
            item_id: Optional[str] = None,
            time: Optional[str] = None,
            print_output: bool = True,
            **kwargs: Any
        ):
        """
        Sends a log message to Report Portal.

        :param message: Log message.
        :param level: Log level (INFO, DEBUG, WARN, ERROR, TRACE).
        :param attachment: Attachment (if available).
        :param item_id: ID of the test item this log belongs to (optional).
        :param time: Log timestamp (optional, defaults to current time).
        :param print_output: Flag to print the message to the console.
        :param kwargs: Additional parameters for the log request.
        """
        valid_levels = ["INFO", "DEBUG", "WARN", "ERROR", "TRACE"]
        if isinstance(level, str) and level not in valid_levels:
            raise ValueError(f"Invalid log level: {level}. Must be one of {valid_levels}.")

        if print_output:
            print(f"[{level}] {message}")

        if not self.launch_id:
            raise RuntimeError("Cannot send log: No active launch. Please start a launch or connect to an existing one.")

        time = time or self.timestamp()  

        try:
            self.client.log(
                time=time,
                message=message,
                level=level,
                attachment=attachment,
                item_id=item_id,
                **kwargs  
            )
        except Exception as e:
            raise RuntimeError(f"Failed to send log to ReportPortal: {e}")
