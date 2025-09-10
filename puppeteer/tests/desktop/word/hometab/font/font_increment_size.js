// This test verifies that the increment font size functionality works correctly in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "FontIncreaseTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

const increments = 5; // Number of increments

for (let i = 1; i <= increments; i++) {
    Tester.keyDown("Shift");
    for (let j = 0; j < inputText.length; j++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");

    Font.clickIncFont();
}

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const fontSizeXpath = "//w:r[w:rPr/w:sz]/w:t[text()='" + inputText + "']";
Verification.check(filePath, fontSizeXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Font size was not increased correctly after " + increments + " increments");
}

Tester.close();
