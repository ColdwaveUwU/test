// Include the IndentsLayout library
const { FileMenu, Verification, IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set right indent
IndentsLayout.setRightIndent({ value: "3" });

// Verification
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:ind[1]/@w:right", "4320");

console.log(Verification.isSuccess());

// Close the test example
Tester.close();