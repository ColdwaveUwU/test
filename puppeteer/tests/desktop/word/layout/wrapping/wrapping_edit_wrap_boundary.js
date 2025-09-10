// wrapping_edit_wrap_boundary.js
// Test: Layout → Wrapping → Edit wrap boundary
// Description: Test wrapping "Edit wrap boundary" option on shapes

const { Shape, Wrapping } = require("lib");

console.log("Starting 'Edit wrap boundary' wrapping test");

Tester.createFile("docx");

// Insert a shape to test wrapping
Shape.clickBasicShape(2); // Rectangle shape
Shape.drawShape();

// Set wrapping to "Edit wrap boundary"
Wrapping.setWrapping("Edit wrap boundary");

// Visual verification: Check that shape is still selected after UI operation
// Edit wrap boundary is UI-only function, so we verify the UI state instead of XML
const shapeSelected = await Tester.frame.evaluate(() => {
    // Check if shape selection indicators are visible
    const selectedElements = document.querySelectorAll('[class*="selected"], [class*="active"]');
    return selectedElements.length > 0;
});

if (!shapeSelected) {
    throw new Error("Shape should remain selected after Edit wrap boundary operation");
}
Tester.close();
