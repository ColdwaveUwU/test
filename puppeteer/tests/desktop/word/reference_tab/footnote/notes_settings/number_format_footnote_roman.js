// Test verification settings number format i, ii, iii,...
const { Footnote, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
Tester.input("Test 1");

// Insert a footnote
Footnote.insertFootnote();
Tester.input("Insert footnote text with number i");
const settings = {
    numberFormat: "i, ii, iii,...",
};
// Set the settings
Footnote.setNotesSettings(settings, "insert");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:rStyle[1]/@w:val", "183");
Verification.check("word/document.xml", "//w:numFmt[1]/@w:val", "lowerRoman");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
