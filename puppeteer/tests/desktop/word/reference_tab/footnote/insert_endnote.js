// The test adds a endnote to the text
const { Footnote, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
Tester.input("Test 1");

// Insert a endnote
Footnote.insertEndnote();
Tester.input("Insert endnote text with number 1");
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:rStyle[1]/@w:val", "186");
Verification.check("word/document.xml", "//w:endnoteReference[1]/@w:id", "2");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
