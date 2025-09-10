// test script for verifying the "Build from styles" setting with custom mapping in Table of Contents in a DOCX file
const { TableOfContents, FileMenu, Verification } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Add text for Level 1 heading (will be mapped to level 3)
TableOfContents.addText("Level 1");
// Input test data for Level 1
Tester.input("Test 1\n");
// Add text for Level 2 heading
TableOfContents.addText("Level 2");
// Input test data for Level 2
Tester.input("Test 2\n");
// Add text for Level 3 heading (will be mapped to level 1)
TableOfContents.addText("Level 3");
// Input test data for Level 3
Tester.input("Test 3\n");

// Click the Table of Contents button and configure settings
TableOfContents.clickTableOfContents();
// Set the Table of Contents settings with custom buildFromStyles mapping
TableOfContents.setTableOfContentsSettings({
    buildFromStyles: {
        "Heading 1": 3, // Level 1 heading becomes level 3 in TOC
        "Heading 2": 5, // Level 5 heading stays level 2 in TOC
        "Heading 3": 1, // Level 3 heading becomes level 1 in TOC
    },
});

FileMenu.downloadAs("docx");
// Getting verification results
Verification.openFile();
Verification.check("word/document.xml", "//w:docPartGallery[1]/@w:val", "Table of Contents");
// Check that all 3 levels are included in TOC with custom mapping
Verification.check("word/document.xml", "count(//w:hyperlink)", 3);
// Verify the TOC instruction text contains the correct style mapping
Verification.check(
    "word/document.xml",
    "count(//w:r[2]/w:instrText[1][contains(., 'Heading 1,3,Heading 2,5,Heading 3,1')])",
    1
);

let isSuccess = Verification.isSuccess();
console.log(isSuccess);
// Close the test file
Tester.close();
