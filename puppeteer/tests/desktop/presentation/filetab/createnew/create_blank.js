// This test verifies creating a new blank presentation
const { FileMenu, Verification } = require("lib");

const fileName = "pptx";
const inputText = "BlankPresentationTest";

Tester.createFile(fileName);

FileMenu.createNew("Blank");

Tester.input(inputText);

FileMenu.downloadAs("pptx");

Verification.openFile();
const filePath = "ppt/slides/slide1.xml";
const textXpath = "//a:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("New blank presentation does not contain the expected text");
}

console.log("Blank presentation created and verified successfully");

Tester.close();
