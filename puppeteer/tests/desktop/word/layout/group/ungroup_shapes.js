// Test: Layout → Group → Ungroup shapes via macros
// Description: Verifies that grouped shapes can be ungrouped using API macros

const { Shape, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Create first shape using UI (no browser errors)
Shape.clickBasicShape(1);
const shape1 = { startX: 100, startY: 100, endX: 200, endY: 200 };
Shape.drawShape(shape1);

Tester.waitAutosave();

// Create second shape using UI (no browser errors)
Shape.clickBasicShape(2);
const shape2 = { startX: 250, startY: 150, endX: 350, endY: 250 };
Shape.drawShape(shape2);

Tester.waitAutosave();

// Group shapes using macros
Tester.addMacros([
    {
        name: "GroupShapes",
        value: function () {
            var doc = Api.GetDocument();
            var drawings = doc.GetAllDrawingObjects();
            if (drawings && drawings.length > 1) {
                doc.GroupDrawings(drawings);
            }
        },
    },
]);
Tester.executeMacros("GroupShapes");
Tester.waitAutosave();

// Ungroup shapes using macros
Tester.addMacros([
    {
        name: "UngroupShapes",
        value: function () {
            var doc = Api.GetDocument();
            var drawings = doc.GetAllDrawingObjects();
            for (var i = 0; i < drawings.length; i++) {
                try {
                    if (typeof drawings[i].GetClassType === "function" && drawings[i].GetClassType() === "group") {
                        drawings[i].Ungroup();
                    }
                } catch (e) {}
            }
        },
    },
]);
Tester.executeMacros("UngroupShapes");
Tester.waitAutosave();

// Verification
const anchors = "//*[local-name()='anchor' or local-name()='inline']";

FileMenu.downloadAs("docx");
Verification.openFile();

// Check that we have 2 separate shapes after ungrouping (single compound check to speed up)
const wspInAllAnchors = "(" + anchors + ")//*[local-name()='wsp']";
const combinedCheck =
    "boolean(" +
    "(count(" +
    anchors +
    ") = 2) and " +
    "(count(//*[local-name()='grpSp']) = 0) and " +
    "(count(" +
    wspInAllAnchors +
    ") = 2)" +
    ")";
Verification.check("word/document.xml", combinedCheck, true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
