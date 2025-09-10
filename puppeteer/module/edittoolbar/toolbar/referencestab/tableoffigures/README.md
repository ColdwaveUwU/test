# TableOfFigures

This module implements interaction with the Table of figures dialog.

## Table of Contents

-   [**Methods**](#methods)

    -   [`TableOfFigures.setTableOfFiguresSettings(settings)`](#tableoffiguressettableoffiguressettingssettings)
    -   [`TableOfFigures.cancelTableOfFiguresSettings(settings)`](#tableoffigurescanceltableoffiguressettingssettings)

-   [**Example**](#example)

## Methods

### TableOfFigures.setTableOfFiguresSettings(settings)

```javascript
/**
 * @typedef {Object} TableOfFiguresSettings
 * @property {boolean} [showPageNumbers] - Show page numbers
 * @property {boolean} [rightAlignPageNumbers] - Right align page numbers
 * @property {string} [leader] - Leader
 * @property {boolean} [formatAsLinks] - Sets Format table of figures as links checkbox
 * @property {string} [buildTableOfFiguresFromCaption] - Build Table of Figures from caption dropdown value
 * @property {string} [buildTableOfFiguresFromStyle] - Build Table of Figures from style dropdown value
 * @property {string} [styles] - Styles dropdown value
 * @property {boolean} [includeLabelAndNumber] - Include label and number checkbox
 */

/**
 * Sets multiple settings in the Table of Figures dialog
 * @param {TableOfFiguresSettings} settings - Table of Figures settings
 */
TableOfFigures.setTableOfFiguresSettings(settings);
```

### TableOfFigures.cancelTableOfFiguresSettings(settings)

```javascript
/**
 * @typedef {Object} TableOfFiguresSettings
 * @property {boolean} [showPageNumbers] - Show page numbers
 * @property {boolean} [rightAlignPageNumbers] - Right align page numbers
 * @property {string} [leader] - Leader
 * @property {boolean} [formatAsLinks] - Sets Format table of figures as links checkbox
 * @property {string} [buildTableOfFiguresFromCaption] - Build Table of Figures from caption dropdown value
 * @property {string} [buildTableOfFiguresFromStyle] - Build Table of Figures from style dropdown value
 * @property {string} [styles] - Styles dropdown value
 * @property {boolean} [includeLabelAndNumber] - Include label and number checkbox
 */

/**
 * Sets multiple settings in the Table of Figures dialog
 * @param {TableOfFiguresSettings} settings - Table of Figures settings
 */
TableOfFigures.cancelTableOfFiguresSettings(settings);
```

## Example

```javascript
const { TableOfFigures } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Set all settings at once using setTableOfFiguresSettings
TableOfFigures.setTableOfFiguresSettings({
    showPageNumbers: true,
    rightAlignPageNumbers: true,
    leader: "None",
    formatAsLinks: true,
    buildTableOfFiguresFromStyle: "Normal",
    buildTableOfFiguresFromCaption: "Figure",
    styles: "Classic",
    includeLabelAndNumber: true,
});

// Close the test file
Tester.close();
```
