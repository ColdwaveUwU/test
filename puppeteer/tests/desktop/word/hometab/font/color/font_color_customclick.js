// This test validates the custom color selection functionality using the color palette interface in a document
const { Font, Color, Verification, FileMenu } = require("lib");
const fileName = "docx";
const inputText = "CustomClickColorTest";

Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickFontColor({
    type: Color.Type.CustomClick,
    x: 50,
    y: 100,
    hue: 45,
});

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const customClickColorXpath = "//w:t[text()='" + inputText + "' and parent::w:r/w:rPr/w:color]";
Verification.check(filePath, customClickColorXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("CustomClick font color was not applied in the exported file");
}

Tester.close();
