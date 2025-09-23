# ViewToolbarHome Functions

This library provides a set of functions to interact with the home tab of the toolbar in the document editor. You can use these functions to perform actions like changing the page number, zooming, rotating, and more.

## How to Include

```javascript
const { ViewToolbarHome } = require("lib");
```

## Functionality

For more detailed functionality, refer to the [**ViewToolbarHome Functionality documentation**](/puppeteer/module/viewtoolbar/viewtoolbarhome/FUNCTIONALITY.md).

## Example Usage

```javascript
// Include the Home Toolbar library
const { ViewToolbarHome } = require("lib");
Tester.createFile("docx");
// Perform various actions using the Home Toolbar functions
ViewToolbarHome.setPage(3);
ViewToolbarHome.setZoomByClick("150%");
ViewToolbarHome.clickRotate();
ViewToolbarHome.clickFitPage();
Tester.close();
// Close the document or perform other actions as needed
```
