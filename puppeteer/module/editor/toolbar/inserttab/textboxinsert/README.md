# TextBoxInsert

Library for interacting with Text Box menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`TextBoxInsert.textBox(optionValue)`](#textboxinserttextboxoptionvalue)
    -   [`TextBoxInsert.drawTextBox(coord)`](#textboxinsertdrawtextboxcoord)
-   [**Example**](#example)

## Methods

### TextBoxInsert.textBox(optionValue)

```javascript
/**
 * Click the default Text Box button or select option from menu.
 * @param {"Insert horizontal text box" | "Insert vertical text box"} [optionValue]
 */
TextBoxInsert.textBox(optionValue);
```

### TextBoxInsert.drawTextBox(coord)

```javascript
/**
 * Draws a text box on the page by coordinates,
 * if coordinates are not specified,
 * the standard size of the text box will be displayed
 * @param {Coordinates} [coord]
 */
TextBoxInsert.drawTextBox(coord);
```

## Example

```javascript
const { TextBoxInsert } = require("lib"); // Import the TextBoxInsert class from the library

// Open the file new.docx
Tester.createFile("docx");

// Click on default Text Box button
TextBoxInsert.textBox();

// Draw a text box on the page
TextBoxInsert.drawTextBox();

// Select "Insert vertical text box" option from the list
TextBoxInsert.textBox("Insert vertical text box");

// Draw a text box on the page
TextBoxInsert.drawTextBox();

// Close the test example
Tester.close();
```
