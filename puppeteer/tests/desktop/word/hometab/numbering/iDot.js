// Check setting roman numerals with dot numbering list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// Apply roman numerals with dot numbering formatting (i. ii. iii...)
TextForm.clickNumbering("iDot");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText/@w:val", "%1.");
Verification.check("word/numbering.xml", "//w:lvl[1]/w:numFmt/@w:val", "upperRoman");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();