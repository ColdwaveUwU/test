# **Chart Library**

This library enables interaction with chart elements within the **Insert** tab in a document editing tool. It provides methods to create, modify, and retrieve information about various types of charts.

## **Table of Contents**

-   [Methods](#methods)
    -   [Chart.getChartList()](#chartgetchartlist)
    -   [Chart.createChart(description, id)](#chartcreatechartdescription-id)
    -   [Chart.setSettings(tabName, settings)](#chartsetsettingstabname-settings)
    -   [Chart.addSettings()](#chartaddsettings)
    -   [Chart.selectData(selectSettings)](#chartselectdataselectsettings)
    -   [Chart.addSelectData()](#chartaddselectdata)
    -   [Chart.getChartData()](#chartgetchartdata)
    -   Chart Settings:
        -   [Chart.setWrappingStyle(wrapping)](#chartsetwrappingstylewrapping)
        -   [Chart.setChartType(type)](#chartsetcharttypetype)
        -   [Chart.setChartStyle(styleNumber)](#chartsetchartstylestylenumber)
        -   [Chart.set3DRotation(settings)](#chartset3drotationsettings)
        -   [Chart.setSizes(settings)](#chartsetsizessettings)
        -   [Chart.setTextWrapping(settings)](#chartsettextwrappingsettings)
        -   [Chart.setPosition(settings)](#chartsetpositionsettings)
        -   [Chart.setAltText(settings)](#chartsetalttextsettings)
-   [Usage Examples](#usage-examples)
    -   [Retrieving the List of Charts](#retrieving-the-list-of-charts)
    -   [Creating a Chart](#creating-a-chart)
    -   [Setting Layout Options](#setting-layout-options)
    -   [Configuring Vertical Axis Options](#configuring-vertical-axis-options)
    -   [Configuring Horizontal Axis Options](#configuring-horizontal-axis-options)
    -   [Setting Cell Snapping Options](#setting-cell-snapping-options)
    -   [Setting Alternative Text Options](#setting-alternative-text-options)
    -   [Selecting Data for a Chart](#selecting-data-for-a-chart)
    -   [Retrieving Chart Data](#retrieving-chart-data)
    -   [Sets chart settings](#sets-chart-settings)

---

## **Methods**

### **Chart.getChartList()**

Retrieves a list of supported chart types. The returned list is structured as an array of objects, where each object has the following fields:

-   **description** (string) - Description of the chart type (e.g., "Column", "Line", "Pie").
-   **count** (number) - The number of available chart types.
-   **index** (number) - The index of the chart type in the list.
-   **id** (number) - Chart selector index.

#### **Example**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file
Tester.createFile("docx");

// Retrieve the list of charts and log the output
const chartList = Chart.getChartList();
console.log(chartList);
```

---

### **Chart.createChart(description, index)**

Creates a chart based on the specified `description` (string) and `index` (number).

#### **Supported Chart Types**

-   "Column", "Line", "Pie", "Bar", "Area", "Stock", "XY (Scatter)", "Radar", "Combo".

#### **Example**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file
Tester.createFile("docx");

// Create a Column chart with index 1
//index = 0 - 1 chart element
Chart.createChart("Column", 1);
```

---

### **Chart.setSettings(tabName, settings)**

Applies settings to the created chart. Takes two parameters:

-   **tabName** (string) - Specifies the category of settings to configure. Available options include:
    -   "Layout"
    -   "VerticalAxis"
    -   "HorizontalAxis"
    -   "CellSnapping"
    -   "AltText"
-   **settings** (object) - Configuration object for the specified tab. Each tab has its own structure, as detailed below.

### **Chart.addSettings()**

This method is used to confirm any modifications made to the chart settings through the user interface.

#### **Usage**

This method is called after making changes to the chart settings. It interacts with the chart's settings dialog to finalize and apply the changes.

#### **Example**

```javascript
// Modify chart settings and apply the changes
Chart.selectData({ range: "Sheet1!$A$1:$D$7" });
Chart.addSettings(); // Confirms and applies the updated chart settings
```

### **Chart.selectData(selectSettings)**

Selects data for the chart based on the provided configuration. The `selectSettings` object allows you to specify the data range, legend modifications, and category settings.

#### **Parameters**

-   **selectSettings** (object) - Configuration object with the following optional fields:

    -   **range** (string) - The new data range to set for the chart (e.g., `"A1:B10"`). This range defines the cells that the chart will use for its data source.

    -   **legend** (LegendObject) - Configuration object for modifying the chart's legend.

        -   **LegendObject**: An object that specifies how to configure the legend associated with the chart. It includes:
            -   **series** (SeriesConfig) - An object that contains the settings for the series within the legend, with options:
                -   **name** (string) - The name of the series to be displayed in the legend.
                -   **values** (string) - The data range for the series values (e.g., `"Sheet1!$B$2:$B$7"`).
                -   **edit** (boolean, optional) - Flag indicating if the existing series should be edited. If set to `true`, it modifies the properties of the existing series.
                -   **add** (boolean, optional) - Flag indicating if a new series should be added. If set to `true`, it adds a new series to the legend without removing existing ones.
                -   **remove** (boolean, optional) - Flag indicating if the series should be removed from the legend. If set to `true`, it removes the specified series from the legend.
                -   **position** (number, optional) - The new position of the series in the legend (e.g., `1` for first position).
                -   **switchRC** (boolean, optional) - Flag indicating if rows and columns should be switched in the data source for the series.

    -   **category** (CategoryObject) - Configuration object for modifying the chart's categories.
        -   **CategoryObject**: An object that specifies how to configure the categories associated with the chart. It includes:
            -   **name** (string) - The name of the category to modify.
            -   **range** (string, optional) - An optional new range to set for the category (e.g., `"Sheet1!$A$2:$A$6"`). This defines the cells that will be used for the category axis.

### **Chart.addSelectData()**

This method interacts with the user interface to confirm the addition of selected data.

#### **Example**

```javascript
// Select data for the chart and add it
Chart.selectData({ range: "Sheet1!$A$1:$D$7" });
Chart.addSelectData(); // Confirms and adds the selected data to the chart
```

### **Chart.getChartData()**

Retrieves the current series and category data from the chart.

#### **Example**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file and a Column chart
Tester.createFile("docx");
Chart.createChart("Column", 1);

// Define the selection settings
const selectSettings = {
    range: "A1:B10", // Specify the new data range
    legend: {
        series: {
            name: "Sales Data",
            edit: true, // Indicate that the series should be edited
        },
    },
    category: {
        name: "Quarterly Sales",
        range: "C1:C10", // Specify the new range for categories
    },
};

// Select data for the chart
Chart.selectData(selectSettings);
```

### Chart.setWrappingStyle(wrapping)

```javascript
/**
 * Set the wrapping style of the chart
 * @param {"Square" | "In line with text" | "Tight" |
 *          "Through" | "Top and bottom" | "In front of Text"} wrapping
 */
Chart.setWrappingStyle(wrapping);
```

### Chart.setChartType(type)

```javascript
/**
 * Set the chart type
 * @param {{description: "Column" | "Line" | "Pie" | "Bar" | "Area"| "XY (Scatter)" | "Radar" | "Combo",
 *          id: number}} type - Name of the chart type and it's postion in the list
 */
Chart.setChartType(type);
```

### Chart.setChartStyle(styleNumber)

```javascript
/**
 * Set the chart style
 * @param {number} styleNumber - The number of the style to set
 */
Chart.setChartStyle(styleNumber);
```

### Chart.set3DRotation(settings)

```javascript
/**
 * Set the 3D rotation
 * @param {{x: {left: number, right: number, input: number} | undefined,
 *          y: {up: number, down: number, input: number} | undefined,
 *          perspective: {narrow: number, wide: number, input: number} | undefined,
 *          depth: number | undefined,
 *          height: number | undefined} settings
 */
Chart.set3DRotation(settings);
```

### Chart.setSizes(settings)

```javascript
/**
 * Set the sizes
 * @param {{width: {value: number, increment: number, decrement: number} | undefined,
 *          height: {value: number, increment: number, decrement: number} | undefined,
 *          constant: boolean | undefined}} settings - The sizes to set
 */
Chart.setSizes(settings);
```

### Chart.setTextWrapping(settings)

```javascript
/**
 * Set the advanced wrapping
 * @param {{style: string | undefined,
 *          distance: {top: number | undefined, left: number | undefined, right: number | undefined} | undefined}} [settings] - The wrapping settings to set
 */
Chart.setTextWrapping(settings);
```

### Chart.setPosition(settings)

```javascript
/**
 * @typedef {Object} SetPosition
 * @property {HorizontalPosition} [horizontal]
 * @property {VerticalPosition} [vertical]
 * @property {Options} [options]
 */ /**
 * @typedef {Object} HorizontalPosition
 * @property {{value: string, relativeTo: string}} [alignment]
 * @property {{value: number, toTheRightOf: string}} [position]
 * @property {{value: number, relativeTo: string}} [relativePosition]
 */

/**
 * @typedef {Object} VerticalPosition
 * @property {{value: string, relativeTo: string}} [alignment]
 * @property {{value: number, below: string}} [position]
 * @property {{value: number, relativeTo: string}} [relativePosition]
 */

/**
 * Set the position
 * @param {SetPosition} [settings] - The position to set
 */
Chart.setPosition(settings);
```

### Chart.setAltText(settings)

```javascript
/**
 * @param {{title: string | undefined,
 *          description: string | undefined}} [settings]
 */
Chart.setAltText(settings);
```

## **Usage Examples**

### **Retrieving the List of Charts**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file
Tester.createFile("docx");

// Retrieve and log the list of available chart types
const chartList = Chart.getChartList();
console.log(chartList);
```

### **Creating a Chart**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file
Tester.createFile("docx");

// Create a Column chart with ID 1
Chart.createChart("Column", 1);
```

### **Setting Layout Options**

Sets various layout settings for a chart, such as title, legend, and data labels.

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file and a Column chart
Tester.createFile("docx");
Chart.createChart("Column", 1);

// Define layout settings
const layoutSettings = {
    chartTitle: "Overlay", // Title options: "None", "Overlay", "No overlay"
    legend: "Left", // Legend position: "None", "Bottom", "Top", etc.
    dataLabels: {
        // Data labels configuration
        labels: "Inner top", // Position of labels: "None", "Center", "Inner bottom", etc.
        separator: "-", // Separator text
        series: true, // Display series name
        category: true, // Display category name
        value: true, // Display value
    },
};

// Apply layout settings
Chart.setSettings("Layout", layoutSettings);
```

### **Configuring Vertical Axis Options**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file and a Column chart
Tester.createFile("docx");
Chart.createChart("Column", 1);

// Define vertical axis settings
const vAxisSettings = {
    display: {
        hideAxis: true, // Hide or show axis
        title: "Rotated", // Axis title: "None", "Rotated", etc.
        grid: "Minor", // Gridlines: "None", "Major", "Minor", "Major and minor"
        unit: "Thousands", // Units: "None", "Hundreds", "Thousands", etc.
        maxVal: { type: "Fixed", value: 50 }, // Fixed maximum value
        minVal: { type: "Fixed", value: 30 }, // Fixed minimum value
    },
    axis: {
        reverse: true, // Reverse axis order
        logScale: true, // Use logarithmic scale
        base: 5, // Base value for logarithmic scale
        axisCross: { type: "Value", value: 25 }, // Axis cross type and value
    },
    tick: { major: "Cross", minor: "In" }, // Major and minor tick type
    label: { position: "High" }, // Label position
};

// Apply vertical axis settings
Chart.setSettings("VerticalAxis", vAxisSettings);
```

### **Configuring Horizontal Axis Options**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file and a Column chart
Tester.createFile("docx");
Chart.createChart("Column", 1);

// Define horizontal axis settings
const hAxisSettings = {
    display: { hideAxis: true, title: "No overlay", grid: "Major and minor" },
    axis: { axisCrosses: { type: "Minimum value", value: 5 }, axisPosition: "On tick marks", reverse: true },
    tick: { major: "Cross", minor: "In", interval: 5 },
    label: { position: "Low", distance: 5, interval: { type: "Manual", value: 5 } },
};

// Apply horizontal axis settings
Chart.setSettings("HorizontalAxis", hAxisSettings);
```

### **Setting Cell Snapping Options**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file and a Column chart
Tester.createFile("docx");
Chart.createChart("Column", 1);

// Change cell snapping settings
Chart.setSettings("CellSnapping", "Don't move or size with cells");
```

### **Setting Alternative Text Options**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file and a Column chart
Tester.createFile("docx");
Chart.createChart("Column", 1);

// Set alternative text settings
const altTextSettings = { title: "Test Title", description: "Description text" };
Chart.setSettings("AltText", altTextSettings);
```

### **Selecting Data for a Chart**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file and a Column chart
Tester.createFile("docx");
Chart.createChart("Column", 1);

// Select data for the chart
Chart.selectData({ range: "Sheet1!$A$1:$D$7", legend: { series: { name: "Gold", remove: true } } });
Chart.selectData({ legend: { series: { name: "=Sheet1!$B$1", values: "Sheet1!$B$2:$B$7", add: true } } });
Chart.selectData({ legend: { series: { name: "Gold", position: 1 } } });
Chart.selectData({ category: { range: "Sheet1!$A$2:$A$6" } });
```

### **Retrieving Chart Data**

```javascript
// Import the Chart library
const { Chart } = require("lib");

// Create a new .docx file and a Column chart
Tester.createFile("docx");
Chart.createChart("Column", 1);

// Retrieve and log the current chart data
const chartData = Chart.getChartData();
console.log(chartData);
```

### **Sets chart settings**

```javascript
// Import Chart module from the library
const { Chart } = require("lib");

// Create a new docx document
Tester.createFile("docx");

// Get a list of all available chart types
const chartList = Chart.getChartList();
console.log("Available Charts:", chartList); // Log the list of charts to the console

// Create a Column chart with ID 1
Chart.createChart("Column", 1);

// Define layout settings for the chart
const layoutSettings = {
    chartTitle: "Overlay", // Title position: "None", "Overlay", "No overlay"
    legend: "Left", // Legend position: "None", "Bottom", "Top", "Right", "Left"
    dataLabels: {
        labels: "Inner top", // Labels position: "None", "Center", "Inner bottom", "Inner top"
        separator: "test", // Text for labels separator
        series: true, // Show series name
        category: true, // Show category name
        value: true, // Show value of the data point
    },
};
// Set the Layout settings for the chart
Chart.setSettings("Layout", layoutSettings);

// Define settings for the Vertical Axis
const category = { type: "Number", decimal: 5, separator: true, formatIndex: 1 };
const format = { category, linked: false };
const label = { position: "High", format };
const maxVal = { type: "Fixed", value: "50" };
const minVal = { type: "Fixed", value: "30" };
const axisCross = { type: "Value", value: "25" };
const axis = { reverse: true, logScale: true, base: 5, axisCross };
const display = { hideAxis: true, title: "Rotated", grid: "Minor", unit: "Thousands", maxVal, minVal };
const tick = { major: "Cross", minor: "In" };
const vAxisSettings = { display, axis, tick, label };

// Set the Vertical Axis settings
Chart.setSettings("VerticalAxis", vAxisSettings);

// Set the Cell Snapping settings
Chart.setSettings("CellSnapping", "Don't move or size with cells");

// Apply the current settings
Chart.addSettings();

// Define Alternative Text settings
const altTextSettings = { title: "test", description: "test1" };

// Set the Alternative Text settings
Chart.setSettings("AltText", altTextSettings);

// Define settings for the Horizontal Axis
const horizontalAxisSettings = {
    display: { hideAxis: true, title: "No overlay", grid: "Major and minor" }, // Hide axis, title and gridlines
    axis: {
        axisCrosses: { type: "Minimum value", value: 5 }, // Axis crosses at minimum value with a specific position
        axisPosition: "On tick marks", // Position of the axis relative to tick marks
        reverse: true, // Values in reverse order
    },
    tick: {
        major: "Cross", // Major tick type: "None", "Cross", "In", "Out"
        minor: "In", // Minor tick type
        interval: 5, // Interval between marks
    },
    label: {
        position: "Low", // Label position: "None", "Low", "High", "Next to axis"
        distance: 5, // Distance of the labels from the axis
        interval: { type: "Manual", value: 5 }, // Interval between labels
        format, // Reference to previously defined format settings
    },
};

// Set the Horizontal Axis settings
Chart.setSettings("HorizontalAxis", horizontalAxisSettings);

// Apply the Horizontal Axis settings
Chart.addSettings();

Chart.changeType({ description: "Radar", id: 1 }, 2);

// Select data for the chart
Chart.selectData({ range: "Sheet1!$A$1:$D$7", legend: { series: { name: "Gold", remove: true } } });
Chart.selectData({ legend: { series: { name: "=Sheet1!$B$1", values: "Sheet1!$B$2:$B$7", add: true } } });
Chart.selectData({ legend: { series: { name: "Gold", position: 1 } } });
Chart.selectData({ category: { range: "Sheet1!$A$2:$A$6" } });
Chart.addSelectData();
Chart.addChart();

// Set the wrapping style in right menu settings
Chart.setWrappingStyle("Square");

// Set the chart type in right menu settings
Chart.setChartType({ description: "Column", id: 5 });

// Set the chart style in right menu settings
Chart.setChartStyle(6);

// Set the 3D rotation in right menu settings
Chart.set3DRotation({
    x: { left: 2, right: 4, input: 10, increment: 2, decrement: 4 },
    y: { up: 2, down: 4, input: 10, increment: 2, decrement: 4 },
    perspective: { narrow: 5, wide: 8, input: 3, increment: 2, decrement: 4 },
    depth: { depth: 150, increment: 2, decrement: 4 },
    height: { height: 100, increment: 2, decrement: 4 },
});

// Set the sizes in right menu settings
Chart.setSizes({
    width: { value: 2.3, increment: 2, decrement: 4 },
    height: { value: 3.4, increment: 2, decrement: 4 },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({ style: "Inline" }); // This style does not accept distance settings

// Set the text wrapping in right menu settings
Chart.setTextWrapping({
    style: "Square",
    distance: {
        top: { value: 10, increment: 2, decrement: 4 },
        bottom: { value: 10, increment: 2, decrement: 4 },
        left: { value: 10, increment: 2, decrement: 4 },
        right: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({
    style: "Tight",
    distance: {
        left: { value: 10, increment: 2, decrement: 4 },
        right: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({
    style: "Through",
    distance: {
        left: { value: 10, increment: 2, decrement: 4 },
        right: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({
    style: "Topbottom",
    distance: {
        top: { value: 10, increment: 2, decrement: 4 },
        bottom: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping in right menu settings
Chart.setTextWrapping({ style: "Infront" }); // This style does not accept distance settings

// Set the text wrapping in right menu settings
Chart.setTextWrapping({ style: "Behind" }); // This style does not accept distance settings

const chartPositionSettings = {
    horizontal: {
        alignment: {
            align: "Center",
            relativeTo: "Margin",
        },
        position: {
            value: 6,
            toTheRightOf: "Character",
            increment: 2,
            decrement: 4,
        },
        relative: {
            value: 5,
            relativeTo: "Margin",
            increment: 2,
            decrement: 4,
        },
    },
    vertical: {
        alignment: {
            align: "Top",
            relativeTo: "Paragraph",
        },
        position: {
            value: 0,
            below: "Paragraph",
            increment: 2,
            decrement: 4,
        },
        relative: {
            value: 0,
            relativeTo: "Page",
            increment: 2,
            decrement: 4,
        },
    },
    options: {
        allowOverlap: true,
        //moveObjectWithText: false
    },
};

// Set the position in right menu settings
Chart.setPosition(chartPositionSettings);

// Set the alternative text in right menu settings
Chart.setAltText({ title: "Test title", description: "Test description" });

// Close test example
Tester.close();
```
