# ToolMenuComments

This library is designed to automate interaction with comments and related functions.

## How to Include

You can include this module in your project as follows:

```javascript
const { ToolMenuComments } = require("lib");
```

## Functionality

For more detailed functionality, refer to the [**ToolMenuComments Functionality documentation**](/puppeteer/module/toolmenu/toolmenucomments/FUNCTIONALITY.md).

## Example Usage

Here's an example of how to use the functions provided by this module:

```javascript
const { ToolMenuComments } = require("lib");
Tester.createFile("docx");
// Check for active comments
ToolMenuComments.checkActiveComments();
// Add a reply to a comment
ToolMenuComments.addReplyComment("This is a reply", 1);
// Edit comments
ToolMenuComments.editComment([{ index: 1, subIndex: [1], text: "Updated comment text" }]);
// Delete comments
ToolMenuComments.deleteComments([{ index: 2 }]);
// Set a comment as resolved
ToolMenuComments.setResolve(1);
// Sort comments
ToolMenuComments.sortComments("newest");
// Close the comments section
ToolMenuComments.closeComments();
Tester.close();
```
