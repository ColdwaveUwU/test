// This test verifies that document dark mode can be enabled with Dark theme
const { FileMenu, Verification } = require("lib");

const fileName = "pdf";
const inputText = "DocumentDarkModeTest";

Tester.createFile(fileName);

FileMenu.setAdvancedSettings({
    appearance: {
        theme: { value: "Dark" },
        darkMode: true,
    },
});

const isDarkModeEnabled = Tester.checkSelector("#fms-chb-dark-mode input:checked");
if (!isDarkModeEnabled) {
    throw new Error("Document dark mode checkbox was not enabled");
}

console.log("Dark mode settings applied.");

Tester.input(inputText);

FileMenu.downloadAs("pdf");

Verification.openFile();
const filePath = "word/document.xml";
const textXpath = "//w:t[text()='" + inputText + "']";
Verification.check(filePath, textXpath, inputText);

if (!Verification.isSuccess()) {
    throw new Error("Document with dark mode enabled does not contain the expected text");
}

Tester.close();
