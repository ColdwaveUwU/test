// Include the AlignLayout library
const { AlignLayout } = require("lib");

// Include the Shape library
const { Shape } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select basic shape with id 2
Shape.clickBasicShape(2);

// Rendering the selected shape in the editor
Shape.drawShape();

// Select "Align right" option from the list
AlignLayout.setAlign("Align right");

// Close the test example
Tester.close();
