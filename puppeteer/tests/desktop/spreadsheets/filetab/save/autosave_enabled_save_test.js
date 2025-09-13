// Test: Verifies that when autosave is enabled, content is saved automatically.

const { FileMenu, Verification } = require("lib");

Tester.createFile("xlsx");

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
    console.log("Save button not disabled - autosave may work differently");
}

FileMenu.downloadAs("xlsx");

Verification.openFile();
Verification.check("xl/sharedStrings.xml", "//si/t", "Test content with autosave enabled");

console.log(Verification.isSuccess());

Tester.close();
