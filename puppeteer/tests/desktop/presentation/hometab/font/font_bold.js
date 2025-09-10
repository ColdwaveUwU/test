// This test verifies that the Bold style is correctly applied to the entered text in a slide
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "BoldTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickBold();
FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";
const xpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]";
Verification.check(filePath, xpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

const boldTextXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr[@b='1']]/a:t[text()='" + inputText + "']";
Verification.check(filePath, boldTextXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Bold style was not applied to the text in the exported file");
}

Tester.close();
