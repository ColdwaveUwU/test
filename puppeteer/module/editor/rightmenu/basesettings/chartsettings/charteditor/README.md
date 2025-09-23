# ChartEditor

This library implements interaction with chart editor modal window for editing chart data, formatting and functions.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setEditorSettings(settings)`](#chartseteditorsettingssettings)
    -   [`Chart.openEditor()`](#chartopeneditor)
    -   [`Chart.closeEditor()`](#chartcloseeditor)
-   [**Objects**](#objects)
    -   [`EditorSettings`](#editorsettings)
    -   [`ChartDataSettings`](#chartdatasettings)
    -   [`NumberFormatSettings`](#numberformatsettings)
    -   [`FunctionsSettings`](#functionssettings)
-   [**Example**](#example)

## Methods

### Chart.openEditor()

```javascript
/**
 * Opens editing chart settings
 */
Chart.openEditor();
```

### Chart.closeEditor()

```javascript
/**
 * Closes the chart editor modal window
 */
Chart.closeEditor();
```

### Chart.setEditorSettings(settings)

```javascript
/**
 * Sets the editor settings
 * @param {EditorSettings} settings - The settings to set
 */
Chart.setEditorSettings(settings);
```

## Objects

### EditorSettings

Object with chart editor settings for editing chart data, number formatting, and functions.

```javascript
/**
 * @typedef {Object} EditorSettings
 * @property {ChartDataSettings} [chartData] - The chart data settings
 * @property {NumberFormatSettings} [numberFormat] - The number format settings
 * @property {FunctionsSettings} [functions] - The functions settings
 * @property {number} [clickUndo] - The number of times to click the undo button
 * @property {number} [clickRedo] - The number of times to click the redo button
 */
```

### ChartDataSettings

Chart data configuration object for comprehensive chart data management. For detailed documentation see [ChartData README](./chartdata/README.md).

```javascript
/**
 * @typedef {Object} ChartDataSettings
 * @property {string} [chartDataRange] - The chart data range
 * @property {string} [selectSeries] - The series to select
 * @property {EditSeriesConfig} [addSeries] - The series to add
 * @property {EditSeriesConfig} [editSeries] - The series to edit
 * @property {string} [removeSeries] - The series to remove
 * @property {MoveSeriesConfig} [moveSeriesUp] - The series to move up
 * @property {MoveSeriesConfig} [moveSeriesDown] - The series to move down
 * @property {AxisLabelsConfig} [editCategory] - The axis labels to edit
 * @property {string} [selectCategory] - The category to select
 * @property {boolean} [switchRowsColumns] - Switch rows and columns
 */
```


### NumberFormatSettings

Object with number format settings for chart data display. For detailed documentation see [NumberFormatSettings README](./numberformateditor/README.md).

```javascript
/**
 * @typedef {Object} NumberFormatSettings
 * @property {"General" | "Number" | "Scientific" | "Accounting" | "Currency" | "Short Date" | "Long Date" | "Time" | "Percentage" | "Fraction" | "Text" | "More formats"} [format] - The number format dropdown
 * @property {Object} [advancedSettings] - Advanced number format settings
 * @property {number} [decreaseDecimal] - Number of times to click decrease decimal button
 * @property {number} [increaseDecimal] - Number of times to click increase decimal button
 */
```

### FunctionsSettings

Object with spreadsheet functions settings for chart editor calculations. For detailed documentation see [FunctionsSettings README](../../../../edittoolbar/toolbar/hometab/functions/README.md).

```javascript
/**
 * @typedef {Object} FunctionsSettings
 * @property {Function} function - The function to set.
 * @property {InsertFunctionSettings} insertFunction - The insert function to set.
 * @property {Array<string>} functionArguments - The function arguments to set.
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
    },
    clickUndo: 1,
    clickRedo: 1,
});

// Close the test example
Tester.close();
```
