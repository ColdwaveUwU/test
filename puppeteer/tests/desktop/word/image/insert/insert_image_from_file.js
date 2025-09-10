const { Image, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Image.fromFile("png/testFile.png");
FileMenu.downloadAs("docx");
Verification.openFile();

Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:blipFill[1]/a:blip[1]/@r:embed",
    "rId8"
);
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[8]/@Id", "rId8");
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[8]/@Target", "media/image1.png");
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/wp:extent[1]/@cy",
    "2872734"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/wp:extent[1]/@cx",
    "5940425"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:spPr[1]/a:xfrm[1]/a:ext[1]/@cx",
    "5940425"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:spPr[1]/a:xfrm[1]/a:ext[1]/@cy",
    "2872734"
);
console.log(Verification.isSuccess());

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
