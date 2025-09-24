// This test verifies that manual save works correctly when autosave is disabled.

const { FileMenu, Verification } = require("lib");

Tester.createFile("pptx");
FileMenu.clickFileMenu();
FileMenu.setAdvancedSettings({
    editing: {
        autosave: false,
    },
});

Tester.input("Initial content for autosave test");
FileMenu.save();

FileMenu.downloadAs("pptx");

Verification.openFile();
Verification.check("ppt/slides/slide1.xml", "//a:t", "Initial content for autosave test");

console.log(Verification.isSuccess());

Tester.close();
