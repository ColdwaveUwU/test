# Replace

This library implements interaction with the Replace and Find functionality in the document editor.

## Table of Contents

-   [**Objects**](#objects)
    -   [`ReplaceOption`](#replaceoption)
    -   [`FindOption`](#findoption)
-   [**Methods**](#methods)
    -   [`Replace.selectAll()`](#replaceselectall)
    -   [`Replace.replace(options)`](#replacereplaceoptions)
    -   [`Replace.find(options)`](#replacefindoptions)
-   [**Example**](#example)

## Objects

### ReplaceOption

```javascript
/**
 * @typedef {Object} ReplaceOption
 * @property {string} find - The text to find.
 * @property {string} replace - The text to replace.
 * @property {"once" | "all"} method - The replacement method. Use "all" to replace all occurrences, by default method it's set to "once".
 * @property {boolean} sensitive - Whether the search should be case-sensitive.
 * @property {boolean} words - Whether the search should match whole words.
 */
```

### FindOption

```javascript
/**
 * @typedef {Object} FindOption
 * @property {string} find - The text to find.
 * @property {boolean} sensitive - Whether the search should be case-sensitive.
 * @property {boolean} words - Whether the search should match whole words.
 */
```

## Methods

### Replace.selectAll()

```javascript
/**
 * Selects all text in the editor
 * @return {Promise<void>}
 */
Replace.selectAll();
```

### Replace.replace(options)

```javascript
/**
 * Replaces text in the editor
 * @param {ReplaceOption} options - The options for the replace operation.
 * @return {Promise<void>}
 */
Replace.replace(options);
```

### Replace.find(options)

```javascript
/**
 * Finds text in the editor
 * @param {FindOption} options - The options for the find operation.
 * @return {Promise<void>}
 */
Replace.find(options);
```

## Example

```javascript
// Include the Replace library
const { Replace } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Input test text into the document
Tester.input("test");

// Select all text in the document
Replace.selectAll();

// Perform find operation with empty search string and default options
Replace.find({
    find: "",
    sensitive: false,
    words: false,
});

// Replace "test" with "test2" using once method with case-insensitive and partial word matching
Replace.replace({
    find: "test",
    replace: "test2",
    method: "once",
    sensitive: false,
    words: false,
});

// Close the document and clean up test
Tester.close();
