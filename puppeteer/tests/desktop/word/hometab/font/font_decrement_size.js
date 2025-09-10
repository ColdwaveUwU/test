// This test verifies that the decrement font size functionality works correctly in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "FontDecreaseTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

const decrements = 5; // Number of decrements

for (let i = 1; i <= decrements; i++) {
    Tester.keyDown("Shift");
    for (let j = 0; j < inputText.length; j++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");

    Font.clickDecFont();
}

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const fontSizeXpath = "//w:r[w:rPr/w:sz]/w:t[text()='" + inputText + "']";
Verification.check(filePath, fontSizeXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Font size was not decreased correctly after " + decrements + " decrements");
}

Tester.close();
