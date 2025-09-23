# ViewViewToolbarCommentLibrary

A library that enables interaction with the editor's toolbar. It includes various functions to interact with the toolbar elements for tasks like adding comments, selecting colors, and more.

## How to Include

```javascript
const { ViewToolbarComment } = require("lib");
```

## Functionality

For more detailed functionality, refer to the [**ViewToolbarComment Functionality documentation**](/puppeteer/module/viewtoolbar/viewtoolbarcomment/FUNCTIONALITY.md).

## Example Usage

```javascript
// Include the ViewToolbarComment library
const { ViewToolbarComment } = require("lib");
// Include the Color library
const { Color } = require("lib");

// Open a file
Tester.openFile("pdf/test.pdf");

// Perform various toolbar actions
ViewToolbarComment.clickComment();
ViewToolbarComment.addComment("testtesttesttest");
ViewToolbarComment.penOne(
    { type: Color.Type.CustomClick, x: 50, y: 100, hue: 45 },
    0,
    0,
    30,
    30,
    "0.5 mm"
);
ViewToolbarComment.clickHighlight({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});
ViewToolbarComment.clickStrikeout({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});
ViewToolbarComment.clickUnderline({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});
ViewToolbarComment.clickShowComments();

// Close the file
Tester.close();
```
