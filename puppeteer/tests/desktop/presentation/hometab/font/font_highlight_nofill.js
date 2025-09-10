// This test verifies that the Highlight "No fill" option removes background highlighting from selected text
const { Font, Verification, FileMenu } = require("lib");

const fileName = "pptx";
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

FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

const noFillXpath = 
    "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][not(a:rPr/a:highlight)]/a:t[text()='" + inputText + "']";
Verification.check(filePath, noFillXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("No fill option did not remove highlighting from the text in the exported file");
}

Tester.close();
