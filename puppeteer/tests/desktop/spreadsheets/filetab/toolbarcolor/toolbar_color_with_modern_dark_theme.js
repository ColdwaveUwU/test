// This test verifies that toolbar color can be enabled with Modern Dark theme
const { FileMenu } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Modern Dark",
        useToolbarColor: true,
    },
});

const isModernDarkThemeApplied = Tester.checkSelector("body.theme-night");
if (!isModernDarkThemeApplied) {
    throw new Error("Modern Dark theme was not applied");
}

const isToolbarColorEnabled = Tester.checkSelector("#fms-chb-tab-background input:checked");
if (!isToolbarColorEnabled) {
    throw new Error("Toolbar color checkbox was not enabled");
}

console.log("Toolbar color successfully enabled with Modern Dark theme");

Tester.close();
