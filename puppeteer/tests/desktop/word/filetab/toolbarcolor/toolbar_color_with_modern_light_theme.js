// This test verifies that toolbar color can be enabled with Modern Light theme
const { FileMenu } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Modern Light",
        useToolbarColor: true,
    },
});

const isModernLightThemeApplied = Tester.checkSelector("body.theme-white");
if (!isModernLightThemeApplied) {
    throw new Error("Modern Light theme was not applied");
}

const isToolbarColorEnabled = Tester.checkSelector("#fms-chb-tab-background input:checked");
if (!isToolbarColorEnabled) {
    throw new Error("Toolbar color checkbox was not enabled");
}

console.log("Toolbar color successfully enabled with Modern Light theme");

Tester.close();
