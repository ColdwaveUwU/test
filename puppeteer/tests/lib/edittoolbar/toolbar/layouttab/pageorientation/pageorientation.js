// Include the PageOrientation library
const { PageOrientation } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select page orientation "Landscape"
PageOrientation.setOrientation("Landscape");

// Close the test example
Tester.close();
