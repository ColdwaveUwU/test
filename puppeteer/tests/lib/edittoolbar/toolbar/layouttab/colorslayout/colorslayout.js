// Include the ColorsLayout library
const { ColorsLayout } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select color theme "Red Orange"
ColorsLayout.setColorTheme("Red Orange");

// Close the test example
Tester.close();
