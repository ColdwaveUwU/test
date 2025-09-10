// Include the CoEditing library
const { CoEditing } = require("lib");

// Create a new file
Tester.createFile("docx");

// Set the co-editing mode to "Fast"
CoEditing.setMode("Fast");

// Set the co-editing mode to "Strict"
CoEditing.setMode("Strict");

// Close the test example
Tester.close();
