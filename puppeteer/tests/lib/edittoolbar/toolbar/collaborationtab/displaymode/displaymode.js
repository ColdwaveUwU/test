// Include the DisplayMode library
const { DisplayMode } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select "Markup and balloons" option from the list
DisplayMode.setMode("Markup and balloons");

// Select "Only markup" option from the list
DisplayMode.setMode("Only markup");

// Select "Final" option from the list
DisplayMode.setMode("Final");

// Select "Original" option from the list
DisplayMode.setMode("Original");

// Close the test example
Tester.close();
