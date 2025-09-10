# PageOrientation

This library implements interaction with the PageOrientation settings.

## Table of Contents

-   [**Methods**](#methods)
    -   [`PageOrientation.setOrientation(orientation)`](#pageorientationsetorientationorientation)
-   [**Example**](#example)

## Methods

### PageOrientation.setOrientation(orientation)

```javascript
/**
 * Select page orientation option from dropdown menu
 * @param {"Portrait" | "Landscape"} [optionValue]
 */
PageOrientation.setOrientation(orientation);
```

## Example

```javascript
// Include the PageOrientation library
const { PageOrientation } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select page orientation "Landscape"
PageOrientation.setOrientation("Landscape");

// Close the test example
Tester.close();
```
