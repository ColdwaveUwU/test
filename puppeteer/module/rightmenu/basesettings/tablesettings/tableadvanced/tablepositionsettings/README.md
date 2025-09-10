# Table position settings

A minimal library for managing table position settings for tables in the right menu panel.

## Methods

-   [**Methods**](#methods)

    -   [`TablePositionSettings.applySettings(settings)`](#tablepositionsettingsapplysettingstableoption)

### `TablePositionSettings.applySettings(tableOption)`

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked.
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked.
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons.
 * @property {string | number} [value] - The value to set in the input field.
 */
/**
 * @typedef {Object} HorizontalSettings
 * @property {{type: string | undefined, relative: string | undefined}} alignment
 * @property {{value: InputSettings | undefined, rightOf: string | undefined}} position
 */
/**
 * @typedef {Object} VerticalSettings
 * @property {{type: string | undefined, relative: string | undefined}} alignment
 * @property {{value: InputSettings | undefined, below: string | undefined}} position
 */
/**
 * @typedef {Object} OptionsSettings
 * @property {boolean} [moveObject]
 * @property {boolean} [overlap]
 */
/**
 * @typedef {Object} TablePositionSettingsObject
 * @property {HorizontalSettings} [horizontal]
 * @property {VerticalSettings} [vertical]
 * @property {OptionsSettings} [options]
 */
/**
 * Applies table position settings.
 * @param {TablePositionSettingsObject} settings
 */
TablePositionSettings.applySettings(settings);
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
    textWrapping: {
        wrappingStyle: "parallel",
        distance: { top: { value: 5 }, left: { value: 5 }, bottom: { value: 5 }, right: { value: 5 } },
    },
    tablePosition: {
        horizontal: { alignment: { type: "Center", relative: "Page" } },
        vertical: { position: { value: { value: 5 }, below: "Page" } },
        options: { moveObject: true, overlap: true },
    },
});
Tester.close();
```
