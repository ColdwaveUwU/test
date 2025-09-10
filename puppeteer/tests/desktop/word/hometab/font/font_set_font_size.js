// This test verifies that setting a specific font size works correctly in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
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

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const sizeXpath =
    "//w:document[1]/w:body[1]/w:p[1]/w:r[1][w:rPr/w:sz[@w:val='" +
    parseInt(fontSize, 10) * 2 +
    "']]/w:t[text()='" +
    inputText +
    "']";
Verification.check(filePath, sizeXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Font size was not set to " + fontSize + " in the exported file");
}

Tester.close();
