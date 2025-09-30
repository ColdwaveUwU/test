import time
import sys
from typing import List, Union
from concurrent.futures import Future


class LoadingSpinner:
    """
    Loading spinner to visually represent the progress of concurrent tasks.
    Supports both animated and non-animated modes depending on the `disable_animation` flag.
    """
    def __init__(self, futures: Union[Future, List[Future]], start_message: str = '', disable_animation: bool = True):
        """
        Initialize the loading spinner.
        :param futures: A single Future or a list of Futures representing asynchronous tasks.
        :param start_message: Message to show before animation or output starts.
        :param disable_animation: If True, disables spinner animation and uses plain text output.
        """
        self.animation: List[str] = ['-', '\\', '|', '/']
        self.futures: List[Future] = futures if isinstance(futures, list) else [futures]
        self.start_message: str = start_message
        self.disable_animation: bool = disable_animation

    def __print_output(self, text: str) -> None:
        """
        Print or write output depending on animation mode.
        :param text: Text to display on stdout.
        """
        sys.stdout.write(text)
        sys.stdout.flush()

    def start(self) -> None:
        """
        Start the loading spinner or plain output, and wait for all futures to complete.
        """
        if self.disable_animation:
            print(self.start_message, end='')
        else:
            self.__print_output(self.start_message)
        self.create_run_output()

    def stop(self, success: int = 0, duration: int = 0) -> None:
        """
        Stop the spinner and print a success or failure message with duration.
        :param success: 0 if success, non-zero for failure.
        :param duration: Execution time in milliseconds.
        """
        duration_message = f". Duration: {duration} ms"
        result_icon = "\033[92m✔\033[0m" if success == 0 else "\033[91m✖\033[0m"
        final_message = f'\r{self.start_message} {result_icon}{duration_message}\n'
        self.__print_output(final_message)

    def create_run_output(self) -> None:
        """
        Handle spinner display (if enabled), wait for all futures,
        collect their results, and stop the spinner.
        """
        start_time = int(time.time() * 1000)

        if not self.disable_animation:
            self.__run_with_animation()
        else:
            self.__wait_for_futures()

        success = self.__collect_return_codes()

        end_time = int(time.time() * 1000)
        duration = end_time - start_time
        self.stop(success, duration)

    def __run_with_animation(self) -> None:
        """
        Show spinner animation while futures are not completed.
        """
        while not all(f.done() for f in self.futures):
            for frame in self.animation:
                if all(f.done() for f in self.futures):
                    break
                self.__print_output(f'\r{self.start_message} {frame}')
                time.sleep(0.1)

    def __wait_for_futures(self) -> None:
        """
        Wait for all futures to complete without showing animation.
        """
        for f in self.futures:
            f.result()

    def __collect_return_codes(self) -> int:
        """
        Collect and determine the final return code from the results of all futures.
        :return: Maximum return code from all results (0 for success, >0 for failure).
        """
        success_buff: List[int] = []

        for future in self.futures:
            try:
                result = future.result()
            except Exception:
                raise RuntimeError("No return code in run test")

            if isinstance(result, list):
                for res in result:
                    success_buff.append(res["return_code"] if isinstance(res, dict) else res)
            else:
                success_buff.append(result["return_code"] if isinstance(result, dict) else result)

        if max(success_buff) == 5:
            others = [x for x in success_buff if x != 5]
            return max(others) if others else 0
        return max(success_buff)