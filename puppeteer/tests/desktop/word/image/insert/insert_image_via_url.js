const { Image, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
Image.fromUrl("https://avatars.mds.yandex.net/i?id=9045280b715298fb7b72fa6d88fe92c6_l-4519035-images-thumbs&n=13");
FileMenu.downloadAs("docx");
Verification.openFile();

Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:blipFill[1]/a:blip[1]/@r:embed",
    "rId8"
);
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[8]/@Id", "rId8");
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[8]/@Target", "media/image1.jpg");
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/wp:extent[1]/@cy",
    "3938502"
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
    "3938501"
);
console.log(Verification.isSuccess());

if (!Verification.isSuccess()) {
    throw new Error("verification error");
}

Tester.close();
