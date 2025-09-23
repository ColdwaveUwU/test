# TextWrappingSettings

This library implements interaction with text wrapping settings in the chart advanced settings modal window for configuring how text wraps around the chart object.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setAdvancedSettings(settings)`](#chartsetadvancedsettingssettings)
-   [**Objects**](#objects)
    -   [`TextWrappingSettingsObject`](#textwrappingsettingsobject)
    -   [`WrappingStyle`](#wrappingstyle)
    -   [`Distance`](#distance)
    -   [`InputSettings`](#inputsettings)
-   [**Example**](#example)

## Methods

### Chart.setAdvancedSettings(settings)

```javascript
/**
 * Set the text wrapping settings
 * @param {TextWrappingSettingsObject} settings - The settings to set
 */
Chart.setAdvancedSettings(settings);
```

## Objects

### TextWrappingSettingsObject

Main configuration object for text wrapping settings.

```javascript
/**
 * @typedef {Object} TextWrappingSettingsObject
 * @property {WrappingStyle} [style] - Wrapping style configuration
 * @property {Distance} [distance] - Distance settings from chart edges
 */
```

### WrappingStyle

```javascript
/**
 * @typedef {Object} WrappingStyle
 * @property {"Inline" | "Square" | "Tight" | "Through" | "Topbottom" | "Infront" | "Behind"} [style] - Text wrapping style around the chart
 */
```

**Wrapping Style Options:**

-   **Inline** - Chart is placed in line with text
-   **Square** - Text wraps around the chart in a square pattern
-   **Tight** - Text wraps tightly around the chart boundaries
-   **Through** - Text flows through transparent areas of the chart
-   **Topbottom** - Text appears only above and below the chart
-   **Infront** - Chart appears in front of text
-   **Behind** - Chart appears behind text

### Distance

```javascript
/**
 * @typedef {Object} Distance
 * @property {InputSettings} [top] - Top distance from chart edge
 * @property {InputSettings} [bottom] - Bottom distance from chart edge
 * @property {InputSettings} [left] - Left distance from chart edge
 * @property {InputSettings} [right] - Right distance from chart edge
 */
```

### InputSettings

```javascript
/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked.
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked.
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons.
 * @property {string | number} [value] - The value to set in the input field.
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

// Set advanced chart settings with text wrapping configuration
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
});

// Close the test example
Tester.close();
```
