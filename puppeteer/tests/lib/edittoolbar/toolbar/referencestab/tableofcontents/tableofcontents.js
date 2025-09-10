const { TableOfContents } = require("lib");

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
TableOfContents.clickTableOfContents("Table 1");
TableOfContents.clickTableOfContents("Table 2");
TableOfContents.clickTableOfContents();

// Add text for Level 9 heading
TableOfContents.addText("Level 9");
// Input test data for Level 9
Tester.input("Test 9\n");

// Set the Table of Contents settings
TableOfContents.setTableOfContentsSettings({
    showPageNumbers: true,
    rightAlignPageNumbers: true,
    formatAsLinks: true,
    leader: "None",
    buildFromLevels: 3,
    buildFromStyles: { "Heading 1": 1, "Heading 2": 2, "Heading 3": 3 },
    styles: "Standard",
});

// Update the table of contents
TableOfContents.updateTable();

// Update only page numbers in the table of contents
TableOfContents.updateTable("Update page numbers only");

// Remove the table of contents
TableOfContents.removeTableOfContents();

// Close the test file
Tester.close();
