# AlignLayout

This library implements interaction with the Align menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`AlignLayout.setAlign(alignType)`](#alignLayoutsetAlignalignType)
-   [**Example**](#example)

## Methods

### AlignLayout.setAlign(alignType)

```javascript
/**
 * Select align type from dropdown menu
 * @param {"Align left" | "Align center" | "Align right" | "Align top" | "Align middle" | "Align bottom"
 *         | "Distribute horizontally" | "Distribute vertically" | "Align to page" | "Align to margin"
 *         | "Align selected objects"} [alignType]
 */
AlignLayout.setAlign(alignType);
```

## Example

```javascript
// Include the AlignLayout library
const { AlignLayout } = require("lib");

// Include the Shape library
const { Shape } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select basic shape with id 2
Shape.clickBasicShape(2);

// Rendering the selected shape in the editor
Shape.drawShape();

// Select "Align right" option from the list
AlignLayout.setAlign("Align right");

// Close the test example
Tester.close();
```
