// This test verifies that the Custom font color is correctly applied to the entered text in a document
const { Font, Verification, FileMenu, Color } = require("lib");

const fileName = "docx";
const inputText = "FontColorCustomTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickFontColor({
    type: Color.Type.Custom,
    r: 255,
    g: 128,
    b: 64,
});

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const colorXpath = "//w:t[text()='" + inputText + "' and parent::w:r/w:rPr/w:color[@w:val='ff8040']]";
Verification.check(filePath, colorXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Custom font color was not applied correctly");
}

Tester.close();
