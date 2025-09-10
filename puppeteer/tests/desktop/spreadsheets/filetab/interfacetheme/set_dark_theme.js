// This test verifies that Dark theme can be applied via File Advanced Settings: creates spreadsheet, applies Dark theme, waits for theme-dark CSS class on body element using checkSelector
const { FileMenu } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Dark"
    }
});

const isDarkThemeApplied = Tester.checkSelector("body.theme-dark");
if (!isDarkThemeApplied) {
    throw new Error("Dark theme was not applied to the interface");
}

console.log("Dark theme successfully applied and verified");
Tester.close();
