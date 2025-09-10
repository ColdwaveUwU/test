// This test verifies that document dark mode cannot be enabled with Classic Light theme
const { FileMenu } = require("lib");

const fileName = "pdf";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Classic Light",
        darkMode: false,
    },
});

const isClassicLightThemeApplied = Tester.checkSelector("body.theme-classic-light");
if (!isClassicLightThemeApplied) {
    throw new Error("Classic Light theme was not applied");
}

const isDarkModeCheckboxPresent = Tester.checkSelector("#fms-chb-dark-mode");
const isDarkModeEnabled = Tester.checkSelector("#fms-chb-dark-mode input:checked");
const isDarkModeDisabled = Tester.checkSelector("#fms-chb-dark-mode input:disabled");

if (isDarkModeCheckboxPresent && !isDarkModeEnabled && isDarkModeDisabled) {
    console.log("Dark mode checkbox is present, not enabled, and disabled - correct behavior for Classic Light theme");
} else {
    throw new Error("Incorrect Dark mode behavior with Classic Light theme");
}

console.log("Classic Light theme correctly prevents dark mode activation");

Tester.close();
