# Caption

This module implements interaction with the Caption.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Caption.addLabel(labelName)`](#captionaddlabellabelname)
    -   [`Caption.deleteLabel(labelName)`](#captiondeletelabellabelname)
    -   [`Caption.setCaptionSettings(settings)`](#captionsetcaptionsettingssettings)
    -   [`Caption.cancelCaptionSettings(settings)`](#captioncancelcaptionsettingssettings)
-   [**Example**](#example)

## Methods

### Caption.addLabel(labelName)

```javascript
/**
 * Adds a new label
 * @param {string} labelName
 */
Caption.addLabel("Test Label");
```

### Caption.deleteLabel(labelName)

```javascript
/**
 * Deletes a label
 * @param {string} labelName
 */
Caption.deleteLabel("Test Label");
```

### Caption.setCaptionSettings(settings)

```javascript
/**
 * Sets multiple settings in the Caption dialog window
 * @param {CaptionSettings} settings - Caption settings object
 */
Caption.setCaptionSettings({
    excludeLabelFromCaption: true,
    includeChapterNumber: true,
    label: "Test Label",
    numbering: "I, II, III,...",
    useSeparator: ":     (colon)",
    chapterStyle: "Heading 7",
    captionName: "Test Caption Name",
});
```

### Caption.cancelCaptionSettings(settings)

```javascript
/**
 * Opens the caption settings dialog, applies the provided settings, and then cancels the changes.
 * @param {CaptionSettings} settings - An object containing the caption settings to apply before cancellation.
 */
Caption.cancelCaptionSettings({
    excludeLabelFromCaption: true,
    includeChapterNumber: true,
    label: "Test Label",
    numbering: "I, II, III,...",
    useSeparator: ":     (colon)",
    chapterStyle: "Heading 7",
    captionName: "Test Caption Name",
});
```

## Example

```javascript
const { Caption } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Add a new label
Caption.addLabel("TestLabel");

// Set all settings at once
Caption.setCaptionSettings({
    excludeLabelFromCaption: true,
    includeChapterNumber: true,
    label: "TestLabel",
    numbering: "I, II, III,...",
    useSeparator: ":     (colon)",
    chapterStyle: "Heading 7",
    captionName: "Test Caption Name",
});

// Delete label
Caption.deleteLabel("TestLabel");

// Close the test
Tester.close();
```
