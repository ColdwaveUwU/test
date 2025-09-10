// wrapping_in_front_of_text.js
// Test: Layout → Wrapping → In front of text
// Description: Test wrapping "In front of text" option on shapes

const { Shape, Wrapping, FileMenu, Verification } = require("lib");

console.log("Starting 'In front of text' wrapping test");

Tester.createFile("docx");

// Insert a shape to test wrapping
Shape.clickBasicShape(2); // Rectangle shape
Shape.drawShape();

// Set wrapping to "In front of text"
Wrapping.setWrapping("In front of text");

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
// Verify the wrapping setting in document XML for "In front of text"
Verification.check("word/document.xml", "boolean(//wp:anchor[@behindDoc='0'])", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
