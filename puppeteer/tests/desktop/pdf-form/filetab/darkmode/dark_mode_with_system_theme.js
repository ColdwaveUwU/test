// This test verifies that document dark mode can be enabled with System theme if system is dark
const { FileMenu, Verification } = require("lib");

const fileName = "pdf";
const inputText = "DocumentDarkModeSystemTest";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Same as system" },
    },
});

const isSystemDark = Tester.checkSelector("body.theme-night");
const isSystemLight = Tester.checkSelector("body.theme-white");

if (isSystemLight) {
    console.log("System theme is light, skipping dark mode test");
    Tester.close();
    return;
}

if (!isSystemDark) {
    throw new Error("Could not determine system theme");
}

console.log("System theme is dark, proceeding with dark mode test");

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Same as system" },
        darkMode: true,
    },
});

const isDarkModeEnabled = Tester.checkSelector("#fms-chb-dark-mode input:checked");
if (!isDarkModeEnabled) {
    throw new Error("Document dark mode checkbox was not enabled");
}

console.log("Dark mode settings applied, now entering text");

Tester.input(inputText);

FileMenu.downloadAs("pdf");

Verification.openFile();
const filePath = "word/document.xml";
const textXpath = "//w:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Document with dark mode enabled (system dark theme) does not contain the expected text");
}

Tester.close();
