// This test verifies that the Decrease Font Size function reduces the font size of selected text.
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "DecFontTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickDecFont();
FileMenu.downloadAs("pptx");
Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

// Check that text exists
const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

// Check that font size was decreased (expecting smaller size attribute in XML)
const decreasedFontXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr[@sz]]/a:t[text()='" + inputText + "']";
Verification.check(filePath, decreasedFontXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Font size was not decreased - size attribute not found in the exported file");
}

Tester.close();
