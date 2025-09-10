# BackgroundBorderSettings

A minimal library for managing border and background settings for tables in the right menu panel. This module allows you to set border size, color, background color, and border type for tables.

## Methods

-   [**Methods**](#methods)
    -   [`BackgroundBorderSettings.applySettings(settings)`](#backgroundbordersettingsapplysettingssettings)

### `BackgroundBorderSettings.applySettings(settings)`

```javascript
/**
 * @typedef {BaseColorProp | ThemeColorProp | EyeDropperColorProp
 *          | CustomColorProp | CustomClickColorProp} ColorSettingsObject
 */
/**
 * @typedef {Object} BorderSettings
 * @property {string} [size] - The border size.
 * @property {ColorSettingsObject} [color] - The border color.
 */
/**
 * @typedef {Object} BackgroundBorderSettingsObject
 * @property {BorderSettings} [border] - The border color settings.
 * @property {string} [borderType] - The border type.
 * @property {ColorSettingsObject} [borderColor] - The border color settings.
 * @property {ColorSettingsObject} [tableBackground] - The table background color settings.
 */
/**
 * Applies the background and border settings.
 * @param {BackgroundBorderSettingsObject} settings
 */
BackgroundBorderSettings.applySettings(tableOption);
```

## Example

```javascript
const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// create table 2x2
Table.insertTable(2, 2);

// Pass the borders & backgrounds table options
Table.setTableAdvancedSettings({
    backgroundBorder: {
        border: { size: "3 pt", color: { type: 2, index: 5, subIndex: 3 } },
        borderType: "all",
        borderColor: { type: 2, index: 5, subIndex: 3 },
        tableBackground: { type: 2, index: 5, subIndex: 3 },
    },
});
Tester.close();
```
