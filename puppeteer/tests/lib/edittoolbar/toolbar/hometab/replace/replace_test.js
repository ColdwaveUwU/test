// Import Replace module from the lib
const { Replace } = require("lib");

// Create a new docx document for testing
Tester.createFile("docx");

// Input test text into the document
Tester.input("test");

// Select all text in the document
Replace.selectAll();

// Perform find operation with empty search string and default options
Replace.find({ find: "", sensitive: false, words: false });

// Replace "test" with "test2" using once method with case-insensitive and partial word matching
Replace.replace({ find: "test", replace: "test2", method: "once", sensitive: false, words: false });

// Close the document and clean up test
Tester.close();
