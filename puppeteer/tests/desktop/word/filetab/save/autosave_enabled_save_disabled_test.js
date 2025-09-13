// Test: Verifies that when autosave is enabled, manual save button becomes disabled.

const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");

FileMenu.setAdvancedSettings({
    editing: {
        autosave: true,
    },
});

Tester.input("Test content with autosave enabled");

FileMenu.clickFileMenu();

const isSaveButtonDisabled = Tester.checkSelector("#fm-btn-save.disabled");

if (isSaveButtonDisabled) {
    console.log("Save button disabled - OK");
} else {
    throw new Error("Save button should be disabled with autosave enabled");
}

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:t", "Test content with autosave enabled");

console.log(Verification.isSuccess());

Tester.close();
