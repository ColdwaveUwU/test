# VerticalAxisSettings

This library implements interaction with vertical (Y) axis settings in the chart advanced settings modal window.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setAdvancedSettings(settings)`](#chartsetadvancedsettingssettings)
-   [**Objects**](#objects)
    -   [`AxisSettingsObject`](#axissettingsobject)
-   [**Example**](#example)

## Methods

### Chart.setAdvancedSettings(settings)

```javascript
/**
 * Set the vertical axis settings
 * @param {AxisSettingsObject} settings - The settings to set
 */
Chart.setAdvancedSettings(settings);
```

## Objects

### AxisSettingsObject

Configuration object for vertical axis settings. See [AxisSettings README](../README.md#axissettingsobject) for complete object definition.

```javascript
/**
 * @typedef {Object} AxisSettingsObject
 * @property {boolean} [hideAxis] - Hide vertical axis checkbox
 * @property {AxisTitles} [title] - Vertical axis title settings
 * @property {Gridlines} [gridlines] - Vertical gridlines settings
 * @property {AxisCrosses} [axisCrosses] - Vertical axis crosses settings
 * @property {AxisPosition} [axisPosition] - Vertical axis position settings
 * @property {DisplayUnits} [displayUnits] - Vertical axis display units settings
 * @property {MinMaxValues} [minimumValue] - Vertical axis minimum value settings
 * @property {MinMaxValues} [maximumValue] - Vertical axis maximum value settings
 * @property {TickOptions} [tickOptions] - Vertical axis tick options settings
 * @property {LabelOptions} [labelOptions] - Vertical axis label options settings
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

// Set advanced chart settings with vertical axis configuration
Chart.setAdvancedSettings({
    verticalAxis: {
        hideAxis: true,
        title: "Horizontal",
        gridlines: "Major and Minor",
        axisCrosses: { type: "Minimum Value", value: { value: 10 } },
        displayUnits: {
            valuesInReverseOrder: true,
            logarithmicScale: true,
            base: { value: 10 },
        },
        minimumValue: { type: "Fixed", value: { value: 10 } },
        maximumValue: { type: "Fixed", value: { value: 10 } },
        tickOptions: { majorType: "Cross", minorType: "In" },
        labelOptions: { position: "None" },
    },
});

// Close the test example
Tester.close();
```
