// The test go to footnotes previous
const { Footnote, FileMenu, Verification } = require("lib");
// Create a new DOCX file for testing
Tester.createFile("docx");
Tester.input("Test 1");
Tester.keyPress("Enter");
Tester.input("Test 2");
Tester.keyPress("Enter");
Tester.input("Test 3");
// Insert a footnote
Footnote.insertFootnote();
Tester.input("Insert footnote with test 3");
Tester.keyPress("PageUp");
Footnote.insertEndnote();
Tester.input("Insert endnote text with test 1");
Tester.keyPress("PageUp");
Footnote.insertFootnote();
Tester.input("Insert footnote text with number 1");
Footnote.goToFootnotes("previous");
Tester.input("I am standing here");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check(
    "word/footnotes.xml",
    "//w:footnote[3]/w:p[1]/w:r[2]/w:t[1]/text()[1]",
    "Insert footnote text with number 1I am standing here"
);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);

// Close the test file
Tester.close();
