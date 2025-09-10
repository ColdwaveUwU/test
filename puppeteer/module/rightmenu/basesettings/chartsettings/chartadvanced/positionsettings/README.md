# PositionSettings

A library for interacting with position settings in the right menu panel (advanced chart settings). This module provides methods to control horizontal and vertical alignment, relative positioning, and additional options for chart objects.

## Table of Contents

-   [**Methods**](#methods)
    -   [`PositionSettings.setHorizontalAlignment(settings)`](#positionsettingssethorizontalalignmentsettings)
    -   [`PositionSettings.setHorizontalPosition(settings)`](#positionsettingssethorizontalpositionsettings)
    -   [`PositionSettings.setHorizontalRelative(settings)`](#positionsettingssethorizontalrelativesettings)
    -   [`PositionSettings.setVerticalAlignment(settings)`](#positionsettingssetverticalalignmentsettings)
    -   [`PositionSettings.setVerticalPosition(settings)`](#positionsettingssetverticalpositionsettings)
    -   [`PositionSettings.setVerticalRelative(settings)`](#positionsettingssetverticalrelativesettings)
    -   [`PositionSettings.setOptions(settings)`](#positionsettingssetoptionssettings)
    -   [`PositionSettings.applySettings(positionSettings)`](#positionsettingsapplysettingspositionsettings)

## Methods

### `PositionSettings.setHorizontalAlignment(settings)`

```javascript
/**
 * Sets the alignment for the horizontal position.
 * @param {Object} settings
 * @property {"Left"|"Center"|"Right"} [settings.align] - The alignment for the horizontal position.
 * @property  {"Character"|"Column"|"Left margin"|"Margin"|"Page"|"Right margin"} [settings.relativeTo] - What the alignment is relative to.
 */
positionSettings.setHorizontalAlignment({ align, relativeTo });
```

### `PositionSettings.setHorizontalPosition(settings)`

```javascript
/**
 * Sets the horizontal position.
 * @param {Object} settings
 * @property {number} settings.value - The value for the horizontal position.
 * @property {"Character"|"Column"|"Left margin"|"Margin"|"Page"|"Right margin"} settings.toTheRightOf - What the position is to the right of.
 * @property {number} [settings.increment] - Number of steps to increment the value.
 * @property {number} [settings.decrement] - Number of steps to decrement the value.
 */
positionSettings.setHorizontalPosition({ value, toTheRightOf, increment, decrement });
```

### `PositionSettings.setHorizontalRelative(settings)`

```javascript
/**
 * Sets the relative horizontal position.
 * @param {Object} settings
 * @property {number} settings.value - The value for the relative position.
 * @property {"Left margin"|"Margin"|"Page"|"Right margin"} settings.relativeTo - What the position is relative to.
 * @property {number} [settings.increment] - Number of steps to increment the value.
 * @property {number} [settings.decrement] - Number of steps to decrement the value.
 */
positionSettings.setHorizontalRelative({ value, relativeTo, increment, decrement });
```

### `PositionSettings.setVerticalAlignment(settings)`

```javascript
/**
 * Sets the alignment for the vertical position.
 * @param {Object} settings
 * @property {"Top"|"Center"|"Bottom"} settings.align - The alignment for the vertical position.
 * @property {"Line"|"Margin"|"Bottom margin"|"Paragraph"|"Page"|"Top margin"} settings.relativeTo - What the alignment is relative to.
 */
positionSettings.setVerticalAlignment({ align, relativeTo });
```

### `PositionSettings.setVerticalPosition(settings)`

```javascript
/**
 * Sets the absolute vertical position.
 * @param {Object} settings
 * @property {number} settings.value - The value for the vertical position.
 * @property {"Line"|"Margin"|"Bottom margin"|"Paragraph"|"Page"|"Top margin"} settings.below - What the position is below.
 * @property {number} [settings.increment] - Number of steps to increment the value.
 * @property {number} [settings.decrement] - Number of steps to decrement the value.
 */
positionSettings.setVerticalPosition({ value, below, increment, decrement });
```

### `PositionSettings.setVerticalRelative(settings)`

```javascript
/**
 * Sets the relative vertical position.
 * @param {Object} settings
 * @property {number} settings.value - The value for the relative position.
 * @property {"Margin"|"Bottom margin"|"Page"|"Top margin"} settings.relativeTo - What the position is relative to.
 * @property {number} [settings.increment] - Number of steps to increment the value.
 * @property {number} [settings.decrement] - Number of steps to decrement the value.
 */
positionSettings.setVerticalRelative({ value, relativeTo, increment, decrement });
```

### `PositionSettings.setOptions(settings)`

```javascript
/**
 * Sets additional options for the postion settings.
 * @param {Object} settings
 * @property {boolean} [settings.moveObjectWithText] - Whether to move the object with text.
 * @property {boolean} [settings.allowOverlap] - Whether to allow overlap with other objects.
 */
positionSettings.setOptions({ moveObjectWithText, allowOverlap });
```

### `PositionSettings.applySettings(positionSettings)`

```javascript
/**
 * Applies a set of position settings (horizontal, vertical, and options).
 * @param {Object} positionSettings - The settings to apply.
 * @property {Object} [positionSettings.horizontal] - Horizontal settings (alignment, position, relative).
 * @property {Object} [positionSettings.vertical] - Vertical settings (alignment, position, relative).
 * @property {Object} [positionSettings.options] - Additional options.
 */
positionSettings.applySettings({ horizontal, vertical, options });
```
