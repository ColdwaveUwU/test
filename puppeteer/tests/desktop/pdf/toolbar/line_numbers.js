const { LineNumbers } = require("lib");
// Create test file
Tester.createFile("pdf");

// Set predefined line numbering
LineNumbers.selectLineNumberDropdownOption("Continuous");
LineNumbers.selectLineNumberDropdownOption("Restart each page");
LineNumbers.selectLineNumberDropdownOption("Restart each section");
LineNumbers.selectLineNumberDropdownOption("Suppress for current paragraph");
LineNumbers.selectLineNumberDropdownOption("None");

// Set custom line numbering settings with numbering enabled
const customSettings = {
    EnableNumbering: true,
    CustomValues: {
        StartAt: { value: 10, increment: 4, decrement: 3 },
        FormText: { value: 0.40, increment: 4, decrement: 3 },
        Count: { value: 10, increment: 4, decrement: 3 }
    },
    Numbering: {
        RestartPage: true,
        RestartSection: true,
        Continuous: true
    },
    ApplyTo: "Point"
};
LineNumbers.setCustomLineNumbersSettings(customSettings);

// Set custom line numbering settings with numbering disabled
const disabledSettings = {
    EnableNumbering: false,
    ApplyTo: "Whole"
    // CustomValues and Numbering cannot be used when EnableNumbering is false
};

LineNumbers.setCustomLineNumbersSettings(disabledSettings);

Tester.close();