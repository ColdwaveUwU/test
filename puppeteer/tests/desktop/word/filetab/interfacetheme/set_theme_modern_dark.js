// Creates document, applies Modern Dark theme via advanced settings and waits for theme-night CSS class using checkSelector
const { FileMenu } = require("lib");

const fileName = "docx";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Modern Dark",
    },
});

const isModernDarkThemeApplied = Tester.checkSelector("body.theme-night");
if (!isModernDarkThemeApplied) {
    throw new Error("Modern Dark theme was not applied to the interface");
}

console.log("Modern Dark theme successfully applied and verified");

Tester.close();
