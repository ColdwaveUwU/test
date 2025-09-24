// This test verifies that document dark mode cannot be enabled with Modern Light theme
const { FileMenu } = require("lib");

const fileName = "pdf";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Modern Light" },
        darkMode: false,
    },
});

const isModernLightThemeApplied = Tester.checkSelector("body.theme-white");
if (!isModernLightThemeApplied) {
    throw new Error("Modern Light theme was not applied");
}

const isDarkModeCheckboxPresent = Tester.checkSelector("#fms-chb-dark-mode");
const isDarkModeEnabled = Tester.checkSelector("#fms-chb-dark-mode input:checked");
const isDarkModeDisabled = Tester.checkSelector("#fms-chb-dark-mode input:disabled");

if (isDarkModeCheckboxPresent && !isDarkModeEnabled && isDarkModeDisabled) {
    console.log("Dark mode checkbox is present, not enabled, and disabled - correct behavior for Modern Light theme");
} else {
    throw new Error("Incorrect Dark mode behavior with Modern Light theme");
}

console.log("Modern Light theme correctly prevents dark mode activation");

Tester.close();
