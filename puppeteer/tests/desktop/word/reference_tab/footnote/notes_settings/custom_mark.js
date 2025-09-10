// Test verification settings custom mark
const { Footnote, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
Tester.input("Test 1");

const settings = {
    customMark: "&&&",
};
// Set the settings
Footnote.setNotesSettings(settings, "insert");
// Insert a footnote
Footnote.insertFootnote();
Tester.input("Insert footnote text with number &&&");
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:rStyle[1]/@w:val", "183");
Verification.check("word/document.xml", "//w:footnoteReference[1]/@w:customMarkFollows", "1");
Verification.check("word/document.xml", "//w:r[2]/w:t[1]/text()[1]", "&&&");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
