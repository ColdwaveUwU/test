const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// create table 2x2
Table.insertTable(2, 2);

// Pass the cell table options
Table.setTableAdvancedSettings({
    cell: {
        cellSize: { preffer: { value: 3 }, measure: "Percent" },
        cellMargins: { top: { value: 5 }, bottom: { value: 5 }, left: { value: 5 }, right: { value: 5 } },
        options: { wrapText: true },
    },
});
Tester.close();
