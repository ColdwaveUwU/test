const { Font, TextForm, TestData, Color, PageBreakInsert, PageHeaderFooter, Hyperlink, PageZoom, FileMenu } = require("lib");
const { Verification, PageSize } = require("lib");

Tester.createFile("docx");

Tester.input(TestData.getParagraphAutoIndex());
Tester.keyDown("Enter");
Font.selectFont("Verdana");
Tester.input(TestData.getParagraphAutoIndex());
Tester.keyDown("Enter");
Font.selectFont("Arial");
Tester.input(TestData.getParagraphAutoIndex());

Tester.keyDown("Shift");
for (let i = 0; i < 10; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickHightlight({ index: 1 });
Tester.keyPress("ArrowRight");
Tester.keyDown("Enter");
TextForm.clickBullets("Filled round bullets");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.keyDown("Tab");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.keyDown("Enter");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.keyDown("Enter");

TextForm.clickNumbering("numberDot");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.keyDown("Tab");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.keyDown("Enter");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.keyDown("Enter");

TextForm.clickMultilevels("variosnumbullets");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.keyDown("Tab");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.keyDown("Enter");
Tester.input(TestData.getListItemAutoIndex());
Tester.keyDown("Enter");
Tester.keyDown("Enter");

TextForm.clickLineSpacing("2.0");
Tester.input(TestData.getParagraphAutoIndex());
Tester.keyDown("Enter");

PageHeaderFooter.editHeader("test Header");
PageHeaderFooter.editFooter("test Footer");
PageHeaderFooter.close();
TextForm.clickShading({ type: Color.Type.Standard, index: 5 });
Tester.input(TestData.getParagraphAutoIndex());
Tester.keyDown("Enter");
Tester.keyPress("Escape");
PageBreakInsert.insertPageBreak();
PageSize.setSize("A5");
Hyperlink.addExternalLink({ link: "https://www.onlyoffice.com/ru/" });
PageZoom.setZoomByClick("200%");

FileMenu.downloadAs("pdf");
FileMenu.downloadAs("odt");
FileMenu.downloadAs("dotx");
FileMenu.downloadAs("pdfa");
FileMenu.downloadAs("ott");
FileMenu.downloadAs("rtf");
FileMenu.downloadAs("txt");
FileMenu.downloadAs("fb2");
FileMenu.downloadAs("epub");
FileMenu.downloadAs("html");
FileMenu.downloadAs("jpg");
FileMenu.downloadAs("png");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:pgSz[1]/@w:h", "11906");
Verification.check("word/document.xml", "//w:pgSz[1]/@w:w", "8391");
Verification.check("word/document.xml", "/w:document/w:body/w:p[1]/w:r[1]/w:t[1]/text()", "Paragraph1");
Verification.check("word/document.xml", "/w:document/w:body/w:p[2]/w:r[1]/w:t[1]/text()", "Paragraph2");
Verification.check("word/document.xml", "/w:document/w:body/w:p[3]/w:r[1]/w:t[1]/text()", "Paragraph3");
Verification.check("word/document.xml", "/w:document/w:body/w:p[4]/w:r[1]/w:t[1]/text()", "ListItem1");
Verification.check("word/document.xml", "/w:document/w:body/w:p[5]/w:r[1]/w:t[1]/text()", "ListItem2");
Verification.check("word/document.xml", "/w:document/w:body/w:p[6]/w:r[1]/w:t[1]/text()", "ListItem3");
Verification.check("word/document.xml", "/w:document/w:body/w:p[7]/w:r[1]/w:t[1]/text()", "ListItem4");
Verification.check("word/document.xml", "/w:document/w:body/w:p[8]/w:r[1]/w:t[1]/text()", "ListItem5");
Verification.check("word/document.xml", "/w:document/w:body/w:p[9]/w:r[1]/w:t[1]/text()", "ListItem6");
Verification.check("word/document.xml", "/w:document/w:body/w:p[10]/w:r[1]/w:t[1]/text()", "ListItem7");
Verification.check("word/document.xml", "/w:document/w:body/w:p[11]/w:r[1]/w:t[1]/text()", "ListItem8");
Verification.check("word/document.xml", "/w:document/w:body/w:p[12]/w:r[1]/w:t[1]/text()", "ListItem9");
Verification.check("word/document.xml", "/w:document/w:body/w:p[13]/w:r[1]/w:t[1]/text()", "ListItem10");
Verification.check("word/document.xml", "/w:document/w:body/w:p[14]/w:r[1]/w:t[1]/text()", "ListItem11");
Verification.check("word/document.xml", "/w:document/w:body/w:p[15]/w:r[1]/w:t[1]/text()", "ListItem12");
Verification.check("word/document.xml", "/w:document/w:body/w:p[16]/w:r[1]/w:t[1]/text()", "Paragraph4");
Verification.check("word/document.xml", "/w:document/w:body/w:p[17]/w:r[1]/w:t[1]/text()", "Paragraph5");

console.log(Verification.isSuccess());
Tester.close();
