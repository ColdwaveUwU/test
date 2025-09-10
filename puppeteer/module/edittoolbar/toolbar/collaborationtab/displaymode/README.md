# DisplayMode

Library for interacting with Display Mode functionality.

## Table of Contents

-   [**Methods**](#methods)
    -   [`DisplayMode.setMode(optionValue)`](#displaymodesetmodeptionvalue)
-   [**Example**](#example)

## Methods

### DisplayMode.setMode(optionValue)

```javascript
/**
 * Click the default display mode button or click the display mode button with options.
 * @param {"Markup and balloons" | "Only markup" | "Final" | "Original"} [optionValue]
 */
DisplayMode.setMode(optionValue);
```

## Example

```javascript
// Inclune DisplayMode library
const { DisplayMode } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select "Markup and balloons" option from the list
DisplayMode.setMode("Markup and balloons");

// Select "Only markup" option from the list
DisplayMode.setMode("Only markup");

// Select "Final" option from the list
DisplayMode.setMode("Final");

// Select "Original" option from the list
DisplayMode.setMode("Original");

// Close the test example
Tester.close();
```