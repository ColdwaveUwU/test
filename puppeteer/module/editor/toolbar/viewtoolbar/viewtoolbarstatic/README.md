# ViewToolbarStatic Functions

This library provides a set of functions to interact with the static tools in the view toolbar. You can use these functions to perform actions like switching between the hand tool and the select tool.

## How to Include

```javascript
const { ViewToolbarStatic } = require("lib");
```

## Functionality

For more detailed functionality, refer to the [**ViewToolbarStatic Functionality documentation**](/puppeteer/module/viewtoolbar/viewtoolbarhome/FUNCTIONALITY.md).

## Example Usage

```javascript
// Include the View Toolbar Static library
const { ViewToolbarStatic } = require("lib");
Tester.createFile("docx");
// Switch between the hand tool and select tool
ViewToolbarStatic.clickHand();
ViewToolbarStatic.clickSelect();
Tester.close();
// Perform other actions as needed
```

You can use these ViewToolbarStatic functions to automate interactions with the static tools in the view toolbar of the document editor.
