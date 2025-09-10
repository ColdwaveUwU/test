# Color

A library for testing and setting the color of elements (fonts, brushes, etc.). It can be used in test scenarios and is also used in the following libraries:

-   [**Toolbar**](/puppeteer/module/edittoolbar/toolbar/README.md).
-   [**Draw**](/puppeteer/module/common/draw/README.md).

## How to Include

The library is imported into a test script using:

```javascript
const { Color } = require("lib");
```

## Test Example

Here's an example of how to use the Color library in conjunction with the [**Toolbar**](/puppeteer/module/edittoolbar/toolbar/README.md) library:

```javascript
// Importing the Color library
const { Color } = require("lib");
// Importing the Toolbar library
const { Toolbar } = require("lib");
// Loading a file named new.docx into the editor from files/documents
Tester.openFile("docx/new.docx");
// Setting the color in the Auto section
Toolbar.clickFontColor({ type: Color.Type.Auto });
// Setting the color in the Theme section, with index 4 and subindex 4 (Indigo)
Toolbar.clickFontColor({ type: Color.Type.Theme, index: 4, subIndex: 4 });
// Setting the color in the Standard section, with index 5 (Green)
Toolbar.clickFontColor({ type: Color.Type.Standard, index: 5 });
// Using EyeDropper in the editor with coordinates x = 100, y = 100
Toolbar.clickFontColor({ type: Color.Type.EyeDropper, x: 100, y: 100 });
// Setting More Colors using the keyboard with colors r = 100, g = 100, b = 100
Toolbar.clickFontColor({
    type: Color.Type.Custom,
    r: 100,
    g: 100,
    b: 100,
});
// Setting More Colors using the mouse, selecting a shade with coordinates x = 50, y = 100, and color with coordinates y = 45.
Toolbar.clickFontColor({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});
```

## Functionality

You can consider the detailed functionality in the [**Color Functionality.**](/puppeteer/module/common/color/FUNCTIONALITY.md)