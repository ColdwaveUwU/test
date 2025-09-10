// Test verification settings number format a, b, c,...
const { Footnote, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
Tester.input("Test 1");

// Insert a endnote
Footnote.insertEndnote();
Tester.input("Insert endnote text with number a");
const settings = {
    numberFormat: "a, b, c,...",
};
// Set the settings
Footnote.setNotesSettings(settings, "insert");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:rStyle[1]/@w:val", "186");
Verification.check("word/document.xml", "//w:numFmt[1]/@w:val", "lowerLetter");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
