# Toolbar

The parent library for interacting with various Toolbar elements in edit mode

## Toolbar libs

-   [**HomeTab**](./hometab/README.md)
-   [**InsertTab**](./inserttab/README.md)
-   [**LayoutTab**](./layouttab/README.md)
-   [**ViewTab**](./viewtab/README.md)
-   [**CollaborationTab**](./collaborationtab/README.md)
-   [**ReferencesTab**](./referencestab/README.md)

## Test Example

```javascript
// Include the Toolbar library
const { Font, TextForm } = require("lib");
// Include the Color library
const { Color } = require("lib");
// Open the file new.docx
Tester.openFile("docx/new.docx");
// Select font size 14
Font.selectFontSize("14");
// Set font color settings
Font.clickFontColor({ type: Color.Type.Auto });
Font.clickFontColor({ type: Color.Type.Standard, index: 5 });
Font.clickFontColor({ type: Color.Type.EyeDropper, x: 100, y: 100 });
Font.clickFontColor({
    type: Color.Type.Custom,
    r: 100,
    g: 100,
    b: 100,
});
Font.clickFontColor({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});
// Set highlight color settings
TextForm.clickHightlight({ index: 3 });
// Set shading color settings
TextForm.clickShading({ type: Color.Type.Standard, index: 5 });
TextForm.clickShading({ type: Color.Type.EyeDropper, x: 100, y: 100 });
TextForm.clickShading({
    type: Color.Type.Custom,
    r: 100,
    g: 100,
    b: 100,
});
TextForm.clickShading({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});
// Close the test example
Tester.close();
```
