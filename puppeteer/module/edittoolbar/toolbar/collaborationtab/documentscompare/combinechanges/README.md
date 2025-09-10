# CombineChanges

Library for comparing and combining document changes.

## Table of Contents

-   [**Methods**](#methods)
    -   [`CombineChanges.fromFile(filePath)`](#combinechangesfromfilefilepath)
    -   [`CombineChanges.fromUrl(url)`](#combinechangesfromurlurl)
    -   [`CombineChanges.fromStorage()`](#combinechangesfromstorage)
    -   [`CombineChanges.setSettings(optionValue)`](#combinechangessetsettingsoptionvalue)
-   [**Example**](#example)

## Methods

### CombineChanges.fromFile(filePath)

```javascript
/**
 * Load document from file for comparison
 * By default, file is loaded from puppeteer/files folder
 * @param {string} filePath - File path or name of the file.
 */
CombineChanges.fromFile(filePath);
```

### CombineChanges.fromUrl(url)

```javascript
/**
 * Load document from URL
 * @param {string} url - URL of the document.
 */
CombineChanges.fromUrl(url);
```

### CombineChanges.fromStorage()

```javascript
/**
 * Load document from storage
 */
CombineChanges.fromStorage();
```

### CombineChanges.setSettings(optionValue)

```javascript
/**
 * Set the compare changes option
 * @param {"Character level" | "Word level"} [optionValue]
 */
CombineChanges.setSettings(optionValue);
```

## Example

```javascript
// Include the CombineChanges library
const { CombineChanges } = require("lib");

// Create test documents
Tester.createFile("docx");

// Load document from file
await CombineChanges.fromFile("test.docx");

// Load document from URL
await CombineChanges.fromUrl("https://example.com/document.docx");

// Load document from storage
await CombineChanges.fromStorage();

// Set comparison settings to character level
await CombineChanges.setSettings("Character level");

// Close the test example
Tester.close();
```