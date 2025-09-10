// This test verifies that the Highlight functionality works correctly in a document
const { Font, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "HighlightTest";

Tester.createFile(fileName);
Tester.input(inputText);

for (let highlightIndex = 0; highlightIndex < 16; highlightIndex++) {
    Tester.keyDown("Shift");
    for (let i = 0; i < inputText.length; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");

    Font.clickHightlight({ index: highlightIndex });

    FileMenu.downloadAs("docx");

    Verification.openFile();
    const filePath = "word/document.xml";

    const highlightXpath = "//w:r[w:rPr/w:highlight]/w:t[text()='" + inputText + "']";
    Verification.check(filePath, highlightXpath, inputText);
    if (!Verification.isSuccess()) {
        throw new Error("Highlight with index " + highlightIndex + " was not applied in the exported file");
    }
}

Tester.close();
