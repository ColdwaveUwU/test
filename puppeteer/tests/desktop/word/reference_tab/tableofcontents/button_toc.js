// test the Table of Contents button functionality
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
Tester.input("Test 3\n");
// Click the Table of Contents button
TableOfContents.clickTableOfContents();

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:docPartGallery[1]/@w:val", "Table of Contents");
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
