// This test verifies that document dark mode can be enabled with Modern Dark theme
const { FileMenu, Verification } = require("lib");

const fileName = "docx";
const inputText = "DocumentDarkModeModernTest";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Modern Dark" },
        darkMode: true,
    },
});

const isDarkModeEnabled = Tester.checkSelector("#fms-chb-dark-mode input:checked");
if (!isDarkModeEnabled) {
    throw new Error("Document dark mode checkbox was not enabled");
}

console.log("Dark mode settings applied.");

Tester.input(inputText);

FileMenu.downloadAs("docx");

Verification.openFile();
const filePath = "word/document.xml";
const textXpath = "//w:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Document with dark mode enabled (modern dark theme) does not contain the expected text");
}

Tester.close();
