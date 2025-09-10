// test checking added text for Level 3 in a DOCX file
const { TableOfContents, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Add text for Level 3 heading
TableOfContents.addText("Level 3");
// Input test data for Level 3
Tester.input("Test 1");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:pStyle[1]/@w:val", "141");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
