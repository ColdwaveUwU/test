# PageHeaderFooter

This library implements interaction with the Header&Footer in the Insert tab

## Table of Contents

-   [**Object**](#object)
-   [**Methods**](#methods)
    -   [`PageHeaderFooter.clickHeaderFooter()`](#pageheaderfooterclickheaderfooter)
    -   [`PageHeaderFooter.editHeader(text)`](#pageheaderfootereditheadertext)
    -   [`PageHeaderFooter.editFooter()`](#pageheaderfootereditfooter)
    -   [`PageHeaderFooter.removeHeader()`](#pageheaderfooterremoveheader)
    -   [`PageHeaderFooter.removeFooter()`](#pageheaderfooterremovefooter)
    -   [`PageHeaderFooter.insertPageNumber()`](#pageheaderfooterinsertpagenumber)
    -   [`PageHeaderFooter.insertPagesNumber()`](#pageheaderfooterinsertpagesnumber)
-   [**Example**](#example)

## Object

```javascript
/**
 * @typedef {Object} NumberPosition
 * @property {string} [top]
 * @property {string} [bottom]
 */
```

## Methods

### `PageHeaderFooter.clickHeaderFooter()`

```javascript
/**
 * Open header&footer dropdown
 */
PageHeaderFooter.clickHeaderFooter();
```

### `PageHeaderFooter.editHeader(text)`

```javascript
/**
 * Edits the page header
 * @param {string} text
 */
PageHeaderFooter.editHeader(text);
```

### `PageHeaderFooter.editFooter()`

```javascript
/**
 * Edits the page footer
 * @param {string} text
 */
PageHeaderFooter.editFooter();
```

### `PageHeaderFooter.removeHeader()`

```javascript
/**
 * Remove Header
 */
PageHeaderFooter.removeHeader();
```

### `PageHeaderFooter.removeFooter()`

```javascript
/**
 * Remove Footer
 */
PageHeaderFooter.removeFooter();
```

### `PageHeaderFooter.insertPageNumber()`

```javascript
/**
 * Adds the page number to a specific position
 * @param {NumberPosition} [numberPosition] - if not specified, the current position is used
 */
PageHeaderFooter.insertPageNumber(numberPosition);
```

### `PageHeaderFooter.insertPagesNumber()`

```javascript
/**
 * Insert number of pages
 */
PageHeaderFooter.insertPagesNumber();
```

## Example

```javascript
const { PageHeaderFooter } = require("lib");
// create test file
Tester.createFile("docx");
PageHeaderFooter.editHeader("test Header"); //add header
PageHeaderFooter.editFooter("test Footer"); //add footer
PageHeaderFooter.removeHeader(); // remove header
PageHeaderFooter.removeFooter(); // remove footer
PageHeaderFooter.insertPagesNumber(); // click Insert number of pages
// close test file
Tester.close();
```
