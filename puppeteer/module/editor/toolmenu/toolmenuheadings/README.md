# ToolMenuHeadings

This library implements interaction with the Headings navigation panel functionality.

## Table of Contents

-   [**Types**](#types)
    -   [`HeadingOptions`](#headingoptions)
-   [**Methods**](#methods)
    -   [`ToolMenuHeadings.setHeadingsSettings(optionValue)`](#toolmenuheadingssetheadingssettingsoptionvalue)
    -   [`ToolMenuHeadings.setExpand()`](#toolmenuheadingssetexpand)
    -   [`ToolMenuHeadings.setCollapse()`](#toolmenuheadingssetcollapse)
    -   [`ToolMenuHeadings.setExpandLvl(lvl)`](#toolmenuheadingssetexpandlvllvl)
    -   [`ToolMenuHeadings.setFontSize(size)`](#toolmenuheadingssetfontsizesize)
    -   [`ToolMenuHeadings.setWrap()`](#toolmenuheadingssetwrap)
-   [**Example**](#example)

## Types

### HeadingOptions

Object containing headings panel options.

```javascript
/**
 * @typedef {Object} HeadingOptions
 *  @property  {
 * "Expand all"
 * | "Collapse all"
 * | "Expand to level"
 * | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
 * | "Font size"
 * | "Small"
 * | "Medium"
 * | "Large"
 * | "Wrap long headings"
 * } optionValue - The option to set.
 */
```

## Methods

### ToolMenuHeadings.setHeadingsSettings(optionValue)

```javascript
/**
 * Sets the heading options based on provided settings.
 * @param {HeadingOptions} optionValue - The option to set.
 */
ToolMenuHeadings.setHeadingsSettings(optionValue);
```

### ToolMenuHeadings.setExpand()

```javascript
/**
 * Set Expand all
 */
ToolMenuHeadings.setExpand();
```

### ToolMenuHeadings.setCollapse()

```javascript
/**
 * Click Collapse all
 */
ToolMenuHeadings.setCollapse();
```

### ToolMenuHeadings.setExpandLvl(lvl)

```javascript
/**
 * Sets Expand to level
 * @param {"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"} lvl - The level to expand to.
 */
ToolMenuHeadings.setExpandLvl(lvl);
```

### ToolMenuHeadings.setFontSize(size)

```javascript
/**
 * Sets Font size
 * @param {"Small" | "Medium" | "Large"} size - The font size to set.
 */
ToolMenuHeadings.setFontSize(size);
```

### ToolMenuHeadings.setWrap()

```javascript
/**
 * Click Wrap long headings
 */
ToolMenuHeadings.setWrap();
```

## Example

```javascript
// Include the ToolMenuHeadings library
const { ToolMenuHeadings } = require("lib");

// Create a new document
Tester.createFile("docx");

// Add some headings to the document
// ... (code to add headings)

// Expand all headings in the navigation panel
ToolMenuHeadings.setExpand();

// Collapse all headings
ToolMenuHeadings.setCollapse();

// Expand headings to level 3
ToolMenuHeadings.setExpandLvl("3");

// Change font size to Large
ToolMenuHeadings.setFontSize("Large");

// Enable wrapping for long headings
ToolMenuHeadings.setWrap();

// Use the general settings method
ToolMenuHeadings.setHeadingsSettings("Medium");

// Expand to level 5 and set medium font size
ToolMenuHeadings.setExpandLvl("5");
ToolMenuHeadings.setFontSize("Medium");

// Close the test example
Tester.close();
```
