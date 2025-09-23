# TextBox

Library for interacting with Text Box menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`TextBox.textBox(optionValue)`](#textboxtextboxoptionvalue)
    -   [`TextBox.drawTextBox(coord)`](#textboxdrawtextboxcoord)
-   [**Example**](#example)

## Methods

### TextBox.textBox(optionValue)

```javascript
/**
 * Click the default Text Box button or select option from menu.
 * @param {"Insert horizontal text box" | "Insert vertical text box"} [optionValue]
 */
TextBox.textBox(optionValue);
```

### TextBox.drawTextBox(coord)

```javascript
/**
 * Draws a text box on the page by coordinates,
 * if coordinates are not specified,
 * the standard size of the text box will be displayed
 * @param {Coordinates} [coord]
 */
TextBox.drawTextBox(coord);
```

## Example

```javascript
const { TextBox } = require("lib"); // Import the TextBox class from the library

// Open the file new.docx
Tester.createFile("docx");

// Click on default Text Box button
TextBox.textBox();

// Draw a text box on the page
TextBox.drawTextBox();

// Select "Insert vertical text box" option from the list
TextBox.textBox("Insert vertical text box");

// Draw a text box on the page
TextBox.drawTextBox();

// Close the test example
Tester.close();
```
