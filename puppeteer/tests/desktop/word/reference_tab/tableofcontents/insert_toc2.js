// test script for verifying the insertion of "Table 2" style Table of Contents in a DOCX file
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

// Insert Table 2 style Table of Contents
TableOfContents.clickTableOfContents("Table 2");

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "count(//w:p[*]/w:hyperlink[1]/w:r[5]/w:fldChar[1]/@w:fldCharType)", 0);
Verification.check("word/document.xml", "count(//w:hyperlink)", 3);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
