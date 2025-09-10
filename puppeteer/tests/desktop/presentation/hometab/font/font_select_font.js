// This test verifies that the selected font is correctly applied to the entered text in a slide
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "FontTest";
const fontName = "Times New Roman";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.selectFont(fontName);
FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";
const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

const fontXpath =
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:rPr[a:latin[@typeface='" +
    fontName +
    "']]/following-sibling::a:t[text()='" +
    inputText +
    "']";
Verification.check(filePath, fontXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Font was not changed to " + fontName + " in the exported file");
}

Tester.close();
