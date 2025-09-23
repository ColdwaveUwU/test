# Chart

This library implements interaction with chart settings including creation, editing, base settings, and advanced configuration.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.createChart(options)`](#chartcreatechartoptions)
    -   [`Chart.openEditor()`](#chartopeneditor)
    -   [`Chart.closeEditor()`](#chartcloseeditor)
    -   [`Chart.setEditorSettings(settings)`](#chartseteditorsettingssettings)
    -   [`Chart.setSettings(settings)`](#chartsetsettingssettings)
    -   [`Chart.setAdvancedSettings(settings)`](#chartsetadvancedsettingssettings)
-   [**Objects**](#objects)
    -   [`ChartType`](#charttype)
    -   [`ChartGroupNames`](#chartgroupnames)
    -   [`ChartNames`](#chartnames)
    -   [`BaseSettings`](#basesettings)
    -   [`AdvancedSettingsOptions`](#advancedsettingsoptions)
    -   [`EditorSettings`](#editorsettings)
    -   [`InputSettings`](#inputsettings)
-   [**Submodules**](#submodules)
-   [**Example**](#example)

## Methods

### Chart.createChart(options)

```javascript
/**
 * Create a chart
 * @param {ChartType} options - The options to create the chart
 */
Chart.createChart(options);
```

### Chart.openEditor()

```javascript
/**
 * Open the chart editor
 */
Chart.openEditor();
```

### Chart.closeEditor()

```javascript
/**
 * Close the chart editor
 */
Chart.closeEditor();
```

### Chart.setEditorSettings(settings)

```javascript
/**
 * Set the editor settings for the chart
 * @param {EditorSettings} settings - The settings to set
 */
Chart.setEditorSettings(settings);
```

### Chart.setSettings(settings)

```javascript
/**
 * Set the base settings for the chart in right menu panel
 * @param {BaseSettings} settings - The settings to set
 */
Chart.setSettings(settings);
```

### Chart.setAdvancedSettings(settings)

```javascript
/**
 * Set the advanced settings for the chart in right menu panel
 * @param {AdvancedSettingsOptions} settings - The settings to set
 */
Chart.setAdvancedSettings(settings);
```

## Objects

### ChartType

Object with parameters for creating a chart.

```javascript
/**
 * @typedef {Object} ChartType
 * @property { ChartGroupNames } [groupName] - The name of the group to create the chart in
 * @property { ChartNames | number } [chartName] - The name of the chart to select or index number (0-based)
 */
```

### ChartGroupNames

```javascript
/**
 * @typedef {Object} ChartGroupNames
 * @property {
 * "Column"
 * | "Line"
 * | "Pie"
 * | "Bar"
 * | "Area"
 * | "Stock"
 * | "XY (Scatter)"
 * | "Radar"
 * | "Combo"} [groupName] - The name of the chart group
 */
```

### ChartNames

```javascript
/**
 * @typedef {Object} ChartNames
 * @property {
 * "Clustered column" | "Stacked column" | "100% Stacked column" | "3-D Clustered column" |
 * "3-D Stacked column" | "3-D 100% Stacked column" | "3-D column" |
 * "Line" | "Stacked line" | "100% Stacked line" | "Line with markers" |
 * "Stacked line with markers" | "100% Stacked line with markers" | "3-D line" |
 *  "Pie" | "Doughnut" | "3-D pie" |
 * "Clustered bar" | "Stacked bar" | "100% Stacked bar" | "3-D Clustered bar" |
 * "3-D Stacked bar" | "3-D 100% Stacked bar" |
 * "Area" | "Stacked area" | "100% Stacked area" | "Stock" |
 * "Scatter" | "Scatter with smooth lines and markers" | "Scatter with smooth lines" |
 * "Scatter with straight lines and markers" | "Scatter with straight lines" |
 * "Radar" | "Radar with markers" | "Filled radar" |
 * "Clustered column - line" | "Clustered column - line on secondary axis" |
 * "Stacked area - clustered column" | "Custom combination"
 * } [chartName] - The name of the chart to select or index number (0-based)
 */
