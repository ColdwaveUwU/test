import json
import os
import subprocess
import shutil

def get_npm_path():
    npm_path = shutil.which("npm")
    if not npm_path:
        raise FileNotFoundError("npm is not installed or not found in PATH.")
    return npm_path

def check_and_install_npm_packages(node_modules_dir_path):
    package_json_path = os.path.join(node_modules_dir_path, "package.json")
    if not os.path.exists(package_json_path):
        print("package.json not found. Skipping npm check.")
        return

    with open(package_json_path, "r", encoding="utf-8") as f:
        package_json = json.load(f)

    dependencies = package_json.get("dependencies", {}).keys()
    dev_dependencies = package_json.get("devDependencies", {}).keys()
    all_packages = set(dependencies) | set(dev_dependencies)

    try:
        npm = get_npm_path()
        subprocess.check_call([npm, "-v"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, cwd=node_modules_dir_path)
    except FileNotFoundError:
        print("npm is not installed. Please install Node.js and npm.")
        return

    try:
        installed_output = subprocess.check_output(
            [npm, "ls", "--depth=0", "--json"],
            stderr=subprocess.DEVNULL,
            text=True,
            cwd=node_modules_dir_path
        )
        installed_packages = json.loads(installed_output).get("dependencies", {})
        have_extr_pkg = False
        for _, pkg in installed_packages.items():
            if pkg.get("extraneous"):
                have_extr_pkg = True

        if have_extr_pkg:
            subprocess.run([npm, "prune"], check=True, cwd=node_modules_dir_path)

    except subprocess.CalledProcessError:
        print("Error checking npm packages. Running npm install.")
        subprocess.run([npm, "install"], check=True, cwd=node_modules_dir_path)
        return

    missing_packages = all_packages - set(installed_packages.keys())

    if missing_packages:
        print("Installing missing npm packages:", ", ".join(missing_packages))
        subprocess.run([npm, "install"], check=True, cwd=node_modules_dir_path)

def check_dependencies(node_modules_dir_path):
    check_and_install_npm_packages(node_modules_dir_path)
