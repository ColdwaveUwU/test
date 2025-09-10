// wrapping_through.js
// Test: Layout → Wrapping → Through
// Description: Test wrapping "Through" option on shapes

const { Shape, Wrapping, FileMenu, Verification } = require("lib");

console.log("Starting 'Through' wrapping test");

Tester.createFile("docx");

// Insert a shape to test wrapping
Shape.clickBasicShape(2); // Rectangle shape
Shape.drawShape();

// Set wrapping to "Through"
Wrapping.setWrapping("Through");

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
// Verify the wrapping setting in document XML
Verification.check("word/document.xml", "boolean(//wp:wrapThrough)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
