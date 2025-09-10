const { Table, Font } = require("lib");
// create test file
Tester.createFile("docx");
// open spreadsheet window
Table.openInsertSpreadsheet();
// input text in window
Font.clickFontColor({ type: 2, index: 5, subIndex: 3 });
Tester.input("123");
// close window
Table.closeInsertSpreadsheet();
Tester.close();
