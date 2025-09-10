// This test verifies that the Italic function applies italic formatting to selected text.
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "ItalicTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickItalic();
FileMenu.downloadAs("pptx");
Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

// Check that text exists
const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

// Check that italic style was applied (expecting @i='1' attribute in XML)
const italicXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr[@i='1']]/a:t[text()='" + inputText + "']";
Verification.check(filePath, italicXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Italic style was not applied in the exported file");
}
Tester.close();
