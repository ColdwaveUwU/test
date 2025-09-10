import time
import logging
import inspect
import types
import os
from functools import wraps

def setup_function_logger(log_file_path):
    logger = logging.getLogger(f"func_logger_{log_file_path}")
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        handler = logging.FileHandler(log_file_path, encoding="utf-8")
        formatter = logging.Formatter("%(asctime)s [%(threadName)s] %(message)s")
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    return logger

def log_time_decorator(func, logger):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        try:
            return func(*args, **kwargs)
        finally:
            elapsed = time.time() - start
            logger.info(f"{func.__module__}.{func.__name__} выполнена за {elapsed:.4f} сек")
    return wrapper

def auto_log_functions(module, log_file_path):
    logger = setup_function_logger(log_file_path)

    for name, obj in inspect.getmembers(module):
        if isinstance(obj, types.FunctionType):
            setattr(module, name, log_time_decorator(obj, logger))
        elif inspect.isclass(obj):
            for m_name, method in inspect.getmembers(obj, inspect.isfunction):
                setattr(obj, m_name, log_time_decorator(method, logger))
