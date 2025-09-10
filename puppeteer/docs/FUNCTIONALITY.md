# Tester

The [**Tester**](/puppeteer/README.md) provides functionality for managing and interacting with the editor.

## Functionality

The [**Tester**](/puppeteer/README.md) provides the following methods for interacting with the editor.

## Table of Contents

-   [**Files**](#files)
-   [**Page**](#page)
-   [**Change File Name**](#change-file-name)
-   [**Browser Console**](#browser-console)
-   [**Clipboard**](#clipboard)
-   [**Keyboard**](#keyboard) and [**Keyboard Input**](#keyboard-input)
-   [**Elements**](#elements)
-   [**Event**](#event)
-   [**External Scripts**](#external-scripts)
-   [**Macros**](#macros)
-   [**Editor Events**](#editor-events)

## Files

### openFile

```javascript
/**
 * Function to load a file into the editor.
 * @param {string} fileName
 * @param {string} toFile - selecting the documents or images folder in the /files folder (default "Document")
 * @returns {Promise<void>}
 * @throws {Error}
 */
Tester.openFile(fileName, toFile);
```

### createFile

```javascript
/**
 * Function for creating a new file in the editor.
 * @param {string} buttonName - File type name (Document, Spreadsheet, Presentation or Form template)
 * @returns {Promise<void>}
 * @throws {Error}
 */
Tester.createFile(buttonName);
```

### uploadFile

```javascript
/**
 * Function for uploading a file to the editor
 * @param {string} fileName
 * @param {string} toFile - File type
 * @param {string} selectorFileChooser
 * @throws {Error}
 * @returns {Promise<void>}
 */
Tester.uploadFile(fileName, toFile, selectorFileChooser);
```

## Page

### switchPage

```javascript
/**
 * Switches to a page at the specified index and sets the frame.
 * @param {number} index - Index of the target page.
 * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
 * @throws {Error} If the index is out of bounds.
 */
Tester.switchPage(index, (targetFrameName = "frameEditor"));
```

### switchToMainPage

```javascript
/**
 * Switches to the first created page and sets the frame.
 * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
 */
Tester.switchToMainPage((targetFrameName = "frameEditor"));
```

### getPages

```javascript
/**
 * Retrieves all currently open browser pages.
 * @returns {Page[]} Array of Puppeteer Page instances.
 */
Tester.getPages();
```

### switchToNextPage

```javascript
/**
 * Switches to the next page in the list.
 * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
 * @throws {Error} If there is no next page.
 */
Tester.switchToNextPage((targetFrameName = "frameEditor"));
```

## closePage

```javascript
/**
 * Closes the current page and switches to the previous one if available.
 * If no previous page exists, clears the current page reference.
 * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
 */
Tester.closePage((targetFrameName = "frameEditor"));
```

### switchToPreviousPage

```javascript
/**
 * Switches to the previous page in the list.
 * @param {string} [targetFrameName="frameEditor"] - Name of the target frame.
 * @throws {Error} If there is no previous page.
 */
Tester.switchToPreviousPage((targetFrameName = "frameEditor"));
```

### reloadPage

```javascript
/**
 * Reload target page
 * @param {boolean} [isEditorPage]
 */
Tester.reloadPage((isEditorPage = true));
```

## Change File Name

### changeFileName

```javascript
/**
 * Changes the file name
 * @param {string} [fileName]
 */
Tester.changeFileName(fileName);
```

## Editor Events

### getAscEventListenerForCurrentPage()

```javascript
/**
 * Returns the ASC event listener associated with the current page.
 * @returns {AscEventListener|undefined} The ASC event listener or undefined if not found.
 */
Tester.getAscEventListenerForCurrentPage();
```

### onAscEvent(eventName, callback)

```javascript
/**
 * Registers a callback to be executed every time the ASC event is triggered.
 * @param {string} eventName - The name of the ASC event to listen for.
 * @param {Function} callback - The callback function to execute when the event occurs.
 */
Tester.onAscEvent(eventName, callback);
```

### onceAscEvent(eventName, callback)

```javascript
/**
 * Registers a callback to be executed only once when the ASC-event is triggered.
 * @param {string} eventName - The name of the ASC event to listen for.
 * @param {Function} callback - The callback function to execute when the event occurs.
 */
Tester.onceAscEvent(eventName, callback);
```

### waitForAscEvent(eventName, timeoutMs)

```javascript
/**
 * Waits for the ASC-event to occur within the given timeout.
 * @param {string} eventName - The name of the ASC event to wait for.
 * @param {number} [timeoutMs=this.#pageTimeout] - Timeout in milliseconds (optional).
 * @returns {Promise<any>} A promise that resolves with the event data when the event occurs.
 * @throws {Error} If no listener is found for the current page.
 */
Tester.waitForAscEvent(eventName, timeoutMs);
```

### getAscEventData(eventName)

```javascript
/**
 * Retrieves the last received data for the ASC-event.
 * @param {string} eventName - The name of the ASC event.
 * @returns {any} The data associated with the specified ASC event, or undefined if not available.
 */
Tester.getAscEventData(eventName);
```

### removeAllAscEventListeners(eventName)

```javascript
/**
 * Removes all registered callbacks for the ASC-event.
 * @param {string} eventName - The name of the ASC event.
 */
Tester.removeAllAscEventListeners(eventName);
```

#### Example

```javascript
// Adding a listener to the asc_onInitEditorFonts event
Tester.attachRegisterCallback("asc_onInitEditorFonts", () => {
    console.log("asc_onInitEditorFonts");
});
// create docx file
Tester.createFile("docx");
// getting fonts from the called event
const fonts = Tester.getRegCallbackData("asc_onInitEditorFonts");
// getting information about triggered events
const regcallbacks = Tester.getRegCallbacks();
```

## Browser Console

### attachConsoleLog

```javascript
/**
 * Function to add browser console listening.
 * @param {Object} logOption
 * @param {string} logOption.filter - Type of message in the console ("error", etc.).
 * @param {Function} logOption.handler - A function that will process message data.
 * @return {Promise<void>}
 * @throws {Error}
 */
Tester.attachConsoleLog(logOption);
```

### Example

```javascript
// Creating console log handler
const handlersLog = [
    {
        filter: "[speed]: ",
        handler: function (message) {
            const logFileName = "log.txt";
            const logFilePath = path.join(logDirectory, logFileName);
            fs.appendFile(logFilePath, message + "\n", (err) => {
                if (err) {
                    console.error("Error:", err);
                }
            });
        },
    },
    {
        filter: "[speed]: ",
        handler: function (message) {
            console.log("test", message);
        },
    },
];
for (const handler of handlersLog) {
    // Attach the handler in the tester
    Tester.attachConsoleLog(handler);
}
// main test script
Tester.createFile("docx");
Tester.close();
```

## Clipboard

### clipboardCopyPasteEvent

```javascript
/**
 * Function for pasting messages from the clipboard.
 * @param {string} selector
 * @param {string | undefined} input - if not defined your clipboard will be used
 * @param {string} type - one of MIME type
 * @returns {Promise<void>}
 */
Tester.clipboardCopyPasteEvent(type, input);
```

### Example

```javascript
// paste the text "example" in the "text/html" format from the clipboard
Tester.clipboardCopyPasteEvent("text/html", "example");
```

## Keyboard

### keyUp

```javascript
/**
 * Dispatches a keyup event on the currently active element,
 * optionally ensuring a specific element is focused before dispatch.
 * @param {string} key - The name of the key to release
 * @param {string} [focusElementSelector="#area_id"] - Optional CSS selector of the element to focus before dispatching the event.
 * @param {number} [delay=0] - Optional delay in milliseconds
 */
Tester.keyUp(key, focusElementSelector, delay);
```

### keyDown

```javascript
/**
 * Dispatches a keydown event on the currently active element,
 * optionally ensuring a specific element is focused before dispatch.
 * @param {string} key - The name of the key to release
 * @param {string} [focusElementSelector="#area_id"] - Optional CSS selector of the element to focus before dispatching the event.
 * @param {number} [delay=0] - Optional delay in milliseconds
 */
Tester.keyDown(key, focusElementSelector, delay);
```

### keyPress

```javascript
/**
 * Shortcut for keyDown and keyUp.
 * @param {string} key - The name of the key to release
 * @param {string} [focusElementSelector="#area_id"] - Optional CSS selector of the element to focus before dispatching the event.
 * @param {number} [delay=0] - Optional delay in milliseconds
 */
Tester.keyPress(key, focusElementSelector, delay);
```

## Elements

### focusElement

```javascript
/**
 * Sets focus on the element matching the provided selector and waits until the element becomes active.
 * @param {string} selector - The CSS selector of the element to focus.
 * @throws {Error} If the focus operation fails.
 */
Tester.focusElement(selector);
```

### waitForElementFocus

```javascript
/**
 * Waits until the specified element becomes the active (focused) element within the frame.
 * @param {string} selector - A CSS selector string representing the element to wait for focus on.
 * @throws {Error} If the wait times out or an error occurs while checking for focus.
 */
Tester.waitForElementFocus(selector);
```

## Keyboard Input

### input

```javascript
/**
 * Text input function.
 * @param {string} text - input text
 * @param {boolean} pressEscBefore - keypress Escape button after input
 * @param {number} delay - simulate user delay
 * @returns {Promise<void>}
 * @throws {Error}
 */
Tester.input(text, (isHideHints = false), (delay = 0));
```

### inputToForm

```javascript
/**
 * Entering text into an element using the selector
 * @param {string} inputText
 * @param {string} inputFormSelector
 * @throws {Error}
 * @returns {Promise<void>}
 */
Tester.inputToForm(inputText, inputFormSelector);
```

### lockParagraph

```javascript
/** Interacts with paragraph lock */
Tester.lockParagraph();
```

## Event

### attachEvent

```javascript
/**
 * @callback callback
 */
/**
 * @param {string} event - event name
 * @param {callback} callback
 */
Tester.attachEvent(event, callback);
```

### dispatchEvent

```javascript
/**
 * @param {String} event
 * @param {Object} data
 * @param {*} data.any
 */
Tester.dispatchEvent(event, data);
```

## External Scripts

### runExternal

```javascript
/**
 * @typedef {Object} ProcessOption
 * @property {string} processPath
 * @property {string | undefined} command - file launch commands
 * @property {Array} args
 */
/**
 * Executes external scripts inside the Tester
 * @param {ProcessOption} processOption
 */
Tester.runExternal(processOption);
```

### Example

```javascript
// an object with a script launch setting
const processOption = {
    processPath: "filechecker/filechecker.py", // the path to the script, supports relative and absolute paths
    command: "python", // the launch command
    args: ["out/tests/external/runexternal/download/headings.docx"], // args
};
Tester.runExternal(processOption); // the script runs the file filechecker.py using python
// close test
Tester.close();
```

When launching exe files, you do not need to specify command, since the file is launched directly by specifying the path to it.

## Macros

### addMacros

```javascript
/**
 * @typedef {Object} Macros
 * @property {string} name
 * @property {function(): undefined} value
 */
/**
 * Adds macros to the Tester.
 * @param {Macros|Macros[]} macros - The macros or an array of macros to add.
 * @returns {Promise<void>}
 */
Tester.addMacros(macros);
```

### executeMacros

```javascript
/**
 * Executes a macro with the given name.
 * @param {string} macroName - The name of the macro to execute.
 * @return {Promise<void>}
 */
Tester.executeMacros(macroName);
```

### Example

```javascript
Tester.addMacros([
    {
        name: "Macros 1",
        value: function () {
            var oDocument = Api.GetDocument();
            var oParagraph = Api.CreateParagraph();
            oParagraph.AddText("Hello world!");
            oDocument.InsertContent([oParagraph]);
        },
    },
    {
        value: function () {
            var oDocument = Api.GetDocument();
            var oParagraph = Api.CreateParagraph();
            oParagraph.AddText("12321!");
            oDocument.InsertContent([oParagraph]);
        },
    },
]);
Tester.executeMacros("Macros 1");
Tester.executeMacros("Macros 2");
```
