const { Table } = require("lib");
// create test file
Tester.createFile("docx");
Table.drawTable({ cellWidth: 100, cellHeight: 50 }, { x: 50, y: 50 });

Table.drawTable({ cellWidth: 50, cellHeight: 30 }, { x: 200, y: 200 });
Table.eraseTable({ cellWidth: 100, cellHeight: 60 }, { x: 150, y: 150 });

const inputText = "123";
Tester.input(inputText);
Tester.keyDown("Shift");
for (let i = 0; i < inputText.length; i++) {
    Tester.keyPress("ArrowLeft");
}
Tester.keyUp("Shift");
Table.convertTextToTable({
    tableSize: { columns: { value: 5 } },
    autofit: { type: "fixed", value: { value: 5 } },
    separateText: { type: "other", value: { value: 5 } },
});

Table.setTableAdvancedSettings({
    table: {
        tableSize: { width: { value: 3 }, measure: "Percent", autoResize: false },
        cellMargins: { top: { value: 5 }, bottom: { value: 5 }, left: { value: 5 }, right: { value: 5 } },
        options: { inputSpacing: { value: 5 } },
    },
    cell: {
        cellSize: { preffer: { value: 3 }, measure: "Percent" },
        cellMargins: { top: { value: 5 }, bottom: { value: 5 }, left: { value: 5 }, right: { value: 5 } },
        options: { wrapText: true },
    },
    backgroundBorder: {
        border: { size: "3 pt", color: { type: 2, index: 5, subIndex: 3 } },
        borderType: "all-table",
        borderColor: { type: 2, index: 5, subIndex: 3 },
        tableBackground: { type: 2, index: 5, subIndex: 3 },
    },
    textWrapping: {
        wrappingStyle: "parallel",
        distance: { top: { value: 5 }, left: { value: 5 }, bottom: { value: 5 }, right: { value: 5 } },
    },
    tablePosition: {
        horizontal: { alignment: { type: "Center", relative: "Page" } },
        vertical: { position: { value: { value: 5 }, below: "Page" } },
        options: { moveObject: true, overlap: true },
    },
    alternativeText: {
        title: { value: "Table Title" },
        description: { value: "Table Description" },
    },
});
Tester.close();
