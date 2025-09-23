# TableOfContents

This module implements interaction with the Table of Contents dialog.

## Table of Contents

-   [**Methods**](#methods)
    -   [`BuildFromStyles`](#buildfromstyles)
    -   [`TableOfContents.setTableOfContentsSettings(settings)`](#tableofcontentssettableofcontentssettingssettings)
    -   [`TableOfContents.removeTableOfContents()`](#tableofcontentsremovetableofcontents)
    -   [`TableOfContents.addText(optionValue)`](#tableofcontentsaddtextoptionvalue)
    -   [`TableOfContents.updateTable(optionValue)`](#tableofcontentsupdatetableoptionvalue)
    -   [`TableOfContents.cancelTableOfContentsSettings(settings)`](#tableofcontentscanceltableofcontentssettingssettings)
    -   [`TableOfContents.clickTableOfContents(optionValue)`](#tableofcontentsclicktableofcontentsoptionvalue)
-   [**Example**](#example)

## Methods

### BuildFromStyles

An object where each key is a style name (TOCStyleName) and the value is the level (number or string) for that style in the Table of Contents.
If a style is not present in this object or its value is 0, the corresponding field will be cleared by pressing Delete.

Example:

```javascript
{
  'Heading 1': 1,
  'Heading 2': 2,
  'Title': 0 // This field will be cleared
}
```

### TableOfContents.setTableOfContentsSettings(settings)

```javascript
/**
 * Sets multiple settings in the Table of Contents dialog at once.
 * Each key in the settings object corresponds to a setting and will call the appropriate method.
 *
 * @param {Object} settings - Table of Contents settings. Possible keys:
 *   - showPageNumbers: boolean
 *   - rightAlignPageNumbers: boolean
 *   - leader: string ("None", "....................", "-----------------", "__________")
 *   - formatAsLinks: boolean
 *   - buildFromLevels: number
 *   - buildFromStyles: BuildFromStyles (see above)
 *   - styles: string ("Current", "Simple", "Online", "Standard", "Modern", "Classic")
 */
TableOfContents.setTableOfContentsSettings({
    showPageNumbers: true,
    rightAlignPageNumbers: true,
    leader: "__________",
    formatAsLinks: true,
    buildFromStyles: {
        "Heading 1": 1,
        "Heading 2": 2,
    },
    styles: "Standard",
});
```

### TableOfContents.removeTableOfContents()

```javascript
/**
 * Removes the table of contents from the document.
 */
TableOfContents.removeTableOfContents();
```

### TableOfContents.addText(optionValue)

```javascript
/**
 * Add text button
 * @param optionValue one of: "Do not show in table of contents", "Level 1", "Level 2", "Level 3"
 */
TableOfContents.addText("Level 1");
```

### TableOfContents.updateTable(optionValue)

```javascript
/**
 * Updates the table of contents via the toolbar
 * @param optionValue one of: "Update entire table", "Update page numbers only" (default: "Update entire table")
 */
TableOfContents.updateTable("Update page numbers only");
```

### TableOfContents.cancelTableOfContentsSettings(settings)

```javascript
/**
 * Cancels the Table of Contents settings modal after applying the provided settings.
 * @param {TableOfContentsSettings} settings - An object containing the settings to be applied before cancellation.
 */
TableOfContents.cancelTableOfContentsSettings(settings);
```

### TableOfContents.clickTableOfContents(optionValue)

```javascript
/**
 * Clicks the Table of Contents button
 * @param { "Table 1" | "Table 2" | "Settings" | "Remove table of contents" } optionValue - Table of Contents option to click (by default, the table of contents button is clicked)
 */
TableOfContents.clickTableOfContents(optionValue);
```

## Example

```javascript
const { TableOfContents } = require("lib");

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

// Click the Table of Contents button
TableOfContents.clickTableOfContents();

// Set the Table of Contents settings
TableOfContents.setTableOfContentsSettings({
    showPageNumbers: true,
    rightAlignPageNumbers: true,
    formatAsLinks: true,
    leader: "None",
    buildFromLevels: 3,
    buildFromStyles: { "Heading 1": 1, "Heading 2": 2, "Heading 3": 3 },
    styles: "Standard",
});

// Update the table of contents
TableOfContents.updateTable();

// Update only page numbers in the table of contents
TableOfContents.updateTable("Update page numbers only");

// Remove the table of contents
TableOfContents.removeTableOfContents();

// Close the test file
Tester.close();
```
