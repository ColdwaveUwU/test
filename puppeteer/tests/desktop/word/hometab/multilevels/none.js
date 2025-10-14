// Check setting no multilevel list formatting (removing multilevels)

// Include the TextForm library
const { FileMenu, Verification, TextForm } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Add some text content
Tester.input("First item");

// First apply some multilevel list, then remove it to test "none"
TextForm.clickMultilevels("numbered");
TextForm.clickMultilevels("none");

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "boolean(//w:p/w:pPr/w:numPr)", false);

console.log(Verification.isSuccess());

// Close the test example
Tester.close();
