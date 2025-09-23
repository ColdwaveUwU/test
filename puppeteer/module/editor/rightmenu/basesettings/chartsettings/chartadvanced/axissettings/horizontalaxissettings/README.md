# HorizontalAxisSettings

This library implements interaction with horizontal (X) axis settings in the chart advanced settings modal window.

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
 * Set the horizontal axis settings
 * @param {AxisSettingsObject} settings - The settings to set
 */
Chart.setAdvancedSettings(settings);
```

## Objects

### AxisSettingsObject

Configuration object for horizontal axis settings. See [AxisSettings README](../README.md#axissettingsobject) for complete object definition.

```javascript
/**
 * @typedef {Object} AxisSettingsObject
 * @property {boolean} [hideAxis] - Hide horizontal axis checkbox
 * @property {AxisTitles} [title] - Horizontal axis title settings
 * @property {Gridlines} [gridlines] - Horizontal gridlines settings
 * @property {AxisCrosses} [axisCrosses] - Horizontal axis crosses settings
 * @property {AxisPosition} [axisPosition] - Horizontal axis position settings
 * @property {DisplayUnits} [displayUnits] - Horizontal axis display units settings
 * @property {MinMaxValues} [minimumValue] - Horizontal axis minimum value settings
 * @property {MinMaxValues} [maximumValue] - Horizontal axis maximum value settings
 * @property {TickOptions} [tickOptions] - Horizontal axis tick options settings
 * @property {LabelOptions} [labelOptions] - Horizontal axis label options settings
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

// Set advanced chart settings with horizontal axis configuration
Chart.setAdvancedSettings({
    horizontalAxis: {
        hideAxis: true,
        title: "No Overlay",
        gridlines: "Major and Minor",
        axisCrosses: { type: "Minimum Value", value: { value: 10 } },
        axisPosition: "On Tick Marks",
        displayUnits: { valuesInReverseOrder: true },
        tickOptions: { majorType: "Cross", minorType: "In", interval: { value: 10 } },
        labelOptions: {
            position: "None",
            axisLabelDistance: { value: 10 },
            intervalBetweenType: "Manual",
            intervalBetweenValue: { value: 10 },
        },
    },
});

// Close the test example
Tester.close();
```
