// line_numbers_restart_page.js
// Test: Layout → Line Numbers → Restart each page
// Проверяет, что в XML есть <w:lnNumType w:countBy="1"> (restart не выставляется)

const { LineNumbers, FileMenu, Verification, TestData } = require("lib");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());
LineNumbers.selectLineNumberDropdownOption("Restart each page");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "count(//w:lnNumType[@w:countBy='1'])", 1);

console.log(Verification.isSuccess());
Tester.close();
