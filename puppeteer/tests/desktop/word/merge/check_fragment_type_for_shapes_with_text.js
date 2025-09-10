//The test checks the text in the form after applying the "Fragment" type
const { MergeShapes, Shape, Verification, FileMenu, TestData } = require("lib");

Tester.createFile("docx");

const firstShapeCoordinates = { startX: -300, startY: -100, endX: -200, endY: 0 };
Shape.clickBasicShape(6);
Shape.drawShape(firstShapeCoordinates);
Tester.input("test");
const secondShapeCoordinates = { startX: -230, startY: -100, endX: -130, endY: 0 };
Shape.clickBasicShape(7);
Shape.drawShape(secondShapeCoordinates);
Tester.input(TestData.ONE_WORD_TEXT());
Shape.selectShapes(firstShapeCoordinates, secondShapeCoordinates);
MergeShapes.setMergeShapes("Fragment");

FileMenu.downloadAs("docx");

Verification.openFile();

Verification.check(
    "word/document.xml",
    "boolean(//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/wps:wsp[1]/wps:spPr[1]/a:custGeom[1])",
    true
);

Verification.check(
    "word/document.xml",
    "count(//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/wps:wsp[1]/wps:spPr[1]/a:custGeom)",
    3
);

Verification.check(
    "word/document.xml",
    "//w:r[1]/mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/wps:wsp[1]/wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:r[1]/w:t[1]/text()[1]",
    "test"
);

Verification.check(
    "word/document.xml",
    "//w:r[2]/mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/wps:wsp[1]/wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:r[1]/w:t[1]/text()[1]",
    "test"
);

Verification.check(
    "word/document.xml",
    "//w:r[3]/mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/wps:wsp[1]/wps:txbx[1]/w:txbxContent[1]/w:p[1]/w:r[1]/w:t[1]/text()[1]",
    "test"
);

Verification.check(
    "word/document.xml",
    "//w:r[1]/mc:AlternateContent[1]/mc:Fallback[1]/w:pict[1]/v:shape[1]/v:textbox[1]/w:txbxContent[1]/w:p[1]/w:r[1]/w:t[1]/text()[1]",
    "test"
);

Verification.check(
    "word/document.xml",
    "//w:r[2]/mc:AlternateContent[1]/mc:Fallback[1]/w:pict[1]/v:shape[1]/v:textbox[1]/w:txbxContent[1]/w:p[1]/w:r[1]/w:t[1]/text()[1]",
    "test"
);

Verification.check(
    "word/document.xml",
    "//w:r[3]/mc:AlternateContent[1]/mc:Fallback[1]/w:pict[1]/v:shape[1]/v:textbox[1]/w:txbxContent[1]/w:p[1]/w:r[1]/w:t[1]/text()[1]",
    "test"
);

Verification.check("word/document.xml", "count(//a:path[@*])", 3);
Verification.check("word/document.xml", "count(//a:cubicBezTo)", 15);

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
