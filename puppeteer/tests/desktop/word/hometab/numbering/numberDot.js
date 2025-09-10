// Check setting numbered list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// Apply numbered list formatting with dots (1. 2. 3. ...)
TextForm.clickNumbering("numberDot");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText/@w:val", "%1.");
Verification.check("word/numbering.xml", "//w:lvl[1]/w:numFmt/@w:val", "decimal");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();