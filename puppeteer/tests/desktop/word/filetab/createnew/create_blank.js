// This test verifies creating a new blank document using "Blank" option
const { FileMenu, Verification } = require("lib");

const fileName = "docx";
const inputText = "BlankDocumentTest";

Tester.createFile(fileName);
FileMenu.createNew("Blank");

Tester.input(inputText);

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const textXpath = "//w:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("New blank document does not contain the expected text");
}

Tester.close();
