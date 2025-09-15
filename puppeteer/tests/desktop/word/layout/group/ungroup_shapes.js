// TODO Change SelectAllDrawings (not api method)
// Test: Layout → Group → Ungroup shapes via macros
// Description: Verifies that grouped shapes can be ungrouped using API macros

// const { Shape, FileMenu, Verification } = require("lib");

// Tester.createFile("docx");

// // Create first shape using UI (no browser errors)
// Shape.clickBasicShape(1);
// const shape1 = { startX: 100, startY: 100, endX: 200, endY: 200 };
// Shape.drawShape(shape1);

// Tester.waitAutosave();

// // Create second shape using UI (no browser errors)
// Shape.clickBasicShape(2);
// const shape2 = { startX: 250, startY: 150, endX: 350, endY: 250 };
// Shape.drawShape(shape2);

// Tester.waitAutosave();

// // Group shapes using macros
// Tester.addMacros([
//     {
//         name: "GroupShapes",
//         value: function () {
//             var doc = Api.GetDocument();
//             doc.SelectAllDrawings();
//             doc.GroupDrawings();
//         },
//     },
// ]);
// Tester.executeMacros("GroupShapes");
// Tester.waitAutosave();

// // Ungroup shapes using macros
// Tester.addMacros([
//     {
//         name: "UngroupShapes",
//         value: function () {
//             var doc = Api.GetDocument();
//             doc.SelectAllDrawings();
//             doc.UngroupDrawings();
//         },
//     },
// ]);
// Tester.executeMacros("UngroupShapes");
// Tester.waitAutosave();

// // Verification
// const anchors = "//*[local-name()='anchor' or local-name()='inline']";

// FileMenu.downloadAs("docx");
// Verification.openFile();

// // Check that we have 2 separate shapes after ungrouping
// Verification.check("word/document.xml", "boolean(count(" + anchors + ") = 2)", true);
// Verification.check("word/document.xml", "boolean(count(//*[local-name()='grpSp']) = 0)", true);

// const wspInAllAnchors = "(" + anchors + ")//*[local-name()='wsp']";
// Verification.check("word/document.xml", "boolean(count(" + wspInAllAnchors + ") = 2)", true);

// if (!Verification.isSuccess()) {
//     throw new Error("verification error");
// }

Tester.close();
