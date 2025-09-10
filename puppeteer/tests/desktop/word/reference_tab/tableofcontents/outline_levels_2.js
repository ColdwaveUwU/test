// test script for verifying the "Build from levels 2" setting in Table of Contents in a DOCX file
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
// Set the Table of Contents settings with buildFromLevels = 2
TableOfContents.setTableOfContentsSettings({
    buildFromLevels: 2,
});

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:docPartGallery[1]/@w:val", "Table of Contents");
// Check that only 2 levels are included in TOC (Level 1 and Level 2, but not Level 3)
Verification.check("word/document.xml", "count(//w:hyperlink)", 2);
// Verify that Level 3 is not included in the table of contents
Verification.check("word/document.xml", "count(//w:hyperlink[contains(., 'Test 3')])", 0);
let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
