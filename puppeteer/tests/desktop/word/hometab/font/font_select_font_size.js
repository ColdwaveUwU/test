// This test verifies that selecting font sizes from dropdown works correctly in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "FontSizeTest";
const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72, 96];

Tester.createFile(fileName);

for (const fontSize of fontSizes) {
    Tester.input(inputText);
    Tester.keyDown("Shift");
    for (let i = 0; i < inputText.length; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");

    Font.selectFontSize(fontSize.toString());

    FileMenu.downloadAs("docx");
    Verification.openFile();
    const filePath = "word/document.xml";
    const sizeXpath =
        "//w:document[1]/w:body[1]/w:p[1]/w:r[1][w:rPr/w:sz[@w:val='" +
        fontSize * 2 +
        "']]/w:t[text()='" +
        inputText +
        "']";
    Verification.check(filePath, sizeXpath, inputText);

    if (!Verification.isSuccess()) {
        throw new Error("Font size was not set to " + fontSize + " in the exported file");
    }

    Tester.keyDown("Control");
    Tester.keyPress("A");
    Tester.keyUp("Control");
    Tester.keyPress("Backspace");
}

Tester.close();
