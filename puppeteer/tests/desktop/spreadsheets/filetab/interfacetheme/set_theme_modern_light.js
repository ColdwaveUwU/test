// Creates spreadsheet, applies Modern Light theme via advanced settings and waits for theme-white CSS class using checkSelector
const { FileMenu } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Modern Light"
    }
});

const isModernLightThemeApplied = Tester.checkSelector("body.theme-white");
if (!isModernLightThemeApplied) {
    throw new Error("Modern Light theme was not applied to the interface");
}

console.log("Modern Light theme successfully applied and verified");

Tester.close();
