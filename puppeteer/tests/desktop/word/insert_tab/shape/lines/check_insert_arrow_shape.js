const { FileMenu, Verification, Shape } = require("lib");

Tester.createFile("docx");

// Select Lines shape - Arrow type
Shape.clickLineShape(1);
Shape.drawShape();
FileMenu.downloadAs("docx");
Verification.openFile();

Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/wps:wsp[1]/wps:spPr[1]/a:prstGeom[1]/@prst",
    "line"
);

Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/wps:wsp[1]/wps:spPr[1]/a:ln[1]/a:tailEnd[1]/@type",
    "arrow"
);

Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Fallback[1]/w:pict[1]/v:line[1]/@filled",
    "f"
);

console.log(Verification.isSuccess());

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
