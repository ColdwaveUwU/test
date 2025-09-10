// Include the SendBackward library
const { SendBackward } = require("lib");

// Include the Shape library
const { Shape } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select basic shape with id 2
Shape.clickBasicShape(2);

// Rendering the selected shape in the editor
Shape.drawShape();

// Click on default Send Backward button
SendBackward.sendBackward();

// Select "Send backward" option from the list
SendBackward.sendBackward("Send backward");

// Close the test example
Tester.close();
