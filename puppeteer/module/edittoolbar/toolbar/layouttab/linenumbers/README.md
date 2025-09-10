# Line Numbers

This library implements interaction with the Line Numbers settings.

## Table of Contents

-   [**Object**](#object)
-   [**Methods**](#methods)
    -   [`LineNumbers.selectLineNumberDropdownOption(optionName)`](#linenumbersselectlinenumberdropdownoptionoptionname)
    -   [`LineNumbers.setCustomLineNumbersSettings(customSettings)`](#linenumberssetcustomlinenumberssettingscustomsettings)
    -   [`LineNumbers.applyModalSettings()`](#linenumbersapplymodalsettings)
-   [**Example**](#example)

## Object

```javascript
/**
 * @typedef {Object} CustomValueSettings
 * @property {number} value - The base value
 * @property {number} [increment] - Value to increase by
 * @property {number} [decrement] - Value to decrease by
 */

/**
 * @typedef {Object} NumberingSettings
 * @property {boolean} [RestartPage] - Restart numbering on each page
 * @property {boolean} [RestartSection] - Restart numbering in each section
 * @property {boolean} [Continuous] - Use continuous numbering
 */

/**
 * @typedef {Object} CustomSettings
 * @property {boolean} EnableNumbering - Enable/disable line numbering
 * @property {Object} [CustomValues] - Numeric value controls (only valid when EnableNumbering is true)
 * @property {CustomValueSettings} CustomValues.StartAt - Starting number settings
 * @property {CustomValueSettings} CustomValues.FormText - Form text settings
 * @property {CustomValueSettings} CustomValues.Count - Counter settings
 * @property {NumberingSettings} [Numbering] - Numbering behavior settings (only valid when EnableNumbering is true)
 * @property {"Whole" | "Point" | "Current"} ApplyTo - Application scope
 */
```

## Methods

### LineNumbers.selectLineNumberDropdownOption(optionName)

```javascript
/**
 * Sets the page line numbers by selecting the specified option name from the dropdown menu.
 * @param {"None" | "Continuous" | "Restart Page" | "Restart Section" | "Suppress" | "Custom Options"} optionName - The name of the line number option to select
 */
LineNumbers.selectLineNumberDropdownOption(optionName);
```

### LineNumbers.setCustomLineNumbersSettings(customSettings)

```javascript
/**
 * Sets custom line numbering settings.
 * @param {CustomSettings} customSettings - The custom line numbering settings
 * @throws {Error} When CustomValues or Numbering are provided while EnableNumbering is false
 */
LineNumbers.setCustomLineNumbersSettings(customSettings);
```

### LineNumbers.applyModalSettings()

```javascript
/**
 * Applies modal window settings when the OK
 * button is clicked (automatically used in library methods)
 */
LineNumbers.applyModalSettings();
```

## Example

```javascript
const { LineNumbers } = require("lib");
// Create test file
Tester.createFile("pdf");

// Set predefined line numbering
LineNumbers.selectLineNumberDropdownOption("Continuous");
LineNumbers.selectLineNumberDropdownOption("Restart Page");
LineNumbers.selectLineNumberDropdownOption("Restart Section");
LineNumbers.selectLineNumberDropdownOption("Suppress");
LineNumbers.selectLineNumberDropdownOption("None");
LineNumbers.selectLineNumberDropdownOption("Custom Options");

// Set custom line numbering settings with numbering enabled
const customSettings = {
    EnableNumbering: true,
    CustomValues: {
        StartAt: { value: 10, increment: 4, decrement: 3 },
        FormText: { value: 0.4, increment: 4, decrement: 3 },
        Count: { value: 10, increment: 4, decrement: 3 },
    },
    Numbering: {
        RestartPage: true,
        RestartSection: true,
        Continuous: true,
    },
    ApplyTo: "Point",
};
LineNumbers.setCustomLineNumbersSettings(customSettings);

LineNumbers.selectLineNumberDropdownOption("Custom Options");
// Set custom line numbering settings with numbering disabled
const disabledSettings = {
    EnableNumbering: false,
    ApplyTo: "Whole",
    // CustomValues and Numbering cannot be used when EnableNumbering is false
};
LineNumbers.setCustomLineNumbersSettings(disabledSettings);

Tester.close();
```
