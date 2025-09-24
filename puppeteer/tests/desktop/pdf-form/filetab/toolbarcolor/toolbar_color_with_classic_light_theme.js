// This test verifies that toolbar color can be enabled with Classic Light theme
const { FileMenu } = require("lib");

const fileName = "pdf";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Classic Light" },
        useToolbarColor: true,
    },
});

const isClassicLightThemeApplied = Tester.checkSelector("body.theme-classic-light");
if (!isClassicLightThemeApplied) {
    throw new Error("Classic Light theme was not applied");
}

const isToolbarColorEnabled = Tester.checkSelector("#fms-chb-tab-background input:checked");
if (!isToolbarColorEnabled) {
    throw new Error("Toolbar color checkbox was not enabled");
}

console.log("Toolbar color successfully enabled with Classic Light theme");

Tester.close();
