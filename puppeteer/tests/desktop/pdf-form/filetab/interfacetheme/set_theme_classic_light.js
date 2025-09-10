// Creates PDF-form, applies Classic Light theme via advanced settings and waits for theme-classic-light CSS class using checkSelector
const { FileMenu } = require("lib");

const fileName = "pdf";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Classic Light"
    },
});

const isClassicLightThemeApplied = Tester.checkSelector("body.theme-classic-light");
if (!isClassicLightThemeApplied) {
    throw new Error("Classic Light theme was not applied to the interface");
}

console.log("Classic Light theme successfully applied and verified");
Tester.close();
