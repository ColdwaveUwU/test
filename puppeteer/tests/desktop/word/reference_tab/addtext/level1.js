// test checking added text for Level 1 in a DOCX file
const { TableOfContents, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Add text for Level 1 heading
TableOfContents.addText("Level 1");
// Input test data for Level 1
Tester.input("Test 1");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:pStyle[1]/@w:val", "139");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
