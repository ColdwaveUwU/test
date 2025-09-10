// This test verifies the functionality of applying custom RGB font colors to text in presentations.
const { Font, Color, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "CustomColorTest";
const customColor = { r: 105, g: 80, b: 180 };
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");
Font.clickFontColor({ type: Color.Type.Custom, r: customColor.r, g: customColor.g, b: customColor.b });
FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

const textXpath = 
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

const customColorXpath = 
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr/a:solidFill/a:srgbClr]/a:t[text()='" + inputText + "']";
Verification.check(filePath, customColorXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Custom RGB font color was not applied in the exported file");
}
Tester.close();
