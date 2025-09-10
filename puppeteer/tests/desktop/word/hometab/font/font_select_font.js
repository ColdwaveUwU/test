// This test verifies that selecting a font family works correctly in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "FontSelectTest";
const fontName = "Times New Roman";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.selectFont(fontName);

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const fontXpath =
    "//w:document[1]/w:body[1]/w:p[1]/w:r[1][w:rPr/w:rFonts[@w:ascii='" +
    fontName +
    "']]/w:t[text()='" +
    inputText +
    "']";
Verification.check(filePath, fontXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Font family was not selected correctly");
}

Tester.close();
