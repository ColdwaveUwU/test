// This test verifies creating a new document using the specific "Blank Presentation" template
const { FileMenu, Verification } = require("lib");

const fileName = "pptx";
const inputText = "BlankPresentationTemplateTest";

Tester.createFile(fileName);

FileMenu.createNew("Blank Presentation");

Tester.input(inputText);

FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";
const textXpath = "//a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("New presentation using 'Blank Presentation' template does not contain the expected text");
}

console.log("Presentation using 'Blank Presentation' template created and verified successfully");

Tester.close();
