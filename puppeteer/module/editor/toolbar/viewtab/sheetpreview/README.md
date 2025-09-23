# SheetPreview

Library for interacting with sheet preview options in the View tab of a spreadsheet editor.

## Table of Contents

-   [**Methods**](#methods)

    -   [`SheetPreview.setNormalView()`](#sheetpreviewsetnormalview)
    -   [`SheetPreview.setPageBreakPreview()`](#sheetpreviewsetpagebreakpreview)

-   [**Example**](#example)

## Methods

### SheetPreview\.setNormalView()

```javascript
/**
 * Set the view to normal
 */
SheetPreview.setNormalView();
```

### SheetPreview\.setPageBreakPreview()

```javascript
/**
 * Set page break preview mode
 */
SheetPreview.setPageBreakPreview();
```

## Example

```javascript
const { SheetPreview } = require("lib");

Tester.createFile("xlsx");

// switch to page break preview
SheetPreview.setPageBreakPreview();

// switch back to normal view
SheetPreview.setNormalView();

Tester.close();
```
