// Test verification button insert
const { Footnote, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
Tester.input("Test 1");

const settings = {
    numberFormat: "1, 2, 3,...",
    startAt: "5",
};
// Set the settings
Footnote.setNotesSettings(settings, "insert");
// Insert a footnote
Tester.input("Insert footnote text with number 5");
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:rStyle[1]/@w:val", "183");
Verification.check("word/document.xml", "//w:numStart[1]/@w:val", "5");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
