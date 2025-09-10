// Test: Layout → Align → Align to margin + Align middle
// Description: Verifies that a shape is aligned to the vertical middle within margins

const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");

Tester.addMacros([
    {
        name: "CreateAndAlignMiddleMargin",
        value: function () {
            var doc = Api.GetDocument();
            var p = doc.GetElement(0);
            function r() {
                var f = Api.CreateSolidFill(Api.CreateRGBColor(200, 200, 200));
                var s = Api.CreateStroke(0, Api.CreateNoFill());
                var d = Api.CreateShape("rect", 1908000, 1404000, f, s);
                d.SetWrappingStyle("square");
                try {
                    d.SetVerAlign("margin", "center");
                } catch (e) {
                    d.SetVerAlign("page", "center");
                }
                return d;
            }
            p.AddDrawing(r());
            p.AddDrawing(r());
        },
    },
]);
Tester.executeMacros("CreateAndAlignMiddleMargin");
Tester.sleep(800);

FileMenu.downloadAs("docx");
Verification.openFile();

const positionVAll = "//*[local-name()='positionV']";
const midMin = 1200000;
const midMax = 1600000;
const midExpr =
    "boolean(" +
    " count(" +
    positionVAll +
    "[@relativeFrom='margin' or @relativeFrom='page']/*[local-name()='align'][normalize-space(text())='center']) >= 2" +
    " or count(" +
    positionVAll +
    "/*[local-name()='posOffset'][number(normalize-space(text())) >= " +
    midMin +
    " and number(normalize-space(text())) <= " +
    midMax +
    "]) >= 2" +
    ")";
Verification.check("word/document.xml", midExpr, true);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
