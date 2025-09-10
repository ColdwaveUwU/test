// Include the Wrapping library
const { Wrapping } = require("lib");

// Include the Shape library
const { Shape } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select basic shape with id 2
Shape.clickBasicShape(2);

// Rendering the selected shape in the editor
Shape.drawShape();

// Select wrapping "Through"
Wrapping.setWrapping("Through");

// Close the test example
Tester.close();
