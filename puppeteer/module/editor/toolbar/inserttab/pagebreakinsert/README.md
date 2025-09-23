# PageBreakInsert

This library implements interaction with the Page Break in the Insert tab

## Table of Contents

-   [**Object**](#object)
-   [**Methods**](#methods)
    -   [`PageBreakInsert.insertPageBreak()`](#pagebreakinsertinsertpagebreak)
    -   [`PageBreakInsert.insertPageBreakWithOptions(options)`](#pagebreakinsertinsertpagebreakwithoptionsoptions)
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

### `PageBreakInsert.insertPageBreak()`

```javascript
/**
 * Click insert page break button
 */
PageBreakInsert.insertPageBreak();
```

### `PageBreakInsert.insertPageBreakWithOptions(options)`

```javascript
/**
 * Adds a page break with settings such as page break, column break, section break
 * @param {PageBreaksOptions} options
 */
PageBreakInsert.insertPageBreakWithOptions(options);
```

## Example

```javascript
const { PageBreakInsert } = require("lib");
// create test file
Tester.createFile("docx");
// insert page break
PageBreakInsert.insertPageBreak();
// insert page break with option
// pageBreak: true - add page break
// columnBreak: true - add column break
// section: {nextPage: true, contPage: true, evenPage: true, oddPage: true}
// - add other settings
PageBreakInsert.insertPageBreakWithOptions({
    pageBreak: true,
    columnBreak: true,
    section: { nextPage: true, contPage: true, evenPage: true, oddPage: true },
});
// close test file
Tester.close();

```
