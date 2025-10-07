# ToolMenuSearch

This library implements interaction with the Search and Replace functionality.

## Table of Contents

-   [**Types**](#types)
    -   [`SearchOptions`](#searchoptions)
    -   [`SpreadsheetTextContent`](#spreadsheettextcontent)
    -   [`SearchResult`](#searchresult)
    -   [`ReplaceOptions`](#replaceoptions)
-   [**Methods**](#methods)
    -   [`ToolMenuSearch.findText(text, options)`](#toolmenusearchfindtexttext-options)
    -   [`ToolMenuSearch.getSearchResultByIndex(index)`](#toolmenusearchgetsearchresultbyindexindex)
    -   [`ToolMenuSearch.getSearchResultsList()`](#toolmenusearchgetsearchresultslist)
    -   [`ToolMenuSearch.replaceText(options)`](#toolmenusearchreplacetextoptions)
    -   [`ToolMenuSearch.selectSearchResultByIndex(index, resultsList)`](#toolmenusearchselectsearchresultbyindexindex-resultslist)
-   [**Example**](#example)

## Types

### SearchOptions

Object containing search options.

```javascript
/**
 * @typedef {Object} SearchOptions
 * @property {boolean} sensitive - Whether the search should be case-sensitive.
 * @property {boolean} words - Whether the search should match whole words.
 * @property {number} resultIndex - The index of the search result to select (1-based index).
 * @property {"Sheet" | "Workbook" | "Specific range"} within - The within option to select. Only for spreadsheet editor.
 * @property {"By rows" | "By columns"} search - The search option to select. Only for spreadsheet editor.
 * @property {"Formulas" | "Values"} lookIn - The lookIn option to select. Only for spreadsheet editor.
 */
```

### SpreadsheetTextContent

Object containing structured data for spreadsheet search results.

```javascript
/**
 * @typedef {Object} SpreadsheetTextContent
 * @property {string} sheet - The sheet name.
 * @property {string} name - The name of the search result.
 * @property {string} cell - The cell of the search result.
 * @property {string} value - The value of the search result.
 * @property {string} formula - The formula of the search result.
 */

```

### SearchResult

Object representing a single search result.

```javascript
/**
 * @typedef {Object} SearchResult
 * @property {number} index - The index of the search result.
 * @property {string|SpreadsheetTextContent} textContent - The text content of the search result or structured data object with sheet, name, cell, value, formula properties.
 * @property {string} id - The id of the search result.
 * @property {string} className - The class name of the search result.
 * @property {string} buttonSelector - The button selector of the search result.
 * @property {boolean} isSelected - Whether the search result is selected.
 */

```

### ReplaceOptions

Object containing replacement options.

```javascript
/**
 * @typedef {Object} ReplaceOptions
 * @property {string} find - The text to search for.
 * @property {string} replace - The text to replace.
 * @property {"once" | "all"} method - The replacement method. Use "all" to replace all occurrences, by default method it's set to "once".
 * @property {boolean} sensitive - Whether the search should be case-sensitive.
 * @property {boolean} words - Whether the search should match whole words.
 * @property {number} resultIndex - The index of the search result to select (1-based index).
}
 */
```

## Methods

### ToolMenuSearch.findText(text, options)

```javascript
/**
 * Finds text in the editor.
 * @param {string} text - The text to search for.
 * @param {SearchOptions} [options] - Search options.
 * @param {boolean} [options.sensitive] - Whether the search should be case-sensitive.
 * @param {boolean} [options.words] - Whether the search should match whole words.
 * @param {number} [options.resultIndex] - The index of the search result to select (1-based index).
 * @param {"Sheet" | "Workbook" | "Specific range"} [options.within] - The within option to select. Only for spreadsheet editor.
 * @param {"By rows" | "By columns"} [options.search] - The search option to select. Only for spreadsheet editor.
 * @param {"Formulas" | "Values"} [options.lookIn] - The lookIn option to select. Only for spreadsheet editor.
 */
ToolMenuSearch.findText(text, options);
```

### ToolMenuSearch.getSearchResultByIndex(index)

```javascript
/**
 * Retrieves a search result by index.
 * @param {number} [index] - The index of the search result to retrieve (1-based index).
 * @returns {SearchResult} The search result.
 * @returns {number} return.index - The index of the search result.
 * @returns {string|SpreadsheetTextContent} return.textContent - The text content of the search result or structured data object with sheet, name, cell, value, formula properties.
 * @returns {string} return.id - The id of the search result.
 * @returns {string} return.className - The class name of the search result.
 * @returns {string} return.buttonSelector - The button selector of the search result.
 * @returns {boolean} return.isSelected - Whether the search result is selected.
 */
ToolMenuSearch.getSearchResultByIndex(index);
```

### ToolMenuSearch.getSearchResultsList()

```javascript
/**
 * Retrieves the search results list.
 * @returns {Promise<Array<SearchResult>>} The search results list.
 */
ToolMenuSearch.getSearchResultsList();
```

### ToolMenuSearch.replaceText(options)

```javascript
/**
 * Replaces occurrences of a specified text in the editor.
 * @param {ReplaceOptions} options - Replacement parameters.
 * @param {string} options.find - The text to search for.
 * @param {string} options.replace - The text to replace.
 * @param {"once" | "all"} [options.method] - The replacement method. Use "all" to replace all occurrences, by default method it's set to "once".
 * @param {boolean} [options.sensitive] - Whether the search should be case-sensitive.
 * @param {boolean} [options.words] - Whether the search should match whole words.
 * @param {number} [options.resultIndex] - The index of the search result to select (1-based index).
 */
ToolMenuSearch.replaceText(options);
```

### ToolMenuSearch.selectSearchResultByIndex(index, resultsList)

```javascript
/**
 * Selects a search result by index.
 * @param {number} [index] - The index of the search result to select (1-based index).
 * @param {Array<SearchResult>} [resultsList] - The list of search results.
 */
ToolMenuSearch.selectSearchResultByIndex(index, resultsList);
```

## Example

```javascript
// Include the ToolMenuSearch library
const { ToolMenuSearch } = require("lib");

// Create a new document
Tester.createFile("docx");

// Add some text to the document
// ... (code to add text)

// Find text in the document
ToolMenuSearch.findText("example", {
    sensitive: true,
    words: false,
    resultIndex: 1,
});

// Get search results list
const searchResults = await ToolMenuSearch.getSearchResultsList();
console.log(`Found ${searchResults.length} results`);

// Get specific search result
const firstResult = await ToolMenuSearch.getSearchResultByIndex(1);
console.log(`First result: ${firstResult.textContent}`);

// Replace text once
ToolMenuSearch.replaceText({
    find: "example",
    replace: "sample",
    method: "once",
    sensitive: false,
    words: true,
});

// Replace all occurrences
ToolMenuSearch.replaceText({
    find: "old text",
    replace: "new text",
    method: "all",
});

// For spreadsheet editor, use additional options
ToolMenuSearch.findText("value", {
    within: "Sheet",
    search: "By rows",
    lookIn: "Values",
    resultIndex: 2,
});

// Close the test example
Tester.close();
```
