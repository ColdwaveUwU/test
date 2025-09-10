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
        "urlParam": "action={\"debug\":true}",
        "messageType": ["error", "log"],
        "cacheEnabled": true,
        "disableTooltips": true,
        "logEvents": true
    },
    "puppeteerOptions": {
        "browser": "chrome",
        "headless": false,
        "puppeteerDelay": 0,
        "userDelay": 0,
        "executablePath": "C:/Program Files/Google/Chrome/Application/chrome.exe"
    },
    "reportOptions": {
        "ignoreBrowserErrors": [],
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
-   `puppeteerOptions` - puppeteer settings.
    -   `browser`: the browser in which testing will take place.
    -   `headless`: browser launch mode.
        -   `true` - launching the browser in headless mode.
        -   `false` - launching the browser with a graphical interface.
    -   `puppeteerDelay`: delay in puppeteer accessing the browser (if `userDelay` is specified, it is not used).
    -   `userDelay`: user action delay (ms).
    -   `executablePath`: the path to the browser on the system.
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

### Common libs

Libraries that are common to various editor launches (view, edit etc..).

-   [**Color**](module/common/color/README.md): Library for color customization.
-   [**Draw**](module/common/draw/README.md): Library for drawing.
-   [**Pdf**](module/common/pdf/README.md): Library for work with pdf.
-   [**TestData**](module/common/testdata/README.md): Library for work with data constants.
-   [**Connector**](module/common/connector/README.md): Library for interaction with Automation API.
-   [**FileMenu**](module/common/filemenu/README.md): Library for work with filemenu.
-   [**NumberFormat**](module/common/numberformat/README.md) - library for interacting with Number Format window.
-   [**AppTitle**](module/common/apptitle/README.md) - library for interacting with App Title section.

### EditToolbar libs

Libraries for working with edit editor.

#### [**HomeTab**](module/edittoolbar/toolbar/hometab/README.md) - a set of libraries for interacting with the Home tab.

-   [**Font**](module/edittoolbar/toolbar/hometab/font/README.md) - library for interacting with fonts.
-   [**EditPdf**](module/edittoolbar/toolbar/hometab/editpdf/README.md) - library for interacting with EditPdf.
-   [**TextForm**](module/edittoolbar/toolbar/hometab/textform/README.md) - library for interacting with the position of the text.
-   [**NumberFormatCell**](module/edittoolbar/toolbar/hometab/numberformatcell/README.md) - library for interacting with number format in spreadsheet editor.
-   [**SlideShowManager**](module/edittoolbar/toolbar/hometab/slideshowmanager/README.md) - library for interacting with slideshow buttons in slide editor.
-   [**TextBoxHome**](module/edittoolbar/toolbar/hometab/textboxhome/README.md) - library for interacting with Text Box menu.
-   [**Functions**](module/edittoolbar/toolbar/hometab/functions/README.md) - library for interacting with Functions button in Home tab CSE.
-   [**Replace**](module/edittoolbar/toolbar/hometab/replace/README.md) - library for interacting with Replace button in Home tab.

#### [**InsertTab**](module/edittoolbar/toolbar/inserttab/README.md) - a set of libraries for interacting with the Insert tab.

-   [**Hyperlink**](module/edittoolbar/toolbar/inserttab/hyperlink/README.md) - library for interacting with hyperlinks.
-   [**Image**](module/edittoolbar/toolbar/inserttab/image/README.md) - library for interacting with Images.
-   [**PageBreakInsert**](module/edittoolbar/toolbar/inserttab/pagebreakinsert/README.md) - library for interacting with PageBreaks.
-   [**Table**](module/edittoolbar/toolbar/inserttab/table/README.md) - library for interacting with Table.
-   [**Shape**](module/edittoolbar/toolbar/inserttab/shape/README.md) - library for interacting with Shape.
-   [**SmartArt**](module/edittoolbar/toolbar/inserttab/smartart/README.md) - library for interacting with SmartArt.
-   [**Chart**](module/edittoolbar/toolbar/inserttab/chart/README.md) - library for interacting with Chart.
-   [**PageHeaderFooter**](module/edittoolbar/toolbar/inserttab/pageheaderfooter/README.md) - library for interacting with Header&Footer.
-   [**TextBoxInsert**](module/edittoolbar/toolbar/inserttab/textboxinsert/README.md) - library for interacting with Text Box.
-   [**DropCap**](module/edittoolbar/toolbar/inserttab/dropcap/README.md) - library for interacting with DropCap.
-   [**BlankPagePdf**](module/edittoolbar/toolbar/inserttab/blankpagepdf/README.md) - library for interacting with Blank Page menu in PDF.

#### [**ViewTab**](module/edittoolbar/toolbar/viewtab/README.md) - a set of libraries for interacting with the View tab.

-   [**PageZoom**](module/edittoolbar/toolbar/viewtab/pagezoom/README.md) - library for interacting with Page Zoom.
-   [**ToolbarHeadings**](module/edittoolbar/toolbar/viewtab/toolbarheadings/README.md)- library for interacting with Headings via toolbar.
-   [**SheetView**](module/edittoolbar/toolbar/viewtab/sheetview/README.md) - library for interacting with Sheet View.
-   [**SlideView**](module/edittoolbar/toolbar/viewtab/slideview/README.md) - library for interacting with Slide View.
-   [**SheetPreview**](module/edittoolbar/toolbar/viewtab/sheetpreview/README.md) - library for interacting with Sheet Preview.
-   [**FreezePanes**](module/edittoolbar/toolbar/viewtab/freezepanes/README.md) - library for interacting with Freeze Panes.
-   [**Guides**](module/edittoolbar/toolbar/viewtab/guides/README.md) - library for interacting with Guides.
-   [**UIVisibility**](module/edittoolbar/toolbar/viewtab/uivisibility/README.md) - library for interacting with UIVisibility.
-   [**InterfaceTheme**](module/edittoolbar/toolbar/viewtab/interfacetheme/README.md) - library for interacting with InterfaceTheme.
-   [**Macros**](module/edittoolbar/toolbar/viewtab/macros/README.md) - library for interacting with Macros.

#### [**CommentTab**](module/edittoolbar/toolbar/commentstab/README.md) - library for interacting with Comment tab.

-   [**ToolbarComment**](module/edittoolbar/toolbar/commentstab/toolbarcomment.js/README.md) - module for interacting with CommentTab

#### [**LayoutTab**](module/edittoolbar/toolbar/layouttab/README.md) - base library for interacting with LayoutTab.

-   [**PageSize**](module/edittoolbar/toolbar/layouttab/pagesize/README.md) - module for interacting with Page Size options.
-   [**Margins**](module/edittoolbar/toolbar/layouttab/margins/README.md) - module for interacting with Margins options
-   [**PageOrientation**](module/edittoolbar/toolbar/layouttab/pageorientation/README.md) - module for interacting with Page Orientation button.
-   [**PageColumns**](module/edittoolbar/toolbar/layouttab/pagecolumns/README.md) - module for interacting with Columns button.
-   [**PageBreakLayout**](module/edittoolbar/toolbar/layouttab/pagebreaklayout/README.md) - module for interacting with Breaks menu.
-   [**LineNumbers**](module/edittoolbar/toolbar/layouttab/linenumbers/README.md) - - module for interacting with LineNumbers options
-   [**Hyphenation**](module/edittoolbar/toolbar/layouttab/hyphenation/README.md) - - module for interacting with Hyphenation options
-   [**Watermark**](module/edittoolbar/toolbar/layouttab/watermark/README.md) - - module for interacting with Watermark options
-   [**IndentsLayout**](module/edittoolbar/toolbar/layouttab/indentslayout/README.md) - module for interacting with indents and spacing on Layout tab
-   [**Wrapping**](module/edittoolbar/toolbar/layouttab/wrapping/README.md) - module for interacting with Wrapping options
-   [**BringForward**](module/edittoolbar/toolbar/layouttab/bringforward/README.md) - module for interacting with BringForward menu
-   [**SendBackward**](module/edittoolbar/toolbar/layouttab/sendbackward/README.md) - module for interacting with SendBackward menu
-   [**AlignLayout**](module/edittoolbar/toolbar/layouttab/alignlayout/README.md) - module for interacting with Align menu on Layout tab
-   [**GroupLayout**](module/edittoolbar/toolbar/layouttab/grouplayout/README.md) - module for interacting with Group menu on Layout tab
-   [**MergeShapes**](module/edittoolbar/toolbar/layouttab/mergeshapes/README.md) - module for interacting with MergeShapes menu on Layout tab
-   [**PageColor**](module/edittoolbar/toolbar/layouttab/pagecolor/README.md) - module for interacting with PageColor menu
-   [**ColorsLayout**](module/edittoolbar/toolbar/layouttab/colorslayout/README.md) - module for interacting with Colors menu

### [**FormTab**](module/edittoolbar/toolbar/formtab/README.md) - parent library for FormTab elements.

-   [**ComboBox**](module/edittoolbar/toolbar/formtab/combobox/README.md) - module for interacting with ComboBox && Combobox options.
-   [**DropDown**](module/edittoolbar/toolbar/formtab/dropdown/README.md) - module for interacting with DropDown && DropDown options.
-   [**Checkbox**](module/edittoolbar/toolbar/formtab/checkbox/README.md) - module for interacting with Checkbox && Checkbox options.
-   [**TextField**](module/edittoolbar/toolbar/formtab/textfield/README.md) - module for interacting with TextField && TextField options.

### [**RightMenu**](module/rightmenu/README.md) - parent library for RightMenu elements.

-   [**ComboBoxSettings**](module/rightmenu/basesettings/formatsettings/subsettings/README.md) - module for interacting with ComboBox Settings (using in [**ComboBox**](module/edittoolbar/toolbar/formtab/combobox/README.md)).
-   [**ParagraphSettings**](module/rightmenu/basesettings/paragraphsettings/README.md) - module for interacting with Paragraph Settings.
-   [**DropdownSettings**](module/rightmenu/basesettings/formatsettings/subsettings/dropdownsettings/README.md) - module for interacting with Dropdown Settings (using in [**DropDown**](module/edittoolbar/toolbar/formtab/dropdown/README.md)).
-   [**CheckboxSettings**](module/rightmenu/basesettings/formatsettings/subsettings/checkboxsettings/README.md) - module for interacting with Checkbox Settings (using in [**Checkbox**](module/edittoolbar/toolbar/formtab/checkbox/README.md)).
-   [**TextFieldSettings**](module/rightmenu/basesettings/formatsettings/subsettings/textfieldsettings/README.md) - module for interacting with TextField Settings (using in [**TextField**](module/edittoolbar/toolbar/formtab/textfield/README.md))
-   [**MailMergeSettings**](module/rightmenu/basesettings/mailmergesettings/README.md) - module for interacting with Mail Merge Settings (using in [**MailMerge**](module/edittoolbar/toolbar/collaborationtab/mailmerge/README.md))
-   [**TableSettings**](module/rightmenu/basesettings/tablesettings/README.md) - module for interacting with Table Settings (using in [**Table**](module/edittoolbar/toolbar/inserttab/table/README.md))
-   [**ChartSettings**](module/rightmenu/basesettings/chartsettings/README.md) - module for interacting with Chart Settings (using in [**Chart**](module/edittoolbar/toolbar/inserttab/chart/README.md))

### [**CollaborationTab**](module/edittoolbar/toolbar/collaborationtab/README.md) - parent library for Collaboration Tab

-   [**ReviewChanges**](module/edittoolbar/toolbar/collaborationtab/reviewchanges/README.md) - module for interacting with Review Changes.
-   [**CoEditing**](module/edittoolbar/toolbar/collaborationtab/coediting/README.md) - module for interacting with Co-Editing.
-   [**AddComment**](module/edittoolbar/toolbar/collaborationtab/addcomment/README.md) - module for interacting with Add Comment button & created comment.
-   [**ResolveComments**](module/edittoolbar/toolbar/collaborationtab/resolvecomments/README.md) - module for interacting with Resolve button.
-   [**DeleteComments**](module/edittoolbar/toolbar/collaborationtab/deletecomments/README.md) - module for interacting with Delete Comments button.
-   [**DisplayMode**](module/edittoolbar/toolbar/collaborationtab/displaymode/README.md) - module for interacting with Display mode button.
-   [**MailMerge**](module/edittoolbar/toolbar/collaborationtab/mailmerge/README.md) - module for interacting with Mail Merge
-   [**CompareChanges**](module/edittoolbar/toolbar/collaborationtab/documentscompare/comparechanges/README.md) - module for interacting with Compare Changes.
-   [**CombineChanges**](module/edittoolbar/toolbar/collaborationtab/documentscompare/combinechanges/README.md) - module for interacting with Combine Changes.
-   [**Chat**](module/edittoolbar/toolbar/collaborationtab/chat/README.md) - module for interacting with collaboration chats
-   [**VersionHistory**](module/edittoolbar/toolbar/collaborationtab/versionhistory/README.md) - module for interacting with Version History button.

### [**ReferencesTab**](module/edittoolbar/toolbar/referencestab/README.md) - parent library for ReferencesTab

-   [**Bookmark**](module/edittoolbar/toolbar/referencestab/README.md) - module for interacting with Bookmark lib.
-   [**Caption**](module/edittoolbar/toolbar/referencestab/caption/README.md) - module for interacting with Caption lib.
-   [**TableOfFigures**](module/edittoolbar/toolbar/referencestab/tableoffigures/README.md) - module for interacting with TableOfFigures lib.
-   [**CrossReference**](module/edittoolbar/toolbar/referencestab/crossreference/README.md) - module for interacting with CrossReference lib.
-   [**Footnote**](module/edittoolbar/toolbar/referencestab/footnote/README.md) - module for interacting with Footnote lib.
-   [**TableOfContents**](module/edittoolbar/toolbar/referencestab/tableofcontents/README.md) - module for interacting with TableOfContents lib.

### ViewToolbar libs

Libraries for working with view editor.

-   [**ViewToolbarComment**](module/viewtoolbar/viewtoolbarcomment/README.md): Library that works with "Comment".
-   [**ViewToolbarFile**](module/viewtoolbar/viewtoolbarfile/README.md): Library that works with "File".
-   [**ViewToolbarHome**](module/viewtoolbar/viewtoolbarhome/README.md): Library that works with "Home".
-   [**ViewToolbarStatic**](module/viewtoolbar/viewtoolbarstatic/README.md): Library that works with static with "hand" and "select".
-   [**ViewToolbarView**](module/viewtoolbar/viewtoolbarview/README.md): Library that works with "View".
-   [**ViewToolbarDocumentMode**](module/viewtoolbar/viewtoolbardocumentmode/README.md): Library for changing the mode of interaction with a document.

### Toolmenu libs

Library for working with the left menu.

-   [**ToolMenuChats**](module/toolmenu/toolmenuchats/README.md): Library for sending chat messages.
-   [**ToolMenuComments**](module/toolmenu/toolmenucomments/README.md): Library for processing created comments.
-   [**ToolMenuHeadings**](module/toolmenu/toolmenuheadings/README.md): Library for working with headers
-   [**ToolMenuSearch**](module/toolmenu/toolmenusearch/README.md): Library for searching and replacing words.
-   [**ToolMenuThumbnails**](module/toolmenu/toolmenuthumbnails/README.md): Library for working with thumbnails.

### Status Bar lib

-   [**StatusBar**](module/statusbar/README.md): Library for interacting with Status Bar.

### Collab libs

Library for simulating collaborative editing.

-   [**Collab**](module/collab/README.md): Library for creating additional users and simulating collaborative development.

### Plugins libs

Library for working with the plugins.

-   [**YoutubePlugin**](module/plugins/youtube/README.md): Library for working with YouTube Plugin.
-   [**HightLightCodePlugin**](module/plugins/hightcode/README.md): Library for working with HightLightCode Plugin.

### Scripts libs

Libraries for connecting and creating scripts

-   [**Verification**](module/common/scripts/README.md) - library for verifying uploaded files.

### Modules for writing libraries

-   [**UI Elements**](module/elements/README.md) - modules for interaction with typical editor elements
