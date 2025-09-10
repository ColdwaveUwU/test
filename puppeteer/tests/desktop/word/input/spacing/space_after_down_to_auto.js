// Check setting space after to auto by click on down arrow

// Include the IndentsLayout library
const { FileMenu, Verification, IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set space after
IndentsLayout.setSpaceAfter({ downArrow: true, arrowClickCount: 36 });

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:afterAutospacing", "1");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();