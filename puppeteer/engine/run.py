import sys
sys.dont_write_bytecode = True
sys.stdout.reconfigure(encoding='utf-8')
import os
import json
import shutil
import subprocess
import re
import platform
from concurrent.futures import ThreadPoolExecutor
import argparse
import time
from script.python.start_script import TestRunner
from script.python.report_generator import ReportGenerator
from script.python.description_parser import DescriptionParser
from script.python.loading_spinner import LoadingSpinner
from script.python.config_manager import ConfigManager
from script.python.install import check_dependencies
from script.python.report_worker import ReportWorkerManager
from urllib.parse import urlparse, urljoin
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError

sys.path.append(os.path.abspath(os.path.join(__file__, "../../..")))
from tools.report_portal.report_portal_launcher import ReportPortalLauncher
from puppeteer.engine.script.python.report_portal.report_portal_manager import ReportPortalManager, NullReportPortalLauncher, NullReportPortalManager
import datetime
from queue import Queue

DIR_STRUCTURE = {
    "log": ["log.txt"],
    "log/browser_log": ["browser_log.txt"],
    "log/terminallog": [],
    "log/externallog": ["stdout.txt", "error.txt"],
    "download": [],
    "reports": [],
    "resource": ["server.js"],
}

cache_queue = Queue()
server_queue = Queue()
system = platform.system()
engine_directory = os.path.dirname(os.path.realpath(__file__))
work_directory = os.path.normpath(os.path.join(engine_directory, ".."))
resource_server_path = os.path.join(engine_directory, "script", "js", "scripts", "resourceServer.js")
report_portal_manager = None
report_generator = None
report_worker_manager = None
create_connection = False

def is_file(file_path):
    return os.path.isfile(file_path)

def normpath(test_path):
    return os.path.normpath(test_path)

def is_abs(file_path):
    return os.path.isabs(file_path)

def join_path(path1, path2):
    return os.path.join(path1, path2)

def is_dir(dir_path):
    return os.path.isdir(dir_path)

def create_dir(dir_path):
    os.makedirs(dir_path, exist_ok=True)

def copy_file(src, dst):
    shutil.copyfile(src, dst)

def copy_folder(src, dest):
    if not os.path.exists(dest):
        os.makedirs(dest, exist_ok=True)

    for item in os.listdir(src):
        src_item = os.path.join(src, item)
        dest_item = os.path.join(dest, item)

        if os.path.isdir(src_item):
            copy_folder(src_item, dest_item)
        else:
            shutil.copyfile(src_item, dest_item)

def read_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read()

def write_file(file_path, text): 
    with open(file_path, 'w', encoding="utf-8") as file:
        file.write(text)
        
def append_file(file_path, text):  
    with open(file_path, 'a', encoding="utf-8") as file:
        file.write(text)

def replace_in_file(file_path, old_text, new_text):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
    content = content.replace(old_text, new_text)
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(content)

def run_test_in_new_terminal(**kwargs):
    test_file = kwargs.get('test_file')
    code_file = kwargs.get('code_file')
    test_path = kwargs.get('test_path')
    out_directory_path = kwargs.get('out_directory_path')
    debug_flag = kwargs.get('debug_flag')
    server_port = kwargs.get('server_port')
    test_resource_dir = kwargs.get('server_html_path')
    terminal_log = kwargs.get('terminal_log')
    terminal_error = kwargs.get('terminal_error')
    report_portal_test = kwargs.get('report_portal_test')

    try:
        resource_server_path = os.path.join(test_resource_dir, "server.js")
        test_runner = TestRunner(report_portal_launcher, report_portal_test)
        result_code = test_runner.run(test_file, test_path, out_directory_path, debug_flag, server_port, resource_server_path, test_resource_dir, terminal_log, terminal_error)
        
        if not debug_flag:
            [os.remove(file) for file in (test_file, code_file) if os.path.exists(file)]

        shutil.rmtree(test_resource_dir)
        return result_code
    except Exception as e:
        report_portal_launcher.send_log(f"Error opening a new terminal: {str(e)}", "ERROR")
        raise e

def get_function_content(start_index, content):
    depth = 0
    for i in range(start_index, len(content)):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                return content[start_index:i+1]
    return ''

