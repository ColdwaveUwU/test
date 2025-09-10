// This test verifies the functionality of applying automatic font color to text in a presentation.
const { Font, Color, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "AutoColorTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickFontColor({ type: Color.Type.Auto });
FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

const autoColorXpath =
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr/a:solidFill/a:schemeClr[@val='accent2']]/a:t[text()='" +
    inputText +
    "']";
Verification.check(filePath, autoColorXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Auto font color was not applied in the exported file");
}
Tester.close();
