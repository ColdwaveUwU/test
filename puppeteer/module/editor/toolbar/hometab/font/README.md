# Font

A library for interacting with text fonts. Interacts with the elements located on the Toolbar tab.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Font.clickBold()`](#fontclickbold)
    -   [`Font.clickItalic()`](#fontclickitalic)
    -   [`Font.clickUnderline()`](#fontclickunderline)
    -   [`Font.clickStrikeout()`](#fontclickstrikeout)
    -   [`Font.clickSuperscript()`](#fontclicksuperscript)
    -   [`Font.clickSubscript()`](#fontclicksubscript)
    -   [`Font.clickIncFont()`](#fontclickincfont)
    -   [`Font.clickDecFont()`](#fontclickdecfont)
    -   [`Font.selectFont(fontName)`](#fontselectfontfontname)
    -   [`Font.setFontSize(size)`](#fontsetfontsizesize)
    -   [`Font.selectFontSize(size)`](#fontselectfontsizesize)
    -   [`Font.clickChangeCase(textCase)`](#fontclickchangecasetextcase)
    -   [`Font.clickHightlight(param)`](#fontclickhightlightparam)
    -   [`Font.clickClearStyle()`](#fontclickclearstyle)
    -   [`Font.clickFontColor(color)`](#fontclickfontcolorcolor)
-   [**Example**](#example)

## Methods

### `Font.clickBold()`

```javascript
// Selects the bold font of the text
Font.clickBold();
```

### `Font.clickItalic()`

```javascript
// Selects the italic font of the text
Font.clickItalic();
```

### `Font.clickUnderline()`

```javascript
// Selects the underline font of the text
Font.clickUnderline();
```

### `Font.clickStrikeout()`

```javascript
// Selects the strikethrough font of the text
Font.clickStrikeout();
```

### `Font.clickSuperscript()`

```javascript
// Selects the Superscript font of the text
Font.clickSuperscript();
```

### `Font.clickSubscript()`

```javascript
// Selects the Superscript font of the text
Font.clickSubscript();
```

### `Font.clickIncFont()`

```javascript
// Selects the increment font size of the text
Font.clickIncFont();
```

### `Font.clickDecFont()`

```javascript
// Selects the deccrement font size of the text
Font.clickDecFont();
```

### `Font.selectFont(fontName)`

```javascript
/**
 * Select a font from the list
 * @param {string} fontName
 */
Font.selectFont(fontName);
```

### `Font.setFontSize(size)`

```javascript
/**
 * Sets custom font size
 * @param {string} size
 */
Font.setFontSize(size);
```

### `Font.selectFontSize(size)`

```javascript
/**
 * Select font size from the list
 * @param {string} size
 */
Font.selectFontSize(size);
```

### `Font.clickChangeCase(textCase)`

```javascript
/**
 * Change text case
 * @param {string} textCase
 */
Font.clickChangeCase(textCase);
```

### `Font.clickHightlight(param)`

```javascript
/**
 * @param {Color|boolean} param
 * @return {Promise<void>}
 */
Font.clickHightlight(param);
```

Sets the color of the highlighter, takes the [**Color**](/puppeteer/module/common/color/README.md) object as a parameter.

### `Font.clickClearStyle()`

```javascript
/**
 * Clicks on the style clear button
 */
Font.clickClearStyle();
```

### `Font.clickFontColor(color)`

Sets the color of the text, the [**Color**](/puppeteer/module/common/color/README.md) object is used as a parameter

```javascript
/**
 * @param {Color} color
 */
Font.clickFontColor(color);
```

## Example

```javascript
// Include the Toolbar library
const { Font } = require("lib");
// Include the Color library
const { Color } = require("lib");
// Open the file new.docx
Tester.createFile("docx");
// Select font size 14
Font.selectFontSize("14");
// Text input with 14 font sizes
Tester.input("Example");
// Set automatic text color
Font.clickFontColor({ type: Color.Type.Auto });
Tester.input("Example1");
// Set Standard text color with index 5 (green)
Font.clickFontColor({ type: Color.Type.Standard, index: 5 });
Tester.input("Example2");
// Set EyeDropper text color and click inside editor
Font.clickFontColor({ type: Color.Type.EyeDropper, x: 100, y: 100 });
Tester.input("Example3");
// Set Custom text color
Font.clickFontColor({
    type: Color.Type.Custom,
    r: 100,
    g: 100,
    b: 100,
});
Tester.input("Example4");
// Set a custom text color using a square and rectangle
Font.clickFontColor({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});
Tester.input("Example5");
// Close the test example
Tester.close();
```
