// Include the IndentsLayout library
const { IndentsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set left indent
IndentsLayout.setLeftIndent({ value: "1.5" });

// Set right indent
IndentsLayout.setRightIndent({ value: "1" });

// Set space before
IndentsLayout.setSpaceBefore({ value: "0.05" });

// Set space after
IndentsLayout.setSpaceAfter({ value: "0.07" });

// Close the test example
Tester.close();
