import re
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor

class DescriptionParser:
    NO_DESCRIPTION = "No description"
    INDEX_FILE = "index.js"
    CLASS_PATTERN = r'class\s+(\w+)\s*{'
    METHOD_PATTERN = r'(?:async\s+)?([a-zA-Z_]\w*)\s*\((.*?)\)\s*{'
    
    RESERVED_WORDS = {
        'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
        'default', 'delete', 'do', 'else', 'export', 'extends', 'finally',
        'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'return',
        'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 
        'while', 'with', 'async', 'await'
    }

    def __init__(self, dir_maps):
        self.dir_maps = dir_maps

    def _find_js_files_in_maps(self):
        js_files = defaultdict(list)
        for dir_map in self.dir_maps:
            for directory, files in dir_map.items():
                for file_path in files:
                    if file_path.endswith('.js') and not file_path.endswith(self.INDEX_FILE):
                        js_files[directory].append(file_path)
        return js_files

    def _get_js_file_content(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as js_file:
            return js_file.read()

    def _parse_class_and_methods(self, js_content):
        parsed_data = defaultdict(dict)
        class_matches = list(re.finditer(self.CLASS_PATTERN, js_content))

        for class_match in class_matches:
            class_name = class_match.group(1)
            class_body_start = class_match.end()
            class_body = js_content[class_body_start:]

            lines = [line for line in class_body.splitlines() if line.strip()]
            for i, line in enumerate(lines):
                method_match = re.search(self.METHOD_PATTERN, line)
                if method_match:
                    method_name = method_match.group(1)

                    if method_name in self.RESERVED_WORDS or method_name == 'constructor':
                        continue

                    description = self._extract_description(lines, i)
                    parsed_data[class_name][method_name] = description

        return {k: v for k, v in parsed_data.items() if v}

    def _extract_description(self, lines, start_index):
        description = self.NO_DESCRIPTION
        j = start_index - 1

        while j >= 0:
            previous_line = lines[j].strip()
            if previous_line.startswith('/**'):
                jsdoc_lines = []
                while j < start_index - 1:
                    j += 1
                    jsdoc_lines.append(lines[j].strip())
                    if lines[j].strip().endswith('*/'):
                        break
                if jsdoc_lines:
                    if jsdoc_lines[0].startswith('* @'):
                        description = self.NO_DESCRIPTION
                    else:
                        description = jsdoc_lines[0].replace('*', '', 1).strip()

                    if (description.strip() == "" or 
                        all(char == '*' for char in description.strip())):
                        description = self.NO_DESCRIPTION
                break
            j -= 1

        return description
    
    def _parse_file(self, js_file):
        return self._get_js_file_content(js_file)

    def parse_js_files(self):
        js_files = self._find_js_files_in_maps()
        all_parsed_data = {}

        with ThreadPoolExecutor() as executor:
            futures = {executor.submit(self._parse_file, js_file): js_file for _, files in js_files.items() for js_file in files}

            for future in futures:
                js_content = future.result()
                parsed_data = self._parse_class_and_methods(js_content)

                for class_name, methods in parsed_data.items():
                    all_parsed_data.setdefault(class_name, {}).update(methods)

        return all_parsed_data
