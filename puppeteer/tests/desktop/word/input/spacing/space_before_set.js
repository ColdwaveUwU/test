// Check setting space before by entering value

// Include the IndentsLayout library
const { FileMenu, Verification, IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set space before
IndentsLayout.setSpaceBefore({ value: "2" });

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:before", "2880");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();