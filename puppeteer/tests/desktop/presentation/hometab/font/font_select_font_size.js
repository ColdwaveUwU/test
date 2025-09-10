// The test verifies both the selection of font sizes from the list and the correct application of these sizes to the slide text

const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "FontSizeTest";
const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72, 96];

Tester.createFile(fileName);

for (const fontSize of fontSizes) {
    Tester.input(inputText);
    Tester.keyDown("Shift");
    for (let i = 0; i < inputText.length; i++) Tester.keyPress("ArrowLeft");
    Tester.keyUp("Shift");
    Font.selectFontSize(fontSize.toString());

    FileMenu.downloadAs("pptx");
    Verification.openFile();
    const filePath = "ppt/slides/slide1.xml";
    const textXpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[text()='" + inputText + "']";
    Verification.check(filePath, textXpath, inputText);
    if (!Verification.isSuccess()) {
        throw new Error("Text not found in the exported file for font size " + fontSize);
    }

    const sizeXpath =
        "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[a:rPr[@sz='" + fontSize * 100 + "']]/a:t[text()='" + inputText + "']";
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
