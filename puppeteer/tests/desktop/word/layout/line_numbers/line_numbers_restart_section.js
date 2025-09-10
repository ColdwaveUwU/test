// line_numbers_restart_section.js
// Test: Layout → Line Numbers → Restart each section
// Проверяет, что в XML есть <w:lnNumType w:restart="newSection">

const { LineNumbers, FileMenu, Verification, TestData } = require("lib");

Tester.createFile("docx");
Tester.input(TestData.LOREM_IPSUM());
LineNumbers.selectLineNumberDropdownOption("Restart Section");
FileMenu.downloadAs("docx");

Verification.openFile();
Verification.check("word/document.xml", "count(//w:lnNumType[@w:restart='newSection'])", 1);

console.log(Verification.isSuccess());
Tester.close();
