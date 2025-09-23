# ToolMenuSearch

This library is designed to automate the operations of searching and replacing text in the editor.

## How to Include

You can include this module in your project as follows:

```javascript
const { ToolMenuSearch } = require("lib");
```

## Functionality

For more detailed functionality, refer to the [**ToolMenuSearch Functionality documentation**](/puppeteer/module/toolmenu/toolmenusearch/FUNCTIONALITY.md).

## Example Usage

Here's an example of how to use the functions provided by this module:

```javascript
const { ToolMenuSearch } = require("lib");
Tester.createFile("docx");
// Find text in the document
ToolMenuSearch.findText("searchTerm", { sensitive: false, words: true });

// Replace text in the document
ToolMenuSearch.replaceText({ find: "oldText", replace: "newText", method: "all", sensitive: true, words: true });
Tester.close();
```

You can use these functions to automate text search and replacement tasks in a PDF viewer application.

## Options

### `Option`

-   `sensitive` (boolean): Indicates whether the search should be case-sensitive.
-   `words` (boolean): Indicates whether the search should match whole words.

### `replaceOption`

-   `find` (string): The text to search for and potentially replace.
-   `replace`(string): The text to replace found text.
-   `method` ("all" | "once"): The replacement method. Use "all" to replace all occurrences, by default method it's set to "once".
