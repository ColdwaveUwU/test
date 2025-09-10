const { Footnote } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Click the footnote default button
Footnote.clickFootnote();

// Set the settings
Footnote.setNotesSettings(
    {
        location: "End of section",
        numberFormat: "a, b, c,...",
        startAt: "a",
        numbering: "Restart each section",
        applyChangesTo: "Whole document",
    },
    "insert"
);

Footnote.setNotesSettings(
    {
        location: "Bottom of page",
        numberFormat: "a, b, c,...",
        startAt: "a",
        numbering: "Restart each section",
        customMark: "1",
        applyChangesTo: "Whole document",
    },
    "insert"
);

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
