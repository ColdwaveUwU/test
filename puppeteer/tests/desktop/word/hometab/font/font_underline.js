// This test verifies that the Underline style is correctly applied to the entered text in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "UnderlineTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickUnderline();

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const underlineXpath = "//w:document[1]/w:body[1]/w:p[1]/w:r[1][w:rPr/w:u]/w:t[text()='" + inputText + "']";
Verification.check(filePath, underlineXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Underline style was not applied to the text in the exported file");
}

Tester.close();
