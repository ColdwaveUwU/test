const { CrossReference, TableOfContents } = require("lib");

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

// Set Cross-reference settings
CrossReference.setCrossReferenceSettings({
    referenceType: "Heading",
    selectItemByName: "Test 3",
    insertReferenceTo: "Heading number (full context)",
    insertAsHyperlink: true,
    includeAboveBelow: true,
});

// Close the test
Tester.close();
