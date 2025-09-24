const { SmartArt, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// add smart pyramid art - Segmented pyramid
SmartArt.clickPyramidArt(0);
Tester.waitAutosave();
FileMenu.downloadAs("docx");
Verification.openFile();

Verification.check(
    "word/document.xml",
    "//w:document[1]/w:body[1]/w:p[1]/w:r[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/dgm:relIds[1]/@r:dm",
    "rId9"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[1]/dgm:prSet[1]/@loCatId",
    "pyramid"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[15]/dgm:prSet[1]/@presName",
    "triangle1"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[16]/dgm:prSet[1]/@presName",
    "triangle2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[17]/dgm:prSet[1]/@presName",
    "triangle3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[18]/dgm:prSet[1]/@presName",
    "triangle4"
);

console.log(Verification.isSuccess());

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
