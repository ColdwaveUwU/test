// Test: Layout → Align → Align to page + Align left
// Description: Verifies that a shape is aligned to the left edge of the page

const { Shape, AlignLayout, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Insert Rectangle shape and render it
Shape.clickBasicShape(1);
const rect = { startX: 200, startY: 150, endX: 400, endY: 350 };
Shape.drawShape(rect);

Tester.waitAutosave();

Shape.selectShapeByCoordinates(rect);
AlignLayout.setAlign("Align to page");
AlignLayout.setAlign("Align left");

Tester.waitAutosave();

FileMenu.downloadAs("docx");
Verification.openFile();

const firstAnchor = "(//*[local-name()='anchor' or local-name()='inline'])[1]";
const positionH = firstAnchor + "/*[local-name()='positionH']";

Verification.check("word/document.xml", positionH + "/@relativeFrom", "page");
Verification.check("word/document.xml", positionH + "/*[local-name()='align']/text()", "left");

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
