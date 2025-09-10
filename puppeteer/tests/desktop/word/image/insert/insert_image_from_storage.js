const { Image, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Image.fromStorage();
FileMenu.downloadAs("docx");
Verification.openFile();

Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:blipFill[1]/a:blip[1]/@r:embed",
    "rId8"
);

Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:blipFill[1]/a:blip[1]/a:extLst[1]/a:ext[1]/asvg:svgBlip[1]/@r:embed",
    "rId9"
);
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[9]/@Id", "rId9");
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[9]/@Target", "media/media1.svg");
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/wp:extent[1]/@cy",
    "266700"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/wp:extent[1]/@cx",
    "1457325"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:spPr[1]/a:xfrm[1]/a:ext[1]/@cx",
    "1457325"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:spPr[1]/a:xfrm[1]/a:ext[1]/@cy",
    "266700"
);
console.log(Verification.isSuccess());

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
