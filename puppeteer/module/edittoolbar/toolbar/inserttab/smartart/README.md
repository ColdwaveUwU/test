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
    -   [SmartArt.clickListArt(id)](#smartartclicklistartid)
    -   [SmartArt.clickProcessArt(id)](#smartartclickprocessartid)
    -   [SmartArt.clickCycleArt(id)](#smartartclickcycleartid)
    -   [SmartArt.clickHierarchyArt(id)](#smartartclickhierarchyartid)
    -   [SmartArt.clickRelationshipArt(id)](#smartartclickrelationshipartid)
    -   [SmartArt.clickMatrixArt(id)](#smartartclickmatrixartid)
    -   [SmartArt.clickPyramidArt(id)](#smartartclickpyramidartid)
    -   [SmartArt.clickPictureArt(id)](#smartartclickpictureartid)
    -   [SmartArt.clickOtherArt(id)](#smartartclickotherartid)
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

### `SmartArt.clickListArt(id)`

```javascript
/**
 * Click on the desired ListArt layout id
 * @param {string | number} id - nth-child index
 */
SmartArt.clickListArt(id);
```

### `SmartArt.clickProcessArt(id)`

```javascript
/**
 * Click on the desired ProcessArt layout id
 * @param {string | number} id - nth-child index
 */
SmartArt.clickProcessArt(id);
```

### `SmartArt.clickCycleArt(id)`

```javascript
/**
 * Click on the desired CycleArt layout id
 * @param {string | number} id - nth-child index
 */
SmartArt.clickCycleArt(id);
```

### `SmartArt.clickHierarchyArt(id)`

```javascript
/**
 * Click on the desired HierarchyArt layout id
 * @param {string | number} id - nth-child index
 */
SmartArt.clickHierarchyArt(id);
```

### `SmartArt.clickRelationshipArt(id)`

```javascript
/**
 * Click on the desired RelationshipArt layout id
 * @param {string | number} id - nth-child index
 */
SmartArt.clickRelationshipArt(id);
```

### `SmartArt.clickMatrixArt(id)`

```javascript
/**
 * Click on the desired MatrixArt layout id
 * @param {string | number} id - nth-child index
 */
SmartArt.clickMatrixArt(id);
```

### `SmartArt.clickPyramidArt(id)`

```javascript
/**
 * Click on the desired PyramidArt layout id
 * @param {string | number} id - nth-child index
 */
SmartArt.clickPyramidArt(id);
```

### `SmartArt.clickPictureArt(id)`

```javascript
/**
 * Click on the desired PictureArt layout id
 * @param {string | number} id - nth-child index
 */
SmartArt.clickPictureArt(id);
```

### `SmartArt.clickOtherArt(id)`

```javascript
/**
 * Click on the desired OtherArt layout id
 * @param {string | number} id - nth-child index
 */
SmartArt.clickOtherArt(id);
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
