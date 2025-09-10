// Creates spreadsheet, applies Light theme via advanced settings and waits for theme-light CSS class using checkSelector
const { FileMenu } = require("lib");

const fileName = "xlsx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Light"
    }
});

const isLightThemeApplied = Tester.checkSelector("body.theme-light");
if (!isLightThemeApplied) {
    throw new Error("Light theme was not applied to the interface");
}

console.log("Light theme successfully applied and verified");

Tester.close();
