const { LineNumbers } = require("lib");
// Create test file
Tester.createFile("pdf");

// Set predefined line numbering
LineNumbers.selectLineNumberDropdownOption("Continuous");
LineNumbers.selectLineNumberDropdownOption("Restart Page");
LineNumbers.selectLineNumberDropdownOption("Restart Section");
LineNumbers.selectLineNumberDropdownOption("Suppress");
LineNumbers.selectLineNumberDropdownOption("None");
LineNumbers.selectLineNumberDropdownOption("Custom Options");

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

LineNumbers.selectLineNumberDropdownOption("Custom Options");
LineNumbers.setCustomLineNumbersSettings(disabledSettings);

Tester.close();