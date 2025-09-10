// Test: Layout → Align → Align to page + Align middle (macro-based)
const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");

Tester.addMacros([
    {
        name: "CreateAndAlignMiddle",
        value: function () {
            var doc = Api.GetDocument();
            var p = doc.GetElement(0);

            function makeRect() {
                var fill = Api.CreateSolidFill(Api.CreateRGBColor(200, 200, 200));
                var stroke = Api.CreateStroke(0, Api.CreateNoFill());
                var d = Api.CreateShape("rect", 1908000, 1404000, fill, stroke);
                d.SetWrappingStyle("square");
                d.SetVerAlign("page", "center");
                return d;
            }
            p.AddDrawing(makeRect());
            p.AddDrawing(makeRect());
        },
    },
]);

Tester.executeMacros("CreateAndAlignMiddle");
Tester.sleep(1000);

FileMenu.downloadAs("docx");
Verification.openFile();

const anchors = "//*[local-name()='anchor' or local-name()='inline']";
const positionV = "//*[local-name()='positionV']";

// якорей минимум 2
Verification.check("word/document.xml", "boolean(count(" + anchors + ") >= 2)", true);

// центр: align=center ИЛИ posOffset «около середины» (диапазон шире)
const midExpr =
    "boolean(" +
    " count(" +
    positionV +
    "/*[local-name()='align'][normalize-space(text())='center']) >= 2" +
    " or count(" +
    positionV +
    "/*[local-name()='posOffset'][number(normalize-space(text())) >= 1200000 and number(normalize-space(text())) <= 1600000]) >= 2" +
    ")";
Verification.check("word/document.xml", midExpr, true);

if (!Verification.isSuccess()) throw new Error("verification error");
Tester.close();
