// Creates presentation, applies Contrast Dark theme via advanced settings and waits for theme-contrast-dark CSS class using checkSelector
const { FileMenu } = require("lib");

const fileName = "pptx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Contrast Dark" },
    },
});

const isContrastDarkThemeApplied = Tester.checkSelector("body.theme-contrast-dark");
if (!isContrastDarkThemeApplied) {
    throw new Error("Contrast Dark theme was not applied to the interface");
}

console.log("Contrast Dark theme successfully applied and verified");

Tester.close();
