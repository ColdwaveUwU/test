# ChartSettings

A library for interacting with chart settings in the right menu panel. This module provides methods to control various chart options, such as setting chart type, style, 3D rotation, position, size, text wrapping, and alternative text.

Overview of advance settings modules:

-   [**PositionSettings**](./chartadvanced/positionsettings/README.md)
-   [**SizeSettings**](./chartadvanced/sizesettings/README.md)
-   [**TextWrappingSettings**](./chartadvanced/textwrappingsettings/README.md)
-   [**AlternativeTextSettings**](./chartadvanced/alternativetextsettings/README.md)

## Table of Contents

-   [**Methods**](#methods)
    -   [`ChartSettings.openChartSettings()`](#chartsettingsopenchartsettings)
    -   [`ChartSettings.openAdvancedSettings()`](#chartsettingsopenadvancedsettings)
    -   [`ChartSettings.setWrappingStyle(wrapping)`](#chartsettingssetwrappingstylewrapping)
    -   [`ChartSettings.setChartType(type)`](#chartsettingssetcharttypetype)
    -   [`ChartSettings.setChartStyle(styleNumber)`](#chartsettingssetchartstylestylenumber)
    -   [`ChartSettings.editData()`](#chartsettingseditdata)
    -   [`ChartSettings.set3DRotation(rotation)`](#chartsettingsset3drotationrotation)
    -   [`ChartSettings.setDepth({ depth, increment, decrement })`](#chartsettingssetdepth-depth-increment-decrement-)
    -   [`ChartSettings.setHeight({ height, increment, decrement })`](#chartsettingssetheight-height-increment-decrement-)
    -   [`ChartSettings.setDefaultRotation()`](#chartsettingssetdefaultrotation)
    -   [`ChartSettings.setSizes(settings)`](#chartsettingssetsizessettings)
    -   [`ChartSettings.setTextWrapping(settings)`](#chartsettingssettextwrappingsettings)
    -   [`ChartSettings.setPosition(settings)`](#chartsettingssetpositionsettings)
    -   [`ChartSettings.setAltText(settings)`](#chartsettingssetalttextsettings)

## Methods

### `ChartSettings.openChartSettings()`

```javascript
/**
 * Opens the chart settings panel.
 */
ChartSettings.openChartSettings();
```

### `ChartSettings.openAdvancedSettings()`

```javascript
/**
 * Opens the advanced chart settings panel.
 */
ChartSettings.openAdvancedSettings();
```

### `ChartSettings.setWrappingStyle(wrapping)`

```javascript
/**
 * Sets the text wrapping style for the chart.
 * @param {Object} wrapping - Wrapping style (e.g. "Square", "Tight", ...)
 */
ChartSettings.setWrappingStyle("Square");
```

### `ChartSettings.setChartType(type)`

```javascript
/**
 * Sets the chart type.
 * @param {Object} type
 * @property {string} description - Chart type (e.g. "Column", "Line", "Pie", ...)
 * @property {number} id - Chart type ID (e.g. Column - 1)
 */
ChartSettings.setChartType({ description: "Line", id: 2 });
```

### `ChartSettings.setChartStyle(styleNumber)`

```javascript
/**
 * Sets the chart style by its index.
 * @param {number} styleNumber - Style index
 */
ChartSettings.setChartStyle(1);
```

### `ChartSettings.editData()`

```javascript
/**
 * Opens the chart data editor modal.
 */
ChartSettings.editData();
```

### `ChartSettings.set3DRotation(rotation)`

```javascript
/**
 * Sets the 3D rotation of the chart.
 * @param {Object} Settings
 * @property {{left: number, right: number, input: number}} [x]  - X axis settings
 * @property {{up: number, down: number, input: number}} [y] - Y axix settings
 * @property {{narrow: number, wide: number, input: number}} [perspective] - Perspective settings
 * @property {number} [depth] - Depth of the chart
 * @property {number} [height] - Height of the chart
 */
ChartSettings.set3DRotation({ x: { left: 2, right: 2, input: 10 } });
```

### `ChartSettings.setDefaultRotation()`

```javascript
/**
 * Resets the chart rotation to default values.
 */
ChartSettings.setDefaultRotation();
```

### `ChartSettings.setSizes(settings)`

```javascript
/**
 * Sets the chart sizes (advanced).
 * @param {Object} Sizes
 * @property {{value: number, increment: number, decrement: number}} [width] - width of the chart
 * @property {{value: number, increment: number, decrement: number}} [height] - height of the the chart
 */
ChartSettings.setSizes({ width: { value: 100, increment: 2 }, height: { value: 50, decrement: 3 } });
```

### `ChartSettings.setTextWrapping(settings)`

```javascript
/**
 * Sets the advanced text wrapping style (advanced).
 * @param {Object} settings
 * @property {string} [style] - Wrapping style (e.g "Square", Inline, ...)
 * @property {{top: number, bottom: number, left: number, right: number}} [distance] - Custom values for distance
 */
ChartSettings.setTextWrapping({ style: "Square", distance: { top: 2, button: 3 } });
```

### `ChartSettings.setPosition(settings)`

```javascript
/**
 * Sets the chart position.
 * @param {Object} settings
 * @property {Object} [horizontal] - Horizontal settings (e.g. alignment, position, relative)
 * @property {Object} [vertical] - Vertical settings (e.g. alignment, position, relative)
 * @property {Object} [options] - Additional options (e.g. allowOverlap, moveObjectWithText )
 */
ChartSettings.setPosition({
    horizontal: { alignment: { value: "Center", relativeTo: "Page" } },
    verical: { position: { value: 0, below: "Paragraph" } },
    options: { allowOverlap: false, moveObjectWithText: true },
});
```

### `ChartSettings.setAltText(settings)`

```javascript
/**
 * Sets the alternative text for the chart (advanced).
 * @param {Object} settings - Alt text settings
 * @property {string} [title] - Alternative text title
 * @property {string} [description] - Alternative description
 */
ChartSettings.setAltText({ title: "Title", description: "Detailed chart description" });
```

## Examples

```javascript
// Include the Chart library
const { Chart } = require("lib");

// Create docx file
Tester.createFile("docx");

// Create Column chart
Chart.createChart("Column", 1);

// Add Chart
Chart.addChart();

// Set the wrapping style
Chart.setWrappingStyle("Square");

// Set the chart type
Chart.setChartType({ description: "Column", id: 5 });

// Set the chart style
Chart.setChartStyle(6);

// Set the 3D rotation
Chart.set3DRotation({
    x: { left: 2, right: 4, input: 10, increment: 2, decrement: 4 },
    y: { up: 2, down: 4, input: 10, increment: 2, decrement: 4 },
    perspective: { narrow: 5, wide: 8, input: 3, increment: 2, decrement: 4 },
    depth: { depth: 150, increment: 2, decrement: 4 },
    height: { height: 100, increment: 2, decrement: 4 },
});

// Set the sizes
Chart.setSizes({
    width: { value: 8, increment: 2, decrement: 4 },
    height: { value: 4, increment: 2, decrement: 4 },
});

// Set the text wrapping
Chart.setTextWrapping({ style: "Inline" }); // This style does not accept distance settings

// Set the text wrapping
Chart.setTextWrapping({
    style: "Square",
    distance: {
        top: { value: 10, increment: 2, decrement: 4 },
        bottom: { value: 10, increment: 2, decrement: 4 },
        left: { value: 10, increment: 2, decrement: 4 },
        right: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping
Chart.setTextWrapping({
    style: "Tight",
    distance: {
        left: { value: 10, increment: 2, decrement: 4 },
        right: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping
Chart.setTextWrapping({
    style: "Through",
    distance: {
        left: { value: 10, increment: 2, decrement: 4 },
        right: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping
Chart.setTextWrapping({
    style: "Topbottom",
    distance: {
        top: { value: 10, increment: 2, decrement: 4 },
        bottom: { value: 10, increment: 2, decrement: 4 },
    },
});

// Set the text wrapping
Chart.setTextWrapping({ style: "Infront" }); // This style does not accept distance settings

// Set the text wrapping
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

// Set the position
Chart.setPosition(chartPositionSettings);

// Set the alternative text
Chart.setAltText({ title: "Test title", description: "Test description" });

// Close test example
Tester.close();
```
