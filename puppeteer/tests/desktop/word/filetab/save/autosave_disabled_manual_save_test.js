// This test verifies that manual save works correctly when autosave is disabled.

const { FileMenu, Verification } = require("lib");

Tester.createFile("docx");

FileMenu.setAdvancedSettings({
    editing: {
        autosave: false,
    },
});

Tester.input("Initial content for autosave test");
FileMenu.clickFileMenu();
FileMenu.save();

FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "//w:t", "Initial content for autosave test");

console.log(Verification.isSuccess());

Tester.close();

