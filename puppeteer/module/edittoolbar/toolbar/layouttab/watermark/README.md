# Watermark

This library implements interaction with the Watermark settings.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Watermark.setWatermark(optionValue)`](#watermarksetwatermarkoptionvalue)
    -   [`Watermark.openWatermarkSettingsWindow()`](#watermarkopenwatermarksettingswindow)
    -   [`Watermark.setWatermarkType(watermarkType)`](#watermarksetwatermarktypewatermarktype)
    -   [`Watermark.setLanguage(language)`](#watermarksetlanguagelanguage)
    -   [`Watermark.setText(text)`](#watermarksettexttext)
    -   [`Watermark.setFont(font)`](#watermarksetfontfont)
    -   [`Watermark.setFontSize(fontSize)`](#watermarksetfontsizefontsize)
    -   [`Watermark.setFontColor(fontColor)`](#watermarksetfontcolorfontcolor)
    -   [`Watermark.setBold()`](#watermarksetbold)
    -   [`Watermark.setItalic()`](#watermarksetitalic)
    -   [`Watermark.setUnderline()`](#watermarksetunderline)
    -   [`Watermark.setStrikethrough()`](#watermarksetstrikethrough)
    -   [`Watermark.setSemitransparent(condition)`](#watermarksetsemitransparentcondition)
    -   [`Watermark.setLayout(layoutType)`](#watermarksetlayoutlayouttype)
    -   [`Watermark.loadImage(loadImageSettings)`](#watermarkloadimageloadimagesettings)
    -   [`Watermark.setScale(scale)`](#watermarksetscalescale)
    -   [`Watermark.applySettings(watermarkSettings)`](#watermarkapplysettingswatermarksettings)
    -   [`Watermark.clickOkButton()`](#watermarkclickokbutton)
    -   [`Watermark.setWatermarkSettings(watermarkSettings)`](#watermarksetwatermarksettingswatermarksettings)
-   [**Example**](#example)

## Methods

### Watermark.setWatermark(optionValue)

```javascript
/**
 * Select watermark option from dropdown menu
 * @param {"Custom watermark" | "Remove watermark"} [optionValue]
 */
Watermark.setWatermark(optionValue);
```

### Watermark.openWatermarkSettingsWindow()

```javascript
/**
 * Open Watermark settings window
 */
Watermark.openWatermarkSettingsWindow();
```

### Watermark.setWatermarkType(watermarkType)

```javascript
/**
 * Select watermark type
 * @param {"None" | "Text watermark" | "Image watermark"} [watermarkType]
 */
Watermark.setWatermarkType(watermarkType);
```

### Watermark.setLanguage(language)

```javascript
/**
 * Select language
 * @param {"العربية‎" | "Deutsch" | "English" | "Español" | "Français" |
 * "Italiano" | "日本語" | "Русский" | "中文"} [language]
 */
Watermark.setLanguage(language);
```

### Watermark.setText(text)

```javascript
/**
 * Set text
 * @param {string} [text]
 */
Watermark.setText(text);
```

### Watermark.setFont(font)

```javascript
/**
 * Select font
 * @param {string} [font]
 */
Watermark.setFont(font);
```

### Watermark.setFontSize(fontSize)

```javascript
/**
 * Select font size
 * @param {string} [fontSize]
 */
Watermark.setFontSize(fontSize);
```

### Watermark.setFontColor(fontColor)

```javascript
/**
 * Select font color
 * @param {Object} [fontColor]
 */
Watermark.setFontColor(fontColor);
```

### Watermark.setBold()

```javascript
/**
 * Set bold
 */
Watermark.setBold();
```

### Watermark.setItalic()

```javascript
/**
 * Set italic
 */
Watermark.setItalic();
```

### Watermark.setUnderline()

```javascript
/**
 * Set underline
 */
Watermark.setUnderline();
```

### Watermark.setStrikethrough()

```javascript
/**
 * Set strikethrough
 */
Watermark.setStrikethrough();
```

### Watermark.setSemitransparent(condition)

```javascript
/**
 * Set semitransparent
 * @param {boolean} [condition]
 */
Watermark.setSemitransparent(condition);
```

### Watermark.setLayout(layoutType)

```javascript
/**
 * Select layout
 * @param {"Horizontal" | "Diagonal"} [layoutType]
 */
Watermark.setLayout(layoutType);
```

### Watermark.loadImage(loadImageSettings)

```javascript
/**
 * Load image
 * @param {{ type: "From file" | "From URL" | "From storage", source: string }} [loadImageSettings]
 */
Watermark.loadImage(loadImageSettings);
```

### Watermark.setScale(scale)

```javascript
/**
 * Select scale
 * @param {"Auto" | "500%" | "200%" | "150%" | "100%" | "50%"} [scale]
 */
Watermark.setScale(scale);
```

### Watermark.applySettings(watermarkSettings)

```javascript
/**
 * Apply settings in Watermark settings window
 * @param {Object} watermarkSettings
 */
Watermark.applySettings(watermarkSettings);
```

### Watermark.clickOkButton()

```javascript
/**
 * Click OK button in Watermark settings window
 */
Watermark.clickOkButton();
```

### Watermark.setWatermarkSettings(watermarkSettings)

```javascript
/**
 * Open Watermark settings window, apply settings and click OK button
 * @param {Object} watermarkSettings
 */
Watermark.setWatermarkSettings(watermarkSettings);
```

## Example

```javascript
// Include the Watermark library
const { Watermark } = require("lib");

// Include the Color library
const { Color } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Open Watermark settings window
Watermark.openWatermarkSettingsWindow();

// Specify text watermark settings
const textWatermarkSettings = {
    watermarkType: "Text watermark",
    language: "Italiano",
    text: "ORIGINALE",
    font: "Verdana",
    fontSize: "58",
    fontColor: { type: Color.Type.Standard, index: 5 },
    bold: true,
    italic: true,
    underline: true,
    strikethrough: true,
    semitransparent: false,
    layout: "Horizontal",
};

// Apply text watermark settings
Watermark.applySettings(textWatermarkSettings);

// Click OK button in Watermark settings window
Watermark.clickOkButton();

// Specify image watermark settings
const imageWatermarkSettings = {
    watermarkType: "Image watermark",
    image: { type: "From file", source: "images/png/testFile.png" },
    scale: "200%",
};

// Set image watermark settings
Watermark.setWatermarkSettings(imageWatermarkSettings);

// Close the test example
Tester.close();
```
