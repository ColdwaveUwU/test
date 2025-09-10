// Test: Layout → Align → Align to margin + Align bottom
// Description: Verifies that a shape is aligned to the bottom margin

const { Shape, AlignLayout, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

Shape.clickBasicShape(1);
const rect = { startX: 150, startY: 100, endX: 350, endY: 250 };
Shape.drawShape(rect);

Tester.waitAutosave();

Shape.selectShapeByCoordinates(rect);
AlignLayout.setAlign("Align to margin");
AlignLayout.setAlign("Align bottom");

Tester.waitAutosave();

FileMenu.downloadAs("docx");
Verification.openFile();

const firstAnchor = "(//*[local-name()='anchor' or local-name()='inline'])[1]";
const positionV = firstAnchor + "/*[local-name()='positionV']";

Verification.check("word/document.xml", positionV + "/@relativeFrom", "margin");
Verification.check("word/document.xml", positionV + "/*[local-name()='align']/text()", "bottom");

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
