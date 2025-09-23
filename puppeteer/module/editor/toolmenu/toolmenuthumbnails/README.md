# ToolMenuThumbnails

This library is designed to automate operations with thumbnails.

## How to Include

You can include this module in your project as follows:

```javascript
const { ToolMenuThumbnails } = require("lib");
```

## Functionality

For more detailed functionality, refer to the [**ToolMenuComments Functionality documentation**](/puppeteer/module/toolmenu/toolmenuthumbnails/FUNCTIONALITY.md).

## Example Usage

Here's an example of how to use the functions provided by this module:

### PDF

```javascript
// import ToolMenuThumbnails lib
const { ToolMenuThumbnails } = require("lib");
// open test pdf file
Tester.openFile("pdf/demo.pdf");
// set thumbnails options Thumbnails Settings
ToolMenuThumbnails.setThumbnailsOption({ highlight: true, size: 6 });
// click in Thumbnails list
ToolMenuThumbnails.clickThumbnailsMenu();

// get current thumbnail number
let currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 1) {
    throw new Error("Incorrect currentThumbnailNumber");
}

// goto 3 thumbnail
ToolMenuThumbnails.goToThumbnail(3);

currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber after goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 3) {
    throw new Error("Incorrect currentThumbnailNumber");
}

const countThumbnails = ToolMenuThumbnails.getCountThumbnails();
console.log(`countThumbnails: ${countThumbnails}`);
Tester.close();
```

### SLIDE

```javascript
// import ToolMenuThumbnails lib
const { ToolMenuThumbnails } = require("lib");
// open test pdf file
Tester.openFile("pptx/PPTCompatTest.pptx");
// click in Thumbnails list
ToolMenuThumbnails.clickThumbnailsMenu();
ToolMenuThumbnails.goToThumbnail(1);
// get current thumbnail number
let currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber before goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 1) {
    throw new Error("Incorrect currentThumbnailNumber");
}

// goto 3 thumbnail
ToolMenuThumbnails.goToThumbnail(3);

currentThumbnailNumber = ToolMenuThumbnails.getCurrentThumbnailNumber();
console.log(`currentThumbnailNumber after goto: ${currentThumbnailNumber}`);
if (currentThumbnailNumber !== 3) {
    throw new Error("Incorrect currentThumbnailNumber");
}

const countThumbnails = ToolMenuThumbnails.getCountThumbnails();
console.log(`countThumbnails: ${countThumbnails}`);
Tester.close();
```

## Options

### `Option`

-   `highlight` (boolean): Specifies whether to set the highlight setting.
-   `size` (number): size thumbnails.
