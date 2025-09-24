// This test verifies that toolbar color can be enabled with System theme
const { FileMenu } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Same as system" },
        useToolbarColor: true,
    },
});

const systemThemeSelector = "body.theme-white, body.theme-night";
const isSystemThemeApplied = Tester.checkSelector(systemThemeSelector);
if (!isSystemThemeApplied) {
    throw new Error("System theme was not applied");
}

const isToolbarColorEnabled = Tester.checkSelector("#fms-chb-tab-background input:checked");
if (!isToolbarColorEnabled) {
    throw new Error("Toolbar color checkbox was not enabled");
}

console.log("Toolbar color successfully enabled with System theme");

Tester.close();
