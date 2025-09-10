// This test validates the eyedropper (color picker) functionality for copying colors from existing elements in a document
const { Font, Color, Verification, FileMenu } = require("lib");

const fileName = "docx";
const inputText = "EyeDropperColorTest";

Tester.createFile(fileName);
Tester.input(inputText);

Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");

Font.clickFontColor({
    type: Color.Type.EyeDropper,
    x: 100,
    y: 100,
});

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const eyeDropperColorXpath = "//w:t[text()='" + inputText + "' and parent::w:r/w:rPr/w:color[@w:val='ffffff']]";
Verification.check(filePath, eyeDropperColorXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("White color was not applied to text through EyeDropper");
}

Tester.close();
