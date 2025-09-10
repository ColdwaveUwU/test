// This test verifies that document dark mode cannot be enabled with Gray theme
const { FileMenu } = require("lib");

const fileName = "pdf";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: "Gray",
        darkMode: false,
    },
});

const isGrayThemeApplied = Tester.checkSelector("body.theme-gray");
if (!isGrayThemeApplied) {
    throw new Error("Gray theme was not applied");
}

const isDarkModeCheckboxPresent = Tester.checkSelector("#fms-chb-dark-mode");
const isDarkModeEnabled = Tester.checkSelector("#fms-chb-dark-mode input:checked");
const isDarkModeDisabled = Tester.checkSelector("#fms-chb-dark-mode input:disabled");

if (isDarkModeCheckboxPresent && !isDarkModeEnabled && isDarkModeDisabled) {
    console.log("Dark mode checkbox is present, not enabled, and disabled - correct behavior for Gray theme");
} else {
    throw new Error("Incorrect Dark mode behavior with Gray theme");
}

console.log("Gray theme correctly prevents dark mode activation");

Tester.close();
