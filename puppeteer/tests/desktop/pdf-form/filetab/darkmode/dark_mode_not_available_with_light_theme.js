// This test verifies that document dark mode cannot be enabled with Light theme
const { FileMenu } = require("lib");

const fileName = "pdf";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Light",
        darkMode: false,
    },
});

const isLightThemeApplied = Tester.checkSelector("body.theme-light");
if (!isLightThemeApplied) {
    throw new Error("Light theme was not applied");
}

const isDarkModeCheckboxPresent = Tester.checkSelector("#fms-chb-dark-mode");
const isDarkModeEnabled = Tester.checkSelector("#fms-chb-dark-mode input:checked");
const isDarkModeDisabled = Tester.checkSelector("#fms-chb-dark-mode input:disabled");

if (isDarkModeCheckboxPresent && !isDarkModeEnabled && isDarkModeDisabled) {
    console.log("Dark mode checkbox is present, not enabled, and disabled - correct behavior for Light theme");
} else {
    throw new Error("Incorrect Dark mode behavior with Light theme");
}

console.log("Light theme correctly prevents dark mode activation");

Tester.close();
