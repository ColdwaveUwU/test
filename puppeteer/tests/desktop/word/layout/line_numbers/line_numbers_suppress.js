// line_numbers_suppress.js
// Test: Layout → Line Numbers → Suppress for current paragraph
// Проверяет, что в XML есть <w:suppressLineNumbers/>

const { LineNumbers, FileMenu, Verification, TestData } = require("lib");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());
LineNumbers.selectLineNumberDropdownOption("Suppress for current paragraph");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "count(//w:suppressLineNumbers)", 1);

console.log(Verification.isSuccess());
Tester.close();
