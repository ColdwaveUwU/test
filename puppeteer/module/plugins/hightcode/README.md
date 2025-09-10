# HightLightCodePlugin

This library allows you to work with the HightLightCode Plugin.

## How to Include

```javascript
const { HightLightCodePlugin } = require("lib");
```

## Functions

### `inputHightLightCode(inputText, option)`

```javascript
/**
 * @typedef {Object} Option
 * @property {string} language - language name
 * @property {string} style - style name
 * @property {string} tab - tab option
 * @property {string} fontName - font name
 * @property {number} fontSize - font size
 */

/**
 * Inputs text into the code highlighting plugin.
 * @param {string} inputText - input text
 * @param {Option} option - object options (language, style, tab, fontName, fontSize)
 */
HightLightCodePlugin.inputHightLightCode(inputText, option);
```

## Example Usage

```javascript
// Include the HightLightCodePlugin library
const { HightLightCodePlugin } = require("lib");
// Creating a Document File
Tester.createFile("docx");
// Creating an object with the code settings
const hightLightCodeOption = {
    language: "apache",
    style: "GitHub",
    tab: "2",
    fontName: "Courier New",
    fontSize: 43,
};
// Add the text "testtest" to the plugin and set its hightLightCodeOption settings
HightLightCodePlugin.inputHightLightCode("testtest", hightLightCodeOption);
// Waiting for file auto-save
Tester.waitAutosave();
// Close the document
Tester.close();
```
