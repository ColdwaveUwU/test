# StatusBar

Library for interacting with StatusBar (footer).

## Table of Contents

-   [**Methods**](#methods)
    -   [`StatusBar.goToPage(pageNumber)`](#statusbargotopagepagenumber)
    -   [`StatusBar.getCountPages()`](#statusbargetcountpages)
    -   [`StatusBar.getCurrentPage()`](#statusbargetcurrentpage)
-   [**Example**](#example)

## Methods

### StatusBar.goToPage(pageNumber)

```javascript
/**
 * Set target page in StatusBar
 * @param {number} pageNumber
 */
StatusBar.goToPage(pageNumber);
```

### StatusBar.getCountPages()

```javascript
/**
 * Get count pages in editor
 * @returns {number}
 */
StatusBar.getCountPages();
```

### StatusBar.getCurrentPage()

```javascript
/**
 * Get current page number
 * @returns {number}
 */
StatusBar.getCurrentPage();
```

## Example

```javascript
// import status bar lib
const { StatusBar } = require("lib");
// open test file
Tester.openFile("pdf/demo.pdf");
// get page counts
const pagesCount = StatusBar.getCountPages();
console.log(`PagesCount: ${pagesCount}`);
// goto 3 page
StatusBar.goToPage(3);
// get current page number
const currentPageNumber = StatusBar.getCurrentPage();
console.log(`CurrentPageNumber: ${currentPageNumber}`);
if (currentPageNumber !== 3) {
    throw new Error("Incorrect page number");
}
// close test
Tester.close();
```
