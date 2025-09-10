# TextWrappingSettings

A library for interacting with text wrapping settings in the right menu panel (advanced chart settings). This module provides methods to set the wrapping style and the distance between the text.

## Table of Contents

-   [**Methods**](#methods)
    -   [`TextWrappingSettings.setWrappingStyle(style)`](#textwrappingsettingssetwrappingstylestyle)
    -   [`TextWrappingSettings.setDistance(settings)`](#textwrappingsettingssetdistancesettings)
    -   [`TextWrappingSettings.applySettings(settings)`](#textwrappingsettingssetwrappingstylestyle)

## Methods

### `TextWrappingSettings.setWrappingStyle(style)`

```javascript
/**
 * Sets the wrapping style for the chart object.
 * @param {Object} style
 * @property {"Inline"|"Square"|"Tight"|"Through"|"Topbottom"|"Infront"|"Behind"} style.style - The wrapping style to set.
 */
textWrappingSettings.setWrappingStyle({ style: "Square" });
```

### `TextWrappingSettings.setDistance(settings)`

```javascript
/**
 * Sets the distance between the text.
 * @param {Object} settings
 * @property {{value: number, increment: number, decrement: number}} [settings.top] - Distance from the top.
 * @property {{value: number, increment: number, decrement: number}} [settings.bottom] - Distance from the bottom.
 * @property {{value: number, increment: number, decrement: number}} [settings.left] - Distance from the left.
 * @property {{value: number, increment: number, decrement: number}} [settings.right] - Distance from the right.
 */
textWrappingSettings.setDistance({ top: { value: 10 }, left: { value: 5 } });
```

### `TextWrappingSettings.applySettings(settings)`

```javascript
/**
 * Applies the text wrapping settings
 * @param {Object} settings
 * @property {Object} [settings.style] - Wrapping style settings.
 * @property {Object} [settings.distance] - Distance settings for each side.
 */
textWrappingSettings.applySettings({
    style: { style: "Tight" },
    distance: { top: { value: 8 }, right: { value: 4 } },
});
```
