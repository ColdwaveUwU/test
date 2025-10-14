// Check setting symbols multilevel list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// Apply symbols multilevel list formatting
TextForm.clickMultilevels("symbols");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "boolean(//w:p/w:pPr/w:numPr)", true);
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText/@w:val", "v");
Verification.check("word/numbering.xml", "//w:lvl[1]/w:numFmt/@w:val", "bullet");
Verification.check("word/document.xml", "//w:p[1]/w:pPr/w:pStyle/@w:val", "668");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();
