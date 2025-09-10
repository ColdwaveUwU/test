// Check setting no numbering list formatting (removing numbering)

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// First apply some numbering, then remove it to test "none"
TextForm.clickNumbering("iDot");
TextForm.clickNumbering("none");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "boolean(//w:p/w:pPr/w:numPr)", false);

console.log(Verification.isSuccess());

// Close the test example
Tester.close();