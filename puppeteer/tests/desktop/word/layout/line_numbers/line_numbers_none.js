// line_numbers_none.js
// Test: Layout → Line Numbers → None
// Проверяет, что в XML нет <w:lnNumType>

const { LineNumbers, FileMenu, Verification, TestData } = require("lib");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());
LineNumbers.selectLineNumberDropdownOption("None");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "count(//w:lnNumType)", 0);

console.log(Verification.isSuccess());
Tester.close();
