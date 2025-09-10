# TextBoxHome

Library for interacting with Text Box menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`TextBoxHome.textBox(optionValue)`](#textboxhometextboxoptionvalue)
    -   [`TextBoxHome.drawTextBox(coord)`](#textboxhomedrawtextboxcoord)
-   [**Example**](#example)

## Methods

### TextBoxHome.textBox(optionValue)

```javascript
/**
 * Click the default Text Box button or select option from menu.
 * @param {"Insert horizontal text box" | "Insert vertical text box"} [optionValue]
 */
TextBoxHome.textBox(optionValue);
```

### TextBoxHome.drawTextBox(coord)

```javascript
/**
 * Draws a text box on the page by coordinates,
 * if coordinates are not specified,
 * the standard size of the text box will be displayed
 * @param {Coordinates} [coord]
 */
TextBoxHome.drawTextBox(coord);
```

## Example

```javascript
const { TextBoxHome } = require("lib"); // Import the TextBoxHome class from the library

// Open the file new.pptx
Tester.createFile("pptx");

// Click on default Text Box button
TextBoxHome.textBox();

// Draw a text box on the page
TextBoxHome.drawTextBox();

// Select "Insert vertical text box" option from the list
TextBoxHome.textBox("Insert vertical text box");

// Draw a text box on the page
TextBoxHome.drawTextBox();

// Close the test example
Tester.close();
```
