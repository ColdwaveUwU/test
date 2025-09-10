const { Table, Color, Bookmark } = require("lib");

Tester.createFile("docx");

// Insert table 3x3
Table.insertTable(3, 3);

Table.setTableSettings({
    convertTableToText: {
        separateTextWith: {
            type: "Paragraph marks",
        },
        convertNestedTables: false,
    },
});

// Insert table 3x3
Table.insertTable(3, 3);

Table.setTableSettings({
    convertTableToText: {
        separateTextWith: {
            type: "Paragraph marks",
        },
        convertNestedTables: true,
    },
});

// Insert table 3x3
Table.insertTable(3, 3);

Table.setTableSettings({
    convertTableToText: {
        separateTextWith: {
            type: "Other",
            value: ";",
        },
    },
});

// Insert table 3x3
Table.insertTable(3, 3);

// Add a bookmark
Bookmark.addBookmark("TestBookmark");

// Add a formula with function name
Table.setTableSettings({
    addFormula: {
        functionName: ["SUM", "AVERAGE", "MIN", "MAX", "COUNT"],
    },
});

Table.setTableSettings({
    splitCell: {
        numberOfColumns: 2,
    },
});

Table.setTableSettings({
    splitCell: {
        numberOfRows: 2,
    },
});

Table.setTableSettings({
    borders: "Set outer border and all inner lines",
});

// Test setTableSettings method with all parameters
Table.setTableSettings({
    rows: {
        header: true,
        total: true,
        banded: true,
    },
    columns: {
        first: true,
        last: true,
        banded: true,
    },
});

// Test setTableSettings method with all parameters
Table.setTableSettings({
    rows: {
        header: false,
    },
    columns: {
        last: false,
    },
});

// Test setTableSettings method with all parameters
Table.setTableSettings({
    rows: {
        header: false,
        total: false,
        banded: false,
    },
    columns: {
        first: false,
        last: false,
        banded: false,
    },
});

// Test selectRowsAndColumnsSize method with height and width
Table.setTableSettings({
    rowsAndColumnsSize: {
        height: "2.5",
        width: "1.8",
        autoFit: false,
    },
});

// Test selectRowsAndColumnsSize method with height and width
Table.setTableSettings({
    rowsAndColumnsSize: {
        height: "2.5",
        width: "1.8",
    },
});

// Test selectRowsAndColumnsSize method with distribute options
Table.setTableSettings({
    rowsAndColumnsSize: {
        distributeColumns: true,
    },
});

// Test selectRowsAndColumnsSize method with all parameters
Table.setTableSettings({
    rowsAndColumnsSize: {
        height: "3.0",
        width: "2.0",
        distributeRows: true,
        distributeColumns: true,
        autoFit: true,
    },
});

// Test with empty object (should not throw error)
Table.setTableSettings({
    rowsAndColumnsSize: {},
});

// Delete table
Table.setTableSettings({
    rowsAndColumns: "Delete table",
});

// Insert table 3x3
Table.insertTable(3, 3);

// Set table settings
Table.setTableSettings({
    rows: {
        header: true,
        total: true,
        banded: true,
    },
    columns: {
        first: true,
        last: true,
        banded: true,
    },
    template: "Table grid",
    borders: [
        "Set outer border and all inner lines",
        "Set no borders",
        "Set inner lines only",
        "Set outer border only",
        "Set outer left border only",
        "Set outer right border only",
        "Set outer top border only",
        "Set outer bottom border only",
        "Set vertical inner lines only",
        "Set horizontal inner lines only",
    ],
    bordersStyle: "2.25 pt",
    bordersColor: {
        type: Color.Type.Standard,
        index: 5,
    },
    backgroundColor: {
        type: Color.Type.Standard,
        index: 5,
    },
    repeatAsHeader: true,
    splitCell: {
        numberOfColumns: 2,
        numberOfRows: 2,
    },
    rowsAndColumns: ["Insert row above", "Insert row below"],
    addFormula: {
        formula: "=SUM",
        numberFormat: "#,##0.00",
    },
    rowsAndColumnsSize: {
        height: "3.0",
        width: "2.0",
        distributeRows: true,
        distributeColumns: true,
        autoFit: true,
    },
    convertTableToText: {
        separateTextWith: {
            type: "Paragraph marks",
        },
        convertNestedTables: false,
    },
});

Tester.close();
