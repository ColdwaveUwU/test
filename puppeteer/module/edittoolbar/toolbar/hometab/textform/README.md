# TextForm

This library interacts with the text display options in the Home tab

## Table of Contents

-   [**Object**](#object)
-   [**Methods**](#methods)
    -   [`TextForm.clickDecIndent()`](#textformclickdecindent)
    -   [`TextForm.clickIncIndent()`](#textformclickincindent)
    -   [`TextForm.clickLineSpacing(size, options)`](#textformclicklinespacingsize-options)
    -   [`TextForm.clickBullets(bullet)`](#textformclickbulletsbullet)
    -   [`TextForm.clickNumbering(numbering)`](#textformclicknumberingnumbering)
    -   [`TextForm.clickMultilevels(multilevels)`](#textformclickmultilevelsmultilevels)
    -   [`TextForm.clickAlignLeft()`](#textformclickalignleft)
    -   [`TextForm.clickAlignCenter()`](#textformclickaligncenter)
    -   [`TextForm.clickAlignRight()`](#textformclickalignright)
    -   [`TextForm.clickJustified()`](#textformclickjustified)
    -   [`TextForm.selectNonPrintChar(select)`](#textformselectnonprintcharselect)
    -   [`TextForm.clickShading(color)`](#textformclickshadingcolor)
    -   [`TextForm.setBulletsListSettings(settings)`](#textformsetbulletslistsettingssettings)
    -   [`TextForm.setNumberingListSettings(settings)`](#textformsetnumberinglistsettingssettings)
    -   [`TextForm.setMultiLevelListSettings(settings)`](#textformsetmultilevellistsettingssettings)
    -   [`TextForm.setTextDirection(direction)`](#textformsettextdirectiondirection)
    -   [`TextForm.setBorders(optionValue)`](#textformsetbordersoptionvalue)
    -   [`TextForm.setBorderStyle(optionValue)`](#textformsetborderstyleoptionvalue)
    -   [`TextForm.setBorderColor(color)`](#textformsetbordercolorcolor)
    -   [`TextForm.setStyle(optionValue)`](#textformsetstyleoptionvalue)
    -   [`TextForm.addNewStyle(styleName, nextParagraphStyle)`](#textformaddnewstylestylename-nextparagraphstyle)
    -   [`TextForm.changeMultilevelListLevel(optionValue)`](#textformchangemultilevellistleveloptionvalue)
    -   [`TextForm.changeNumberingListLevel(optionValue)`](#textformchangenumberinglistleveloptionvalue)
    -   [`TextForm.changeBulletsListLevel(optionValue)`](#textformchangebulletslistleveloptionvalue)
-   [**Example**](#example)

## Object

### MultiLevelListSettings

```javascript
/**
 * @typedef {Object} MultilevelListSettings
 * @property {string} listLevel - The list level
 * @property {string} type - The type of the list
 * @property {string} numberFormat - The numbering format
 * @property {string} includeLevelNumber - The include level number
 * @property {string} size - The size of the list
 * @property {boolean} bold - true to enable Bold, false to disable Bold
 * @property {boolean} italic - true to enable Italic, false to disable Italic
 * @property {Color} color - The color of the numbering list
 * @property {string} font - The font of the numbering list
 * @property {string} startAt - The start at of the list
 * @property {boolean} restartList - true to enable Restart list, false to disable Restart list
 * @property {string} alignment - The alignment of the list
 * @property {string} alignmentAt - The alignment at of the list
 * @property {string} textIndent - The text indent of the list
 * @property {string} followNumberWith - The follow number with of the list
 * @property {string} tabStopAt - The tab stop at of the list
 */
```

### BulletsListSettings

```javascript
/**
 * @typedef {Object} BulletsListSettings
 * @property {"Symbol: ·" | "Symbol: o" | "Symbol: §" | "Symbol: v" | "Symbol: Ø" | "Symbol: ü" | "Symbol: ¨" | "Symbol: –" | "New bullet"} type - The type of the bullets list
 * @property {"Left" | "Center" | "Right"} alignment - The alignment of the bullets list
 * @property {"Like a text" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "22" | "24" | "26" | "28" | "36" | "48" | "72" | "96"} size - The size of the bullets list
 * @property {boolean} bold - true to enable Bold, false to disable Bold
 * @property {boolean} italic - true to enable Italic, false to disable Italic
 * @property {Color} color - The color of the bullets list
 */
```

### NumberingListSettings

```javascript
/**
 * @typedef {Object} NumberingListSettings
 * @property {
 * "None" |
 * "1, 2, 3,..." |
 * "a, b, c,..." |
 * "A, B, C,..." |
 * "i, ii, iii,..." |
 * "I, II, III,..." |
 * "More types"
 * } type - The type of the numbering list
 * @property {string} numberFormat - The numbering format
 * @property {string} font - The font of the numbering list
 * @property {"Left" | "Center" | "Right"} alignment - The alignment of the numbering list
 * @property {
 * "Like a text" |
 * "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" |
 * "22" | "24" | "26" | "28" | "36" | "48" | "72" | "96"
 * } size - The size of the numbering list
 * @property {boolean} bold - true to enable Bold, false to disable Bold
 * @property {boolean} italic - true to enable Italic, false to disable Italic
 * @property {Color} color - The color of the numbering list
 */
```

### LineSpacingOption

```javascript
/**
 * @typedef {Object} LineOption
 * @property {'At least'|'Multiple'|'Exactly'} spacingType
 * @property {number} lineHeight
 * @property {number} beforePar
 * @property {number} afterPar
 * @property {boolean} dontAddIntr
 */
/**
 * @typedef {Object} SpaceOption
 * @property {boolean} beforeAdd
 * @property {boolean} afterAdd
 */
/**
 * @typedef {Object} LineSpacingOption
 * @property {LineOption} line
 * @property {SpaceOption} space
 */
```

## Methods

### `TextForm.setMultiLevelListSettings(settings)`

```javascript
/**
 * Sets the multilevel list settings
 * @param {MultilevelListSettings} settings
 */
TextForm.setMultiLevelListSettings(settings);
```

### `TextForm.setNumberingListSettings(settings)`

```javascript
/**
 * Sets the numbering list settings
 * @param {NumberingListSettings} settings
 */
TextForm.setNumberingListSettings(settings);
```

### `TextForm.setBulletsListSettings(settings)`

```javascript
/**
 * Sets the bullets list settings
 * @param {BulletsListSettings} settings
 */
TextForm.setBulletsListSettings(settings);
```

### `TextForm.clickDecIndent()`

```javascript
/**
 * Click decrease indent
 */
TextForm.clickDecIndent();
```

### `TextForm.clickIncIndent()`

```javascript
/**
 * Click increase indent
 */
TextForm.clickIncIndent();
```

### `TextForm.clickLineSpacing(size, options)`

```javascript
/**
 * Sets the line spacing value
 * @param {string} size
 * @param {LineSpacingOption} options
 */
TextForm.clickLineSpacing(size, options);
```

### `TextForm.clickBullets(bullet)`

```javascript
/**
 * Sets the desired bullets type
 * @param {
 * "None" |
 * "Filled round bullets" |
 * "Hollow round bullets" |
 * "Filled square bullets" |
 * "Star bullets" |
 * "Arrow bullets" |
 * "Checkmark bullets" |
 * "Filled rhombus bullets" |
 * "Dash bullets"
 * } bullet - The value of the bullets to select.
 */
TextForm.clickBullets(bullet);
```

### `TextForm.clickNumbering(numbering)`

```javascript
/**
 * Sets the desired numbering type
 * @param {"none" | "A" | "aDot" | "aBrace" | "numberDot" | "numberBrace" | "iDot" | "iLower"} numbering
 */
TextForm.clickNumbering(numbering);
```

### `TextForm.clickMultilevels(multilevels)`

```javascript
/**
 * Sets the desired multilevels type
 * @param {"none" | "variosnumbullets" | "numbered" | "symbols" | "articles" | "chapters" | "numberedheadings" | "variosheadings"} multilevels
 */
TextForm.clickMultilevels(multilevels);
```

### `TextForm.changeMultilevelListLevel(optionValue)`

```javascript
/**
 * Changes the multilevel list level
 * @param {
 * "Level 1" |
 * "Level 2" |
 * "Level 3" |
 * "Level 4" |
 * "Level 5" |
 * "Level 6" |
 * "Level 7" |
 * "Level 8" |
 * "Level 9"
 * } optionValue - The value of the list level to select.
 */
TextForm.changeMultilevelListLevel(optionValue);
```

### `TextForm.changeNumberingListLevel(optionValue)`

```javascript
/**
 * Changes the numbering list level
 * @param {
 * "Level 1" |
 * "Level 2" |
 * "Level 3" |
 * "Level 4" |
 * "Level 5" |
 * "Level 6" |
 * "Level 7" |
 * "Level 8" |
 * "Level 9"
 * } optionValue - The value of the list level to select.
 */
TextForm.changeNumberingListLevel(optionValue);
```

### `TextForm.changeBulletsListLevel(optionValue)`

```javascript
/**
 * Changes the bullets list level
 * @param {
 * "Level 1" |
 * "Level 2" |
 * "Level 3" |
 * "Level 4" |
 * "Level 5" |
 * "Level 6" |
 * "Level 7" |
 * "Level 8" |
 * "Level 9"
 * } optionValue - The value of the list level to select.
 */
TextForm.changeBulletsListLevel(optionValue);
```

### `TextForm.clickAlignLeft()`

```javascript
/**
 * Click align left button
 */
TextForm.clickAlignLeft();
```

### `TextForm.clickAlignCenter()`

```javascript
/**
 * Click align center button
 */
TextForm.clickAlignCenter();
```

### `TextForm.clickAlignRight()`

```javascript
/**
 * Click align right button
 */
TextForm.clickAlignRight();
```

### `TextForm.clickJustified()`

```javascript
/**
 * Click justified button
 */
TextForm.clickJustified();
```

### `TextForm.selectNonPrintChar(select)`

```javascript
/**
 * Sets the nonprintchar value
 * @param {
 * "Nonprinting characters" |
 * "Hidden table borders" |
 * "All"
 * } select
 * @return {Promise<void>}
 */
TextForm.selectNonPrintChar(select);
```

### `TextForm.setTextDirection(direction)`

```javascript
/**
 * Sets the text direction
 * @param { "Left-to-right" | "Right-to-left" } direction
 */
TextForm.setTextDirection(direction);
```

### `TextForm.clickShading(color)`

```javascript
/**
 * Selects the desired shading color
 * @param {Color} color
 */
TextForm.clickShading(color);
```

This method is used by the [**Color**](../../../../common/color/README.md) object

### `TextForm.setBorders(optionValue)`

```javascript
/**
 * Sets the borders
 * @param {
 * "Bottom borders"
 * | "Top borders"
 * | "Left borders"
 * | "Right borders"
 * | "No borders"
 * | "All borders"
 * | "Outside borders"
 * | "Inside borders"
 * | "Border style"
 * | "Border color"
 * } optionValue - The value of the borders to select.
 */
TextForm.setBorders(optionValue);
```

### `TextForm.setBorderStyle(optionValue)`

```javascript
/**
 * Sets the border style
 * @param {"0.5  pt" | "1  pt" | "1.5  pt" | "2.25  pt" | "3  pt" | "6  pt"} optionValue - The value of the border style to select.
 */
TextForm.setBorderStyle(optionValue);
```

### `TextForm.setBorderColor(color)`

```javascript
/**
 * Sets the border color
 * @param {Color} color
 */
TextForm.setBorderColor(color);
```

### `TextForm.setStyle(optionValue)`

```javascript
/**
 * Sets the style
 * @param {
 * "Normal" |
 * "No spacing" |
 * "Heading 1" |
 * "Heading 2" |
 * "Heading 3" |
 * "Heading 4" |
 * "Heading 5" |
 * "Heading 6" |
 * "Heading 7" |
 * "Heading 8" |
 * "Heading 9" |
 * "Title" |
 * "Subtitle" |
 * "Subtle emphasis" |
 * "Emphasis" |
 * "Intense emphasis" |
 * "Strong" |
 * "Quote" |
 * "Intense quote" |
 * "Subtle reference" |
 * "Intense reference" |
 * "Book title" |
 * "List paragraph" |
 * "Caption" |
 * "Header" |
 * "Footer" |
 * "Footnote text" |
 * "Endnote text"
 * } optionValue - The value of the style to select.
 */
TextForm.setStyle(optionValue);
```

### `TextForm.addNewStyle(styleName, nextParagraphStyle)`

```javascript
/**
 * Adds a new style
 * @param {string} styleName - The name of the style to add.
 * @param {string} nextParagraphStyle - The next paragraph style to set.
 */
TextForm.addNewStyle(styleName, nextParagraphStyle);
```

## Example

```javascript
// Include the Toolbar library
const { TextForm, Color } = require("lib");
// Open the file new.docx
Tester.createFile("docx");
// add text
Tester.input("Example");
Tester.keyDown("Shift");
for (let i = 0; i < 7; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
// using textfrom
TextForm.clickDecIndent();
TextForm.clickIncIndent();
TextForm.clickLineSpacing("2.0", { line: "Exactly" });
TextForm.clickBullets("Arrow bullets");
TextForm.clickNumbering("aDot");
TextForm.clickMultilevels("symbols");
TextForm.clickAlignLeft();
TextForm.clickAlignCenter();
TextForm.clickAlignRight();
TextForm.clickJustified();
TextForm.selectNonPrintChar("Nonprinting characters");
TextForm.clickShading({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});

TextForm.addNewStyle("New style from selection", "Normal");
TextForm.setStyle("Heading 1");
TextForm.setStyle("New style from selection");
TextForm.setBorderStyle("2.25  pt");
TextForm.setBorderColor({
    type: Color.Type.Standard,
    index: 5,
});
TextForm.setBorders("Bottom borders");

TextForm.setTextDirection("Right-to-left");
TextForm.setTextDirection("Left-to-right");

TextForm.setBulletsListSettings({
    type: "Symbol: §",
    alignment: "Center",
    size: "10",
    bold: true,
    italic: true,
    color: {
        type: Color.Type.Standard,
        index: 5,
    },
});

TextForm.setNumberingListSettings({
    numberFormat: "ABC",
    type: "A, B, C,...",
    alignment: "Center",
    font: "Arial",
    size: "12",
    bold: true,
    italic: true,
    color: {
        type: Color.Type.Standard,
        index: 5,
    },
});

TextForm.setMultiLevelListSettings({
    listLevel: "2",
    numberFormat: "ABC",
    type: "A, B, C,...",
    includeLevelNumber: "Level 1",
    startAt: "2",
    restartList: false,
    size: "12",
    bold: true,
    italic: true,
    color: {
        type: Color.Type.Standard,
        index: 5,
    },
    font: "Arial",
    alignment: "Center",
    alignmentAt: "8",
    textIndent: "8",
    followNumberWith: "Tab character",
    tabStopAt: "8",
});

// test change list level
TextForm.clickMultilevels("numbered");
TextForm.changeMultilevelListLevel("Level 9");

TextForm.clickNumbering("A");
TextForm.changeNumberingListLevel("Level 2");

TextForm.clickBullets("Arrow bullets");
TextForm.changeBulletsListLevel("Level 5");

// test close
Tester.close();
```
