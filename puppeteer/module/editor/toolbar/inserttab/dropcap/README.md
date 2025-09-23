# DropCap

This library interacts with the Drop Cap in Insert tab.

## Table of Contents

-   [**Methods**](#methods)
    -   [` DropCap.setDropCap(dropCapType)`](#dropcapsetdropcapdropcaptype)
    -   [`DropCap.setDropCapSettings({ dropCap, borders, margins })`](#dropcapsetdropcapsettings-dropcap-borders-margins-)
-   [**Example**](#example)

## Methods

### DropCap.setDropCap(dropCapType)

```javascript
/**
 * Sets the Drop Cap type.
 * @param {"None" | "In text" | "In margin"} dropCapType - The Drop Cap type to select.
 */
DropCap.setDropCap(dropCapType);
```

### DropCap.setDropCapSettings({ dropCap, borders, margins })

```javascript
/**
 * Configures Drop Cap settings including font, borders, and margins.
 * @param {{dropCap: {pos: string | undefined, font: string | undefined, rowHeight: string | number | undefined, distance: string | number | undefined},
 *          borders: {size: number | string | undefined, borderColor: Color | undefined,
 *                    borderLine: "UPPER" | "CENTER" | "DOWN" |
 *                    "OUT" | "LEFT" | "FULL" | "RIGHT"| "NONE" | undefined, backgroundColor: Color | undefined },
 *          margins: {top: number | undefined, left: number | undefined, bottom: number | undefined, right: number | undefined}}} settings - The settings object.
 * @returns {Promise<void>}
 */
DropCap.setDropCapSettings({ dropCap, borders, margins });
```

## Example

```javascript
const { DropCap, TestData } = require("lib");

Tester.createFile("docx"); // Create a new DOCX file

Tester.input(TestData.LOREM_IPSUM()); // Insert test "Lorem Ipsum" text into the document

// Set drop cap position to "In margin"
DropCap.setDropCap("In margin");

// Set drop cap position to "In text"
DropCap.setDropCap("In text");

// Drop cap settings configuration
const dropCap = {
    pos: "In margin", // Drop cap position (in the margin)
    font: "Arial Narrow", // Font style for the drop cap
    rowHeight: 2, // Drop cap height in rows
    distance: 6, // Distance from the main text
};

// Border settings configuration
const borders = {
    size: 4.5, // Border size
    borderColor: { type: 2, index: 3 }, // Border color type and index
    borderLine: "Full", // Border line style (Full)
    backgroundColor: { type: 2, index: 7 }, // Background color type and index
};

// Margin settings configuration
const margins = {
    top: 1, // Top margin
    left: 2, // Left margin
    bottom: 3, // Bottom margin
    right: 4, // Right margin
};

// Combine all settings for drop cap, borders, and margins
const dropCapSettings = { dropCap, borders, margins };

// Apply drop cap settings to the document
DropCap.setDropCapSettings(dropCapSettings);

// Close test
Tester.close();
```
