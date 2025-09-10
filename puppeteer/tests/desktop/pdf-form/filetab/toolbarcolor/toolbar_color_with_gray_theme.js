// This test verifies that toolbar color can be enabled with Gray theme
const { FileMenu } = require("lib");

const fileName = "pdf";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Gray",
        useToolbarColor: true,
    },
});

const isGrayThemeApplied = Tester.checkSelector("body.theme-gray");
if (!isGrayThemeApplied) {
    throw new Error("Gray theme was not applied");
}

const isToolbarColorEnabled = Tester.checkSelector("#fms-chb-tab-background input:checked");
if (!isToolbarColorEnabled) {
    throw new Error("Toolbar color checkbox was not enabled");
}

console.log("Toolbar color successfully enabled with Gray theme");

Tester.close();
