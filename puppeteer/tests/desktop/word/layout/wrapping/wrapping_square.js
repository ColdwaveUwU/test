// wrapping_square.js
// Test: Layout → Wrapping → Square
// Description: Test wrapping "Square" option on shapes

const { Shape, Wrapping, FileMenu, Verification } = require("lib");

console.log("Starting 'Square' wrapping test");

Tester.createFile("docx");

// Insert a shape to test wrapping
Shape.clickBasicShape(2); // Rectangle shape
Shape.drawShape();

// Set wrapping to "Square"
Wrapping.setWrapping("Square");

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
// Verify the wrapping setting in document XML
Verification.check("word/document.xml", "boolean(//wp:wrapSquare)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
