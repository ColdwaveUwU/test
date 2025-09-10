# MailMerge

Library for interacting with Mail Merge functionality in the Collaboration tab.

## Table of Contents

-   [**Methods**](#methods)
    -   [`MailMerge.fromFile(filePath)`](#mailmergefromfilefilepath)
    -   [`MailMerge.fromUrl(url)`](#mailmergefromurlurl)
    -   [`MailMerge.fromStorage()`](#mailmergefromstorage)
    -   [`MailMerge.setCheckbox(name, isChecked)`](#mailmergesetcheckboxname-ischecked)
    -   [`MailMerge.next(count)`](#mailmergenextcount)
    -   [`MailMerge.prev(count)`](#mailmergeprevcount)
    -   [`MailMerge.first()`](#mailmergefirst)
    -   [`MailMerge.last()`](#mailmergelast)
    -   [`MailMerge.setFormat(format)`](#mailmergesetformatformat)
    -   [`MailMerge.setRange(from, to)`](#mailmergesetrangefrom-to)
    -   [`MailMerge.save()`](#mailmergesave)
    -   [`MailMerge.download()`](#mailmergedownload)
-   [**Example**](#example)

## Methods

### MailMerge.fromFile(filePath)

```javascript
/**
 * Load document from file for mail merge.
 * @param {string} [filePath] - File path or name of the file.
 */
MailMerge.fromFile(filePath);
```

### MailMerge.fromUrl(url)

```javascript
/**
 * Load document from URL for mail merge.
 * @param {string} [url] - URL of the document.
 */
MailMerge.fromUrl(url);
```

### MailMerge.fromStorage()

```javascript
/**
 * Load document from storage for mail merge.
 */
MailMerge.fromStorage();
```

### MailMerge.setCheckbox(name, isChecked)

```javascript
/**
 * Sets the state of a checkbox.
 * @param {"Highlight" | "Preview" | "All" | "Current" | "From"} [name] - Name of the checkbox to set.
 * @param {boolean} [isChecked = true] - Whether the checkbox should be checked or not.
 */
MailMerge.setCheckbox(name, isChecked);
```

### MailMerge.next(count)

```javascript
/**
 * Navigate to the next record.
 * @param {number} [count = 1] - The number of times to navigate to the next record.
 */
MailMerge.next(count);
```

### MailMerge.prev(count)

```javascript
/**
 * Navigate to the previous record.
 * @param {number} [count = 1] - The number of times to navigate to the previous record.
 */
MailMerge.prev(count);
```

### MailMerge.first()

```javascript
/**
 * Navigate to the first record.
 */
MailMerge.first();
```

### MailMerge.last()

```javascript
/**
 * Navigate to the last record.
 */
MailMerge.last();
```

### MailMerge.setFormat(format)

```javascript
/**
 * Set the format of the document.
 * @param {string} [format] - The format to set.
 */
MailMerge.setFormat(format);
```

### MailMerge.setRange(from, to)

```javascript
/**
 * Sets the value of the "from" and "to" fields (record range).
 * @param {number|string} from - The value to set in the "from" field (start record).
 * @param {number|string} to - The value to set in the "to" field (end record).
 */
MailMerge.setRange(from, to);
```

### MailMerge.save()

```javascript
/**
 * Save the document.
 */
MailMerge.save();
```

### MailMerge.download()

```javascript
/**
 * Download the document.
 */
MailMerge.download();
```

## Example

```javascript
const { MailMerge } = require("lib");
Tester.createFile("docx");

// Load data from file
MailMerge.fromFile("documents/xlsx/test-data.xlsx");

// Set checkboxes
MailMerge.setCheckbox("Highlight");
MailMerge.setCheckbox("Preview");
MailMerge.setCheckbox("Current");
MailMerge.setCheckbox("All");
MailMerge.setCheckbox("From");

// Set range of records
MailMerge.setRange(2, 2);

// Navigate to the next record two times
MailMerge.next(2);
// Navigate to the previous record two times
MailMerge.prev(2);
// Navigate to the last record
MailMerge.last();
// Navigate to the first record
MailMerge.first();

// Format
MailMerge.setFormat("Docx");

// Save
MailMerge.save();

// Download
MailMerge.download();

// Close test example
Tester.close();
```
