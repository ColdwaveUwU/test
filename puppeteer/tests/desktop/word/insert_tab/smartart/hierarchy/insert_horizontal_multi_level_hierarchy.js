const { SmartArt, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// add hierarchy smart art - Horizontal multi-level hierarchy
SmartArt.clickHierarchyArt(4);
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
    "hierarchy"
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

Verification.check("word/diagrams/data1.xml", "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[12]/@type", "parTrans");

Verification.check("word/diagrams/data1.xml", "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[13]/@type", "sibTrans");

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[14]/dgm:prSet[1]/@presName",
    "Name0"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[15]/dgm:prSet[1]/@presName",
    "root1"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[16]/dgm:prSet[1]/@presName",
    "LevelOneTextNode"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[17]/dgm:prSet[1]/@presName",
    "level2hierChild"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[18]/dgm:prSet[1]/@presName",
    "conn2-1"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[19]/dgm:prSet[1]/@presName",
    "connTx"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[20]/dgm:prSet[1]/@presName",
    "root2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[21]/dgm:prSet[1]/@presName",
    "LevelTwoTextNode"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[22]/dgm:prSet[1]/@presName",
    "level3hierChild"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[23]/dgm:prSet[1]/@presName",
    "conn2-1"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[24]/dgm:prSet[1]/@presName",
    "connTx"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[25]/dgm:prSet[1]/@presName",
    "root2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[26]/dgm:prSet[1]/@presName",
    "LevelTwoTextNode"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[27]/dgm:prSet[1]/@presName",
    "level3hierChild"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[28]/dgm:prSet[1]/@presName",
    "conn2-1"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[29]/dgm:prSet[1]/@presName",
    "connTx"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[30]/dgm:prSet[1]/@presName",
    "root2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[31]/dgm:prSet[1]/@presName",
    "LevelTwoTextNode"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[32]/dgm:prSet[1]/@presName",
    "level3hierChild"
);

console.log(Verification.isSuccess());

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
