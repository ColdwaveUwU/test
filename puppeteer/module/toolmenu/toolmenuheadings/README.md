# ToolMenuHeadings

This library is designed to automate interaction with headers and related functions in the editor.

## Table of Contents

-   [**How to include**](#how-to-include)
-   [**Example Usage**](#example-usage)
-   [**Methods**](#methods)
    -   [ToolMenuHeadings.setExpand()](#toolmenuheadingssetexpand)
    -   [ToolMenuHeadings.setCollapse()](#toolmenuheadingssetcollapse)
    -   [ToolMenuHeadings.setExpandLvl(lvl)](#toolmenuheadingssetexpandlvllvl)
    -   [ToolMenuHeadings.setFontSize(size)](#toolmenuheadingssetfontsizesize)
    -   [ToolMenuHeadings.setWrap()](#toolmenuheadingssetwrap)

## How to Include

You can include this module in your project as follows:

```javascript
const { ToolMenuHeadings } = require("lib");
```

## Example Usage

Here's an example of how to use the functions provided by this module:

```javascript
const { ToolMenuHeadings } = require("lib");
Tester.createFile("docx");
// click Expand all
ToolMenuHeadings.setExpand();
// click Collapse all
ToolMenuHeadings.setCollapse();
// click Expand to level and set 4
ToolMenuHeadings.setExpandLvl("4");
// click Font size and set Small
ToolMenuHeadings.setFontSize("Small");
// click Wrap long headings
ToolMenuHeadings.setWrap();
Tester.close();
```

## Methods

### ToolMenuHeadings.setExpand();

```javascript
/**
 * Click Expand all
 */
ToolMenuHeadings.setExpand();
```

### ToolMenuHeadings.setCollapse();

```javascript
/**
 * Click Collapse all
 */
ToolMenuHeadings.setCollapse();
```

### ToolMenuHeadings.setExpandLvl(lvl);

```javascript
/**
 * Sets Expand to level
 * @param {"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"} lvl
 */
ToolMenuHeadings.setExpandLvl(lvl);
```

### ToolMenuHeadings.setFontSize(size);

```javascript
/**
 * Sets Font size
 * @param {"Small" | "Medium" | "Large"} size
 */
ToolMenuHeadings.setFontSize(size);
```

### ToolMenuHeadings.setWrap();

```javascript
/**
 * Click Wrap long headings
 */
ToolMenuHeadings.setWrap();
```
