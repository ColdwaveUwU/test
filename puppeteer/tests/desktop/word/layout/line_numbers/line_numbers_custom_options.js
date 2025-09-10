// line_numbers_custom_options.js
// Test: Layout → Line Numbers → Custom Options
// Проверяет, что в XML есть <w:lnNumType> с нужными кастомными атрибутами

const { LineNumbers, FileMenu, Verification, TestData } = require("lib");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());
LineNumbers.selectLineNumberDropdownOption("Custom Options");

const customSettings = {
    EnableNumbering: true,
    CustomValues: {
        StartAt: { value: 7, increment: 0, decrement: 0 },
        FormText: { value: 0.7, increment: 0, decrement: 0 },
        Count: { value: 3, increment: 0, decrement: 0 },
    },
    Numbering: {
        RestartPage: false,
        RestartSection: true,
        Continuous: false,
    },
    ApplyTo: "Current",
};
LineNumbers.setCustomLineNumbersSettings(customSettings);
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "count(//w:lnNumType[@w:restart='newSection'])", 1);
Verification.check("word/document.xml", "count(//w:lnNumType[@w:start='6'])", 1);
Verification.check("word/document.xml", "count(//w:lnNumType[@w:countBy='3'])", 1);
console.log(Verification.isSuccess());
Tester.close();
