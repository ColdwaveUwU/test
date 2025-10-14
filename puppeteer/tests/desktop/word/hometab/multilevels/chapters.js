// Check setting chapters multilevel list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// Apply chapters multilevel list formatting
TextForm.clickMultilevels("chapters");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText/@w:val", "%1.");
Verification.check("word/numbering.xml", "//w:lvl[1]/w:numFmt/@w:val", "decimal");
Verification.check("word/document.xml", "//w:p[1]/w:pPr/w:pStyle/@w:val", "139");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();
