// This test verifies that the Clear Style functionality correctly removes multiple formatting from text in a document
const { Font, Verification, FileMenu, Color } = require("lib");

const fileName = "docx";
const inputText = "ClearStyleTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickBold();
Font.clickItalic();
Font.clickUnderline();

Font.clickClearStyle();

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";

// Check that text exists and all formatting has been removed
const clearStyleXpath = `//w:r[not(w:rPr/w:b) and not(w:rPr/w:i) and not(w:rPr/w:u)]/w:t[text()='${inputText}']`;
Verification.check(filePath, clearStyleXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Clear style functionality did not remove all formatting correctly");
}

Tester.close();
