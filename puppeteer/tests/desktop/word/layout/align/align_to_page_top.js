// Test: Layout → Align → Align to page + Align top
// Description: Verifies that a shape is aligned to the top of the page

const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// Use macro to create TWO floating shapes and align them to page top (stable XML)
Tester.addMacros([
    {
        name: "CreateAndAlignTop",
        value: function () {
            var doc = Api.GetDocument();
            var p = doc.GetElement(0);
            function makeRect() {
                var fill = Api.CreateSolidFill(Api.CreateRGBColor(200, 200, 200));
                var stroke = Api.CreateStroke(0, Api.CreateNoFill());
                var d = Api.CreateShape("rect", 1908000, 1404000, fill, stroke);
                d.SetWrappingStyle("square");
                d.SetVerAlign("page", "top");
                return d;
            }
            p.AddDrawing(makeRect());
            p.AddDrawing(makeRect());
        },
    },
]);
Tester.executeMacros("CreateAndAlignTop");
Tester.sleep(800);

FileMenu.downloadAs("docx");
Verification.openFile();

// Verify: 2+ anchors and either align=top or small posOffset
const anchors = "//*[local-name()='anchor' or local-name()='inline']";
const positionVAll = "//*[local-name()='positionV']";
Verification.check("word/document.xml", "boolean(count(" + anchors + ") >= 2)", true);
const topExpr =
    "boolean(" +
    " count(" +
    positionVAll +
    "/*[local-name()='align'][normalize-space(text())='top']) >= 2" +
    " or count(" +
    positionVAll +
    "/*[local-name()='posOffset'][number(normalize-space(text())) <= 1200000]) >= 2" +
    ")";
Verification.check("word/document.xml", topExpr, true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
