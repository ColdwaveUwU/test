// This test validates the custom color selection functionality using the color palette interface.
const { Font, Color, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "CustomClickColorTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");
Font.clickFontColor({ type: Color.Type.CustomClick, x: 50, y: 100, hue: 45 });
FileMenu.downloadAs("pptx");
Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

const textXpath = 
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

const customClickColorXpath = 
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr/a:solidFill]/a:t[text()='" 
    + inputText + "']";
Verification.check(filePath, customClickColorXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("CustomClick font color was not applied in the exported file");
}
Tester.close();
