# ChartBaseSettings

This library implements interaction with chart base settings in the right menu for configuring chart size, wrapping style, chart type, chart style, rotation, perspective, and other basic chart properties.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setSettings(settings)`](#chartsetsettingssettings)
-   [**Objects**](#objects)
    -   [`BaseSettings`](#basesettings)
    -   [`ChartStyle`](#chartstyle)
    -   [`Sizes`](#sizes)
    -   [`SetChartType`](#setcharttype)
    -   [`SetWrappingStyle`](#setwrappingstyle)
    -   [`InputSettings`](#inputsettings)
-   [**Example**](#example)

## Methods

### Chart.setSettings(settings)

```javascript
/**
 * Set the chart base settings
 * @param {BaseSettings} settings - The settings to set
 */
Chart.setSettings(settings);
```

## Objects

### BaseSettings

Main configuration object for chart base settings.

```javascript
/**
 * @typedef {Object} BaseSettings
 * @property {Sizes} [size] - The sizes to set
 * @property {SetWrappingStyle} [wrappingStyle] - The wrapping style to set
 * @property {SetChartType} [changeChartType] - The chart type to set
 * @property {ChartStyle} [chartStyle] - The chart style to set
 * @property {boolean} [defaultRotation] - The default rotation to set
 * @property {InputSettings} [setXRotation] - The x rotation to set
 * @property {InputSettings} [setYRotation] - The y rotation to set
 * @property {number} [clickXRotationLeft] - The x rotation left to set
 * @property {number} [clickXRotationRight] - The x rotation right to set
 * @property {number} [clickYRotationUp] - The y rotation up to set
 * @property {number} [clickYRotationDown] - The y rotation down to set
 * @property {InputSettings} [setPerspective] - The perspective to set
 * @property {boolean} [rightAngle] - The right angle checkbox to set
 * @property {boolean} [autoScale] - The auto scale checkbox to set
 * @property {InputSettings} [depth] - The depth to set
 * @property {InputSettings} [height] - The height to set
 */
```

### ChartStyle

```javascript
/**
 * @typedef {Object} ChartStyle
 * @property {"Style 1" | "Style 2" | "Style 3" | "Style 4" | "Style 5" | "Style 6" | "Style 7" | "Style 8" | "Style 9" | "Style 10" | "Style 11" | "Style 12" | "Style 13" | "Style 14" | "Style 15" | "Style 16"} [styleName] - Chart style name
 */
```

### Sizes

```javascript
/**
 * @typedef {Object} Sizes
 * @property {InputSettings} [width] - The width to set
 * @property {InputSettings} [height] - The height to set
 */
```

### SetChartType

```javascript
/**
 * @typedef {Object} SetChartType
 * @property {string} [groupName] - Chart group name (e.g., "Column", "Line", "Pie")
 * @property {string} [chartName] - Chart name within the group
 */
```

### SetWrappingStyle

```javascript
/**
 * @typedef {Object} SetWrappingStyle
 * @property {"In line with text" | "Square" | "Tight" | "Through" | "Top and bottom" | "In front of Text" | "Behind text"} [wrapping] - Text wrapping style around the chart
 */
```

### InputSettings

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons
 * @property {string | number} [value] - The value to set in the input field
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

// Set chart base settings
Chart.setSettings({
    wrappingStyle: "Square",
    changeChartType: {
        groupName: "Bar",
        chartName: "3-D Clustered bar",
    },
    size: { width: {value: 30}, height: {value: 30} },
    defaultRotation: true,
    chartStyle: "Style 5",
    setXRotation: { value: 30 },
    setYRotation: { value: 20 },
    clickXRotationLeft: 2,
    clickXRotationRight: 2,
    clickYRotationUp: 2,
    clickYRotationDown: 2,
    rightAngle: false,
    autoScale: false,
    setPerspective: { value: 30 },
    clickPerspectiveNarrow: 2,
    clickPerspectiveWide: 2,
    depth: { value: 30 },
    height: { value: 30 },
});

// Close the test example
Tester.close();
```
