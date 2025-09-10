const { Image, FileMenu, Font, TextForm, TestData, Color } = require("lib");
const { Verification } = require("lib");

Tester.createFile("docx");
Image.fromFile("png/testFile.png");
Tester.keyPress("Escape");
Tester.input(TestData.LOREM_IPSUM());
Tester.keyDown("ControlLeft");
Tester.keyPress("A");
Tester.keyUp("ControlLeft"); //select all

Font.selectFont("Times New Roman");
Font.setFontSize("18");
Font.clickFontColor({ type: Color.Type.Standard, index: 1 });
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

Verification.check(
    "word/document.xml",
    "/w:document/w:body/w:p[1]/w:r[1]/w:t[1]/text()",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat faucibus eros, sed mattis tortor consectetur cursus. Mauris non eros odio. Curabitur velit metus, placerat sit amet tempus cursus, pulvinar sed enim. Vivamus odio arcu, volutpat gravida imperdiet vitae, mollis eget augue. Sed ultricies viverra convallis. Fusce pharetra mi eget"
);

Verification.check(
    "word/document.xml",
    "/w:document/w:body/w:p[1]/w:r[1]/w:rPr[1]/w:rFonts[1]/@w:ascii",
    "Times New Roman"
);
Verification.check(
    "word/document.xml",
    "/w:document/w:body/w:p[1]/w:r[1]/w:rPr[1]/w:rFonts[1]/@w:cs",
    "Times New Roman"
);
Verification.check("word/document.xml", "/w:document/w:body/w:p[1]/w:r[1]/w:rPr[1]/w:sz[1]/@w:val", "36");
Verification.check("word/document.xml", "/w:document/w:body/w:p[1]/w:r[1]/w:rPr[1]/w:color[1]/@w:val", "ff0000");

console.log(Verification.isSuccess());

Tester.close();
