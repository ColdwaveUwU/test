# ToolbarHeadings

Library for interacting with ToolbarHeadings.

## Table of Contents

-   [**Methods**](#methods)
    -   [ToolbarHeadings.clickHeadings()](#toolbarheadingsclickheadings)
    -   [ToolbarHeadings.setExpand()](#toolbarheadingssetexpand)
    -   [ToolbarHeadings.setCollapse()](#toolbarheadingssetcollapse)
    -   [ToolbarHeadings.setExpandLvl(lvl)](#toolbarheadingssetexpandlvllvl)
    -   [ToolbarHeadings.setFontSize(size)](#toolbarheadingssetfontsizesize)
-   [**Example**](#example)

## Methods

### ToolbarHeadings.clickHeadings()

```javascript
/**
 * Click headings button
 */
ToolbarHeadings.clickHeadings();
```

### ToolbarHeadings.setExpand()

```javascript
/**
 * Click Expand all
 */
ToolbarHeadings.setExpand();
```

### ToolbarHeadings.setCollapse()

```javascript
/**
 * Click Collapse all
 */
ToolbarHeadings.setCollapse();
```

### ToolbarHeadings.setExpandLvl(lvl)

```javascript
/**
 * Sets Expand to level
 * @param {"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"} lvl
 */
ToolbarHeadings.setExpandLvl(lvl);
```

### ToolbarHeadings.setFontSize(size)

```javascript
/**
 * Sets Font size
 * @param {"Small" | "Medium" | "Large"} size
 */
ToolbarHeadings.setFontSize(size);
```

### ToolbarHeadings.setWrap()

```javascript
/**
 * Click Wrap long headings
 */
ToolbarHeadings.setWrap();
```

## Example

```javascript
const { ToolbarHeadings } = require("lib");
// create testfile
Tester.createFile("docx");
// set expand
ToolbarHeadings.setExpand();
// set collapse
ToolbarHeadings.setCollapse();
// set expandLvl
ToolbarHeadings.setExpandLvl("4");
// set font size
ToolbarHeadings.setFontSize("Small");
// set wrap
ToolbarHeadings.setWrap();
// close test file
Tester.close();
```
