// Check change list level for lowercase letters multilevel list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("List item");

// Apply lowercase letters numbering list formatting with list level 9
TextForm.clickNumbering("aBrace");
Tester.waitAutosave();
TextForm.changeNumberingListLevel("Level 9");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText[1]/@w:val", "%1.");
Verification.check("word/numbering.xml", "//w:lvl[1]/w:numFmt/@w:val", "lowerLetter");
Verification.check("word/document.xml", "//w:p[1]/w:pPr/w:numPr/w:ilvl/@w:val", "8");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();
