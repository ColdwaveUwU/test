// This test verifies that the Capitalize case change functionality works correctly in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "capitalize test";
const expectedText = "Capitalize Test";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickChangeCase("Capitalize Each Word");

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const textXpath = "//w:document[1]/w:body[1]/w:p[1]/w:r[1]/w:t[1]/text()[1]";
Verification.check(filePath, textXpath, expectedText);

if (!Verification.isSuccess()) {
    throw new Error("Capitalize case change was not applied correctly");
}

Tester.close();
