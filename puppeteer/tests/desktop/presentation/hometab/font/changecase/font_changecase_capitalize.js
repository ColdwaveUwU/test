// The test verifies the correctness of converting text to capitalize each word
const { Font, Verification, FileMenu } = require("lib");
const fileName = "pptx";
const inputText = "caseTest";
Tester.createFile(fileName);
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Font.clickChangeCase("Capitalize Each Word");
FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";
const xpath = "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]";
const expected = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
Verification.check(filePath, xpath, expected);
if (!Verification.isSuccess()) {
    throw new Error("Change case to capitalize was not applied in the exported file");
}
Tester.close();
