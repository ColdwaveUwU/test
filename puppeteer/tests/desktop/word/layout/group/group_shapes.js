// Test: Layout → Group → Group shapes via GroupLayout
// Description: Verifies that multiple shapes can be grouped together using GroupLayout library

const { Shape, GroupLayout, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Create first shape
Shape.clickBasicShape(1);
const shape1 = { startX: 100, startY: 100, endX: 150, endY: 150 };
Shape.drawShape(shape1);

Tester.waitAutosave();

// Create second shape
Shape.clickBasicShape(2);
const shape2 = { startX: 200, startY: 120, endX: 250, endY: 170 };
Shape.drawShape(shape2);

Tester.waitAutosave();

// Select and group shapes (copying exact sequence from working group_and_align.js)
Shape.selectShapes(shape1, shape2);
GroupLayout.setGroup("Group");

Tester.waitAutosave();

FileMenu.downloadAs("docx");
Verification.openFile();

// Verify that shapes were created and grouped
// 1) Exactly one container
Verification.check(
    "word/document.xml",
    "boolean(count(//*[local-name()='anchor' or local-name()='inline']) = 1)",
    true
);

// 2) At least 2 shapes within the single container
const shapesInSingleAnchor =
    "(//*[local-name()='anchor' or local-name()='inline'])[1]/*[local-name()='graphic']/*[local-name()='graphicData']" +
    "//*[local-name()='wsp']";
Verification.check("word/document.xml", "boolean(count(" + shapesInSingleAnchor + ") >= 2)", true);

// Note: some builds wrap grouped shapes as <wpg:wgp>. We don't require it explicitly.

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
