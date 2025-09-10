# ViewToolbarDocumentMode Functions

This library provides a set of functions to interact with the document viewing mods of the toolbar in the document editor.

## How to Include

```javascript
const { ViewToolbarDocumentMode } = require("lib");
```

## Functionality

For more detailed functionality, refer to the [**ViewToolbarFile Functionality documentation**](/puppeteer/module/viewtoolbar/viewtoolbarfile/FUNCTIONALITY.md).

## Example Usage

```javascript
// Include the File Toolbar library
const { ViewToolbarDocumentMode } = require("lib");
Tester.createFile("docx");
// Perform various actions using the toolbar in the document editor
ViewToolbarDocumentMode.toggleReviewingMode();
ViewToolbarDocumentMode.toggleViewingMode();
ViewToolbarDocumentMode.toggleEditMode();
Tester.close();
// Close the document or perform other actions as needed
```
