# AxisSettings

This library implements interaction with chart axis settings in the advanced settings modal window, providing configuration for both vertical and horizontal axes.

## Table of Contents

-   [**Objects**](#objects)
    -   [`AxisSettingsObject`](#axissettingsobject)
    -   [`AxisTitles`](#axistitles)
    -   [`Gridlines`](#gridlines)
    -   [`AxisCrosses`](#axiscrosses)
    -   [`AxisPosition`](#axisposition)
    -   [`MarkTypes`](#marktypes)
    -   [`DisplayUnits`](#displayunits)
    -   [`MinMaxValues`](#minmaxvalues)
    -   [`TickOptions`](#tickoptions)
    -   [`LabelOptions`](#labeloptions)

## Objects

### AxisSettingsObject

Main configuration object for axis settings.

```javascript
/**
 * @typedef {Object} AxisSettingsObject
 * @property {boolean} [hideAxis] - Hide axis checkbox
 * @property {AxisTitles} [title] - Axis title dropdown option
 * @property {Gridlines} [gridlines] - Gridlines dropdown option
 * @property {AxisCrosses} [axisCrosses] - Axis crosses settings
 * @property {AxisPosition} [axisPosition] - Axis position settings
 * @property {DisplayUnits} [displayUnits] - Display units settings
 * @property {MinMaxValues} [minimumValue] - Minimum value settings
 * @property {MinMaxValues} [maximumValue] - Maximum value settings
 * @property {TickOptions} [tickOptions] - Tick options settings
 * @property {LabelOptions} [labelOptions] - Label options settings
 */
```

### AxisTitles

```javascript
/**
 * @typedef {Object} AxisTitles
 * @property {"None" | "Rotated" | "Horizontal"} [optionValue] - Axis title text orientation
 */
```

### Gridlines

```javascript
/**
 * @typedef {Object} Gridlines
 * @property {"None" | "Major" | "Minor" | "Major and Minor"} [optionValue] - Gridlines display options
 */
```

### AxisCrosses

```javascript
/**
 * @typedef {Object} AxisCrosses
 * @property {"Auto" | "Value" | "Minimum Value" | "Maximum Value"} [type] - Axis crosses dropdown option
 * @property {InputSettings} [value] - Axis crosses value input
 */
```

### AxisPosition

```javascript
/**
 * @typedef {Object} AxisPosition
 * @property {"On Tick Marks" | "Between Tick Marks"} [type] - Axis position dropdown option
 */
```

### MarkTypes

```javascript
/**
 * @typedef {Object} MarkTypes
 * @property {"None" | "Cross" | "In" | "Out"} [type] - Major and minor mark type dropdown option
 */
```

### DisplayUnits

```javascript
/**
 * @typedef {Object} DisplayUnits
 * @property {boolean} [valuesInReverseOrder] - Values in reverse order checkbox
 * @property {boolean} [logarithmicScale] - Logarithmic Scale checkbox
 * @property {InputSettings} [base] - Base input for logarithmic scale
 */
```

### MinMaxValues

```javascript
/**
 * @typedef {Object} MinMaxValues
 * @property {"Auto" | "Fixed"} [type] - Min/Max value dropdown option
 * @property {InputSettings} [value] - Min/Max value input
 */
```

### TickOptions

```javascript
/**
 * @typedef {Object} TickOptions
 * @property {MarkTypes} [majorType] - Major type dropdown option
 * @property {MarkTypes} [minorType] - Minor type dropdown option
 * @property {InputSettings} [interval] - Interval input
 */
```

### LabelOptions

```javascript
/**
 * @typedef {Object} LabelOptions
 * @property {"None" | "Low" | "High" | "Next to axis"} [position] - Label position dropdown option
 * @property {InputSettings} [axisLabelDistance] - Axis label distance input
 * @property {"Auto" | "Manual"} [intervalBetweenType] - Interval between type dropdown option
 * @property {InputSettings} [intervalBetweenValue] - Interval between value input
 * @property {NumberFormat} [numberFormat] - Format settings for the label
 */
```

