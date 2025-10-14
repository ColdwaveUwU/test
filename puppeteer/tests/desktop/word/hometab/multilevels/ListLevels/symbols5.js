// Check change list level for symbols multilevel list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("List item");

// Apply symbols multilevel formatting with list level 5
TextForm.clickMultilevels("symbols");
Tester.waitAutosave();
TextForm.changeMultilevelListLevel("Level 5");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText[1]/@w:val", "v");
Verification.check("word/numbering.xml", "//w:lvl[1]/w:numFmt/@w:val", "bullet");
Verification.check("word/document.xml", "//w:p[1]/w:pPr/w:numPr/w:ilvl/@w:val", "4");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();
