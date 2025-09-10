import subprocess
import sys
import os
import importlib
import shutil
from importlib.util import find_spec

def get_local_module_version(module_name, target_dir):
    """
    Tries to retrieve the version of a module installed in a local directory using pip show.
    Arguments:
        module_name (str): The name of the module to check.
        target_dir (str): The directory where the module is installed.
    Returns:
        str: The version of the installed module, or None if version cannot be determined.
    """
    result = subprocess.run(
        [sys.executable, "-m", "pip", "show", module_name],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
        env={**os.environ, "PYTHONPATH": target_dir} 
    )
    
    if result.returncode == 0:
        for line in result.stdout.splitlines():
            if line.startswith("Version:"):
                return line.split(":", 1)[1].strip()
    
    return None

def safe_import(module_name, from_module=None, version=None):
    """
    Imports a module. If the module is not installed, installs it into a local folder and tries to import it again.
    If the module is installed but the version is different, it uninstalls the old version and installs the required version.
    Arguments:
        module_name (str): The name of the module to import.
        from_module (str, optional): The name of the component within the module to import. 
                                      Used if importing a specific part of the module.
        version (str, optional): The version of the module to install (e.g., '1.0.0').
    Returns:
        module: The imported module or component.   
    Raises:
        ImportError: If the module cannot be imported or installed.
    """
    caller_file_path = sys._getframe(1).f_globals['__file__']
    caller_dir = os.path.dirname(caller_file_path)
    
    target_dir = os.path.join(caller_dir, "pip_modules")
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)  
    
    sys.path.insert(0, target_dir)
    
    try:
        if find_spec(module_name):
            if version:
                installed_version = get_local_module_version(module_name, target_dir)
                if installed_version and installed_version != version:
                    print(f"Module {module_name} is installed, but version {installed_version} doesn't match the required version {version}. Reinstalling.")
                    shutil.rmtree(target_dir, ignore_errors=True) 
                    raise FileNotFoundError("Version mismatch, moving to installation process.")  
        
        if from_module:
            module = __import__(module_name, fromlist=[from_module])
        else:
            module = __import__(module_name)
        return module

    except (ImportError, FileNotFoundError):
        if version:
            package = f"{module_name}=={version}"
        else:
            package = module_name
        
        subprocess.check_call([sys.executable, "-m", "pip", "install", package, "--target", target_dir])  
        
        sys.path.insert(0, target_dir)  
        importlib.invalidate_caches()  
        
        gitignore_path = os.path.join(caller_dir, ".gitignore")
        if not os.path.exists(gitignore_path):
            with open(gitignore_path, 'w') as gitignore_file:
                gitignore_file.write(f"pip_modules\n")
        
        if from_module:
            module = __import__(module_name, fromlist=[from_module])  
        else:
            module = __import__(module_name)  
        return module