def copy_tester_to_test_directory(test_directory):
    run_file = os.path.join(test_directory, "run.js")
    code_file = os.path.join(test_directory, "code.js")
    copy_file(os.path.join(engine_directory, "tester.js"), run_file)
    copy_file(os.path.join(engine_directory, "code.js"), code_file)
    return [run_file, code_file]

#code changes inside the functors
def modify_users_blocks(user_blocks, test_content, words):
    for blocks in user_blocks:
        start_pos = test_content.find('async function', blocks)
        if -1 != start_pos:
            func_body = get_function_content(start_pos, test_content)
            end_pos = start_pos + len(func_body)
            for match in words:
                func_body = func_body.replace(f"await {match.strip()}.", f"await this.{match.strip()}.")
            func_body = func_body.replace("await this.Tester.close()", "await Tester.close()")
            test_content = test_content[:start_pos] + func_body + test_content[end_pos:]
    return test_content

#adding await before certain class methods
def modify_collab_variable(test_content):
    collab_var_pattern = r'\b(?:let|var|const)\s+([\w\d_]+)\s*=\s*(?:await Tester\.startCollaboration)\b'
    variable = re.findall(collab_var_pattern, test_content)

    for var in variable:
        user_var_pattern = fr'\b(?:let|var|const)\s+([\w\d_]+)\s*=\s*(?:{var}\.addUser)\b'
        variable.extend(re.findall(user_var_pattern, test_content))

    for var in variable:
        test_content = test_content.replace(f'{var}.addUser(', f'await {var}.addUser(')
        test_content = test_content.replace(f'{var}.doSync(',f'await {var}.doSync(')
        test_content = test_content.replace(f'{var}.wait(',f'await {var}.wait(')
        test_content = test_content.replace(f'{var}.close(',f'await {var}.close(')

    return test_content

#adding await and this in the test script code
def modify_collab_test_content(test_content, words):
    test_content = modify_collab_variable(test_content)
    
    user_add_blocks = [match.start() for match in re.finditer('do', test_content)]
    test_content = modify_users_blocks(user_add_blocks, test_content, words)

    event_blocks = [match.start() for match in re.finditer('attachEvent', test_content)]
    test_content = modify_users_blocks(event_blocks, test_content, words)

    return test_content

#editing the program code
def modify_test_content(test_content):
    lib_path = os.path.join(engine_directory, "..", "lib").replace("\\", "/")
    test_content = test_content.replace("require(\"lib", f"require(\"{lib_path}")

    matches = re.findall(r'const\s*\{([\s\S]*?)\}\s*=\s*require', test_content, re.S)
    words = [word.strip() for match in matches for word in match.split(',') if word.strip()]
    words.append("Tester")
    words_pattern = r'\b(?:' + '|'.join(map(re.escape, words)) + r')\b'
    pattern = rf'(?<!await\s)({words_pattern}\.\w+\()' 
    
    test_content = re.sub(pattern, r'await \1', test_content)
    if "startCollaboration" in test_content:
        test_content = modify_collab_test_content(test_content, words)

    return test_content

def create_out_directory(test_path, params, current_datetime):
    out_directory = params['out_directory']
    target_path = params['target_path']
    resource_path = params['resource_path']
    
    def create_subdir(parent, name, files=[]):
        path = os.path.join(parent, name)
        create_dir(path)
        for file in files:
            write_file(os.path.join(path, file), "")
        return path

    def resolve_test_directory():
        base_path = work_directory if "puppeteer" in test_path else os.path.dirname(target_path)
        relative_path = os.path.splitext(os.path.relpath(test_path, base_path if "puppeteer" not in test_path else work_directory))[0]
        return os.path.join(base_path, out_directory, relative_path, f"run_{current_datetime}" if "puppeteer" in test_path else "")
    
    new_test_directory = resolve_test_directory()
    out_directory_path = os.path.join(work_directory, out_directory) if "puppeteer" in test_path else os.path.join(os.path.dirname(target_path), out_directory)
    
    create_dir(new_test_directory)
    
    for rel_path, files in DIR_STRUCTURE.items():
        full_path = os.path.join(new_test_directory, rel_path)
        create_subdir(os.path.dirname(full_path), os.path.basename(full_path), files)
    
    copy_folder(resource_path, os.path.join(new_test_directory, "resource"))
    copy_file(resource_server_path, os.path.join(new_test_directory, "resource", "server.js"))

    return new_test_directory, out_directory_path, os.path.join(new_test_directory, "resource")

