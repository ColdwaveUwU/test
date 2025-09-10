# Text Wrapping Settings

A minimal library for managing text wrapping settings for tables in the right menu panel. This module allows you to set text wrapping, alignment, and indent for tables.

## Methods

-   [**Methods**](#methods)

    -   [`TextWrappingSettings.applySettings(settings)`](#textwrappingsettingsapplysettingssettings)

### `TextWrappingSettings.applySettings(settings)`

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked.
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked.
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons.
 * @property {string | number} [value] - The value to set in the input field.
 */
/**
 * @typedef {Object} AlignmentSettings
 * @property {string} [alignment] - The text alignment (e.g., "left", "center", "right").
 * @property {InputSettings} [indent] - The indentation settings.
 */
/**
 * @typedef {Object} DistanceSettings
 * @property {InputSettings} [top] - The top distance settings.
 * @property {InputSettings} [left] - The left distance settings.
 * @property {InputSettings} [bottom] - The bottom distance settings.
 * @property {InputSettings} [right] - The right distance settings.
 */
/**
 * @typedef {Object} TextWrappingSettingsObject
 * @property {string} [wrappingStyle] - The wrapping style settings.
 * @property {AlignmentSettings} [alignment] - The alignment settings.
 * @property {DistanceSettings} [distance] - The distance settings.
 */
/**
 * Applies text wrapping settings.
 * @param {TextWrappingSettingsObject} settings
 */
TextWrappingSettings.applySettings(settings);
```

## Example

```javascript
const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// create table 2x2
Table.insertTable(2, 2);

// Pass the text wrapping table options
Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
        distance: { top: { value: 5 }, left: { value: 5 }, bottom: { value: 5 }, right: { value: 5 } },
    },
});
Tester.close();
```
