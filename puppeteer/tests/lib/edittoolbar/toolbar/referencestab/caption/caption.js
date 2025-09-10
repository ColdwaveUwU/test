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
