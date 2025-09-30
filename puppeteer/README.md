# Testing with Puppeteer

This repository contains code for automating testing using the Puppeteer library.

## Table of Contents

-   [**Requirements**](#requirements)
-   [**Installation**](#installation)
-   [**Running Tests**](#running-tests)
-   [**Writing Test Examples**](#writing-test-examples)
-   [**Provider Addon**](#provider-addon)
-   [**Debugging**](#debugging)
-   [**Running and Debugging JavaScript Tests in Visual Studio Code**](#running-and-debugging-javascript-tests-in-visual-studio-code)
-   [**Configuration Setup**](#configuration-setup)
-   [**Test Example**](#test-example)
-   [**Functionality**](#functionality)
-   [**Project Structure**](#project-structure)
-   [**Available Library Modules**](#available-library-modules)

## Requirements

```bash
Node.js v20 and above
Python v3.10 and above
Google Chrome v120 and above
```

## Installation

```bash
git clone https://git.onlyoffice.com/ONLYOFFICE-QA/Dep.Tests.git
cd Dep.Tests
git submodule update --init puppeteer/files || echo "Skipping puppeteer/files"
cd puppeteer/engine
npm install or python run.py "%test_name% or %test_folder%"
```

## Running Tests

To run tests, navigate to the `puppeteer/engine` directory and execute the following commands:

-   To run all test examples:

```bash
python run.py
```

-   To run a specific test example:

```bash
python run.py test_name_or_folder
```

You can also specify additional optional parameters for running test examples:

```bash
--config [str]         # Path to the config file (default config_chrome_win.json or config_chrome_mac.json or config_chrome_linux.json)
--retries [n]          # Number of retries for running the test example
--threads [n]          # Number of threads allocated for running the tests
--config_params [str]  # 'Override config values, e.g. --config_params 'puppeteerOptions.headless=true'
--params [str]         # Parameters passed inside the tester
--out_directory [str]  # Name of the output directory
--prcache              # Preloading the cache for browsers
--debug                # Run in debug mode and save temp tests files (code.js and run.js)
[test_path] [str]      # Paths to the test files or directory (optional)
```

For more information about the parameters, you can execute the following command:

```bash
python run.py -h
```

### About testOptions.urlParam

#### Parameter examples

```bash
urlParam='action={\"debug\":true}' #launches the editor in debug_mode (configured by default in the json config)

urlParam='type=desktop' # open in editor for full size screens
urlParam='type=mobile' # open in editor for mobile devices
urlParam='type=embedded' # open in embedded mode

urlParam='mode=view' # open in editor in view mode
urlParam='mode=comment' # open in editor for comment
urlParam='mode=review' # open in editor for review
```

You can also pass several parameters to run.

#### Example

```bash
--config_params 'testOptions.urlParam=["action={\"debug\":true}"]' # open in the editor for full-size screens in comments mode
```

```bash
python run.py --config_params 'testOptions.urlParam=["type=mobile", "mode=view"]' # full command
```

### About --params

Params values ​​can be obtained inside the test script using the `Params` array.

#### Example

The params.js test file is used.

-   File code:

```javascript
// loads the file "new.docx" (Params[0])
Tester.openFile(Params[0]);
// writes "hello world" (Params[1]) inside the file
Tester.input(Params[1]);
Tester.close();
```

-   Command

```bash
python run.py params/params.js --params 'testcollab.docx' 'hello world' #runs params.js with the value Params = ['testcollab.docx', 'hello world']
```

## Writing Test Examples

### How to Write a Test

-   JavaScript was used for writing tests, test scenarios.

### Guide to CSS Selectors

-   Puppeteer uses css selectors to interact with html elements. For more information, see this [**Guide**](docs/CSS_GUIDE.md).

## Provider Addon

The Provider Addon enables interaction with different versions of the editor. Learn more [**Provider Addon**](docs/PROVIDER.md) documentation.

## Debugging

To debug test cases, you need to run the test with the --debug parameter.

### Example

```bash
python run.py example/smartart_example.js --debug # - start debug
```

To launch the debug, open the Chrome browser and go to `chrome://inspect/#devices` and click `inspect` in the devices tab.

## Running and Debugging JavaScript Tests in Visual Studio Code

Follow these steps to run or debug JavaScript tests in Visual Studio Code:

1. **Open the Project Folder**

    Navigate to the `Dep.Tests/puppeteer` folder in VS Code.

2. **Configure Debug Settings (optional)**

    Set up or update the `puppeteer/.vscode/launch.json` file with the following configuration:

    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Run JS Test",
                "type": "debugpy",
                "request": "launch",
                "program": "${workspaceFolder}/engine/run.py",
                "args": ["${file}"],
                "console": "integratedTerminal"
            },
            {
                "name": "Debug JS Test",
                "type": "debugpy",
                "request": "launch",
                "program": "${workspaceFolder}/engine/run.py",
                "args": ["${file}", "--debug"],
                "console": "integratedTerminal",
                "justMyCode": true
            }
        ]
    }
    ```

3. **Run or Debug Tests**
   Use the **Run and Debug** feature in VS Code:

    - Choose **Run JS Test** to execute tests.
    - Choose **Debug JS Test** to debug the tests.

4. **Specify Arguments**
   Add any necessary arguments in the `args` section of `puppeteer/.vscode/launch.json`.
   About args in [**Running Tests**](#running-tests)

## Configuration Setup

Configs are created to set necessary parameters for running the testing system.
A config is a JSON file with the following structure:

-   **Example config file**

```json
{
    "testOptions": {
        "url": "https://kim.teamlab.info/example",
        "urlParam": ["action={\"debug\":true}"],
        "messageType": ["error", "log"],
        "userDelay": 0,
        "cacheEnabled": true,
        "disableTooltips": true,
        "logEvents": false
    },
    "puppeteerOptions": {
        "browser": "chrome",
        "headless": false,
        "slowMo": 0,
        "defaultViewport": {
            "height": 600,
            "width": 1000,
            "deviceScaleFactor": 1
        }
    },
    "reportOptions": {
        "ignoreBrowserErrors": ["Failed to load resource: the server responded with a status of 404"],
        "ignoreExternalScriptsErrors": ["Checking file for encryption is not supported on Windows"]
    },
    "runOptions": {
        "disableAnimation": false
    },
    "resourceServer": {
        "port": 3000,
        "resourcePath": "resources"
    },
    "provider": ""
}
```

Let's break it down:

-   `testOptions`: test scenario settings.
    -   `url`: the path to the main editor page.
    -   `urlParam`: additional parameters for opening the test file. **Example:** action={debug:true}.
    -   `logEvents`: enables logging of messages containing the [logEvent] tag into the report
    -   `messageType`: the type of messages that will be read from the browser console.
    -   `cacheEnabled`: parameter to use browser cache.
    -   `disableTooltips`: disables tooltips in the editor UI.
    -   `userDelay`: user action delay (ms).
-   `puppeteerOptions` - [puppeteer settings](https://pptr.dev/api/puppeteer.launchoptions).
-   `reportOptions`: configuring the generation of the completed test report.
    -   `ignoreBrowserErrors`: ignoring certain errors in the browser console.
    -   `ignoreExternalScriptsErrors`: ignores errors caused by an external script connected to the Tester.
-   `runOptions`: options for interacting with the test run
    -   `disableAnimation`: disables animated text output.
-   `resourceServer`: configuration for serving static resources.
    -   `port`: The port on which the resource server will run. In this case, it is set to `3000`, meaning the server will be accessible at `http://localhost:3000`.
    -   `resourcePath`: The path to the directory where resources are stored. Typically, this is a folder containing assets needed for the editor. For example, the `resourcePath` is set to `resources`. If this path is relative, it will be resolved relative to the `puppeteer/` directory.

## Reserved variables

-   **profilePath** - path to profile;
-   **cacheDir** - path to cache directory;
-   **urlParam** - url params;
-   **Params** - param transmitted via --params;

-   **workDirectory** - path to work directory (`/puppeteer`);
-   **scriptPath** - path to scripts (`/puppeteer/scripts`);
-   **logDirectory** - path to log directory (`puppeteer/out/test_name/log`);
-   **downloadDir** - path to download directory (`puppeteer/out/test_name/download`);
-   **scriptsDirectory** -path to external script (`puppeteer/out/test_name/script`);
-   **engineScriptsPath** - path to engine scripts directory (`puppeteer/engine/scripts`);

## Test Example

```javascript
// Import the FileMenu module
const { FileMenu } = require("lib");
// Tester command to create a document type file.
Tester.createFile("docx");
// Calling library methods
FileMenu.downloadAs("docx");
FileMenu.downloadAs("dotx");
FileMenu.downloadAs("epub");
FileMenu.downloadAs("fb2");
FileMenu.downloadAs("html");
FileMenu.downloadAs("jpg");
// Downloading a txt file with Unicode (UTF-8) encoding
FileMenu.downloadAs("txt");
// Closing the file
Tester.close();
```

## Functionality

You can consider the detailed functionality in the [**Tester Functionality**](docs/FUNCTIONALITY.md).

## Project Structure

The project structure looks like this:

### Main Modules

-   `engine/tester.js`: The main module for testing, which uses Puppeteer for automating actions in the browser.
-   `engine/run.py`: Script for running tests.

### Configs

-   `config_chrome_win.json`: Configuration file for configuring test parameters for Windows Google Chrome.
-   `config_chrome_mac.json`: Configuration file for configuring test parameters for MacOS Google Chrome.
-   `config_chrome_linux.json`: Configuration file for configuring test parameters for Linux Google Chrome.
-   `config_firefox_win.json`: Configuration file for configuring test parameters for Windows Firefox.
-   `config_firefox_linux.json`: Configuration file for configuring test parameters for Linux Firefox.

### Additional Files

-   `tests/`: Folder with test scripts. You can create your own tests and place them here.
-   `module/`: Folder with module files. You can create your own libraries and place them here.
-   `lib/`: The folder through which you can connect libraries.
-   `files/`: Folder with additional files for tests.
-   `files/documents`: Folder containing text and document files.
-   `files/images`: Folder containing images.

### Out Directory

Files created during the execution of the test script are placed in the `out/` directory by default.

-   `out/`: the main directory for the results of the completed test.
-   `out/test_filename/`: the directory of the executed test script.
-   `out/test_filename/reports`: the directory with the test execution report (about [**reports**](#reports))
-   `out/test_filename/download`: the directory for downloaded files during testing.
-   `out/test_filename/log`: the directory that contains `log.txt` containing `browser` console messages.
-   `out/test_filename/terminallog`: the directory that contains `log.txt` containing the `script` console messages.

### Reports

The name of the report file in the format reports_year_time.

#### Example

```
report_20240122_145833.txt - Test launch report on January 22, 2024 at 2:58 p.m. 33 seconds
```

#### Report Structure

The structure of the report file for this documentation may include the following sections:

-   BROWSER LOG: entries regarding actions in the browser.

```
=== BROWSER LOG ===
[log]: Document editor ready
[log]: [speed]: getEditorPermissions time:10572
[log]: [speed]: onDownloadFile time:1555
[log]: [speed]: onOpenDocument time:146
[log]: [speed]: onLoadFonts time:1177
[log]: [speed]: onDocumentContentReady time:19776 memory:{"totalJSHeapSize":99783366,"usedJSHeapSize":85402282,"jsHeapSizeLimit":4294705152}
[log]: onRequestRename: "new"
[log]: onMetaChange: {"title":"new.docx"}
...
```

-   TERMINAL LOG: entries related to the operation of the terminal or console.

```
=== TERMINAL LOG ===
Config Path: config_path
Params:  null
Contents of the JSON file: {
  browser: 'chrome',
  url: url,
  urlParam: 'action={"debug":true}',
  debugMode: true,
  messageType: [ 'error', 'log' ],
  cacheEnabled: true,
  config: {
    headless: false,
    pressSlow: 50,
    executablePath: 'browser_path'
  }
}

```

-   SCRIPT ERROR and BROWSER ERROR: description of an error that occurred during script execution or an error displayed in the browser console

```
=== BROWSER ERROR ===
[error]: BROWSER ERROR

=== SCRIPT ERROR ===
Error: error during script execution
```

## Available Library Modules

Library modules that can be connected to the testing core.

-   [Editor Modules](module/editor/README.md) - modules for writing test scenarios.
-   [Common Modules](module/common/README.md) - modules that can be used in library development and writing test scripts.
-   [Collab Modules](module/collab/README.md) - the module used in the collaborative launches.
-   [Elements Module](module/elements/README.md) - modules for writing libraries.
