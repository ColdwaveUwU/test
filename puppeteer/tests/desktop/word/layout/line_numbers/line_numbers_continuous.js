// line_numbers_continuous.js
// Test: Layout → Line Numbers → Continuous
// Проверяет, что в XML есть <w:lnNumType w:restart="continuous">

const { LineNumbers, FileMenu, Verification, TestData } = require("lib");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());
LineNumbers.selectLineNumberDropdownOption("Continuous");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "count(//w:lnNumType[@w:restart='continuous'])", 1);

console.log(Verification.isSuccess());
Tester.close();
