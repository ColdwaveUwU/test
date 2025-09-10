// This test verifies that the Highlight function applies background highlighting to selected text.
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "HighlightTest";

Tester.createFile(fileName);

for (let highlightIndex = 0; highlightIndex < 16; highlightIndex++) {
    // 1. Add text
    Tester.input(inputText + highlightIndex);

    Tester.keyDown("Shift");
    for (let i = 0; i < (inputText + highlightIndex).length; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");

    Font.clickHightlight({ index: highlightIndex });

    FileMenu.downloadAs("pptx");
    Verification.openFile();
    const filePath = "ppt/slides/slide1.xml";

    const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + highlightIndex + "']";
    Verification.check(filePath, textXpath, inputText + highlightIndex);
    if (!Verification.isSuccess()) {
        throw new Error("Text not found in the exported file for highlight index " + highlightIndex);
    }

    const highlightXpath =
        "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr/a:highlight]/a:t[text()='" + inputText + highlightIndex + "']";
    Verification.check(filePath, highlightXpath, inputText + highlightIndex);
    if (!Verification.isSuccess()) {
        throw new Error("Highlight with index " + highlightIndex + " was not applied in the exported file");
    }

    Tester.keyDown("Control");
    Tester.keyPress("A");
    Tester.keyUp("Control");
    Tester.keyPress("Delete");
}

Tester.close();
