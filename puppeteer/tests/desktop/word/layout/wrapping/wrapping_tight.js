// wrapping_tight.js
// Test: Layout → Wrapping → Tight
// Description: Test wrapping "Tight" option on shapes

const { Shape, Wrapping, FileMenu, Verification } = require("lib");

console.log("Starting 'Tight' wrapping test");

Tester.createFile("docx");

// Insert a shape to test wrapping
Shape.clickBasicShape(2); // Rectangle shape
Shape.drawShape();

// Set wrapping to "Tight"
Wrapping.setWrapping("Tight");

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
// Verify the wrapping setting in document XML
Verification.check("word/document.xml", "boolean(//wp:wrapTight)", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
