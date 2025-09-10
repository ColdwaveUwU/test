// Check setting space before by click on up arrow

// Include the IndentsLayout library
const { FileMenu, Verification, IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set space before
IndentsLayout.setSpaceBefore({ upArrow: true, arrowClickCount: 5 });

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:before", "72");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();