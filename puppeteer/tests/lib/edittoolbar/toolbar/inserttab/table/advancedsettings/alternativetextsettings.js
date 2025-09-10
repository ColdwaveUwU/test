const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// insert table 2x2
Table.insertTable(2, 2);
// Pass the alternative text table options
Table.setTableAdvancedSettings({
    alternativeText: {
        title: { value: "Table Title" },
        description: { value: "Table Description" },
    },
});
Tester.close();
