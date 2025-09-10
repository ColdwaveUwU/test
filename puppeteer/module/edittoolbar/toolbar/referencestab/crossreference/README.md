# CrossReference

This module implements interaction with the Cross-reference button.

## Table of Contents

-   [**Methods**](#methods)
    -   [`CrossReference.setCrossReferenceSettings(settings)`](#crossreferencesetcrossreferencesettingssettings)
-   [**Example**](#example)

## Methods

### CrossReference.setCrossReferenceSettings(settings)

```javascript
/**
 * Set multiple Cross-reference settings
 * @param {Object} settings
 * @param {"Numbered item" | "Heading" | "Bookmark" | "Footnote" | "Endnote" | "Equation" | "Figure" | "Table"} [settings.referenceType] - Reference type
 * @param {string} [selectItemByName] - Name of the item to select
 * @param {string} [insertReferenceTo] - Insert reference to
 * @param {boolean} [insertAsHyperlink] - Insert as hyperlink
 * @param {boolean} [includeAboveBelow] - Include above/below
 * @param {string} [separator] - Separator value
 */
CrossReference.setCrossReferenceSettings(settings);
```

## Example

```javascript
const { CrossReference, TableOfContents } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Add text for Level 1 heading
TableOfContents.addText("Level 1");

// Input test data for Level 1
Tester.input("Test 1\n");

// Add text for Level 2 heading
TableOfContents.addText("Level 2");

// Input test data for Level 2
Tester.input("Test 2\n");

// Add text for Level 3 heading
TableOfContents.addText("Level 3");

// Input test data for Level 3
Tester.input("Test 3\n");

// Set Cross-reference settings
CrossReference.setCrossReferenceSettings({
    referenceType: "Heading",
    selectItemByName: "Test 3",
    insertReferenceTo: "Heading number (full context)",
    insertAsHyperlink: true,
    includeAboveBelow: true,
});

// Close the test
Tester.close();
```
