// The test verifies the correctness of entering an arbitrary font size
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "FontSizeTest";
const fontSize = "66";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.setFontSize(fontSize);
FileMenu.downloadAs("pptx");
Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

const sizeXpath =
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[a:rPr[@sz='" +
    parseInt(fontSize, 10) * 100 +
    "']]/a:t[text()='" +
    inputText +
    "']";

Verification.check(filePath, sizeXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Font size was not set to " + fontSize + " in the exported file");
}

Tester.close();
