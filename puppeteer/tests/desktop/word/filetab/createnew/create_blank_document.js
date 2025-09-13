// This test verifies creating a new blank document using "Blank document" option
const { FileMenu, Verification } = require("lib");

const fileName = "docx";
const inputText = "BlankDocumentSpecificTest";

Tester.createFile(fileName);

FileMenu.createNew("Blank document");

Tester.input(inputText);

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const textXpath = "//w:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("New blank document (Word-specific) does not contain the expected text");
}

Tester.close();
