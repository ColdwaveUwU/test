import json
import copy
from typing import Dict, Any, Optional, List
import ast

class ConfigManager:
    def __init__(self, main_config_path: str, config_params_str: Optional[List[str]] = None):
        self.main_config_path = main_config_path
        self.main_config = self._load_json(main_config_path)

        if config_params_str:
            config_params = self._parse_config_params(config_params_str)
            self.main_config = self._overwrite_dicts(self.main_config, config_params)

    @staticmethod
    def _load_json(file_path: str) -> Dict[str, Any]:
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)

    @staticmethod
    def _overwrite_dicts(base: Dict[str, Any], override: Dict[str, Any]) -> Dict[str, Any]:
        for key, value in override.items():
            if key in base and isinstance(base[key], dict) and isinstance(value, dict):
                ConfigManager._overwrite_dicts(base[key], value)
            else:
                base[key] = value
        return base

    @staticmethod
    def _merge_dicts(dict1: Dict[str, Any], dict2: Dict[str, Any]) -> Dict[str, Any]:
        for key, value in dict2.items():
            if key in dict1:
                if isinstance(dict1[key], dict) and isinstance(value, dict):
                    ConfigManager._merge_dicts(dict1[key], value)
                elif isinstance(dict1[key], list) and isinstance(value, list):
                    dict1[key].extend(value)
                else:
                    dict1[key] = value
            else:
                dict1[key] = value
        return dict1

    @staticmethod
    def _parse_config_params(param_list: List[str]) -> Dict[str, Any]:
        def parse_value(value_str: str) -> Any:
            val_lower = value_str.lower()
            if val_lower == 'true':
                return True
            if val_lower == 'false':
                return False

            if (value_str.startswith('[') and value_str.endswith(']')):
                try:
                    parsed = ast.literal_eval(value_str)
                    if isinstance(parsed, tuple):
                        parsed = list(parsed)
                    return [parse_value(str(elem)) if not isinstance(elem, (dict, list)) else elem for elem in parsed]
                except Exception:
                    inner = value_str[1:-1].strip()
                    if not inner:
                        return []
                    items = [item.strip() for item in inner.split(',')]
                    return [parse_value(item) for item in items]

            try:
                if '.' in value_str:
                    return float(value_str)
                else:
                    return int(value_str)
            except ValueError:
                pass

            if (value_str.startswith('"') and value_str.endswith('"')) or (value_str.startswith("'") and value_str.endswith("'")):
                return value_str[1:-1]

            return value_str

        result = {}
        for item in param_list:
            if '=' not in item:
                raise ValueError(f"Invalid config param '{item}', expected format key=value")
            key_path, value_str = item.split('=', 1)
            keys = key_path.split('.')

            current = result
            for k in keys[:-1]:
                if k not in current or not isinstance(current[k], dict):
                    current[k] = {}
                current = current[k]

            current[keys[-1]] = parse_value(value_str)
        return result

    def merge_with_config(self, sub_config_path: str) -> Dict[str, Any]:
        sub_config = self._load_json(sub_config_path)
        merged_config = self._merge_dicts(copy.deepcopy(self.main_config), sub_config)
        return merged_config

    def get_main_config(self) -> Dict[str, Any]:
        return self.main_config

    def to_js_config(self, config: Dict[str, Any]) -> str:
        return json.dumps(config, indent=4)
