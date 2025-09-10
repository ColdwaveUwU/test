const { FileMenu, Verification, Shape } = require("lib");

Tester.createFile("docx");

// Select basic shape - sign type
Shape.clickBasicShape(22);
Shape.drawShape();
FileMenu.downloadAs("docx");
Verification.openFile();

Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/wps:wsp[1]/wps:spPr[1]/a:prstGeom[1]/@prst",
    "plaque"
);

Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Fallback[1]/w:pict[1]/v:shape[1]/@fillcolor",
    "#5B9BD5"
);

console.log(Verification.isSuccess());

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
