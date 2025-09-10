// This test verifies that the Auto font color is correctly applied to the entered text in a document
const { Font, Verification, FileMenu, Color } = require("lib");

const fileName = "docx";
const inputText = "FontColorAutoTest";

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
    g: 0,
    b: 0,
});

Font.clickFontColor({ type: Color.Type.Auto });

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const autoColorXpath =
    "//w:document[1]/w:body[1]/w:p[1]/w:r[1][w:rPr/w:color[@w:val='auto']]/w:t[text()='" + inputText + "']";
Verification.check(filePath, autoColorXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Auto font color was not applied correctly");
}

Tester.close();
