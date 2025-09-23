# CommentTab

This library interacts with the buttons on the EditPDF panel.

## Table of Contents

-   [**Methods**](#methods)
    -   [`EditPdf.clickEditPdf(condition)`](#editpdfclickeditpdfcondition)
    -   [`EditPdf.insertPage(optionValue)](#editpdfinsertpageoptionvalue)
    -   [`EditPdf.rotatePage(optionValue)](#editpdfrotatepageoptionvalue)
    -   [`EditPdf.editText()](#editpdfedittext)
    -   [`EditPdf..deletePage()](#editpdfdeletepage)
-   [**Example**](#example)

## Methods

### EditPdf.clickEditPdf(condition)

```javascript
/**
 * Click edit pdf button
 * @param {boolean} [condition] - Condition to check if the button should be clicked if true - open edit panel,
 if false - close edit panel (Default: true)
 */
EditPdf.clickEditPdf(condition = true);
```

### EditPdf.insertPage(optionValue)

```javascript
/**
 * Click the default insert page button or click the insert page button with options.
 * @param {"Insert blank page before" | "Insert blank page after"} [optionValue]
 */
EditPdf.insertPage(optionValue);
```

### EditPdf.rotatePage(optionValue)

```javascript
/**
 * Click the default rotate page button or click the rotate page button with options.
 * @param {"Rotate right" | "Rotate left"} [optionValue]
 */
EditPdf.rotatePage(optionValue);
```

### EditPdf.editText()

```javascript
/**
 * Click the Edit Text button
 */
EditPdf.editText();
```

### EditPdf.deletePage()

```javascript
/**
 * Click the Delete Page button
 */
EditPdf.deletePage();
```

## Example

```javascript
const { EditPdf } = require("lib"); // Import the EditPdf class from the library

// Open the PDF file for editing
Tester.openFile("pdf/headings.pdf");

// Click the "Edit PDF" button
EditPdf.clickEditPdf();

// Insert a blank page before the current page
// This method will automatically call clickEditPdf() if the edit panel is hidden.
EditPdf.insertPage("Insert blank page before");

// Rotate the page to the right
// This method also ensures the edit panel is open before execution.
EditPdf.rotatePage("Rotate right");

// Delete the current page
// If the edit panel is hidden, it will be opened automatically before performing the action.
EditPdf.deletePage();

// Enable text editing mode
// If the edit panel is closed, it will be opened automatically before executing this action.
EditPdf.editText();

// Close the testing session
Tester.close();
```
