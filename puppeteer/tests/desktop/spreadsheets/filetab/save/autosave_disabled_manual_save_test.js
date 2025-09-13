// This test verifies that manual save works correctly when autosave is disabled.

const { FileMenu, Verification } = require("lib");

Tester.createFile("xlsx");

FileMenu.setAdvancedSettings({
    editing: {
        autosave: false,
    },
});

Tester.input("Initial content for autosave test");
FileMenu.clickFileMenu();
FileMenu.save();

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/sharedStrings.xml", "//si/t", "Initial content for autosave test");

console.log(Verification.isSuccess());

Tester.close();