```

### EditorSettings

Object with chart editor settings for editing chart data and formatting. For detailed documentation see [ChartEditor README](../../../../rightmenu/basesettings/chartsettings/charteditor/README.md).

```javascript
/**
 * @typedef {Object} EditorSettings
 * @property {Object} [chartData] - The chart data settings
 * @property {Object} [numberFormat] - The number format settings
 * @property {Object} [functions] - The functions settings
 * @property {number} [clickUndo] - The number of times to click the undo button
 * @property {number} [clickRedo] - The number of times to click the redo button
 */
```

### BaseSettings

Object with basic chart settings in the right panel including size, rotation, and style options. For detailed documentation see [ChartBaseSettings README](../../../../rightmenu/basesettings/chartsettings/chartbasesettings/README.md).

```javascript
/**
 * @typedef {Object} BaseSettings
 * @property {Object} [size] - The sizes to set
 * @property {string} [wrappingStyle] - The wrapping style dropdown
 * @property {Object} [changeChartType] - The chart type to set
 * @property {string} [chartStyle] - The chart style dropdown
 * @property {boolean} [defaultRotation] - The default rotation button
 * @property {InputSettings} [setXRotation] - The x rotation input
 * @property {InputSettings} [setYRotation] - The y rotation input
 * @property {number} [clickXRotationLeft] - The x rotation left button clicks count
 * @property {number} [clickXRotationRight] - The x rotation right button clicks count
 * @property {number} [clickYRotationUp] - The y rotation up button clicks count
 * @property {number} [clickYRotationDown] - The y rotation down button clicks count
 * @property {InputSettings} [setPerspective] - The perspective input
 * @property {number} [clickPerspectiveNarrow] - The perspective narrow button clicks count
 * @property {number} [clickPerspectiveWide] - The perspective wide button clicks count
 * @property {boolean} [rightAngle] - The right angle checkbox
 * @property {boolean} [autoScale] - The auto scale checkbox
 * @property {InputSettings} [depth] - The depth input
 * @property {InputSettings} [height] - The height input
 */
```

### AdvancedSettingsOptions

Object with advanced chart settings including position, wrapping, and axis configuration. For detailed documentation see [ChartAdvanced README](../../../../rightmenu/basesettings/chartsettings/chartadvanced/README.md).

```javascript
/**
 * @typedef {Object} AdvancedSettingsOptions
 * @property {Object} [textWrapping] - Text wrapping settings
 * @property {Object} [position] - Position settings
 * @property {Object} [altText] - Alternative text settings
 * @property {Object} [layout] - Layout settings
 * @property {Object} [verticalAxis] - Vertical axis settings
 * @property {Object} [horizontalAxis] - Horizontal axis settings
 */
```

### InputSettings

Object with settings for input fields with increment/decrement buttons.

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons
 * @property {string | number} [value] - The value to set in the input field
 */
```

## Submodules

-   **[ChartBaseSettings](../../../../rightmenu/basesettings/chartsettings/chartbasesettings/README.md)** - Basic chart settings including size, style, rotation, and wrapping
-   **[ChartAdvanced](../../../../rightmenu/basesettings/chartsettings/chartadvanced/README.md)** - Advanced chart settings including position, text wrapping, layout, and axis configuration
-   **[ChartEditor](../../../../rightmenu/basesettings/chartsettings/charteditor/README.md)** - Chart editor for data editing, number formatting, and functions

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

// Set base chart settings
Chart.setSettings({
    wrappingStyle: "Square",
    changeChartType: {
        groupName: "Bar",
        chartName: "3-D Clustered bar",
    },
    size: { width: { value: 30 }, height: { value: 30 } },
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

// Set editor settings
Chart.setEditorSettings({
    chartData: {
        chartDataRange: "=Sheet1!$A$1:$C$8",
        addSeries: {
            name: "My Series",
            values: "Sheet1!$A$1:$A$7",
        },
        editSeries: {
            seriesName: "My Series",
            newSeriesName: "My Series 2",
            values: "Sheet1!$A$2:$A$5",
        },
        moveSeriesUp: {
            seriesName: "My Series 2",
            clickCount: 2,
        },
        moveSeriesDown: {
            seriesName: "My Series 2",
            clickCount: 2,
        },
        removeSeries: "My Series 2",
        switchRowsColumns: true,
    },
    clickUndo: 1,
    clickRedo: 1,
});

// Close the test example
Tester.close();
```
