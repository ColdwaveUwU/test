// test script to update Table of Contents page numbers in a DOCX file
const { TableOfContents, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");
// Add text for Level 1 heading
TableOfContents.addText("Level 1");
// Input test data for Level 1
Tester.input("Test 1\n");
// Add text for Level 2 heading
TableOfContents.addText("Level 2");
// Input test data for Level 2
Tester.input("Test 2\n");
// Add text for Level 3 heading
TableOfContents.addText("Level 3");
// Input test data for Level 3
Tester.input("Test 3");

Tester.keyPress("Home");
Tester.keyPress("PageUp");
// Click the Table of Contents button
TableOfContents.clickTableOfContents();
Tester.keyDown("ControlLeft");
Tester.keyPress("Enter");
Tester.keyUp("ControlLeft");
// Update only page numbers in the table of contents
TableOfContents.updateTable("Update page numbers only");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:p[*]/w:hyperlink[1]/w:r[6]/w:t[1]/text()[1]", "2");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
