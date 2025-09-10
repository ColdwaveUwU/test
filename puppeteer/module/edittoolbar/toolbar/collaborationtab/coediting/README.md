# Co-Editing

Library for interacting with Co-Editing modes.

## Table of Contents

-   [**Methods**](#methods)
    -   [`CoEditing.setMode(optionValue)`](#coeditingsetmodeoptionvalue)
-   [**Example**](#example)

## Methods

### CoEditing.setMode(optionValue)

```javascript
/**
 * Set co-editing mode, by default it's set to Fast.
 * Fast - Real-time co-editing. All changes are saved automatically.
 * Strict - Use the "Save" button to sync the changes you and others make.
 * @param {"Fast","Strict"} [optionValue]
 */
CoEditing.setMode(optionValue);
```

## Example

```javascript
const { CoEditing } = require("lib");

// Create a new file
Tester.createFile("docx");

// Set the co-editing mode to "Fast"
CoEditing.setMode("Fast");

// Set the co-editing mode to "Strict"
CoEditing.setMode("Strict");

// Close the test example
Tester.close();
```
