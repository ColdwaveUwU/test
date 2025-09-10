// This test verifies that the Standard font color is correctly applied to the entered text in a document
const { Font, Verification, FileMenu, Color } = require("lib");

const fileName = "docx";
const inputText = "FontColorStandardTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickFontColor({ type: Color.Type.Standard, index: 5 });

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const colorXpath =
    "//w:document[1]/w:body[1]/w:p[1]/w:r[1][w:rPr/w:color[@w:val='00b050']]/w:t[text()='" + inputText + "']";
Verification.check(filePath, colorXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Standard font color was not applied correctly");
}

Tester.close();
