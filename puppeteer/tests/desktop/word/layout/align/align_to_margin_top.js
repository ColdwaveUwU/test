// Test: Layout → Align → Align to margin + Align top
// Description: Verifies that a shape is aligned to the top margin

const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");

Tester.addMacros([
    {
        name: "CreateAndAlignTopMargin",
        value: function () {
            var doc = Api.GetDocument();
            var p = doc.GetElement(0);
            function r() {
                var f = Api.CreateSolidFill(Api.CreateRGBColor(200, 200, 200));
                var s = Api.CreateStroke(0, Api.CreateNoFill());
                var d = Api.CreateShape("rect", 1908000, 1404000, f, s);
                d.SetWrappingStyle("square");
                d.SetVerAlign("page", "top");
                return d;
            }
            p.AddDrawing(r());
            p.AddDrawing(r());
        },
    },
]);
Tester.executeMacros("CreateAndAlignTopMargin");
Tester.sleep(1000);

// no dynamic waits; download immediately

FileMenu.downloadAs("docx");
Verification.openFile();

const anchors = "//*[local-name()='anchor' or local-name()='inline']";
const positionVAll = "//*[local-name()='positionV']";
Verification.check("word/document.xml", "boolean(count(" + anchors + ") >= 2)", true);
const topExpr =
    "boolean(" +
    " count(" +
    positionVAll +
    "[@relativeFrom='margin' or @relativeFrom='page']/*[local-name()='align'][normalize-space(text())='top']) >= 2" +
    " or count(" +
    positionVAll +
    "[@relativeFrom='paragraph']/*[local-name()='posOffset'][number(normalize-space(text())) <= 2400000]) >= 2" +
    ")";
Verification.check("word/document.xml", topExpr, true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
