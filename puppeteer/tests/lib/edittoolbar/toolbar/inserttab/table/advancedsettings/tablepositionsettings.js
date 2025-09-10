const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// create table 2x2
Table.insertTable(2, 2);

// Pass the cell table options
Table.setTableAdvancedSettings({
    textWrapping: {
        wrappingStyle: "parallel",
        distance: { top: { value: 5 }, left: { value: 5 }, bottom: { value: 5 }, right: { value: 5 } },
    },
    tablePosition: {
        horizontal: { alignment: { type: "Center", relative: "Page" } },
        vertical: { position: { value: { value: 5 }, below: "Page" } },
        options: { moveObject: true, overlap: true },
    },
});
Tester.close();
