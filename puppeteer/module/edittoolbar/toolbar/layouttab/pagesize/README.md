# PageSize

This library implements interaction with the Page Size options.

## Table of Contents

-   [**Methods**](#methods)
    -   [`PageSize.setSize(pageSizeTemplateName)`](#pagesizesetsizepagesizetemplatename)
    -   [`PageSize.setCustomSize(sizeOption)`](#pagesizesetcustomsizesizeoption)
-   [**Example**](#example)

## Methods

### PageSize.setSize(pageSizeTemplateName)

```javascript
/**
 * Sets the page size using a predefined template.
 * @param {"US Letter" | "US Legal" | "A4" | "A5" | "B5" |
        "Envelope #10" | "Envelope DL" | "Tabloid" | "A3" | "Tabloid Oversize" | "ROC 16K" |
        "Envelope Choukei 3" | "Super B/A3"} pageSizeTemplateName - The name of the page size template.
 */
PageSize.setMargin(marginName);
```

### PageSize.setCustomSize(sizeOption)

```javascript
/**
 * @typedef {"US Letter" | "US Legal" | "A4" | "A5" | "B5" |
 * "Envelope #10" | "Envelope DL" | "Tabloid" | "A3" | "Tabloid Oversize" |
 * "ROC 16K" | "Envelope Choukei 3" | "Super B/A3" | "A0" | "A1" | "A2" | "A7" | "Custom"} PageSizePreset
 */
/**
 * Sets a custom page size.
 * @param {{preset: Readonly<PageSizePreset> | undefined,
 *          width: number | string | undefined,
 *          height: number | string | undefined}} sizeOption - The custom page size options.
 */
PageSize.setCustomSize(sizeOption);
```

## Example

```javascript
// import PageSize lib
const { PageSize } = require("lib");
// create docx file
Tester.createFile("docx");
// set b5 page size
PageSize.setSize("B5");
// set custom page size in modal window
PageSize.setCustomSize({ preset: "Custom", width: 20, height: 10 });
// close test
Tester.close();
```
