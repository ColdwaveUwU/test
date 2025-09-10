// This test validates the eyedropper (color picker) functionality for copying colors from existing elements.
const { Font, Color, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const firstWord = "EyeDropperColorTest";
Tester.createFile(fileName);

Tester.input(firstWord);
Tester.keyDown("Shift");
for (let i = 0; i < firstWord.length; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");
Font.clickFontColor({ type: Color.Type.EyeDropper, x: 100, y: 100});

FileMenu.downloadAs("pptx");
Verification.openFile();
const filePath = "ppt/slides/slide1.xml";

// Check white color applied to text through EyeDropper
const firstWordColorXpath = 
  "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1][a:rPr/a:solidFill/a:srgbClr[@val='FFFFFF']]/a:t[text()='" + firstWord + "']";
Verification.check(filePath, firstWordColorXpath, firstWord);
if (!Verification.isSuccess()) {
    throw new Error("White color was not applied to first word through EyeDropper");
}

Tester.close();