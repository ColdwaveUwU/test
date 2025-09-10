// test script for verifying the "Build from levels 1" setting in Table of Contents in a DOCX file
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

// Click the Table of Contents button and configure settings
TableOfContents.clickTableOfContents();
// Set the Table of Contents settings with buildFromLevels = 1
TableOfContents.setTableOfContentsSettings({
    buildFromLevels: 1,
});

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:docPartGallery[1]/@w:val", "Table of Contents");
// Check that only 1 level is included in TOC (Level 1 only)
Verification.check("word/document.xml", "count(//w:hyperlink)", 1);
// Verify that Level 2 and Level 3 are not included in the table of contents
Verification.check("word/document.xml", "count(//w:hyperlink[contains(., 'Test 2')])", 0);
Verification.check("word/document.xml", "count(//w:hyperlink[contains(., 'Test 3')])", 0);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
