const { Font, FileMenu, Image, TestData } = require("lib");
const { Verification } = require("lib");

var randomSize = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
var length = randomSize.length - 1;

var getRandomNumber = function () {
    return Math.floor(Math.random() * length);
};

Tester.createFile("docx");
Image.fromFile("png/testFile.png");
Image.clickActualSize();
Image.wrapSquare();
Tester.keyPress("Escape");
Image.fromUrl("https://static.onlyoffice.com/assets/docs/samples/img/onlyoffice_logo.png");
Image.clickActualSize();
Image.wrapTight();
Tester.keyPress("Escape");
Tester.input(TestData.LOREM_IPSUM());
Tester.keyDown("Control");
Tester.keyPress("A");
Tester.keyUp("Control");
Font.selectFont("Times New Roman");
Font.clickFontColor({
    type: 5,
    x: 50,
    y: 100,
    hue: 45,
});
Font.selectFontSize(randomSize[getRandomNumber()]);
//add chek font and Font size
FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:blipFill[1]/a:blip[1]/@r:embed",
    "rId8"
);
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[8]/@Id", "rId8");
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[9]/@Id", "rId9");
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[8]/@Target", "media/image1.png");
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[9]/@Target", "media/image2.png");
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[2]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/wp:extent[1]/@cy",
    "4772025"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[2]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/wp:extent[1]/@cx",
    "9867900"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[2]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:spPr[1]/a:xfrm[1]/a:ext[1]/@cx",
    "9867900"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[2]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:spPr[1]/a:xfrm[1]/a:ext[1]/@cy",
    "4772025"
);
Verification.check(
    "word/document.xml",
    "boolean(//mc:AlternateContent[2]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/wp:wrapSquare[1])",
    true
);
Verification.check(
    "word/document.xml",
    "boolean(//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/wp:wrapTight[1])",
    true
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[2]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:blipFill[1]/a:blip[1]/@r:embed",
    "rId9"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/wp:extent[1]/@cy",
    "2286000"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/wp:extent[1]/@cx",
    "2457450"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:spPr[1]/a:xfrm[1]/a:ext[1]/@cx",
    "2457450"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:spPr[1]/a:xfrm[1]/a:ext[1]/@cy",
    "2286000"
);

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

console.log(Verification.isSuccess());
Tester.close();
