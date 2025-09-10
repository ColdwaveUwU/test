// Check setting arrow bullet list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// Apply arrow bullet formatting
TextForm.clickBullets("Arrow bullets");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText[1]/@w:val", "Ø");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();