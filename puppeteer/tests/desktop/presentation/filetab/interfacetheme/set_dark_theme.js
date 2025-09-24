// Creates presentation, applies Dark theme via advanced settings and waits for theme-dark CSS class using checkSelector
const { FileMenu } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Dark" },
    },
});

const isDarkThemeApplied = Tester.checkSelector("body.theme-dark");
if (!isDarkThemeApplied) {
    throw new Error("Dark theme was not applied to the interface");
}

console.log("Dark theme successfully applied and verified");

Tester.close();
