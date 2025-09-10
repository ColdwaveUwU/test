# Margins

This library implements interaction with the Margins settings.

## Table of Contents

-   [**Object**](#object)
-   [**Methods**](#methods)
    -   [`Margins.setMargin(marginName)`](#marginssetmarginmarginname)
    -   [`Margins.setCustomMargin(customSettings)`](#marginssetcustommargincustomsettings)
-   [**Example**](#example)

## Object

```javascript
/**
 * @typedef {Object} NormalMarginSettings - used if multipage = "Normal"
 * @property {string} top - The value for the top margin (in inches).
 * @property {string} bottom - The value for the bottom margin (in inches).
 * @property {string} left - The value for the left margin (in inches).
 * @property {string} right - The value for the right margin (in inches).
 */

/**
 * @typedef {Object} MirrorMarginsSettings - used if multipage = "Mirror margins"
 * @property {string} top - The value for the top margin (in inches).
 * @property {string} bottom - The value for the bottom margin (in inches).
 * @property {string} left - The value for the left margin (in inches).
 * @property {string} right - The value for the right margin (in inches).
 */

/**
 * @typedef {Object} GutterSettings
 * @property {string} value - The value for the gutter (in inches).
 * @property {string} pos - The position of the gutter (e.g., "Top", "Left").
 */

/**
 * @typedef {Object} CustomSettings
 * @property {MarginSettings} margins - The specific margins settings.
 * @property {GutterSettings} gutterPos - The gutter position settings.
 * @property {string} orientation - The orientation of the page (e.g., "Landscape", "Portrait").
 * @property {string} multiPage - The multi-page layout setting (e.g., "Mirror margins", "Normal").
 */
```

## Methods

### Margins.setMargin(marginName)

```javascript
/**
 * Sets the page margin by selecting the specified margin name from the dropdown menu.
 * @param {"Last Custom" | "Normal" | "Narrow" | "Moderate" | "Wode"} marginName - The name of the margin to select.
 */
Margins.setMargin(marginName);
```

### Margins.setCustomMargin(customSettings)

```javascript
/**
 * Sets custom margins and other page settings.
 * @param {CustomSettings} customSettings - The custom margin settings.
 */
Margins.setCustomMargin(customSettings);
```

## Example

```javascript
const { Margins } = require("lib");
// Create test file
Tester.createFile("docx");
// Set predefined margin
Margins.setMargin("Normal");
// Set custom margins and settings
const customSettings = {
    margins: { top: "2", bottom: "2", left: "2", right: "2" },
    gutterPos: { value: "3", pos: "Top" },
    orientation: "Landscape",
    multiPage: "Mirror margins",
};
Margins.setCustomMargin(customSettings);
Tester.close();
```
