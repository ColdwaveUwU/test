const { SmartArt, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

// add hierarchy smart art - Hierarchy
SmartArt.clickHierarchyArt(9);
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

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[14]/dgm:prSet[1]/@phldrT",
    "[Text]"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[17]/dgm:prSet[1]/@phldrT",
    "[Text]"
);

Verification.check("word/diagrams/data1.xml", "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[18]/@type", "parTrans");

Verification.check("word/diagrams/data1.xml", "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[19]/@type", "sibTrans");

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[20]/dgm:prSet[1]/@presName",
    "hierChild1"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[21]/dgm:prSet[1]/@presName",
    "hierRoot1"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[22]/dgm:prSet[1]/@presName",
    "composite"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[23]/dgm:prSet[1]/@presName",
    "background"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[24]/dgm:prSet[1]/@presName",
    "text"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[25]/dgm:prSet[1]/@presName",
    "hierChild2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[26]/dgm:prSet[1]/@presName",
    "Name10"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[27]/dgm:prSet[1]/@presName",
    "hierRoot2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[28]/dgm:prSet[1]/@presName",
    "composite2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[29]/dgm:prSet[1]/@presName",
    "background2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[30]/dgm:prSet[1]/@presName",
    "text2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[31]/dgm:prSet[1]/@presName",
    "hierChild3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[32]/dgm:prSet[1]/@presName",
    "Name17"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[33]/dgm:prSet[1]/@presName",
    "hierRoot3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[34]/dgm:prSet[1]/@presName",
    "composite3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[35]/dgm:prSet[1]/@presName",
    "background3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[36]/dgm:prSet[1]/@presName",
    "text3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[37]/dgm:prSet[1]/@presName",
    "hierChild4"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[38]/dgm:prSet[1]/@presName",
    "Name17"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[39]/dgm:prSet[1]/@presName",
    "hierRoot3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[40]/dgm:prSet[1]/@presName",
    "composite3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[41]/dgm:prSet[1]/@presName",
    "background3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[42]/dgm:prSet[1]/@presName",
    "text3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[43]/dgm:prSet[1]/@presName",
    "hierChild4"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[44]/dgm:prSet[1]/@presName",
    "Name10"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[45]/dgm:prSet[1]/@presName",
    "hierRoot2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[46]/dgm:prSet[1]/@presName",
    "composite2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[47]/dgm:prSet[1]/@presName",
    "background2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[48]/dgm:prSet[1]/@presName",
    "text2"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[49]/dgm:prSet[1]/@presName",
    "hierChild3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[50]/dgm:prSet[1]/@presName",
    "Name17"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[51]/dgm:prSet[1]/@presName",
    "hierRoot3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[52]/dgm:prSet[1]/@presName",
    "composite3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[53]/dgm:prSet[1]/@presName",
    "background3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[54]/dgm:prSet[1]/@presName",
    "text3"
);

Verification.check(
    "word/diagrams/data1.xml",
    "//dgm:dataModel[1]/dgm:ptLst[1]/dgm:pt[55]/dgm:prSet[1]/@presName",
    "hierChild4"
);

console.log(Verification.isSuccess());

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
