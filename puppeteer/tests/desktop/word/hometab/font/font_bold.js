// This test verifies that the Bold style is correctly applied to the entered text in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "BoldTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickBold();

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const boldXpath = "//w:r[w:rPr/w:b]/w:t[text()='" + inputText + "']";
Verification.check(filePath, boldXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Bold style was not applied to the text in the exported file");
}

Tester.close();
