// Check setting right indent by click on down arrow

// Include the IndentsLayout library
const { FileMenu, Verification, IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set right indent
IndentsLayout.setRightIndent({ downArrow: true, arrowClickCount: 5 });

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:ind[1]/@w:right", "-720");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();