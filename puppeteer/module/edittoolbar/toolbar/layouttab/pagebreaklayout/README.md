# PageBreakLayout

This library implements interaction with the Page Break in the Layout tab

## Table of Contents

-   [**Object**](#object)
-   [**Methods**](#methods)
    -   [`PageBreakLayout.insertPageBreak()`](#pagebreaklayoutinsertpagebreak)
    -   [`PageBreakLayout.insertPageBreakWithOptions(options)`](#pagebreaklayoutinsertpagebreakwithoptionsoptions)
-   [**Example**](#example)

## Object

This method takes the PageBreaksOptions object as a parameter.

```javascript
/**
 * @typedef {Object} SectionBreakOption
 * @property {boolean} nextPage
 * @property {boolean} contPage
 * @property {boolean} evenPage
 * @property {boolean} oddPage
 */
/**
 * @typedef {Object} PageBreaksOptions
 * @property {boolean} [pageBreak]
 * @property {boolean} [columnBreak]
 * @property {SectionBreakOption} [section]
 */
```

## Methods

### `PageBreakLayout.insertPageBreak()`

```javascript
/**
 * Click insert page break button
 */
PageBreakLayout.insertPageBreak();
```

### `PageBreakLayout.insertPageBreakWithOptions(options)`

```javascript
/**
 * Adds a page break with settings such as page break, column break, section break
 * @param {PageBreaksOptions} options
 */
PageBreakLayout.insertPageBreakWithOptions(options);
```

## Example

```javascript
const { PageBreakLayout } = require("lib");

// create test file
Tester.createFile("docx");

// insert page break
PageBreakLayout.insertPageBreak();

// insert page break with option
// pageBreak: true - add page break
// columnBreak: true - add column break
// section: {nextPage: true, contPage: true, evenPage: true, oddPage: true}
// - add other settings
PageBreakLayout.insertPageBreakWithOptions({
    pageBreak: true,
    columnBreak: true,
    section: { nextPage: true, contPage: true, evenPage: true, oddPage: true },
});

// close test file
Tester.close();

```
