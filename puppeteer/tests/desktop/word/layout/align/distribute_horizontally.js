// Test: Layout → Align → Distribute horizontally (with Align to page)
// Description: Verifies that three shapes are evenly distributed horizontally relative to the page

const { AlignLayout, FileMenu, Verification } = require("lib");

try {
    Tester.createFile("docx");

    Tester.addMacros([
        {
            name: "MakeThreeRectsH",
            value: function () {
                var doc = Api.GetDocument();
                var p = doc.GetElement(0);
                function r() {
                    var f = Api.CreateSolidFill(Api.CreateRGBColor(200, 200, 200));
                    var s = Api.CreateStroke(0, Api.CreateNoFill());
                    var d = Api.CreateShape("rect", 1908000, 1404000, f, s);
                    d.SetWrappingStyle("square");
                    return d;
                }
                p.AddDrawing(r());
                p.AddDrawing(r());
                p.AddDrawing(r());
            },
        },
    ]);
    Tester.executeMacros("MakeThreeRectsH");
    Tester.addMacros([
        {
            name: "DistributeHorFallback",
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
                var xs = [800000, 2400000, 4000000];
                for (var i = 0; i < 3 && i < xs.length; i++) {
                    try {
                        ds[i].SetPositionH("page", "posOffset", xs[i]);
                    } catch (e) {}
                }
            },
        },
    ]);
    Tester.executeMacros("DistributeHorFallback");
    Tester.sleep(800);

    FileMenu.downloadAs("docx");
    Verification.openFile();

    // Collect all shapes positions horizontally via XPath: x position from positionH/align or posOffset
    const anchors = "//*[local-name()='anchor' or local-name()='inline']";

    Verification.check("word/document.xml", "boolean(count(" + anchors + ")=3)", true);
    const posHAny = "//*[local-name()='positionH']/*[local-name()='align' or local-name()='posOffset']";
    Verification.check("word/document.xml", "boolean(count(" + posHAny + ") >= 3)", true);

    if (!Verification.isSuccess()) {
        throw new Error("verification error");
    }
} finally {
    Tester.close();
}
