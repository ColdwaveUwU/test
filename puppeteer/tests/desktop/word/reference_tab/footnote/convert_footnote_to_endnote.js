// Test for converting footnotes to endnotes
const { Footnote, FileMenu, Verification } = require("lib");
// Create a new DOCX file for testing
Tester.createFile("docx");

// Insert a footnote and an endnote
Tester.input("Test 1");
Footnote.insertFootnote();
Tester.input("Insert footnote text with number 1");
Tester.keyPress("PageUp");
Tester.keyPress("Enter");
Tester.input("Test 2");
Footnote.insertFootnote();
Tester.input("Insert footnote text with number 2");
Tester.keyPress("PageUp");
Tester.keyPress("Enter");
Tester.input("Test 3");
Footnote.insertEndnote();
Tester.input("Insert endnote text with number 1");

// Conversion
Footnote.convertAllFootnotesToEndnotes();
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[*]/w:r[2]/w:rPr[1]/w:rStyle[@w:val='186'])", 3);
Verification.check("word/document.xml", "count(//w:p[*]/w:r[2]/w:rPr[1])", 3);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
