# AppTitle

Library for interacting with App Title section.

## Table of Contents

-   [**Methods**](#methods)
    -   [`AppTitle.clickUndoButton()`](#apptitleclickundobutton)
    -   [`AppTitle.clickRedoButton()`](#apptitleclickredobutton)
    -   [`AppTitle.clickSaveButton();`](#apptitleclicksavebutton)
    -   [`AppTitle.clickPrintButton(); - todo`](#apptitleclickprintbutton---todo)
-   [**Example**](#example)

## Methods

### AppTitle.clickUndoButton()

```javascript
/**
 * Click undo button
 */
AppTitle.clickUndoButton();
```

### AppTitle.clickRedoButton()

```javascript
/**
 * Click redo button
 */
AppTitle.clickRedoButton();
```

### AppTitle.clickSaveButton()

```javascript
// /**
//  * Click save button (todo)
//  */
// AppTitle.clickSaveButton();
```

### AppTitle.clickPrintButton() - todo

```javascript
// /**
//  * Click print button - todo
//  */
// AppTitle.clickPrintButton();
```

## Example

```javascript
const { AppTitle } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Input sample text into the document
Tester.input("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");

// Click undo button
AppTitle.clickUndoButton();

// Click redo button
AppTitle.clickRedoButton();

// Click save button
AppTitle.clickSaveButton();

// Close the test
Tester.close();
```
