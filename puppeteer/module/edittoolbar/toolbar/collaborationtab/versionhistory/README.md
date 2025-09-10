# VersionHistory

Library for interacting with Version History in the editor.

## Table of Contents

-   [**Methods**](#methods)
    -   [`VersionHistory.openHistory()`](#versionhistoryopenhistory)
    -   [`VersionHistory.close()`](#versionhistoryclose)
    -   [`VersionHistory.setOptions(option)`](#versionhistorysetoptionsoption)
    -   [`VersionHistory.reviewRecord(index, restore)`](#versionhistoryreviewrecordindex-restore)
-   [**Example**](#example)

## Methods

### VersionHistory.seeHistory()

```javascript
/**
 * Opens the version history panel.
 */
VersionHistory.openHistory();
```

### VersionHistory.close()

```javascript
/**
 * Closes the version history panel.
 */
VersionHistory.close();
```

### VersionHistory.setOptions(option)

```javascript
/**
 * Sets the display option for the version history.
 * @param {"Hide" | "Highlight"} option - Option to set
 */
VersionHistory.setOptions("Hide");
```

### VersionHistory.reviewRecord(index, restore)

```javascript
/**
 * Review or restore a history record.
 * @param {number} [index] - Optional index to select directly. If omitted, moves to the next record.
 * @param {boolean} [restore=false] - If true, clicks the restore button for the selected record.
 */
VersionHistory.reviewRecord(); // Selects next record
VersionHistory.reviewRecord(0); // Selects first record
VersionHistory.reviewRecord(2, true); // Selects third record and restores it
```

## Example

```javascript
// Include the VersionHistory library
const { VersionHistory } = require(".lib");

// Create new docx file
Tester.createFile("docx");

// Open the version history panel
VersionHistory.openHistory();

// Set the display option to hide detailed changes
VersionHistory.setOptions("Hide");

// Select the next record in the version history
VersionHistory.reviewRecord();

// Select a specific record by index
VersionHistory.reviewRecord(0); // Selects the first record

// Select and restore a specific record
VersionHistory.reviewRecord(1, true); // Selects and restores the third record

// Close the version history panel
VersionHistory.close();

// Close test example
Tester.close();
```
