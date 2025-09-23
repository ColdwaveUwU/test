# Alternative Text Settings

A minimal library for managing alternative text for tables in the right menu panel. This module allows you to set the title and description of alternative text for tables.

## Methods

-   [**Methods**](#methods)

    -   [`AlternativeTextSettings.applySettings(tableOption)`](#applysettingstableoption)

-   [**Examples**](#examples)

### `applySettings(tableOption)`

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked.
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked.
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons.
 * @property {string | number} [value] - The value to set in the input field.
 */
/**
 * @typedef {Object} AlternativeTextSettings
 * @property {InputSettings} [title]
 * @property {InputSettings} [description]
 */
/**
 * Applies the alternative text settings.
 * @param {AlternativeTextSettings} settings
 */
AlternativeTextSettings.applySettings(tableOption);
```

## Example

```javascript
const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// insert table 2x2
Table.insertTable(2, 2);
// Pass the alternative text table options
Table.setTableAdvancedSettings({
    alternativeText: {
        title: { value: "Table Title" },
        description: { value: "Table Description" },
    },
});
Tester.close();
```
