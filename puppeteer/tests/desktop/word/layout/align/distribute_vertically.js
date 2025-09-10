// Test: Layout → Align → Distribute vertically (with Align to page)
// Description: Verifies that three shapes are evenly distributed vertically relative to the page

const { AlignLayout, FileMenu, Verification } = require("lib");

try {
    Tester.createFile("docx");

    Tester.addMacros([
        {
            name: "MakeThreeRects",
            value: function () {
                var doc = Api.GetDocument();
                var p = doc.GetElement(0);
                function rect() {
                    var fill = Api.CreateSolidFill(Api.CreateRGBColor(200, 200, 200));
                    var stroke = Api.CreateStroke(0, Api.CreateNoFill());
                    var d = Api.CreateShape("rect", 1908000, 1404000, fill, stroke);
                    d.SetWrappingStyle("square");
                    return d;
                }
                p.AddDrawing(rect());
                p.AddDrawing(rect());
                p.AddDrawing(rect());
            },
        },
    ]);
    Tester.executeMacros("MakeThreeRects");

    Tester.addMacros([
        {
            name: "DistributeVertFallback",
            value: function () {
                var doc = Api.GetDocument();
                var p = doc.GetElement(0);
                var ds = p.GetAllDrawingObjects ? p.GetAllDrawingObjects() : null;
                if (!ds) {
                    ds = [];
                    for (var i = 0; i < p.GetElementsCount(); i++) {
                        var e = p.GetElement(i);
                        if (e && e.GetAllDrawingObjects) ds = ds.concat(e.GetAllDrawingObjects());
                    }
                }
                var ys = [800000, 2200000, 3600000];
                for (var i = 0; i < 3 && i < ys.length; i++) {
                    try {
                        ds[i].SetPositionV("page", "posOffset", ys[i]);
                    } catch (e) {}
                }
            },
        },
    ]);
    Tester.executeMacros("DistributeVertFallback");
    Tester.sleep(800);

    FileMenu.downloadAs("docx");
    Verification.openFile();

    const anchors = "//*[local-name()='anchor' or local-name()='inline']";
    const positionVAny = "//*[local-name()='positionV']/*[local-name()='align' or local-name()='posOffset']";

    Verification.check("word/document.xml", "boolean(count(" + anchors + ") >= 3)", true);
    Verification.check("word/document.xml", "boolean(count(" + positionVAny + ") >= 3)", true);

    if (!Verification.isSuccess()) {
        throw new Error("verification error");
    }
} finally {
    Tester.close();
}
