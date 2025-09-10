//Test for verifying Redo functionality in presentation editor.
const { AppTitle, Verification, FileMenu } = require("lib");

const fileName = "pptx";
const inputText = "RedoTestText";
Tester.createFile(fileName);
Tester.input(inputText);

AppTitle.clickUndoButton();
AppTitle.clickRedoButton();
FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";
const xpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]";
Verification.check(filePath, xpath, inputText);
if (!Verification.isSuccess()) {
    throw new Error("Redo did not restore the text as expected");
}
Tester.close();
