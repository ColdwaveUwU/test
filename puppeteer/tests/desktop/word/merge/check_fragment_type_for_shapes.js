//the test checks whether "Fragment" type was applied after downloading
const { MergeShapes, Shape, Verification, FileMenu } = require("lib");

Tester.createFile("docx");

const firstShapeCoordinates = { startX: -300, startY: -100, endX: -200, endY: 0 };
Shape.clickBasicShape(6);
Shape.drawShape(firstShapeCoordinates);
const secondShapeCoordinates = { startX: -230, startY: -100, endX: -130, endY: 0 };
Shape.clickBasicShape(7);
Shape.drawShape(secondShapeCoordinates);
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

Verification.check("word/document.xml", "count(//a:path[@*])", 3);
Verification.check("word/document.xml", "count(//a:cubicBezTo)", 15);

Tester.close();
