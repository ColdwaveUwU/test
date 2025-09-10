const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// create table 2x2
Table.insertTable(2, 2);

// Pass the table options
Table.setTableAdvancedSettings({
    table: {
        tableSize: { width: { value: 3 }, measure: "Percent", autoResize: true },
        cellMargins: { top: { value: 5 }, bottom: { value: 5 }, left: { value: 5 }, right: { value: 5 } },
        options: { inputSpacing: { value: 5 } },
    },
});
Tester.close();
