# CompareChanges

Library for interacting with Compare Changes functionality.

## Table of Contents

-   [**Methods**](#methods)
    -   [`CompareChanges.fromFile(filePath)`](#comparechangesfromfilefilepath)
    -   [`CompareChanges.fromUrl(url)`](#comparechangesfromurlurl)
    -   [`CompareChanges.fromStorage()`](#comparechangesfromstorage)
    -   [`CompareChanges.setSettings(optionValue)`](#comparechangessetsettingsoptionvalue)
-   [**Example**](#example)

## Methods

### CompareChanges.fromFile(filePath)

```javascript
/**
 * Load document from file for comparison
 * By default, file is loaded from puppeteer/files folder
 * @param {string} filePath - File path or name of the file.
 */
CompareChanges.fromFile(filePath);
```

### CompareChanges.fromUrl(url)

```javascript
/**
 * Load document from URL for comparison
 * @param {string} url - URL of the document
 */
CompareChanges.fromUrl(url);
```

### CompareChanges.fromStorage()

```javascript
/**
 * Load document from storage for comparison
 */
CompareChanges.fromStorage();
```

### CompareChanges.setSettings(optionValue)

```javascript
/**
 * Set comparison settings
 * @param {"Character level" | "Word level"} [optionValue] - Comparison level setting
 */
CompareChanges.setSettings(optionValue);
```

## Example

```javascript
// Include the CompareChanges library
const { CompareChanges } = require("lib");

// Open the file to compare
Tester.createFile("docx");

// Load document from file
await CompareChanges.fromFile("document.docx");

// Set comparison settings to word level
CompareChanges.setSettings("Word level");

// Load document from URL
await CompareChanges.fromUrl("https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.docx");

// Load document from storage
await CompareChanges.fromStorage();

// Close the test example
Tester.close();
```