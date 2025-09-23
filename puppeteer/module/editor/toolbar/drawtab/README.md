# Draw

Draw is a library that allows you to draw and can be included in test script files. It includes the following library:

-   [**Color**](/puppeteer/module/common/color/README.md).

## Test Example

```javascript
// Importing the Draw library
const { Draw } = require("lib");
// Importing the Color library
const { Color } = require("lib");
// Opening and loading a test file from the /files/documents directory with the name new2.docx
Tester.openFile("docx/new2.docx");
// Drawing with Pen One using color settings via More Colors with a color shade at coordinates 50 and 100, color 45. Standard brush size, starting coordinates (0, 0) - ending (100, 230)
Draw.penOne(
    { type: Color.Type.CustomClick, x: 50, y: 100, hue: 45 },
    0,
    0,
    0,
    30,
    30
);
Draw.penOne({ index: 5 }, 0, 0, 0, 100, 230);
// Using Pen Two
Draw.penTwo(
    { type: Color.Type.CustomClick, x: 28, y: 14, hue: 28 },
    0,
    0,
    0,
    203,
    78
);
Draw.penTwo({ index: 5 }, 0, 0, 0, 24, 88);
// Using the highlighter
Draw.highlighter(
    { type: Color.Type.CustomClick, x: 45, y: 55, hue: 55 },
    0,
    15,
    15,
    145,
    73
);
Draw.highlighter({ index: 5 }, 0, 15, 15, 145, 73);
// Closing the test example
Tester.close();
```

## Functionality

You can consider the detailed functionality in the [**Draw Functionality**](/puppeteer/module/common//draw/FUNCTIONALITY.md).
