# Cell Settings

A minimal library for managing cell properties for tables in the right menu panel. This module allows you to set margins, width, and wrapping for table cells.

## Methods

-   [**Methods**](#methods)

    -   [`CellSettings.applySettings(settings)`](#applysettingstableoption)

### `CellSettings.applySettings(settings)`

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked.
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked.
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons.
 * @property {string | number} [value] - The value to set in the input field.
 */
/**
 * @typedef {Object} CellSizeSettings
 * @property {InputSettings} [preffer]
 * @property {string} [measure]
 */
/**
 * @typedef {Object} CellMarginsSettings
 * @property {InputSettings} [top]
 * @property {InputSettings} [left]
 * @property {InputSettings} [right]
 * @property {InputSettings} [bottom]
 */
/**
 * @typedef {Object} CellOptionsSettings
 * @property {boolean} [wrapText]
 */
/**
 * @typedef {Object} CellSettingsObject
 * @property {CellSizeSettings} [cellSize]
 * @property {CellMarginsSettings} [cellMargins]
 * @property {CellOptionsSettings} [options]
 */
/**
 * Sets the cell settings.
 * @param {CellSettingsObject} settings
 */
CellSettings.applySettings(settings);
```

## Example

```javascript
const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// create table 2x2
Table.insertTable(2, 2);

// Pass the cell table options
Table.setTableAdvancedSettings({
    cell: {
        cellSize: { preffer: { value: 3 }, measure: "Percent" },
        cellMargins: { top: { value: 5 }, bottom: { value: 5 }, left: { value: 5 }, right: { value: 5 } },
        options: { wrapText: true },
    },
});
Tester.close();
```
