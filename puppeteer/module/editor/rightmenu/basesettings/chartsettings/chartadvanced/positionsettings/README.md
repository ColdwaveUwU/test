# PositionSettings

This library implements interaction with chart position settings in the advanced settings modal window for configuring horizontal and vertical positioning, alignment, and positioning options.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setAdvancedSettings(settings)`](#chartsetadvancedsettingssettings)
-   [**Objects**](#objects)
    -   [`PositionSettingsObject`](#positionsettingsobject)
    -   [`HorizontalSettings`](#horizontalsettings)
    -   [`VerticalSettings`](#verticalsettings)
    -   [`OptionsSettings`](#optionssettings)
    -   [`HorizontalAlignmentSettings`](#horizontalaligmentsettings)
    -   [`HorizontalPositionSettings`](#horizontalpositionsettings)
    -   [`HorizontalRelativeSettings`](#horizontalrelativesettings)
    -   [`VerticalAlignmentSettings`](#verticalaligmentsettings)
    -   [`VerticalPositionSettings`](#verticalpositionsettings)
    -   [`VerticalRelativeSettings`](#verticalrelativesettings)
-   [**Example**](#example)

## Methods

### Chart.setAdvancedSettings(settings)

```javascript
/**
 * Sets the settings
 * @param {PositionSettingsObject} settings - The position settings to set
 */
Chart.setAdvancedSettings(settings);
```

## Objects

### PositionSettingsObject

Main configuration object for position settings.

```javascript
/**
 * @typedef {Object} PositionSettingsObject
 * @property {HorizontalSettings} [horizontal] - Settings for horizontal positioning
 * @property {VerticalSettings} [vertical] - Settings for vertical positioning
 * @property {OptionsSettings} [options] - Additional options for positioning
 */
```

### HorizontalSettings

```javascript
/**
 * @typedef {Object} HorizontalSettings
 * @property {HorizontalAlignmentSettings} [alignment] - The alignment for the horizontal position
 * @property {HorizontalPositionSettings} [position] - The position for the horizontal position
 * @property {HorizontalRelativeSettings} [relative] - The relative position for the horizontal position
 */
```

### VerticalSettings

```javascript
/**
 * @typedef {Object} VerticalSettings
 * @property {VerticalAlignmentSettings} [alignment] - The alignment for the vertical position
 * @property {VerticalPositionSettings} [position] - The position for the vertical position
 * @property {VerticalRelativeSettings} [relative] - The relative position for the vertical position
 */
```

### OptionsSettings

```javascript
/**
 * @typedef {Object} OptionsSettings
 * @property {boolean} [moveObjectWithText] - The move object with text checkbox
 * @property {boolean} [allowOverlap] - The allow overlap checkbox
 */
```

### HorizontalAlignmentSettings

```javascript
/**
 * @typedef {Object} HorizontalAlignmentSettings
 * @property {"Left" | "Center" | "Right"} [type] - The alignment for the horizontal position
 * @property {"Character" | "Column" | "Left margin" | "Margin" | "Page" | "Right margin"} [relativeTo] - The relative to for the horizontal position
 */
```

### HorizontalPositionSettings

```javascript
/**
 * @typedef {Object} HorizontalPositionSettings
 * @property {InputSettings} [value] - The value for the horizontal position
 * @property {"Character" | "Column" | "Left margin" | "Margin" | "Page" | "Right margin"} [toTheRightOf] - The to the right of for the horizontal position
 */
```

### HorizontalRelativeSettings

```javascript
/**
 * @typedef {Object} HorizontalRelativeSettings
 * @property {InputSettings} [value] - The value for the horizontal relative position
 * @property {"Left margin" | "Margin" | "Page" | "Right margin"} [relativeTo] - The relative to for the horizontal relative position
 */
```

### VerticalAlignmentSettings

```javascript
/**
 * @typedef {Object} VerticalAlignmentSettings
 * @property {"Top" | "Center" | "Bottom"} [type] - The alignment for the vertical position
 * @property {"Line" | "Margin" | "Bottom margin" | "Paragraph" | "Page" | "Top margin"} [relativeTo] - The relative to for the vertical position
 */
```

### VerticalPositionSettings

```javascript
/**
 * @typedef {Object} VerticalPositionSettings
 * @property {InputSettings} [value] - The value for the vertical position
 * @property {"Line" | "Margin" | "Bottom margin" | "Paragraph" | "Page" | "Top margin"} [below] - The below for the vertical position
 */
```

### VerticalRelativeSettings

```javascript
/**
 * @typedef {Object} VerticalRelativeSettings
 * @property {InputSettings} [value] - The value for the vertical relative position
 * @property {"Margin" | "Bottom margin" | "Page" | "Top margin"} [relativeTo] - The relative to for the vertical relative position
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

// Set advanced chart settings with position configuration
Chart.setAdvancedSettings({
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
});

// Close the test example
Tester.close();
```
