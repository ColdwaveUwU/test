const { Table } = require("lib");
Tester.createFile("docx");
Table.insertTable(2, 2);
Table.setTableAdvancedSettings({
    table: {
        cellMargins: { top: { value: 5 }, bottom: { value: 5 }, left: { value: 5 }, right: { value: 5 } },
        options: { inputSpacing: { value: 5 } },
    },
    cell: {
        cellSize: { preffer: { value: 4 } },
    },
    backgroundBorder: {
        border: { size: "1.5 pt", color: { type: 2, index: 5, subIndex: 3 } },
        borderColor: { type: 2, index: 5, subIndex: 3 },
        tableBackground: { type: 2, index: 5, subIndex: 3 },
    },
    textWrapping: {
        alignment: "left",
    },
    alternativeText: {
        title: { value: "test" },
        description: { value: "test" },
    },
});
Tester.close();
