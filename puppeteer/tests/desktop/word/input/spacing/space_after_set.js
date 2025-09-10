// Check setting space after by entering value

// Include the IndentsLayout library
const { FileMenu, Verification, IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set space after
IndentsLayout.setSpaceAfter({ value: "3" });

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:spacing[1]/@w:after", "4320");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();