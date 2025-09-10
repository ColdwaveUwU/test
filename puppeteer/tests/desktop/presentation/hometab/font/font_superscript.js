// This test verifies that the Superscript function applies superscript formatting to selected text.
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "SuperTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickSuperscript();
FileMenu.downloadAs("pptx");
Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

// Check that text exists
const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

const superscriptXpath =
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr[@baseline='30000']]/a:t[text()='" + inputText + "']";
Verification.check(filePath, superscriptXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Superscript style was not applied in the exported file");
}
Tester.close();
