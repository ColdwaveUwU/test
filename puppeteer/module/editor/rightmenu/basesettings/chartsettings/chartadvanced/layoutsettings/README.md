# LayoutSettings

This library implements interaction with chart layout settings in the advanced settings modal window for configuring chart title, data labels, legend, and related options.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setAdvancedSettings(settings)`](#chartsetadvancedsettingssettings)
-   [**Objects**](#objects)
    -   [`LayoutSettingsObject`](#layoutsettingsobject)
    -   [`ChartTitle`](#charttitle)
    -   [`DataLabels`](#datalabels)
    -   [`Legend`](#legend)
-   [**Example**](#example)

## Methods

### Chart.setAdvancedSettings(settings)

```javascript
/**
 * Set the layout settings
 * @param {LayoutSettingsObject} settings - The settings to set
 */
Chart.setAdvancedSettings(settings);
```

## Objects

### LayoutSettingsObject

Main configuration object for chart layout settings.

```javascript
/**
 * @typedef {Object} LayoutSettingsObject
 * @property {ChartTitle} [chartTitle] - Chart title display options
 * @property {DataLabels} [dataLabels] - Data labels display options
 * @property {Legend} [legend] - Legend position and display options
 * @property {boolean} [series] - Series name checkbox (only for data labels Center option)
 * @property {boolean} [category] - Category name checkbox (only for data labels Center option)
 * @property {boolean} [value] - Value checkbox (only for data labels Center option)
 * @property {string} [dataLabelsSeparator] - Data labels separator (only for data labels Center option)
 */
```

### ChartTitle

```javascript
/**
 * @typedef {Object} ChartTitle
 * @property {"None" | "Overlay" | "No Overlay"} [optionValue] - The option value for the chart title display
 */
```

### DataLabels

```javascript
/**
 * @typedef {Object} DataLabels
 * @property {"None" | "Center"} [optionValue] - The option value for the data labels display
 */
```

### Legend

```javascript
/**
 * @typedef {Object} Legend
 * @property {"None" | "Bottom" | "Top" | "Right" | "Left" | "Left Overlay" | "Right Overlay"} [optionValue] - The option value for the legend position
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

// Set advanced chart settings with layout configuration
Chart.setAdvancedSettings({
    layout: {
        chartTitle: "Overlay",
        legend: "Left",
        dataLabels: "Center",
        series: true,
        category: true,
        value: true,
        dataLabelsSeparator: "test",
    },
});

// Close the test example
Tester.close();
```
