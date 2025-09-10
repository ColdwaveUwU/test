// Check setting no bullet list formatting (removing bullets)

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// First apply some bullet, then remove it to test "None"
TextForm.clickBullets("Dash bullets");
TextForm.clickBullets("None");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "boolean(//w:p/w:pPr/w:numPr)", false);

console.log(Verification.isSuccess());

// Close the test example
Tester.close();