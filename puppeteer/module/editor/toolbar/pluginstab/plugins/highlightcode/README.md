# HighlightCodePlugin

This library allows you to work with the HighlightCode Plugin.

## How to Include

```javascript
const { HighlightCodePlugin } = require("lib");
```

## Functions

### `inputHighlightCode(inputText, option)`

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
HighlightCodePlugin.inputHighlightCode(inputText, option);
```

## Example Usage

```javascript
// Include the HighlightCodePlugin library
const { HighlightCodePlugin } = require("lib");
// Creating a Document File
Tester.createFile("docx");
// Creating an object with the code settings
const highlightCodeOption = {
    language: "apache",
    style: "GitHub",
    tab: "2",
    fontName: "Courier New",
    fontSize: 43,
};
// Add the text "testtest" to the plugin and set its highlightCodeOption settings
HighlightCodePlugin.inputHighlightCode("testtest", highlightCodeOption);
// Waiting for file auto-save
Tester.waitAutosave();
// Close the document
Tester.close();
```
