// This test verifies that the Clear Style function removes bold formatting from selected text.
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "ClearStyleTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickBold();
Font.clickClearStyle();
FileMenu.downloadAs("pptx");
Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

// Check that text exists
const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

// Check that bold style is NOT applied after clearing styles
const clearedStyleXpath =
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr[@lang='en-US' and not(@b)]]/a:t[text()='" + inputText + "']";
Verification.check(filePath, clearedStyleXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Bold style was not cleared - clear style function failed");
}

Tester.close();
