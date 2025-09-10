# ColorsLayout

This library implements interaction with the Colors menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`ColorsLayout.setColorTheme(colorTheme)`](#colorsLayoutsetColorThemecolorTheme)
-   [**Example**](#example)

## Methods

### ColorsLayout.setColorTheme(colorTheme)

```javascript
/**
 * Select color theme option from dropdown menu
 * @param {string} [colorTheme]
 */
ColorsLayout.setColorTheme(colorTheme);
```

## Example

```javascript
// Include the ColorsLayout library
const { ColorsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select color theme "Red Orange"
ColorsLayout.setColorTheme("Red Orange");

// Close the test example
Tester.close();
```
