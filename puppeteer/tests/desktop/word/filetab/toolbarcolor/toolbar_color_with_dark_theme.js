// This test verifies that toolbar color can be enabled with Dark theme
const { FileMenu } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Dark",
        useToolbarColor: true,
    },
});

const isDarkThemeApplied = Tester.checkSelector("body.theme-dark");
if (!isDarkThemeApplied) {
    throw new Error("Dark theme was not applied");
}

const isToolbarColorEnabled = Tester.checkSelector("#fms-chb-tab-background input:checked");
if (!isToolbarColorEnabled) {
    throw new Error("Toolbar color checkbox was not enabled");
}

console.log("Toolbar color successfully enabled with Dark theme");

Tester.close();
