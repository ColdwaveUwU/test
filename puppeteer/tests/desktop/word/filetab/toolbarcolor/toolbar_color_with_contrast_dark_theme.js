// This test verifies that toolbar color can be enabled with Contrast Dark theme
const { FileMenu } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Contrast Dark" },
        useToolbarColor: true,
    },
});

const isContrastDarkThemeApplied = Tester.checkSelector("body.theme-contrast-dark");
if (!isContrastDarkThemeApplied) {
    throw new Error("Contrast Dark theme was not applied");
}

const isToolbarColorEnabled = Tester.checkSelector("#fms-chb-tab-background input:checked");
if (!isToolbarColorEnabled) {
    throw new Error("Toolbar color checkbox was not enabled");
}

console.log("Toolbar color successfully enabled with Contrast Dark theme");

Tester.close();
