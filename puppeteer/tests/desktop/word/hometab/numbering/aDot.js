// Check setting lowercase letters with dot numbering list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// Apply lowercase letters with dot numbering formatting (a. b. c...)
TextForm.clickNumbering("aDot");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText/@w:val", "%1)");
Verification.check("word/numbering.xml", "//w:lvl[1]/w:numFmt/@w:val", "lowerLetter");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();