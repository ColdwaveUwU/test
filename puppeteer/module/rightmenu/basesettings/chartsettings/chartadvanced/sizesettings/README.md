# SizesSettings

A library for interacting with size settings in the right menu panel (advanced chart settings). This module provides methods to set the width, height, and constant proportions for chart objects.

## Table of Contents

-   [**Methods**](#methods)

    -   [`SizesSettings.setSizes(settings)`](#sizessettingssetsizessettings)
    -   [`SizesSettings.applySettings(settings)`](#sizessettingsapplysettingssettings)

## Methods

### `SizesSettings.setSizes(settings)`

```javascript
/**
 * Sets the size properties for the chart object.
 * @param {Object} settings
 * @property {{value: number, increment: number, decrement: number}} [settings.width] - Width settings
 * @property {{value: number, increment: number, decrement: number}} [settings.height] - Height settings.
 * @property {boolean} [settings.constant] - Whether to keep proportions constant.
 */
sizesSettings.setSizes({ width, height, constant });
```

### `SizesSettings.applySettings(settings)`

```javascript
/**
 * Applies the size settings (calls setSizes internally).
 * @param {Object} settings - The size settings to apply.
 */
sizesSettings.applySettings({ width, height, constant });
```

## Examples

```javascript
const SizesSettings = require("./sizesettings");
const sizesSettings = new SizesSettings(tester);

// Set width to 10 inches and height to 5 inches
sizesSettings.setSizes({ width: { value: 10 }, height: { value: 5 } });

// Set width to 8 inches, increment width by 2 steps, and keep proportions constant
sizesSettings.setSizes({ width: { value: 8, increment: 2 }, constant: true });

// Set height to 6 inches, decrement height by 1 step
sizesSettings.setSizes({ height: { value: 6, decrement: 1 } });

// Apply all settings at once (recommended)
sizesSettings.applySettings({
    width: { value: 12 },
    height: { value: 7 },
    constant: true,
});
```
