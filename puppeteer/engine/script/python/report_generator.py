import os
import re
import zipfile
import io
import tempfile
import uuid
from pathlib import Path

class ReportGenerator:
    def __init__(self, report_portal_launcher):
        self.generated_reports = {}
        self.report_portal_launcher = report_portal_launcher

    def generate_test_report(self, report_object, run_mode):
        try:
            report_info = self._prepare_report_info(report_object)
            self._write_report_to_file(report_info['report_file_path'], report_info['combined_content'])

            if run_mode not in self.generated_reports:
                self.generated_reports[run_mode] = {
                    "isNewTable": True,
                    "reports": []
                }
            else:
                self.generated_reports[run_mode]["isNewTable"] = True

            self.generated_reports[run_mode]["reports"].append(report_info)
 
            return report_info

        except Exception as e:
            print(f"Error generating report {report_object['file_name']}: {str(e)}")

    def _prepare_report_info(self, report_object):
        report_info = {}
        report_info['test_directory'] = report_object['test_directory']
        report_info['file_name'] = report_object['file_name']
        report_info['current_datetime'] = report_object['current_datetime']
        report_info['start_test_time'] = report_object['start_test_time']
        report_info['report_file_path'] = os.path.join(report_object['test_directory'], "reports",
                                                        f"report_{report_object['current_datetime']}_{uuid.uuid4().hex}.html")
        
        browser_log_file_path = self._create_browser_log(os.path.join(report_object['test_directory'], "log", "browser_log"))
        browser_log_content = self._read_file(browser_log_file_path)
        browser_log_content = self._remove_ignored_errors(browser_log_content, report_object['exceptionErrors']['ignoreBrowserErrors'])
        report_info['browser_log_content'] = browser_log_content
        report_info['time_log_content'] = self._read_file(os.path.join(report_object['test_directory'], "log", "log.txt"))
        report_info['terminal_log_content'] = self._read_file(os.path.join(report_object['test_directory'], "log", "terminallog", "terminalstdout.txt"))
        report_info['terminal_error_content'] = self._read_file(os.path.join(report_object['test_directory'], "log", "terminallog", "terminalerror.txt"))

        external_log_stdout_path = os.path.join(report_object['test_directory'], "log", "externallog", "stdout.txt")
        external_log_stderr_path = os.path.join(report_object['test_directory'], "log", "externallog", "error.txt")
        
        external_err_content = self._read_file(external_log_stderr_path)
        external_err_content = self._remove_ignored_errors(external_err_content, report_object['exceptionErrors']['ignoreExternalScriptsErrors'])
        
        report_info['external_error_content'] = external_err_content
        report_info['external_log_content'] = self._read_file(external_log_stdout_path)
        report_info['external_tag'] = self._get_external_tag(report_info['external_log_content'])
        report_info['external_test_time'] = self._get_external_test_time(report_info['external_log_content'], report_info['external_tag'])
        
        report_info['execution_time'] = report_object['execution_time']
        report_info['combined_content'] = self._generate_combined_content(report_info)
        report_info['out_directory_path'] = report_object['out_directory_path']
        report_info['return_code'] = report_object['return_code']

        return report_info

    def _create_browser_log(self, browser_log_path):
        combined_log_path = os.path.join(browser_log_path, "browser_log.txt")
        page_logs = []

        pattern = re.compile(r"^page_(\d+\.\d+)\.txt$")

        for filename in os.listdir(browser_log_path):
            match = pattern.match(filename)
            if match:
                filepath = os.path.join(browser_log_path, filename)
                try:
                    mtime = os.path.getmtime(filepath)
                    page_logs.append((mtime, filepath))
                except Exception:
                    continue

        page_logs.sort(key=lambda x: x[0])

        with open(combined_log_path, "w", encoding="utf-8") as combined_file:
            for idx, (_, filepath) in enumerate(page_logs, start=1):
                combined_file.write(f"\n--- Page {idx} ---\n")
                with open(filepath, "r", encoding="utf-8") as page_file:
                    combined_file.write(page_file.read())
                combined_file.write("\n--- End of Page ---\n")
        return combined_log_path
    
    def _read_file(self, file_path):
            with open(file_path, "r", encoding="utf-8") as file:
                return file.read()
            
    def _remove_ignored_errors(self, content, ignore_errors):
        for pattern in ignore_errors:
            regex_pattern = re.compile(f".*{re.escape(pattern)}.*")
            content = re.sub(regex_pattern, "", content).strip()
        return content 

    def _generate_combined_content(self, report_info):
        def extract_and_remove(content, keyword):
            lines = content.split('\n')
            keyword_index = next((i for i, line in enumerate(lines) if keyword in line), None)

            if keyword_index is not None:
                cleaned_content = '\n'.join(lines[keyword_index:])
                extracted_lines = [
                    line[line.find(keyword):].strip()
                    for line in cleaned_content.split('\n')
                    if keyword in line
                ]
                return '\n'.join(extracted_lines), cleaned_content
            return '', content

        def _generate_section(title, content):
            return (
                f'<details><summary>{title}</summary>'
                f'<div><pre>{content}</pre></div></details>' if content else ''
            )

        def _parse_actions(content):
            actions_html = []
            command_blocks = []
            current_command = None
            test_start_line, test_end_line = "", ""

            for line in content.splitlines():
                if "[start] [test]" in line:
                    test_start_line = line
                elif "[end] [test]" in line:
                    test_end_line = line
                elif "[start] [command]" in line:
                    command_name = re.search(r"\[command\] (.+)", line).group(1).strip()
                    current_command = command_name
                    command_blocks.append({
                        "command_name": command_name,
                        "blocks": [{"start_line": line, "actions": [], "end_line": None}]
                    })
                elif "[start] [action]" in line or "[end] [action]" in line:
                    if current_command:
                        command_blocks[-1]["blocks"][-1]["actions"].append(line)
                elif "[end] [command]" in line:
                    if current_command:
                        command_blocks[-1]["blocks"][-1]["end_line"] = line
                        current_command = None

            if test_start_line:
                actions_html.append(f"<div style='margin-top: 20px; margin-bottom: 10px;'>{test_start_line}</div>")

            for command_block in command_blocks:
                for block in command_block["blocks"]:
                    actions = ''.join(f"<li>{action}</li>" for action in block["actions"])
                    end_line = f"<p>{block['end_line']}</p>" if block['end_line'] else ""
                    actions_html.append(
                        f"<div class='command-block' style='margin: 15px 0; padding-left: 10px; cursor: pointer;'>"
                        f"<p style='display: flex; align-items: center;'>"
                        f"<span class='toggle-arrow' style='margin-right: 10px; font-size: 12px;'>&#x25B6;</span>"
                        f"{block['start_line']}</p>"
                        f"<ul class='actions' style='display: none; padding-left: 15px;'>{actions}</ul>"
                        f"{end_line}</div>"
                    )

            if test_end_line:
                actions_html.append(f"<div style='margin-top: 20px; margin-bottom: 10px;'>{test_end_line}</div>")

            return ''.join(actions_html)

        test_time_content = report_info['time_log_content']
        error_content, report_info['terminal_log_content'] = extract_and_remove(
            report_info['terminal_log_content'], "[Error]"
        )

        if error_content:
            report_info['terminal_error_content'] += error_content + '\n'

        sections = [
            "ACTIONS",
            "BROWSER LOG",
            "BROWSER ERROR",
            "TERMINAL LOG",
            "TERMINAL ERROR",
            "SCRIPT ERROR",
            "EXTERNAL SCRIPT LOG",
            "EXTERNAL SCRIPT ERROR",
        ]

        def _parse_browser_logs(browser_log_content):
            result = []

            pattern = re.compile(
                r"--- Page (?P<index>[\d.]+) ---\n(?P<content>.*?)(?=\n--- End of Page ---)", 
                re.DOTALL
            )

            matches = pattern.finditer(browser_log_content)

            for match in matches:
                page_index = match.group("index")
                content = match.group("content").strip()

                html = (
                    f"<details style='margin-bottom: 10px;'>"
                    f"<summary>Page {page_index}</summary>"
                    f"<div><pre>{content}</pre></div>"
                    f"</details>"
                )
                result.append(html)

            return ''.join(result)
        
        def _get_section_content(key):
            if key == "ACTIONS":
                return _parse_actions(test_time_content)
            
            if key == "BROWSER ERROR":
                return '\n'.join(
                    line for line in report_info.get('browser_log_content', '').split('\n')
                    if '[error]' in line.lower() or '[browser error]' in line.lower()
                )
            
            if key == "BROWSER LOG":
                return _parse_browser_logs(report_info.get('browser_log_content', {}))
            
            return report_info.get(f'{key.lower().replace(" ", "_")}_content', '')

        html_sections = ''.join(
            _generate_section(title, _get_section_content(title))
            for _, title in enumerate(sections) if _get_section_content(title)
        )

        return (
            f"<html><head><style>"
            f".command-block:hover {{ background-color: #f0f0f0; }}"
            f".toggle-arrow {{ font-size: 12px; cursor: pointer; }}"
            f"</style><script>"
            f"document.addEventListener('DOMContentLoaded', function() {{"
            f"    document.querySelectorAll('.command-block').forEach(block => {{"
            f"        block.addEventListener('click', () => {{"
            f"            const actions = block.querySelector('.actions');"
            f"            const arrow = block.querySelector('.toggle-arrow');"
            f"            const isVisible = actions.style.display === 'block';"
            f"            actions.style.display = isVisible ? 'none' : 'block';"
            f"            arrow.innerHTML = isVisible ? '&#x25B6;' : '&#x25BC;';"
            f"        }});"
            f"    }});"
            f"}});"
            f"</script></head><body>{html_sections}</body></html>"
        )

    def _write_report_to_file(self, report_file_path, combined_content):
        with open(report_file_path, "w", encoding="utf-8") as report_file:
            report_file.write(combined_content)

    def _generate_provider_report(self, execution_time):
        provider_report_paths = {}
        for run_mode, info in self.generated_reports.items():
            reports = info['reports']
            for report in reports:
                html_report_path = os.path.join(report['out_directory_path'], "report.html")
                test_name = os.path.basename(report['file_name'])
   
                stdout = self._get_stdout_from_report(report)

                row_color, status = self._get_row_color_and_status(report['return_code'])

                new_content = f"<tr style='background-color: {row_color};'><td>{test_name}</td><td>{report['start_test_time']}</td><td>{report['execution_time']} ms</td>"
                new_content += f"<td>{status}</td>"
                new_content += f"<td>{stdout}</td>"
                new_content += f"<td><a href=\"{os.path.relpath(report['report_file_path'], os.path.dirname(html_report_path))}\">View Text Report</a></td><td>{report['test_directory']}</td></tr>\n"
                headers = ["Test Name", "Start Time", "Execution Time", "Status", "External Stdout", "Text Report", "Test Path"]
                self._update_html_report(html_report_path, new_content, info['isNewTable'], run_mode.capitalize(), headers)
                info['isNewTable'] = False
                    
            self._close_table(html_report_path, execution_time)
            self._close_html(html_report_path)
            self._send_report_to_report_portal(html_report_path)
            provider_report_paths[run_mode] = html_report_path
            
        return provider_report_paths

    def _send_report_to_report_portal(self, report_directory_path):
        if self.report_portal_launcher:
            try:
                zip_buffer = io.BytesIO()
                with zipfile.ZipFile(zip_buffer, mode="w", compression=zipfile.ZIP_DEFLATED) as zip_file:
                    for root, _, files in os.walk(report_directory_path):
                        for file in files:
                            full_path = os.path.join(root, file)
                            relative_path = os.path.relpath(full_path, start=report_directory_path)
                            with open(full_path, "rb") as f:
                                file_data = f.read()
                                zip_file.writestr(relative_path, file_data)

                zip_buffer.seek(0)

                self.report_portal_launcher.send_log("HTML Report attached", "INFO", 
                                                     attachment = {"name": "launch_report", 
                                                                   "data": zip_buffer.getvalue(), 
                                                                   "mime": "application/zip"})

            except Exception as e:
                print(f"Error sending report to Report Portal: {str(e)}")

    def generate_launch_html_report(self, execution_time, run_mode):
        provider_report_paths = self._generate_provider_report(execution_time)
        report_paths = [
            str(Path(path).resolve().parents[len(Path(path).resolve().parts) - Path(path).resolve().parts.index(provider) - 1])
            for provider, path in provider_report_paths.items()
        ]

        common_path = os.path.commonpath(report_paths)
        launch_html_report_path = os.path.join(common_path, "report.html")

        if os.path.exists(provider_report_paths[run_mode]):
            headers = ["Run Mode", "Text Report"]

            table_html = f"<tr>"
            table_html += f"<td>{run_mode}</td>"
            table_html += f"<td><a href=\"{os.path.relpath(provider_report_paths[run_mode], os.path.dirname(launch_html_report_path))}\">View Report</a></td>"
            table_html += f"</tr>"

            updateContent = True
            if os.path.exists(launch_html_report_path):
                with open(launch_html_report_path, "r", encoding="utf-8") as f:
                    if f"<td>{run_mode}</td>" in f.read():
                        updateContent = False

            if updateContent:
                self._update_html_report(
                    launch_html_report_path,
                    table_html,
                    isNewTable=False,
                    run_mode="Common",
                    headers=headers,
                )

        self._close_table(launch_html_report_path)
        self._close_html(launch_html_report_path)

    def _create_zip_with_html_report_and_links(self, html_report_path):
        zip_file_path = f"{html_report_path}.zip"
        files_to_zip = []

        with open(html_report_path, "r", encoding="utf-8") as file:
            html_content = file.read()
            links = re.findall(r'<a\s+href="([^"]+)"', html_content)

            for link in links:
                if os.path.exists(link):
                    files_to_zip.append(link)

        with tempfile.NamedTemporaryFile(delete=False, mode="w", encoding="utf-8") as temp_file:
            updated_html_content = re.sub(
                r'href="([^"]+)"', 
                lambda match: f'href="reports/{os.path.basename(match.group(1))}"', 
                html_content
            )
            temp_file.write(updated_html_content)
            temp_file_path = temp_file.name

        with zipfile.ZipFile(zip_file_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            zipf.write(temp_file_path, os.path.basename(html_report_path))
            for file_path in files_to_zip:
                if os.path.exists(file_path):
                    dir_name = os.path.basename(os.path.normpath(file_path).split(os.sep)[-4])
                    zipf.write(file_path, os.path.join('reports', dir_name, os.path.basename(file_path)))
        os.remove(temp_file_path)

        return zip_file_path
    
    def _get_external_tag(self, external_log_content):
        external_tag_content = re.search(r'\[(.*?)\]', external_log_content)
        return external_tag_content.group(0) if external_tag_content else ""

    def _get_external_test_time(self, external_log_content, external_tag):
        return [line.strip() for line in external_log_content.split('\n') if f"{external_tag}[Time]: " in line]

    def _get_stdout_from_report(self, generated_report):
        stdout = ""
        with open(generated_report['report_file_path'], "r", encoding="utf-8") as report_file:
            report_content = report_file.read()
            if 'external_tag' in generated_report:
                external_tag = generated_report['external_tag']
                stdout_lines = [line.strip().replace(f"{external_tag}[stdout]: ", "") for line in report_content.split('\n') 
                                if f"{external_tag}[stdout]: " in line]
                stdout = '\n'.join(stdout_lines)
        return stdout

    def _get_row_color_and_status(self, return_code):
        row_color = "#FFA07A"
        status = ""

        if return_code == "0":
            row_color = "#90EE90"
            status = "OK"
        elif return_code == "1":
            status = "Error in script terminal."
        elif return_code == "2":
            status = "Error in browser console."
        elif return_code == "3":
            status = "Verification failed."
        elif return_code == "4":
            status = "asc_onError triggered"
        elif return_code == "5":
            status = "asc_onErrorWarning triggered"
            row_color = "#FFD700"
        return row_color, status

    def _update_html_report(self, html_report_path, new_content, isNewTable, run_mode, headers):
        if os.path.exists(html_report_path):
            old_content = ""
            with open(html_report_path, "r", encoding="utf-8") as html_report:
                old_content = html_report.read()
                
            if isNewTable:
                old_content = old_content.replace("</body></html>", "")
                with open(html_report_path, "a", encoding="utf-8") as html_report:
                    self._create_table(html_report, new_content, headers)
                isNewTable = False
            else:
                table_end = old_content.rfind("</tr>")
                new_content = old_content[:table_end] + new_content + old_content[table_end:]
                with open(html_report_path, "w", encoding="utf-8") as html_report:
                    html_report.write(new_content)
        else:
            isNewTable = False
            self._create_html_report(html_report_path, new_content, run_mode, headers)

    def _create_table(self, html_report, new_content, headers):
        html_report.write("<table border='1'>\n")
        header_row = ''.join(f"<th>{header}</th>" for header in headers)
        html_report.write(f"<tr>{header_row}</tr>\n")
        html_report.write(new_content)

    def _close_table(self, html_report_path, execution_time = None):
        with open(html_report_path, "a", encoding="utf-8") as html_report:
            html_report.write("</table>\n</table>")
            
            if execution_time:
                html_report.write(f"<p>Test execution time: {execution_time} ms</p>")
            
            
    def _close_html(self, html_report_path):
        with open(html_report_path, "a", encoding="utf-8") as html_report:
            html_report.write("</body>\n</html>")
            
    def _create_html_report(self, html_report_path, new_content, run_mode, headers):
        with open(html_report_path, "w", encoding="utf-8") as html_report:
            html_report.write(f"<html>\n<head>\n<title>{run_mode} Report</title>\n</head>\n<body>\n")
            html_report.write(f"<h1>{run_mode} Report</h1>\n")
            self._create_table(html_report, new_content, headers)