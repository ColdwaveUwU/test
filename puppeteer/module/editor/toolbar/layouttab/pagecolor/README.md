# PageColor

This library implements interaction with the PageColor menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`PageColor.setPageColor(pageColor)`](#pagecolorsetpagecolorpagecolor)
-   [**Example**](#example)

## Methods

### PageColor.setPageColor(pageColor)

```javascript
/**
 * Set page color
 * @param {Color} [pageColor]
 */
PageColor.setPageColor(pageColor);
```

## Example

```javascript
// Include the PageColor library
const { PageColor } = require("lib");

// Include the Color library
const { Color } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select page color
PageColor.setPageColor({ type: Color.Type.Standard, index: 5 });

// Close the test example
Tester.close();
```
