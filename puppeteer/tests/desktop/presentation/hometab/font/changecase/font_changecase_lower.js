// The test verifies the correctness of converting text to lower case
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "CaseTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickChangeCase("lowercase");
FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";
const xpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]";
Verification.check(filePath, xpath, inputText.toLowerCase());
if (!Verification.isSuccess()) {
    throw new Error("Change case to lower was not applied in the exported file");
}
Tester.close();
