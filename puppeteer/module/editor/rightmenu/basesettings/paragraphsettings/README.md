# paragraphsettings

A library for interacting with paragraph settings in the right menu panel. This module provides methods to control various paragraph formatting options such as line spacing, indentation and background color.

## Table of Contents

-   [**Methods**](#methods)
    -   [Line Spacing](#line-spacing)
        -   [`ParagraphSettings.selectLineSpacing(optionValue)`](#paragraphsettingsselectlinespacingoptionvalue)
        -   [`ParagraphSettings.setLineSpacing(value)`](#paragraphsettingssetlinespacingvalue)
        -   [`ParagraphSettings.increaseLineSpacing()`](#paragraphsettingsincreaselinespacing)
        -   [`ParagraphSettings.decreaseLineSpacing()`](#paragraphsettingsdecreaselinespacing)
    -   [Paragraph Spacing](#paragraph-spacing)
        -   [`ParagraphSettings.setSpacingBefore(value)`](#paragraphsettingsdecreasespacingbefore)
        -   [`ParagraphSettings.increaseSpacingBefore()`](#paragraphsettingsincreasespacingbefore)
        -   [`ParagraphSettings.decreaseSpacingBefore()`](#paragraphsettingsdecreasespacingbefore)
        -   [`ParagraphSettings.setSpacingAfter(value)`](#paragraphsettingssetspacingaftervalue)
        -   [`ParagraphSettings.increaseSpacingAfter()`](#paragraphsettingsincreasespacingafter)
        -   [`ParagraphSettings.decreaseSpacingAfter()`](#paragraphsettingsdecreasespacingafter)
        -   [`ParagraphSettings.clickDontAddInterval()`](#paragraphsettingsclickdontaddinterval)
    -   [Indentation](#indentation)
        -   [`ParagraphSettings.setLeftIndent(value)`](#paragraphsettingssetleftindentvalue)
        -   [`ParagraphSettings.increaseLeftIndent()`](#paragraphsettingsincreaseleftindent)
        -   [`ParagraphSettings.decreaseLeftIndent()`](#paragraphsettingsdecreaseleftindent)
        -   [`ParagraphSettings.setRightIndent(value)`](#paragraphsettingssetrightindentvalue)
        -   [`ParagraphSettings.increaseRightIndent()`](#paragraphsettingsincreaserightindent)
        -   [`ParagraphSettings.decreaseRightIndent()`](#paragraphsettingsdecreaserightindent)
    -   [Special Indentation](#special-indentation)
        -   [`ParagraphSettings.selectSpecialIndent(optionValue)`](#paragraphsettingsselectspecialindentoptionvalue)
        -   [`ParagraphSettings.setSpecialIndent(value)`](#paragraphsettingssetspecialindentvalue)
        -   [`ParagraphSettings.increaseSpecialIndent()`](#paragraphsettingsincreasespecialindent)
        -   [`ParagraphSettings.decreaseSpecialIndent()`](#paragraphsettingsdecreasespecialindent)
    -   [Background Color](#background-color)
        -   [`ParagraphSettings.clickBackgroundColor(color)`](#paragraphsettingsclickbackgroundcolorcolor)
    -   [Advanced Settings](#advanced-settings)
        -   [`ParagraphSettings.showAdvancedSettings()`](#paragraphsettingsshowadvancedsettings)
        -   [`ParagraphSettings.applySettings(tabName, settings)`](#paragraphsettingsapplysettingstabname-settings)
        -   [`ParagraphSettings.clickOkButton()`](#paragraphsettingsclickokbutton)
-   [**Examples**](#examples)
    -   [Working with settings on the right panel](#working-with-settings-on-the-right-panel)
    -   [Working with settings in the "Paragraph - advanced settings" window](#working-with-settings-in-the-paragraph---advanced-settings-window)

## Methods

### Line Spacing

#### `ParagraphSettings.selectLineSpacing(optionValue)`

```javascript
/**
 * Select line spacing option from dropdown menu
 * @param {"At least" | "Multiple" | "Exactly"} optionValue
 */
ParagraphSettings.selectLineSpacing(optionValue);
```

#### `ParagraphSettings.setLineSpacing(value)`

```javascript
/**
 * Set value to line spacing input
 * @param {string} value
 */
ParagraphSettings.setLineSpacing(value);
```

#### `ParagraphSettings.increaseLineSpacing()`

```javascript
/**
 * Increase value in line spacing input
 */
ParagraphSettings.increaseLineSpacing();
```

#### `ParagraphSettings.decreaseLineSpacing()`

```javascript
/**
 * Decrease value in line spacing input
 */
ParagraphSettings.decreaseLineSpacing();
```

### Paragraph Spacing

#### `ParagraphSettings.setSpacingBefore(value)`

```javascript
/**
 * Set value to spacing before input
 * @param {string} value
 */
ParagraphSettings.setSpacingBefore(value);
```

#### `ParagraphSettings.increaseSpacingBefore()`

```javascript
/**
 * Increase value in spacing before input
 */
ParagraphSettings.increaseSpacingBefore();
```

#### `ParagraphSettings.decreaseSpacingBefore()`

```javascript
/**
 * Decrease value in spacing before input
 */
ParagraphSettings.decreaseSpacingBefore();
```

#### `ParagraphSettings.setSpacingAfter(value)`

```javascript
/**
 * Set value to spacing after input
 * @param {string} value
 */
ParagraphSettings.setSpacingAfter(value);
```

#### `ParagraphSettings.increaseSpacingAfter()`

```javascript
/**
 * Increase value in spacing after input
 */
ParagraphSettings.increaseSpacingAfter();
```

#### `ParagraphSettings.decreaseSpacingAfter()`

```javascript
/**
 * Decrease value in spacing after input
 */
ParagraphSettings.decreaseSpacingAfter();
```

#### `ParagraphSettings.clickDontAddInterval()`

```javascript
/**
 * Click "Don't add interval" checkbox
 */
ParagraphSettings.clickDontAddInterval();
```

### Indentation

#### `ParagraphSettings.setLeftIndent(value)`

```javascript
/**
 * Set value to left indent input
 * @param {string} value
 */
ParagraphSettings.setLeftIndent(value);
```

#### `ParagraphSettings.increaseLeftIndent()`

```javascript
/**
 * Increase value in left indent input
 */
ParagraphSettings.increaseLeftIndent();
```

#### `ParagraphSettings.decreaseLeftIndent()`

```javascript
/**
 * Decrease value in left indent input
 */
ParagraphSettings.decreaseLeftIndent();
```

#### `ParagraphSettings.setRightIndent(value)`

```javascript
/**
 * Set value to right indent input
 * @param {string} value
 */
ParagraphSettings.setRightIndent(value);
```

#### `ParagraphSettings.increaseRightIndent()`

```javascript
/**
 * Increase value in right indent input
 */
ParagraphSettings.increaseRightIndent();
```

#### `ParagraphSettings.decreaseRightIndent()`

```javascript
/**
 * Decrease value in right indent input
 */
ParagraphSettings.decreaseRightIndent();
```

### Special Indentation

#### `ParagraphSettings.selectSpecialIndent(optionValue)`

```javascript
/**
 * Select special indent option from dropdown menu
 * @param {"(none)" | "First line" | "Hanging"} optionValue
 */
ParagraphSettings.selectSpecialIndent(optionValue);
```

#### `ParagraphSettings.setSpecialIndent(value)`

```javascript
/**
 * Set value to special indent input
 * @param {string} value
 */
ParagraphSettings.setSpecialIndent(value);
```

#### `ParagraphSettings.increaseSpecialIndent()`

```javascript
/**
 * Increase value in special indent input
 */
ParagraphSettings.increaseSpecialIndent();
```

#### `ParagraphSettings.decreaseSpecialIndent()`

```javascript
/**
 * Decrease value in special indent input
 */
ParagraphSettings.decreaseSpecialIndent();
```

### Background Color

#### `ParagraphSettings.clickBackgroundColor(color)`

```javascript
/**
 * Select background color
 * @param {Color} color - Color object with type and additional parameters
 */
ParagraphSettings.clickBackgroundColor(color);
```

### Advanced Settings

#### `ParagraphSettings.showAdvancedSettings()`

```javascript
/**
 * Open advanced settings window
 */
ParagraphSettings.showAdvancedSettings();
```

#### `ParagraphSettings.applySettings(tabName, settings)`

```javascript
/**
 * Apply settings on chosen tab in advanced settings window
 * @param {string} tabName
 * @param {Object} settings
 */
ParagraphSettings.applySettings(tabName, settings);
```

#### `ParagraphSettings.clickOkButton()`

```javascript
/**
 * Click OK button in advanced settings window
 */
ParagraphSettings.clickOkButton();
```

## Examples

### Working with settings on the right panel

```javascript
// Include the ParagraphSettings library
const { ParagraphSettings } = require("lib");

// Include the Color library
const { Color } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set "Exactly" line spacing
ParagraphSettings.selectLineSpacing("Exactly");

// Set line spacing value "0.3"
ParagraphSettings.setLineSpacing("0.3");

// Increase line spacing value by click on arrow up
ParagraphSettings.increaseLineSpacing();

// Decrease line spacing value by click on arrow down
ParagraphSettings.decreaseLineSpacing();

// Set spacing before value "0.5"
ParagraphSettings.setSpacingBefore("0.5");

// Increase spacing before value by click on arrow up
ParagraphSettings.increaseSpacingBefore();

// Decrease spacing before value by click on arrow down
ParagraphSettings.decreaseSpacingBefore();

// Set spacing after value "0.7"
ParagraphSettings.setSpacingAfter("0.7");

// Increase spacing after value by click on arrow up
ParagraphSettings.increaseSpacingAfter();

// Decrease spacing after value by click on arrow down
ParagraphSettings.decreaseSpacingAfter();

// Click "Don't add interval" checkbox
ParagraphSettings.clickDontAddInterval();

// Set left indent value "0.6"
ParagraphSettings.setLeftIndent("0.6");

// Increase left indent value by click on arrow up
ParagraphSettings.increaseLeftIndent();

// Decrease left indent value by click on arrow down
ParagraphSettings.decreaseLeftIndent();

// Set right indent value "0.8"
ParagraphSettings.setRightIndent("0.8");

// Increase right indent value by click on arrow up
ParagraphSettings.increaseRightIndent();

// Decrease right indent value by click on arrow down
ParagraphSettings.decreaseRightIndent();

// Set First line special indent
ParagraphSettings.selectSpecialIndent("Hanging");

// Set special indent value "0.4"
ParagraphSettings.setSpecialIndent("0.4");

// Increase special indent value by click on arrow up
ParagraphSettings.increaseSpecialIndent();

// Decrease special indent value by click on arrow down
ParagraphSettings.decreaseSpecialIndent();

// Set Standard background color with index 3 (orange)
ParagraphSettings.clickBackgroundColor({ type: Color.Type.Standard, index: 3 });

// Open Advanced settings window
ParagraphSettings.showAdvancedSettings();

// Close the test example
Tester.close();
```

### Working with settings in the "Paragraph - advanced settings" window

```javascript
// Include the ParagraphSettings library
const { ParagraphSettings } = require("lib");

// Include the Color library
const { Color } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Open Advanced settings window
ParagraphSettings.showAdvancedSettings();

// Specify settings for "Indents & spacing" tab
const indentsSettings = {
    alignment: "Right",
    outlineLevel: "Level 3",
    leftIndent: { upArrow: true, arrowClickCount: 4 },
    rightIndent: { value: "0.6" },
    specialIndent: { type: "First line", inputSettings: { value: "1.2" } },
    beforeSpacing: { value: "0.4" },
    afterSpacing: { value: "0.18" },
    lineSpacing: { type: "Exactly", inputSettings: { value: "0.3" } },
    dontAddInterval: true,
    textDirection: "Right-to-left",
};

// Apply settings for "Indents & spacing" tab
ParagraphSettings.applySettings("IndentsSettings", indentsSettings);

// Specify settings for "Line & page breaks" tab
const lineSettings = {
    pageBreakBefore: { condition: true },
    orphanControl: { condition: false },
    suppressLineNumbers: { condition: true },
    keepLinesTogether: { condition: true },
    keepWithNext: { condition: true },
};

// Apply settings for "Line & page breaks" tab
ParagraphSettings.applySettings("LineSettings", lineSettings);

// Specify settings for "Borders & Fill" tab
const bordersSettings = {
    borderSize: "1.5 pt",
    borderColor: { type: Color.Type.Standard, index: 6 },
    borderType: "Outer",
    backgroundColor: { type: Color.Type.Standard, index: 5 },
};

// Apply settings for "Borders & Fill" tab
ParagraphSettings.applySettings("BordersSettings", bordersSettings);

// Specify settings for "Font" tab
const fontSettings = {
    strikethrough: { condition: true },
    doubleStrikethrough: { condition: true },
    superscript: { condition: true },
    subscript: { condition: true },
    smallCaps: { condition: true },
    allCaps: { condition: true },
    spacing: { value: "0.04" },
    position: { value: "0.03" },
    ligatures: "Contextual and discretionary",
};

// Apply settings for "Font" tab
ParagraphSettings.applySettings("FontSettings", fontSettings);

// Specify default tab
const tabsSettingsDefault = { defaultTab: { value: "0.85" } };

// Apply default tab
ParagraphSettings.applySettings("TabsSettings", tabsSettingsDefault);

// Specify settings for first tab
const specifyTab1 = {
    specifyTab: {
        tabPositionSettings: { value: "0.65" },
        alignmentType: "Right",
        leader: 2,
    },
};

// Add first tab
ParagraphSettings.applySettings("TabsSettings", specifyTab1);

// Specify settings for second tab
const specifyTab2 = {
    specifyTab: {
        tabPositionSettings: { value: "0.75" },
        alignmentType: "Center",
        leader: 3,
    },
};

// Add second tab
ParagraphSettings.applySettings("TabsSettings", specifyTab2);

// Specify settings for third tab
const specifyTab3 = {
    specifyTab: {
        tabPositionSettings: { value: "0.85" },
        alignmentType: "Left",
        leader: 4,
    },
};

// Add third tab
ParagraphSettings.applySettings("TabsSettings", specifyTab3);

// Remove second tab
ParagraphSettings.applySettings("TabsSettings", { removeTab: 2 });

// Remove all tabs
ParagraphSettings.applySettings("TabsSettings", { removeAllTabs: true });

// Specify settings for "Paddings" tab
const paddingsSettings = {
    topPadding: { upArrow: true, arrowClickCount: 3 },
    leftPadding: { value: "0.4" },
    bottomPadding: { value: "0.5" },
    rightPadding: { value: "0.6" },
};

// Apply settings for "Paddings" tab
ParagraphSettings.applySettings("PaddingsSettings", paddingsSettings);

// Click OK button in Advanced settings window
ParagraphSettings.clickOkButton();

// Close the test example
Tester.close();
```
