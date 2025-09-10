// Check setting space before to auto by click on down arrow

// Include the IndentsLayout library
const { FileMenu, Verification, IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set space before
IndentsLayout.setSpaceBefore({ downArrow: true, arrowClickCount: 5 });

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:beforeAutospacing", "1");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();