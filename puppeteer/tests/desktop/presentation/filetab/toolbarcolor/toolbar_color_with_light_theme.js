// This test verifies that toolbar color can be enabled with Light theme
const { FileMenu } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Light" },
        useToolbarColor: true,
    },
});

const isLightThemeApplied = Tester.checkSelector("body.theme-light");
if (!isLightThemeApplied) {
    throw new Error("Light theme was not applied");
}

const isToolbarColorEnabled = Tester.checkSelector("#fms-chb-tab-background input:checked");
if (!isToolbarColorEnabled) {
    throw new Error("Toolbar color checkbox was not enabled");
}

console.log("Toolbar color successfully enabled with Light theme");

Tester.close();
