const { Table } = require("lib");
// create test file
Tester.createFile("docx");
// create table 2x2
Table.insertTable(2, 2);

// Pass the borders & backgrounds table options
Table.setTableAdvancedSettings({
    backgroundBorder: {
        border: { size: "3 pt", color: { type: 2, index: 5, subIndex: 3 } },
        borderType: "all",
        borderColor: { type: 2, index: 5, subIndex: 3 },
        tableBackground: { type: 2, index: 5, subIndex: 3 },
    },
});
Tester.keyDown("Shift");
Tester.keyPress("ArrowDown");
Tester.keyUp("Shift");
Table.setTableAdvancedSettings({
    backgroundBorder: {
        cellColor: { type: 2, index: 5, subIndex: 4 },
    },
});
Tester.close();
