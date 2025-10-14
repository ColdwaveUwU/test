// Check setting numbered headings multilevel list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// Apply numbered headings multilevel list formatting
TextForm.clickMultilevels("numberedheadings");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "boolean(//w:p/w:pPr/w:numPr)", false);
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText/@w:val", "Article %1.");
Verification.check("word/numbering.xml", "//w:lvl[1]/w:numFmt/@w:val", "upperRoman");
Verification.check("word/document.xml", "//w:p[1]/w:pPr/w:pStyle/@w:val", "139");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();
