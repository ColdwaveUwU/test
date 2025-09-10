// Test: Layout → Align → Align to margin + Align center
// Description: Verifies that a shape is aligned to the horizontal center of margins

const { Shape, AlignLayout, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

Shape.clickBasicShape(1);
const rect = { startX: 100, startY: 150, endX: 300, endY: 350 };
Shape.drawShape(rect);

Tester.waitAutosave();

Shape.selectShapeByCoordinates(rect);
AlignLayout.setAlign("Align to margin");
AlignLayout.setAlign("Align center");

Tester.waitAutosave();

FileMenu.downloadAs("docx");
Verification.openFile();

const firstAnchor = "(//*[local-name()='anchor' or local-name()='inline'])[1]";
const positionH = firstAnchor + "/*[local-name()='positionH']";

Verification.check("word/document.xml", positionH + "/@relativeFrom", "margin");
Verification.check("word/document.xml", positionH + "/*[local-name()='align']/text()", "center");

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
