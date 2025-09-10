// test checking added text for Level 5 in a DOCX file
const { TableOfContents, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
// Add text for Level 1 heading
TableOfContents.addText("Level 1");
// Input test data for Level 1
Tester.input("Test 1\n");
// Click the Table of Contents button
TableOfContents.clickTableOfContents();
// Input test data
Tester.input("Example");
// Add text for Level 5 heading
TableOfContents.addText("Level 5");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:pStyle[1]/@w:val", "143");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
