# PageZoom

Library for interacting with Zoom pages.

## Table of Contents

-   [**Methods**](#methods)
    -   [`PageZoom.clickFitToPage()`](#pagezoomclickfittopage)
    -   [`PageZoom.clickFitToWidth()`](#pagezoomclickfittowidth)
    -   [`PageZoom.setZoomInput(size)`](#pagezoomsetzoominputsize)
    -   [`PageZoom.setZoomByClick()`](#pagezoomsetzoombyclick)
-   [**Example**](#example)

## Methods

### PageZoom.clickFitToPage()

```javascript
/**
 * Click fit to page
 */
PageZoom.clickFitToPage();
```

### PageZoom.clickFitToWidth()

```javascript
/**
 * Click fit to page
 */
PageZoom.clickFitToWidth();
```

### PageZoom.setZoomInput(size)

```javascript
/**
 * Input custom zoom value
 * @param {string} size
 */
PageZoom.setZoomInput(size);
```

### PageZoom.setZoomByClick()

```javascript
/**
 * Sets the zoom value from the list
 * @param {string} size - value with %
 */
PageZoom.setZoomByClick(size);
```

## Example

```javascript
const { PageZoom } = require("lib");
Tester.createFile("docx");
// set zoom by click (select dropdown)
PageZoom.setZoomByClick("200%");
// set zoom by input
PageZoom.setZoomInput("100%");
// click fit to width
PageZoom.clickFitToWidth();
// click fit to page
PageZoom.clickFitToPage();
Tester.close();
```
