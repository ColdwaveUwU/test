// This test verifies that manual save works correctly when autosave is disabled.

const { FileMenu, Verification } = require("lib");

const fileName = "pdf";
const inputText = "Initial content for PDF form test";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    editing: {
        autosave: false,
    },
});

Tester.input(inputText);
FileMenu.clickFileMenu();
FileMenu.save();

FileMenu.downloadAs("pdf");

Verification.openFile();
const filePath = "word/document.xml";
const textXpath = "//w:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Document with autosave disabled does not contain the expected text");
}

console.log(Verification.isSuccess());

Tester.close();
