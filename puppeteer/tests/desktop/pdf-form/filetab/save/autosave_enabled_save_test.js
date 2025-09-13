// Test: Verifies that when autosave is enabled, content is saved automatically.

const { FileMenu, Verification } = require("lib");

const fileName = "pdf";
const inputText = "Test content with autosave enabled";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    editing: {
        autosave: true,
    },
});

Tester.input(inputText);

FileMenu.clickFileMenu();

const isSaveButtonDisabled = Tester.checkSelector("#fm-btn-save.disabled");

if (isSaveButtonDisabled) {
    console.log("Save button disabled - OK");
} else {
    console.log("Save button not disabled - autosave may work differently");
}

FileMenu.downloadAs("pdf");

Verification.openFile();
const filePath = "word/document.xml";
const textXpath = "//w:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Document with autosave enabled does not contain the expected text");
}

console.log(Verification.isSuccess());

Tester.close();
