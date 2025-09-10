// wrapping_behind_text.js
// Test: Layout → Wrapping → Behind text
// Description: Test wrapping "Behind text" option on shapes

const { Shape, Wrapping, FileMenu, Verification } = require("lib");

console.log("Starting 'Behind text' wrapping test");

Tester.createFile("docx");

// Insert a shape to test wrapping
Shape.clickBasicShape(2); // Rectangle shape
Shape.drawShape();

// Set wrapping to "Behind text"
Wrapping.setWrapping("Behind text");

// Wait for UI to update after wrapping change
Tester.waitAutosave();

// Download document for XML verification
FileMenu.downloadAs("docx");

// Open document for verification
Verification.openFile();
// Verify the wrapping setting in document XML for "Behind text"
Verification.check("word/document.xml", "boolean(//wp:anchor[@behindDoc='1'])", true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}
Tester.close();
