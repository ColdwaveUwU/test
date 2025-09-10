// test checking added text for "Do not show in table of contents" option in a DOCX file
const { TableOfContents, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
// Add text for Level 3 heading
TableOfContents.addText("Level 3");
// Input test data
Tester.input("Normal text");
// Add text with "Do not show in table of contents" option
TableOfContents.addText("Do not show in table of contents");
FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
// Check that normal paragraph style is applied (not TOC style)
Verification.check("word/document.xml", "count(//w:pStyle[1]/@w:val)", 0);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
