# AlternativeTextSettings

This library implements interaction with alternative text settings in the chart advanced settings modal window.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chart.setAdvancedSettings(settings)`](#chartsetadvancedsettingssettings)
-   [**Objects**](#objects)
    -   [`AlternativeTextSettingsObject`](#alternativetextsettingsobject)
-   [**Example**](#example)

## Methods

### Chart.setAdvancedSettings(settings)

```javascript
/**
 * Set the alternative text settings
 * @param {AlternativeTextSettingsObject} settings - The settings to set
 */
Chart.setAdvancedSettings(settings);
```

## Objects

### AlternativeTextSettingsObject

Object with alternative text configuration settings for chart accessibility.

```javascript
/**
 * @typedef {Object} AlternativeTextSettingsObject
 * @property {string} [title] - The alternative text title for the chart
 * @property {string} [description] - The alternative text description for the chart
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

// Set chart advanced settings with alternative text
Chart.setAdvancedSettings({
    altText: {
        title: "Chart Title",
        description: "Chart Description",
    },
});

// Close the test example
Tester.close();
```
