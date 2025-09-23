# Footnote

This library implements interaction with the footnote button

## Table of Contents

-   [**Objects**](#objects)
    -   [`NotesSettings`](#notessettings)
-   [**Methods**](#methods)

    -   [`Footnote.insertFootnote()`](#footnoteinsertfootnote)
    -   [`Footnote.insertEndnote()`](#footnoteinsertendnote)
    -   [`Footnote.deleteAllNotes(footnotes, endnotes)`](#footnotedeleteallnotesfootnotes-endnotes)
    -   [`Footnote.convertAllFootnotesToEndnotes()`](#footnoteconvertallfootnotestoendnotes)
    -   [`Footnote.convertAllEndnotesToFootnotes()`](#footnoteconvertallendnotestofootnotes)
    -   [`Footnote.swapFootnotesAndEndnotes()`](#footnoteswapfootnotesandendnotes)
    -   [`Footnote.setNotesSettings(settings)`](#footnotesetnotessettingssettings)
    -   [`Footnote.goToFootnotes(option, clickCount = 1)`](#footnotegotofootnotesoption-clickcount--1)
    -   [`Footnote.goToEndnotes(option, clickCount = 1)`](#footnotegotofootnotesoption-clickcount--1)
    -   [`Footnote.clickFootnote()`](#footnoteclickfootnote)

-   [**Example**](#example)

## Objects

### NotesSettings

```javascript
/**
 * @typedef {Object} NotesSettings
 * @property {string} [location] - Notes location ("Bottom of page" or "Below text" or "End of section" or "End of document")
 * @property {string} [numberFormat] - Number format ("1, 2, 3,...", "a, b, c,...", "A, B, C,...", "i, ii, iii,...", "I, II, III,...")
 * @property {string} [startAt] - Start from number
 * @property {string} [numbering] - Numbering ("Continuous", "Restart each section", "Restart each page")
 * @property {string} [customMark] - Custom mark
 * @property {string} [applyChangesTo] - Apply changes to ("Whole document" etc.)
 */
```

## Methods

### Footnote.insertFootnote()

```javascript
/**
 * Selects 'Insert footnote' option
 */
Footnote.insertFootnote();
```

### Footnote.insertEndnote()

```javascript
/**
 * Selects 'Insert endnote' option
 */
Footnote.insertEndnote();
```

### Footnote.deleteAllNotes(footnotes, endnotes)

```javascript
/**
 * Selects 'Delete all notes' option
 * @param {boolean} footnotes - Delete footnotes (default: true)
 * @param {boolean} endnotes - Delete endnotes (default: true)
 */
Footnote.deleteAllNotes(footnotes, endnotes);
```

### Footnote.convertAllFootnotesToEndnotes()

```javascript
/**
 * Selects 'Convert all footnotes to endnotes' option
 */
Footnote.convertAllFootnotesToEndnotes();
```

### Footnote.convertAllEndnotesToFootnotes()

```javascript
/**
 * Selects 'Convert all endnotes to footnotes' option
 */
Footnote.convertAllEndnotesToFootnotes();
```

### Footnote.swapFootnotesAndEndnotes()

```javascript
/**
 * Selects 'Swap footnotes and endnotes' option
 */
Footnote.swapFootnotesAndEndnotes();
```

### Footnote.setNotesSettings(settings)

```javascript
/**
 * Sets settings in Notes settings window
 * @param {NotesSettings} settings - Notes settings
 * @param {"insert" | "apply"} method - Method to use to set the settings (default: "insert")
 */
Footnote.setNotesSettings(settings, method);
```

### Footnote.goToFootnotes(option, clickCount = 1)

```javascript
/**
 * Goes to footnotes
 * @param {"next" | "previous"} option - Next or previous
 * @param {number} clickCount - Number of clicks
 */
Footnote.goToFootnotes(option, clickCount);
```

### Footnote.goToEndnotes(option, clickCount = 1)

```javascript
/**
 * Goes to endnotes
 * @param {"next" | "previous"} option - Next or previous
 * @param {number} clickCount - Number of clicks
 */
Footnote.goToEndnotes(option, clickCount);
```

### Footnote.clickFootnote()

```javascript
/**
 * Clicks the footnote default button
 */
Footnote.clickFootnote();
```

## Example

```javascript
const { Footnote } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Click the footnote default button
Footnote.clickFootnote();

const settings = {
    location: "End of section",
    numberFormat: "a, b, c,...",
    startAt: "a",
    numbering: "Restart each section",
    applyChangesTo: "Whole document",
};

// Set the settings
Footnote.setNotesSettings(settings, "insert");

// Insert a footnote and an endnote
Footnote.insertFootnote();
Footnote.insertEndnote();

// Go to footnotes and endnotes
Footnote.goToFootnotes("next");
Footnote.goToFootnotes("previous");
Footnote.goToEndnotes("next");
Footnote.goToEndnotes("previous");

// Conversion and deletion
Footnote.convertAllFootnotesToEndnotes();
Footnote.convertAllEndnotesToFootnotes();
Footnote.swapFootnotesAndEndnotes();
Footnote.deleteAllNotes();

// Close the test file
Tester.close();
```
