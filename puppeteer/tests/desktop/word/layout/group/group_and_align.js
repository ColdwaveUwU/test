// Test: Layout → Group → Group and align
// Description: Verifies that grouped shapes can be aligned as a single unit

const { Shape, GroupLayout, AlignLayout, FileMenu, Verification } = require("lib");

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

// Select and group shapes
Shape.selectShapes(shape1, shape2);
GroupLayout.setGroup("Group");

Tester.waitAutosave();

// Align the grouped shapes to center
AlignLayout.setAlign("Align to margin");
AlignLayout.setAlign("Align center");

Tester.waitAutosave();

FileMenu.downloadAs("docx");
Verification.openFile();

// Verify that group exists and is aligned to center
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

// Note: grouped container may be represented by <wpg:wgp>; we validate via shapes count.

// Keep alignment checks
const positionH = "(//*[local-name()='anchor' or local-name()='inline'])[1]/*[local-name()='positionH']";
Verification.check("word/document.xml", positionH + "/@relativeFrom", "margin");
Verification.check("word/document.xml", positionH + "/*[local-name()='align']/text()", "center");

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
