# Mail Merge Settings

A library for interacting with mail merge settings in the right menu panel. This module provides methods to control various options for generating personalized documents using mail merge, such as navigating records, setting output format, and saving or downloading results.

## Table of Contents

-   [**Methods**](#methods)
    -   [`MailMergeSettings.setCheckbox(name, isChecked)`](#mailmergesettingssetcheckboxname-ischecked)
    -   [`MailMergeSettings.editRecList()`](#mailmergesettingseditreclist)
    -   [`MailMergeSettings.next(count)`](#mailmergesettingsnextcount)
    -   [`MailMergeSettings.prev(count)`](#mailmergesettingsprevcount)
    -   [`MailMergeSettings.first()`](#mailmergesettingsfirst)
    -   [`MailMergeSettings.last()`](#mailmergesettingslast)
    -   [`MailMergeSettings.setFormat(format)`](#mailmergesettingssetformatformat)
    -   [`MailMergeSettings.setRange(from, to)`](#mailmergesettingssetrangefrom-to)
    -   [`MailMergeSettings.save()`](#mailmergesettingssave)
    -   [`MailMergeSettings.download()`](#mailmergesettingsdownload)
-   [**Examples**](#examples)

## Methods

### `MailMergeSettings.setCheckbox(name, isChecked)`

```javascript
/**
 * Sets the state of a checkbox.
 * @param {"Highlight" | "Preview" | "All" | "Current" | "From"} name - Name of the checkbox to set.
 * @param {boolean} [isChecked=true] - Whether the checkbox should be checked or not.
 */
await MailMergeSettings.setCheckbox(name, isChecked);
```

### `MailMergeSettings.editRecList()`

```javascript
/**
 * Opens the record list editor.
 */
await MailMergeSettings.editRecList();
```

### `MailMergeSettings.next(count)`

```javascript
/**
 * Navigate to the next record.
 * @param {number} [count=1] - The number of times to navigate to the next record.
 */
await MailMergeSettings.next(count);
```

### `MailMergeSettings.prev(count)`

```javascript
/**
 * Navigate to the previous record.
 * @param {number} [count=1] - The number of times to navigate to the previous record.
 */
await MailMergeSettings.prev(count);
```

### `MailMergeSettings.first()`

```javascript
/**
 * Navigate to the first record.
 */
await MailMergeSettings.first();
```

### `MailMergeSettings.last()`

```javascript
/**
 * Navigate to the last record.
 */
await MailMergeSettings.last();
```

### `MailMergeSettings.setFormat(format)`

```javascript
/**
 * Sets the output format for the merged document.
 * By default it's set to PDF
 * @param {"Docx" | "PDF"} format - The format to set ("PDF" or "Docx").
 */
await MailMergeSettings.setFormat(format);
```

### `MailMergeSettings.setRange(from, to)`

```javascript
/**
 * Sets the value of the "from" and "to" fields (record range).
 * @param {number} from - The value to set in the "from" field (start record).
 * @param {number} to - The value to set in the "to" field (end record).
 */
await MailMergeSettings.setRange(from, to);
```

### `MailMergeSettings.save()`

```javascript
/**
 * Saves the merged document.
 */
await MailMergeSettings.save();
```

### `MailMergeSettings.download()`

```javascript
/**
 * Downloads the merged document.
 */
await MailMergeSettings.download();
```

## Examples

```javascript
// Include the MailMergeSettings library
const { MailMergeSettings} = require("lib");

// Toggle "Highlight" checkbox 
await MailMergeSettings.setCheckbox("Highlight");
await MailMergeSettings.setCheckbox("Highlight",false);

// Edit the record list
await MailMergeSettings.editRecList();

// Go to the next record
await MailMergeSettings.next();

// Go to the previous record twice
await MailMergeSettings.prev(2);

// Go to the first record
await MailMergeSettings.first();

// Go to the last record
await MailMergeSettings.last();

// Set output format to Docx
await MailMergeSettings.setFormat("Docx");

// Set the range of records to merge
await MailMergeSettings.setRange(1, 10);

// Save the merged document
await MailMergeSettings.save();

// Download the merged document
await MailMergeSettings.download();

// Close test example
Tester.close();
```
