# Table Settings

A minimal library for managing table properties in the right menu panel. This module allows you to set margins, width, and spacing for tables.

## Methods

-   [**Methods**](#methods)

    -   [`TableSettings.applySettings(tableOption)`](#tablesettingsapplysettingstableoption)

### TableSettings.applySettings(tableOption)

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked.
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked.
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons.
 * @property {string | number} [value] - The value to set in the input field.
 */
/**
 * @typedef {Object} TableSizeSettings
 * @property {InputSettings} [width] - The width settings.
 * @property {string} [measure] - The measure settings.
 * @property {boolean} [autoResize] - Whether to enable auto-resize.
 */
/**
 * @typedef {Object} CellMarginsSettings
 * @property {InputSettings} [top] - The top margin settings.
 * @property {InputSettings} [left] - The left margin settings.
 * @property {InputSettings} [right] - The right margin settings.
 * @property {InputSettings} [bottom] - The bottom margin settings.
 */
/**
 * @typedef {Object} TableOptionsSettings
 * @property {InputSettings} [inputSpacing] - The input spacing settings.
 */
/**
 * @typedef {Object} TableSettingsObject
 * @property {TableSizeSettings} [tableSize] - The table size settings.
 * @property {CellMarginsSettings} [cellMargins] - The cell margins settings.
 * @property {TableOptionsSettings} [options] - The table options settings.
 */
/**
 * Applies table settings.
 * @param {TableSettingsObject} settings
 */
TableSettings.applySettings(settings);
```

## Example

```javascript
const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// create table 2x2
Table.insertTable(2, 2);

// Pass the table options
Table.setTableAdvancedSettings({
    table: {
        tableSize: { width: { value: 3 }, measure: "Percent", autoResize: false },
        cellMargins: { top: { value: 5 }, bottom: { value: 5 }, left: { value: 5 }, right: { value: 5 } },
        options: { inputSpacing: { value: 5 } },
    },
});
Tester.close();
```
