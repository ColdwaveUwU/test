const { LineNumbers, TestData } = require("lib");

// Example: create a docx and apply different line numbering modes
Tester.createFile("docx");
const text = TestData.LOREM_IPSUM();
Tester.input(text);

// Apply different line numbering modes
LineNumbers.selectLineNumberDropdownOption("Continuous");
LineNumbers.selectLineNumberDropdownOption("Restart each page");
LineNumbers.selectLineNumberDropdownOption("Restart each section");
LineNumbers.selectLineNumberDropdownOption("Suppress for current paragraph");
LineNumbers.selectLineNumberDropdownOption("None");

// Example: custom settings
const customSettings = {
    EnableNumbering: true,
    CustomValues: {
        StartAt: { value: 5, increment: 2, decrement: 1 },
        FormText: { value: 0.5, increment: 1, decrement: 0 },
        Count: { value: 2, increment: 0, decrement: 0 },
    },
    Numbering: {
        RestartPage: false,
        RestartSection: true,
        Continuous: false,
    },
    ApplyTo: "Current",
};
// Apply custom line numbers settings
LineNumbers.setCustomLineNumbersSettings(customSettings);

Tester.close();
