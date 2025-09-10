// This test verifies that the Highlight "No fill" option removes background highlighting from selected text in Word
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "NoFillTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickHightlight({ index: 1 });

Tester.keyPress("ArrowRight");

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

// Open highlight dropdown and apply "No Fill"
Font.clickHightlight(true);

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";

const noFillXpath = "//w:r[w:rPr/w:highlight[@w:val='none']]/w:t[text()='" + inputText + "']";
Verification.check(filePath, noFillXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("No fill option did not apply correctly - highlight should have value 'none'");
}

Tester.close();
