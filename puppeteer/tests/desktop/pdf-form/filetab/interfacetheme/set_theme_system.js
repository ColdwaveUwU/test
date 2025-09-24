// Creates PDF-form, applies System theme via advanced settings and waits for theme-white or theme-night CSS class using checkSelector
const { FileMenu } = require("lib");

const fileName = "pdf";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Same as system" },
    },
});

// System theme can be either light (theme-white) or dark (theme-night) depending on system settings
const selector = "body.theme-white, body.theme-night";
const isSystemThemeApplied = Tester.checkSelector(selector);
if (!isSystemThemeApplied) {
    throw new Error("System theme was not applied to the interface");
}
console.log("System theme successfully applied and verified");

Tester.close();
