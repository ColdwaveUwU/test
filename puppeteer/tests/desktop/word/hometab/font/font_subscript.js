// This test verifies that the Subscript style is correctly applied to the entered text in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "SubscriptTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickSubscript();

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const subscriptXpath =
    "//w:document[1]/w:body[1]/w:p[1]/w:r[1][w:rPr/w:vertAlign[@w:val='subscript']]/w:t[text()='" + inputText + "']";
Verification.check(filePath, subscriptXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Subscript style was not applied to the text in the exported file");
}

Tester.close();
