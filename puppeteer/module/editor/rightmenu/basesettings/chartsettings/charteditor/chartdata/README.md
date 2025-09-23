# ChartData

This library implements interaction with the Chart Data editor settings.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setEditorSettings(settings)`](#chartdatasetchartdatasettings)
-   [**Objects**](#objects)
    -   [`ChartDataSettings`](#chartdatasettings)
    -   [`EditSeriesConfig`](#editseriesconfig)
    -   [`MoveSeriesConfig`](#moveseriesconfig)
    -   [`AxisLabelsConfig`](#axislabelsconfig)
-   [**Example**](#example)

## Methods

### Chart.setEditorSettings(settings)

```javascript
/**
 * Sets the chart data
 * @param {ChartDataSettings} settings - The settings to set
 */
Chart.setEditorSettings(settings);
```

## Objects

### ChartDataSettings

Chart data configuration object for comprehensive chart data management.

```javascript
/**
 * @typedef {Object} ChartDataSettings
 * @property {string} chartDataRange - The chart data range
 * @property {string} selectSeries - The series to select
 * @property {EditSeriesConfig} addSeries - The series to add
 * @property {EditSeriesConfig} editSeries - The series to edit
 * @property {string} removeSeries - The series to remove
 * @property {MoveSeriesConfig} moveSeriesUp - The series to move up
 * @property {MoveSeriesConfig} moveSeriesDown - The series to move down
 * @property {AxisLabelsConfig} editCategory - The axis labels to edit
 * @property {string} selectCategory - The category to select
 * @property {boolean} switchRowsColumns - The switch rows and columns
 */
```

### EditSeriesConfig

Configuration object for adding or editing chart series.

```javascript
/**
 * @typedef {Object} EditSeriesConfig
 * @property {string} seriesName - The name of the series to edit
 * @property {string} newSeriesName - The new name of the series
 * @property {string} name - The name of the series (for adding new series)
 * @property {string} values - The values of the series
 * @property {string} nameSelectData - The selection data for series name range
 * @property {string} valuesSelectData - The selection data for series values range
 */
```

### MoveSeriesConfig

Configuration object for moving chart series position.

```javascript
/**
 * @typedef {Object} MoveSeriesConfig
 * @property {string} seriesName - The name of the series to move
 * @property {number} clickCount - The number of times to click the up button
 */
```

### AxisLabelsConfig

Configuration object for editing axis labels.

```javascript
/**
 * @typedef {Object} AxisLabelsConfig
 * @property {string} axisLabelsName - The name of the axis labels to edit
 * @property {string} labelRange - The axis label range
 * @property {string} selectData - The selection data for the axis label range
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
    }
});

// Close the test example
Tester.close();
```