def run_test(test_map, params_dict, cache_dir, server_port):
    test_path = test_map["script"]
    file_name = os.path.basename(test_path)
    report_portal_test = report_portal_manager.start_test(test_path)
    report_portal_test.send_log("Start test")
    current_datetime = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    test_directory, out_directory_path, test_resource_dir = create_out_directory(test_path, params_dict, current_datetime)
    run_file, code_file = copy_tester_to_test_directory(test_directory)
    log_file = os.path.join(os.path.dirname(run_file), "log", "log.txt")

    test_content = read_file(test_path)
    test_content = modify_test_content(test_content)
    
    profile_path = os.path.join(engine_directory, "browser", "profile").replace("\\", '/')
    replace_in_file(run_file, "%%PROFILE_PATH%%", str(profile_path).replace("\\", "/"))

    cache_dir = cache_dir.replace("\\", '/')
    replace_in_file(run_file, "%%CACHEDIR%%", str(cache_dir).replace("\\", "/"))
    if "config" in test_map:
        sub_config_path = test_map["config"]
        test_config = config_manager.merge_with_config(sub_config_path)
    else:
        test_config = config_manager.get_main_config()
 
    config_js = config_manager.to_js_config(test_config)
    replace_in_file(run_file, "\"%%CONFIG%%\"", str(config_js))

    puppeteer = os.path.join(engine_directory, "node_modules", "puppeteer").replace("\\", '/')
    replace_in_file(run_file, "require(\"%%PUPPETEER%%\")", f"require(\"{puppeteer}\")")

    collab = os.path.join(engine_directory, "..", "module", "collab").replace("\\", '/')
    replace_in_file(run_file, "require(\"%%COLLAB%%\")", f"require(\"{collab}\")")

    elements = os.path.join(engine_directory, "..", "module", "elements").replace("\\", '/')
    replace_in_file(run_file, "require(\"%%ELEMENTS%%\")", f"require(\"{elements}\")")
    
    replace_in_file(run_file, "\"%%TESTER_PARAMS%%\"", f"{params_dict['params']}")

    replace_in_file(run_file, "\"%%FILE_NAME%%\"", f"\"{file_name}\"")
    replace_in_file(run_file, "\"%%WORK_DIR%%\"", f"\"{work_directory}\"".replace("\\", '/'))

    replace_in_file(run_file, "\"%%URL%%\"", f"\"http://localhost:{server_port}\"".replace("\\", '/')) 
    
    start_test_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    start_time = int(round(time.time() * 1000))
    replace_in_file(run_file, "%%INIT_TIME%%", str(start_test_time))

    append_file(log_file, f"[00:00:000] [start] [test] {file_name}\n")
    replace_in_file(code_file, "(\"%%CODE%%\")", test_content)
    
    terminal_args = {
        "test_file": run_file,
        "code_file": code_file,
        "test_path": test_path,
        "out_directory_path": out_directory_path,
        "debug_flag": params_dict["debug"],
        "server_port": server_port,
        "resource_path": params_dict["resource_path"],
        "server_html_path": test_resource_dir,
        "test_directory": test_directory,
        "cache_dir": cache_dir,
        "terminal_error": params_dict["terminal_error"],
        "terminal_log": params_dict["terminal_log"],
        'report_portal_test': report_portal_test
    }

    return_code = run_test_in_new_terminal(**terminal_args)
    end_time = int(time.time() * 1000)
    execution_time = end_time - start_time
    formatted_time = "[{:02}:{:02}.{:03}]".format(execution_time // 60000, (execution_time // 1000) % 60, execution_time % 1000)
    append_file(log_file, f"{formatted_time} [end] [test] {file_name} Duration {execution_time}")

    report_object = {
        'test_path': test_path,
        'file_name': file_name,
        'out_directory_path': out_directory_path,
        'start_time': start_time,
        'end_time': end_time,
        'execution_time': execution_time,
        'exceptionErrors': params_dict['exceptionErrors'],
        'test_directory': test_directory,
        'current_datetime': current_datetime,
        'start_test_time': start_test_time,
        'return_code': return_code
    }

    report_worker_manager.submit_report(report_object, report_portal_test, params_dict['run_mode'])
    return report_object

def run_test_with_retries(test_map, params_dict):
    result = []
    for _ in range(params_dict['num_retries']):
        cache_dir = cache_queue.get()
        server_port = server_queue.get()
        try:
            result_object = run_test(test_map, params_dict, cache_dir, server_port)
            result.append(result_object)
        except Exception as e:
            print(f"Error running test {test_map['script']}: {e}")
            result.append({"return_code": 1})
        finally:
            cache_queue.put(cache_dir)
            server_queue.put(server_port)

    return result
        
def create_dir_map(tests_directory_root_path):
    dir_map = {}

    for root, dirs, files in os.walk(tests_directory_root_path, topdown=False):
        dirs.sort()
        files.sort()

        current_dir = os.path.relpath(root, tests_directory_root_path)
        if current_dir == ".":
            current_dir = tests_directory_root_path
        else:
            current_dir = os.path.join(tests_directory_root_path, current_dir)

        scripts = []
        config_path = None

        for file in files:
            file_path = os.path.join(current_dir, file)
            _, file_extension = os.path.splitext(file)

            if file_extension == ".js":
                scripts.append({"script": file_path})
            elif file == "config.json":
                config_path = file_path

        if config_path:
            for script in scripts:
                script["config"] = config_path

        if scripts:
            dir_map[current_dir] = scripts

    all_scripts = []
    for key in sorted(dir_map.keys(), reverse=True):  # reverse=True чтобы корень был последним
        all_scripts.extend(sorted(dir_map[key], key=lambda s: s["script"]))

    dir_map[tests_directory_root_path] = all_scripts
    return dir_map

def get_matching_paths(test_path):
    test_directory = os.path.dirname(test_path) if os.path.isfile(test_path) else test_path
    
    dir_map = create_dir_map(test_directory)
    matching_tests = dir_map.get(test_directory, [])
    
    if os.path.isfile(test_path):
        return [entry for entry in matching_tests if entry.get("script") == test_path]

    return matching_tests

def get_latest_modification_time(paths):
    return max(os.path.getmtime(path) for path in paths)

def update_description_json(module_paths, tester_path):
    def parse_and_save(module_paths, tester_path, description_file_path):
        try:
            description_parser = DescriptionParser([tester_path, module_paths])
            modules_descriptions = description_parser.parse_js_files()

            os.makedirs(os.path.dirname(description_file_path), exist_ok=True)
            with open(description_file_path, "w", encoding="utf-8") as methods_json:
                json.dump(modules_descriptions, methods_json, ensure_ascii=False, indent=4)

            return [{"return_code": 0}] 
        except Exception as e:
            
            print(f"Error while saving descriptions: {e}")
            return [{"return_code": 1}] 

    all_files = []
    for files in module_paths.values():
        all_files.extend(files)
    all_files.extend(tester_path[engine_directory])

    description_file_path = os.path.join(engine_directory, "descriptions", "methodsDescription.json")

    needs_parsing = True
    if os.path.exists(description_file_path):
        description_last_modified = os.path.getmtime(description_file_path)
        latest_file_modified = get_latest_modification_time(all_files)
        if latest_file_modified <= description_last_modified:
            needs_parsing = False

    if needs_parsing:
        with ThreadPoolExecutor() as executor:
            future = executor.submit(parse_and_save, module_paths, tester_path, description_file_path)
            spinner = LoadingSpinner(future, "Updating method descriptions...")  
            spinner.start()

def get_editor_version(url: str) -> tuple[str, str]:
    parsed = urlparse(url)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    
    script_url = urljoin(origin, "/web-apps/apps/api/documents/api.js")
    
    try:
        req = Request(script_url)
        with urlopen(req) as response:
            text = response.read().decode('utf-8')
            
        match = re.search(r"Version:\s*([\d.]+)\s*\(build:(\d+)\)", text)
        if not match:
            raise RuntimeError("Cannot parse version/build from the script")
        
        return match.group(1), match.group(2)
    
    except HTTPError as e:
        raise RuntimeError(f"HTTP error: {e.code} {e.reason}")
    except URLError as e:
        raise RuntimeError(f"URL error: {e.reason}")

if __name__ == "__main__":
    check_dependencies(engine_directory)
    start_time = int(time.time() * 1000)
    # create browser folders
    browser_profile_dir = os.path.join(engine_directory, "browser", "profile")
    browser_cache_dir   = os.path.join(engine_directory, "browser", "cache")
    create_dir(browser_profile_dir)
    create_dir(browser_cache_dir)
    default_config = ""
    system_name = None
    if system == "Windows":  
        default_config = "config_chrome_win.json"
        system_name = "windows"
    elif system == "Darwin":
        default_config = "config_chrome_mac.json"
        system_name = "macos"
    elif system == "Linux": 
        default_config = "config_chrome_linux.json"
        system_name = "linux"
        create_profile = f'firefox --CreateProfile "{browser_profile_dir}"'
        subprocess.run(create_profile, shell=True)

    # Read arguments
    tests_directory_default = normpath(os.path.join(work_directory, "tests"))
    
    parser = argparse.ArgumentParser(description="Run tests with options")
    parser.add_argument("test_path", nargs="?", default=tests_directory_default,
                        help="Paths to the test files or directory (optional)")
    parser.add_argument("--config", default=default_config,
                        help=("Path to the config file "
                            "(default config_chrome_win.json or "
                            "config_chrome_mac.json or config_chrome_linux.json)"))
    parser.add_argument("--config_params", nargs="*", type=str, default=None, 
                        help='Override config values, e.g. --config_params ' \
                        'puppeteerOptions.headless=true')
    parser.add_argument("--params", nargs="*", default="null", help="Parameters passed inside the tester")
    parser.add_argument("--out_directory", nargs="?", default="out", help="Name of the output directory")
    parser.add_argument("--retries", nargs="?", type=int, default=1,
                        help="Number of test execution retries")
    parser.add_argument("--threads", nargs="?", type=int, default=-1,
                        help="Number of threads allocated for running the tests")
    parser.add_argument("--prcache", action='store_true', help="Preloading the cache for browsers")
    parser.add_argument('--debug', action='store_true', help='Run in debug mode')
    parser.add_argument('--terminal_error', action='store_true', help='Run in debug mode')
    parser.add_argument('--terminal_log', action='store_true', help='Run in debug mode')
    parser.add_argument('--connect_portal', action="store_true", help='Use Report Portal')
    parser.add_argument('--disable_animation', action="store_true", help= 'Print program output')
    parser.add_argument('--providers', nargs='*', help='List of providers to run tests with (e.g. docspace owncloud wopi)')
    args = parser.parse_args()

    config = args.config
    config_params = args.config_params
    test_path = args.test_path
    params = args.params
    out_directory = args.out_directory
    num_retries = args.retries
    num_threads = args.threads
    debug = args.debug
    prcache = args.prcache
    connect_portal = args.connect_portal
    disable_animation  = args.disable_animation 
    config_path = os.path.join(os.path.dirname(engine_directory), config)
    
    config_manager = ConfigManager(config_path, config_params)
    config = config_manager.get_main_config()

    if args.providers:
        run_modes = list(set(args.providers))
    elif 'provider' in config and config['provider']:
        if isinstance(config['provider'], list):
            run_modes = list(set(config['provider']))
        else:
            run_modes = [config['provider']]
    else:
        run_modes = ['example']

    os.environ["PUPPETEER_SKIP_CHROMIUM_DOWNLOAD"] = "true"
    if "browser" in config["puppeteerOptions"]:
        os.environ["PUPPETEER_PRODUCT"] = config["puppeteerOptions"]["browser"]

    if "executablePath" in config["puppeteerOptions"]:
        os.environ["PUPPETEER_EXECUTABLE_PATH"] = config["puppeteerOptions"]["executablePath"]

    test_file_config_map = []
    target_path = normpath(test_path)
    if not is_abs(target_path):
        target_path = normpath(os.path.join(work_directory, target_path))
        if not os.path.lexists(target_path):
            target_path = normpath(os.path.join(tests_directory_default, test_path))

    message = ""
    if is_file(target_path):
        message = f'Running test file "{test_path}"'
        test_file_config_map = get_matching_paths(target_path)
    elif is_dir(target_path):
        message = f'Running tests in folder "{test_path}"'
        test_file_config_map.extend(get_matching_paths(target_path))

    for run_mode in run_modes:
        version, build = get_editor_version(config["testOptions"]["url"])
        launch_attributes = [{"key": "platform", "value": system_name}, 
                        {"key": "browser", "value": config["puppeteerOptions"]["browser"]}, 
                        {"key": "provider", "value": run_mode},
                        {"key": "version", "value": version},
                        {"key": "build", "value": build} ]
        try: 
            report_portal_launcher = ReportPortalLauncher()
            create_connection = connect_portal or report_portal_launcher.need_connection
            if create_connection:
                report_portal_launcher.start_launch(attributes = launch_attributes)
                report_portal_launcher.send_log(f"Starting tests in {target_path}...")

                report_portal_manager = ReportPortalManager(report_portal_launcher, test_file_config_map, work_directory)
            else: 
                report_portal_launcher = NullReportPortalLauncher()
                report_portal_manager = NullReportPortalManager()
            
            report_generator = ReportGenerator(report_portal_launcher)
            report_portal_launcher.send_log(message, print_output=False)
            if len(test_file_config_map) == 0:
                report_portal_launcher.send_log(f"Error: Test files not found.", level="ERROR")
                sys.exit(1)
            
            module_dir_map = create_dir_map(os.path.join(work_directory, "module"))
            module_paths = {
                dir_key: [entry["script"] for entry in file_data if "script" in entry]
                for dir_key, file_data in module_dir_map.items()
            }

            tester_path = {engine_directory: [os.path.join(engine_directory, "tester.js")]}
            update_description_json(module_paths, tester_path)

            resource_path = config["resourceServer"]["resourcePath"]

            if not os.path.isabs(resource_path):
                resource_path = os.path.join(work_directory, resource_path)

            params_dict = {
                'test_path': test_path,
                'num_retries': num_retries,
                'config_path': config_path,
                'out_directory': f"{out_directory}/{run_mode}",
                'target_path': target_path,
                'params': params,
                'exceptionErrors': config["reportOptions"],
                'resource_path': resource_path,
                'debug': debug,
                'terminal_error': args.terminal_error,
                'terminal_log': args.terminal_log,
                'run_mode': run_mode
            }
            
            if num_threads == -1:
                num_threads = int(min(32, (os.cpu_count() or 1) + 4) * 1/3)
                num_threads = min(num_threads, len(test_file_config_map))

            report_worker_manager = ReportWorkerManager(
                report_generator,
                report_portal_manager,
                num_workers=num_threads,
                enable_portal=create_connection
            )
            report_worker_manager.start_workers()

            if not prcache:
                for i in range(num_threads * 2):
                    cache_dir = os.path.join(browser_cache_dir, f"cache{i}")
                    server_port = config["resourceServer"]["port"] + i
                    server_queue.put(server_port)
                    cache_queue.put(cache_dir)
                    
                with ThreadPoolExecutor(max_workers=num_threads) as poolExecutor:
                    futures = [poolExecutor.submit(run_test_with_retries, test_map, params_dict) for test_map in test_file_config_map]
                    spinner = LoadingSpinner(futures, message, disable_animation or config.get('runOptions', {}).get("disableAnimation", False))
                    spinner.start()
                    end_time = int(time.time() * 1000)
                    execution_time = end_time - start_time
                    
                    report_generator.generate_launch_html_report(execution_time, run_mode)
            else:
                init_cache_script = os.path.join(engine_directory, "script", "js", "scripts", "prepareCache.js")
                command = f"node {init_cache_script} {config_path} {num_threads}"
                subprocess.run(command, shell=True)
        finally:
            if isinstance(report_portal_launcher, ReportPortalLauncher) and report_portal_launcher.launch_is_started is not False:
                try:
                    report_worker_manager.finish_workers()
                    report_portal_launcher.finish_launch(
                        status="FAILED" if sys.exc_info()[0] is not None else "PASSED"
                    )
                except Exception as e:
                    print(f"Error finishing ReportPortal launch: {e}")