# ViewToolbarView Functions

This library provides a set of functions to interact with the view toolbar's view settings in the document editor. You can use these functions to control the zoom level, interface theme, and other view-related settings.

## How to Include

```javascript
const { ViewToolbarView } = require("lib");
```

## Functions

For more detailed functionality, refer to the [**ViewToolbarStatic Functionality documentation**](/puppeteer/module/viewtoolbar/viewtoolbarview/FUNCTIONALITY.md).

## Example Usage

```javascript
// Include the View Toolbar View library
const { ViewToolbarView } = require("lib");
Tester.createFile("docx");
// Perform various actions using the View Toolbar View functions
ViewToolbarView.clickHeading();
ViewToolbarView.setZoomByClick("150%");
ViewToolbarView.setInterfaceTheme("Dark");
Tester.close();
// Close the document or perform other actions as needed
```

You can use these ViewToolbarView functions to automate interactions with the view settings in the view toolbar of the document editor.
