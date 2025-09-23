# ChartAdvanced

This library implements interaction with advanced chart settings modal window for comprehensive chart configuration including text wrapping, positioning, alternative text, layout, and axis settings.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setAdvancedSettings(settings)`](#chartsetadvancedsettingssettings)
-   [**Objects**](#objects)
    -   [`AdvancedSettingsOptions`](#advancedsettingsoptions)
    -   [`TextWrappingSettingsObject`](#textwrappingsettingsobject)
    -   [`PositionSettingsObject`](#positionsettingsobject)
    -   [`AlternativeTextSettingsObject`](#alternativetextsettingsobject)
    -   [`LayoutSettingsObject`](#layoutsettingsobject)
    -   [`AxisSettingsObject`](#axissettingsobject)
-   [**Example**](#example)

## Methods

### Chart.setAdvancedSettings(settings)

```javascript
/**
 * Set the advanced settings
 * @param {AdvancedSettingsOptions} settings - The settings to set
 */
Chart.setAdvancedSettings(settings);
```

## Objects

### AdvancedSettingsOptions

Object with advanced chart settings configuration for comprehensive chart customization.

```javascript
/**
 * @typedef {Object} AdvancedSettingsOptions
 * @property {TextWrappingSettingsObject} [textWrapping] - Text wrapping settings
 * @property {PositionSettingsObject} [position] - Position settings
 * @property {AlternativeTextSettingsObject} [altText] - Alternative text settings
 * @property {LayoutSettingsObject} [layout] - Layout settings
 * @property {AxisSettingsObject} [verticalAxis] - Vertical axis settings
 * @property {AxisSettingsObject} [horizontalAxis] - Horizontal axis settings
 */
```

### TextWrappingSettingsObject

Text wrapping configuration object for chart positioning. For detailed documentation see [TextWrappingSettings README](./textwrappingsettings/README.md).

```javascript
/**
 * @typedef {Object} TextWrappingSettingsObject
 * @property {WrappingStyle} [style] - Wrapping style settings
 * @property {Distance} [distance] - Distance settings
 */
```

### PositionSettingsObject

Position configuration object for chart placement. For detailed documentation see [PositionSettings README](./positionsettings/README.md).

```javascript
/**
 * @typedef {Object} PositionSettingsObject
 * @property {HorizontalSettings} [horizontal] - Settings for horizontal positioning
 * @property {VerticalSettings} [vertical] - Settings for vertical positioning
 * @property {OptionsSettings} [options] - Additional options for positioning
 */
```

### AlternativeTextSettingsObject

Alternative text configuration object for chart alternative text. For detailed documentation see [AlternativeTextSettings README](./alternativetextsettings/README.md).

```javascript
/**
 * @typedef {Object} AlternativeTextSettingsObject
 * @property {string} [title] - The alternative text title for the chart
 * @property {string} [description] - The alternative text description for the chart
 */
```

### LayoutSettingsObject

Layout configuration object for chart layout options. For detailed documentation see [LayoutSettings README](./layoutsettings/README.md).

```javascript
/**
 * @typedef {Object} LayoutSettingsObject
 * @property {ChartTitle} [chartTitle] - Chart title settings
 * @property {DataLabels} [dataLabels] - Data labels settings
 * @property {Legend} [legend] - Legend settings
 * @property {boolean} [series] - Series checkbox setting
 * @property {boolean} [category] - Category checkbox setting
 * @property {boolean} [value] - Value checkbox setting
 * @property {string} [dataLabelsSeparator] - Data labels separator
 */
```

### AxisSettingsObject

Axis configuration object for chart axis customization. For detailed documentation see [AxisSettings README](./axissettings/README.md).

```javascript
/**
 * @typedef {Object} AxisSettingsObject
 * @property {boolean} [hideAxis] - Hide axis checkbox
 * @property {AxisTitles} [title] - Axis title settings
 * @property {Gridlines} [gridlines] - Gridlines settings
 * @property {AxisCrosses} [axisCrosses] - Axis crosses settings
 * @property {AxisPosition} [axisPosition] - Axis position settings
 * @property {DisplayUnits} [displayUnits] - Display units settings
 * @property {MinMaxValues} [minimumValue] - Minimum value settings
 * @property {MinMaxValues} [maximumValue] - Maximum value settings
 * @property {TickOptions} [tickOptions] - Tick options settings
 * @property {LabelOptions} [labelOptions] - Label options settings
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

// Set advanced chart settings
Chart.setAdvancedSettings({
    textWrapping: {
        style: "Square",
        distance: {
            top: { value: 10 },
            bottom: { value: 10 },
            left: { value: 10 },
            right: { value: 10 },
        },
    },
    position: {
        horizontal: {
            alignment: { type: "Center", relativeTo: "Page" },
            position: { value: { value: 10 }, toTheRightOf: "Margin" },
            relative: { value: { value: 10 }, relativeTo: "Left margin" },
        },
        vertical: {
            alignment: { type: "Center", relativeTo: "Margin" },
            relative: { value: { value: 10 }, relativeTo: "Page" },
            position: { value: { value: 10 }, below: "Page" },
        },
        options: {
            allowOverlap: false,
            moveObjectWithText: true,
        },
    },
    altText: {
        title: "Chart Title",
        description: "Chart Description",
    },
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
