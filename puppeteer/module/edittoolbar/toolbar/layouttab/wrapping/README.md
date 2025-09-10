# Wrapping

This library implements interaction with the Wrapping menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Wrapping.setWrapping(wrappingType)`](#wrappingsetwrappingwrappingType)
-   [**Example**](#example)

## Methods

### Wrapping.setWrapping(wrappingType)

```javascript
/**
 * Select wrapping from dropdown menu
 * @param {"In line with text" | "Square" | "Tight" | "Through" | "Top and bottom" | "In front of text"
 *        | "Behind text" | "Edit wrap boundary"} [wrappingType]
 */
Wrapping.setWrapping(wrappingType);
```

## Example

```javascript
// Include the Wrapping library
const { Wrapping } = require("lib");

// Include the Shape library
const { Shape } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select basic shape with id 2
Shape.clickBasicShape(2);

// Rendering the selected shape in the editor
Shape.drawShape();

// Select wrapping "Through"
Wrapping.setWrapping("Through");

// Close the test example
Tester.close();
```
