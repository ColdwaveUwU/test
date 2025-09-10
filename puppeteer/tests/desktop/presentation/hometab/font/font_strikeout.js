// This test verifies that the Strikeout function applies strikethrough formatting to selected text.
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "StrikeTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickStrikeout();
FileMenu.downloadAs("pptx");
Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

// Check that text exists
const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Text not found in the exported file");
}

// Check that strikeout style was applied (expecting strike='sngStrike' attribute in XML)
const strikeoutXpath =
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr[@strike='sngStrike']]/a:t[text()='" + inputText + "']";
Verification.check(filePath, strikeoutXpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Strikeout style was not applied in the exported file");
}

Tester.close();
