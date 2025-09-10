# Functionality

Description of the [**ToolMenuSearch**](/puppeteer/module/toolmenu/toolmenusearch/README.md) library methods.

### `findText`

```javascript
/**
 * Finds text in the document.
 * @param {string | number} text - The text to search for.
 * @param {Option} option - An object containing search options.
 * @returns {Promise<void>}
 */
ToolMenuSearch.findText(text, (option = { sensitive: false, words: false }));
```

Use this function to search for text in a file. You can specify the text to search for and provide search parameters using the `option` parameter. The search parameters include sensitivity (`sensitive`) and whole word selection (`words`).

### `replaceText`

```javascript
/**
 * Replaces text in the document.
 * @param {replaceOption} option - An object containing replacement options.
 * @returns {Promise<void>}
 */
ToolMenuSearch.replaceText((option = { text: "", replace: "all" }));
```

This function allows you to replace text in a document. You can specify the replacement text and the replacement method ("all" or undefined) using the `option` parameter.
