# SmartArt

Library for interacting with SmartArt in the Insert section.

## Table of Contents

-   [**How to include**](#how-to-include)
-   [**Test Example**](#test-example)
-   [**Types**](#types)
    -   [SmartArt Object](#smartart-object)
-   [**Methods**](#methods)
    -   [SmartArt.openSmartArtList()](#smartartopensmartartlist)
    -   [SmartArt.getSmartArts()](#smartartgetsmartarts)
    -   [SmartArt.clickListArt(index)](#smartartclicklistartindex)
    -   [SmartArt.clickProcessArt(index)](#smartartclickprocessartindex)
    -   [SmartArt.clickCycleArt(index)](#smartartclickcycleartindex)
    -   [SmartArt.clickHierarchyArt(index)](#smartartclickhierarchyartindex)
    -   [SmartArt.clickRelationshipArt(index)](#smartartclickrelationshipartindex)
    -   [SmartArt.clickMatrixArt(index)](#smartartclickmatrixartindex)
    -   [SmartArt.clickPyramidArt(index)](#smartartclickpyramidartindex)
    -   [SmartArt.clickPictureArt(index)](#smartartclickpictureartindex)
    -   [SmartArt.clickOtherArt(index)](#smartartclickotherartindex)
-   [**Example**](#example)

## How to include

```javascript
const { SmartArt } = require("lib");
```

## Types

### SmartArt Object

```javascript
/**
 * @typedef {Object} SmartArtObject
 * @property {string} description
 * @property {number} count
 * @property {number} index
 */
```

## Methods

### `SmartArt.openSmartArtList()`

```javascript
/**
 * Open the SmartArt list layout
 */
SmartArt.openSmartArtList();
```

### `SmartArt.getSmartArts()`

```javascript
/**
 * Returns the SmartArt array
 * @returns {Array<SmartArtObject>}
 */
SmartArt.getSmartArts();
```

This method returns an array of [SmartArtObject](#smartart-object) objects.

### `SmartArt.clickListArt(index)`

```javascript
/**
 * Click on the desired ListArt layout index
 * @param {string | number} index - nth-child index
 */
SmartArt.clickListArt(index);
```

### `SmartArt.clickProcessArt(index)`

```javascript
/**
 * Click on the desired ProcessArt layout index
 * @param {string | number} index - nth-child index
 */
SmartArt.clickProcessArt(index);
```

### `SmartArt.clickCycleArt(index)`

```javascript
/**
 * Click on the desired CycleArt layout index
 * @param {string | number} index - nth-child index
 */
SmartArt.clickCycleArt(index);
```

### `SmartArt.clickHierarchyArt(index)`

```javascript
/**
 * Click on the desired HierarchyArt layout index
 * @param {string | number} index - nth-child index
 */
SmartArt.clickHierarchyArt(index);
```

### `SmartArt.clickRelationshipArt(index)`

```javascript
/**
 * Click on the desired RelationshipArt layout index
 * @param {string | number} index - nth-child index
 */
SmartArt.clickRelationshipArt(index);
```

### `SmartArt.clickMatrixArt(index)`

```javascript
/**
 * Click on the desired MatrixArt layout index
 * @param {string | number} index - nth-child index
 */
SmartArt.clickMatrixArt(index);
```

### `SmartArt.clickPyramidArt(index)`

```javascript
/**
 * Click on the desired PyramidArt layout index
 * @param {string | number} index - nth-child index
 */
SmartArt.clickPyramidArt(index);
```

### `SmartArt.clickPictureArt(index)`

```javascript
/**
 * Click on the desired PictureArt layout index
 * @param {string | number} index - nth-child index
 */
SmartArt.clickPictureArt(index);
```

### `SmartArt.clickOtherArt(index)`

```javascript
/**
 * Click on the desired OtherArt layout index
 * @param {string | number} index - nth-child index
 */
SmartArt.clickOtherArt(index);
```

## Example

```javascript
const { SmartArt } = require("lib");
// create test file
Tester.createFile("docx");
// add smart art from list art
SmartArt.clickListArt(1);
// add smart piramid art
SmartArt.clickPyramidArt(2);
// add other smart art
SmartArt.clickOtherArt(1);
const smartarts = SmartArt.getSmartArts();
// output first smartart from smartart list
console.log(smartarts[0]);
// close test file
Tester.close();
```
