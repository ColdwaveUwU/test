// Check setting filled round bullet list formatting

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// Apply filled round bullet formatting
TextForm.clickBullets("Filled round bullets");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/numbering.xml", "//w:lvl[1]/w:lvlText[1]/@w:val", "·");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();