// This test verifies that the Underline function applies underline formatting to selected text.
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "UnderlineTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickUnderline();
FileMenu.downloadAs("pptx");
Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

// Check that text exists
const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

// Check that underline style was applied (expecting @u='sng' attribute in XML)
const underlineXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr[@u='sng']]/a:t[text()='" + inputText + "']";
Verification.check(filePath, underlineXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Underline style was not applied in the exported file");
}
Tester.close();
