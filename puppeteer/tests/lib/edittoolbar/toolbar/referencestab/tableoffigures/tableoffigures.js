const { TableOfFigures } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Set all settings at once using setTableOfFiguresSettings
TableOfFigures.setTableOfFiguresSettings({
    showPageNumbers: true,
    rightAlignPageNumbers: true,
    leader: "None",
    formatAsLinks: true,
    buildTableOfFiguresFromStyle: "Normal",
    buildTableOfFiguresFromCaption: "Figure",
    styles: "Classic",
    includeLabelAndNumber: true,
});

// Close the test file
Tester.close();
