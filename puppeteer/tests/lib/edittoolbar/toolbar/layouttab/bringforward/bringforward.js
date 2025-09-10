// Include the BringForward library
const { BringForward } = require("lib");

// Include the Shape library
const { Shape } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select basic shape with id 2
Shape.clickBasicShape(2);

// Rendering the selected shape in the editor
Shape.drawShape();

// Click on default Bring Forward button
BringForward.bringForward();

// Select "Bring forward" option from the list
BringForward.bringForward("Bring forward");

// Close the test example
Tester.close();
