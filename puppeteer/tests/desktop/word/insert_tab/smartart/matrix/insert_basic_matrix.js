const { SmartArt, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// add smart matrix art - Basic matrix
SmartArt.clickMatrixArt(3);
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
    "matrix"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[2]/dgm:prSet[1]/@phldrT",
    "[Text]"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[5]/dgm:prSet[1]/@phldrT",
    "[Text]"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[8]/dgm:prSet[1]/@phldrT",
    "[Text]"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[11]/dgm:prSet[1]/@phldrT",
    "[Text]"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[15]/dgm:prSet[1]/@presName",
    "diamond"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[14]/dgm:prSet[1]/@presName",
    "matrix"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[16]/dgm:prSet[1]/@presName",
    "quad1"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[17]/dgm:prSet[1]/@presName",
    "quad2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[18]/dgm:prSet[1]/@presName",
    "quad3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[19]/dgm:prSet[1]/@presName",
    "quad4"
);

console.log(Verification.isSuccess());

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
