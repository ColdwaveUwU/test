# NumberFormatEditor

This library implements interaction with number format settings in the chart editor.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setEditorSettings(settings)`](#chartseteditorsettingssettings)
-   [**Objects**](#objects)
    -   [`NumberFormatSettings`](#numberformatsettings)
    -   [`NumberFormatType`](#numberformattype)
-   [**Example**](#example)

## Methods

### Chart.setEditorSettings(settings)

```javascript
/**
 * Sets the number format settings
 * @param {NumberFormatSettings} settings - The number format settings to set
 */
Chart.setEditorSettings(settings);
```

## Objects

### NumberFormatSettings

Object with number format configuration settings for chart data display.

```javascript
/**
 * @typedef {Object} NumberFormatSettings
 * @property {NumberFormatType} [format] - The number format to select
 * @property {import("../../../../../common/numberformat/numberformat").NumberFormatObject} [advancedSettings] - The number format settings to select
 * @property {number} [decreaseDecimal] - The number of times to click the decrease decimal button (default: 1)
 * @property {number} [increaseDecimal] - The number of times to click the increase decimal button (default: 1)
 */
```
### NumberFormatType

Available number format types for chart data display.

```javascript
/**
 * @typedef {Object} NumberFormatType
 * @property {
 * "General"
 * | "Number"
 * | "Scientific"
 * | "Accounting"
 * | "Currency"
 * | "Short Date"
 * | "Long Date"
 * | "Time"
 * | "Percentage"
 * | "Fraction"
 * | "Text"
 * | "More formats"
 * } [format] - The number format to select
 */
```

## Example

```javascript
// Include the Chart library
const { Chart } = require("lib");

// Create a new .docx file
Tester.createFile("docx");

// Create a new Column chart
Chart.createChart({
    groupName: "Column",
    chartName: "Clustered column",
});

// Set editor settings
Chart.setEditorSettings({
    numberFormat: {
        format: "Currency",
        decreaseDecimal: 2,
        increaseDecimal: 1,
    }
});

// Close the test example
Tester.close();
```
