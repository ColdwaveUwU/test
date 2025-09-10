# Verification

Library for verifying the downloaded `XML` file using `xpath`.

## Table of Contents

-   [**Methods**](#methods)
    -   [Verification.openFile(fileName)](#verificationopenfile)
    -   [Verification.check(pathToFile, xpathExpression, expectedValue)](#verificationcheckpathtofile-xpathexpression-expectedvalue)
    -   [Verification.isSuccess()](#verificationissuccess)
-   [**Example**](#example)

## Methods

## Verification.openFile()

```javascript
/**
 * Opens a file downloaded from the editor or by filepath.
 * @param {string} [filePath] - optional path to the archive file.
 * @throws Will throw an error if the file cannot be opened or read.
 */
Verification.openFile();
```

## Verification.check(pathToFile, xpathExpression, expectedValue)

```javascript
/**
 * Checks if the given XPath expression in the XML document matches the expected value.
 * @param {string} pathToFile - The path to the file being checked.
 * @param {string} xpathExpression - The XPath expression to evaluate.
 * @param {string} expectedValue - The expected value to match against.
 */
Verification.check(pathToFile, xpathExpression, expectedValue);
```

## Verification.isSuccess()

```javascript
/**
 * Determines if all checks have passed successfully.
 * @returns {boolean} True if all checks have passed, false otherwise.
 */
Verification.isSuccess();
```

## Example

```javascript
// Initializing the necessary libraries
const { Font } = require("lib");
const { Verification } = require("lib");
const { FileMenu } = require("lib");
// Performing testing
Tester.createFile("docx");
Font.clickBold();
Tester.keyPress("Enter");
Tester.input("Hello World!");
Tester.keyPress("ArrowLeft");
Tester.keyDown("Shift");
for (let i = 0; i < 5; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");
Font.clickBold();
Tester.keyPress("Enter");
Tester.input("Hello World!");
Tester.keyDown("Shift");
for (let i = 0; i < 5; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");
// Downloading a file in docx format
FileMenu.downloadAs("docx");
// Opening the archive of the downloaded file
Verification.openFile();
// Checking xml values using xpath
Verification.check("word/document.xml", "//w:p[2]/w:r[1]/w:t[1]/text()[1]", "Hello");
Verification.check("word/document.xml", "//w:p[3]/w:r[1]/w:t[1]/text()[1]", "Hello World!");
Verification.check("word/document.xml", "//w:p[3]/w:r[1]/w:rPr[1]/w:bCs[1]/@w:val", "0");
// Getting verification results
// If everything is successful, it returns true, if not, then false
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Closing the browser
Tester.close();
```
