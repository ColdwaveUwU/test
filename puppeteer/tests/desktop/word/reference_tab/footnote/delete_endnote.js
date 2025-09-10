// The test deletes a footnote from the text
const { Footnote, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
Tester.input("Test 1");
// Insert a footnote
Footnote.insertFootnote();
Tester.input("Insert footnote text with number 1");
Tester.keyPress("PageUp");
// Insert a endnote
Footnote.insertEndnote();
Tester.input("Insert endnote text with number 1");
Footnote.deleteAllNotes(false, true);
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:endnoteReference[1]/@w:id)", 0);
Verification.check("word/document.xml", "count(//w:footnoteReference[1]/@w:id)", 1);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
