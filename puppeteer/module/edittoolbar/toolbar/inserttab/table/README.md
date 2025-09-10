# Table

This library implements interaction with the Table in the Insert tab

## Table of Contents

-   [**Object**](#object)
-   [**Methods**](#methods)
    -   [`Table.createTable(column, rows)`](#tablecreatetablecolumn-rows) - todo (use insertTable)
    -   [`Table.insertTable(columns, rows)`](#tableinserttablecolumns-rows)
    -   [`Table.drawTable(tableSize, position)`](#tabledrawtabletablesize-position)
    -   [`Table.eraseTable(tableSize, position)`](#tableerasetabletablesize-position)
    -   [`Table.convertTextToTable(settings)`](#tableconverttexttotablesettings)
    -   [`Table.openInsertSpreadsheet()`](#tableopeninsertspreadsheet)
    -   [`Table.closeInsertSpreadsheet()`](#tablecloseinsertspreadsheet)
    -   [`Table.setTableSettings(options)`](#tablesettablesettingsoptions)
    -   [`Table.setTableAdvancedSettings(options)`](#tablesettableadvancedsettingsoptions)
-   [**Example1**](#example1)
-   [**Example2**](#example2)

## Object

```javascript

```

## Methods

### Table.createTable(column, rows)

todo (use insertTable)

```javascript
/**
 * Creates a table with the specified number of columns and rows.
 * @param {number} column - The number of columns.
 * @param {number} row - The number of rows.
 */
Table.createTable(column, rows);
```

### Table.insertTable(columns, rows)

```javascript
/**
 * Inserts a table with the specified number of columns and rows.
 * @param {number} column - The number of columns.
 * @param {number} row - The number of rows.
 */
Table.insertTable(columns, rows);
```

### Table.drawTable(tableSize, position)

```javascript
/**
 * Draws a table on the canvas.
 * @param {{cellWidth: number, cellHeight: number}} tableSize
 * @param {{x: number, y: number}} position
 */
Table.drawTable(tableSize, position);
```

### Table.eraseTable(tableSize, position)

```javascript
/**
 * Erases a table on the canvas.
 * @param {{cellWidth: number, cellHeight: number}} tableSize
 * @param {{x: number, y: number}} position
 */
Table.eraseTable(tableSize, position);
```

### Table.convertTextToTable(settings)

```javascript
/**
 * @typedef {Object} TableSizeSettings
 * @property {number} [columns] - Number of columns in the table
 * @property {number} [rows] - Number of rows in the table
 */

/**
 * @typedef {Object} AutofitSettings
 * @property {"fixed"|"contents"|"window"} [type] - Type of autofit behavior
 * @property {number} [value] - Value associated with the autofit behavior
 */

/**
 * @typedef {Object} SeparateTextSettings
 * @property {"para"|"tabs"|"semi"|"other"} [type] - Type of text separation
 * @property {string} [value] - Value associated with the text separation
 */

/**
 * @typedef ConvertTextToTableSettings
 * @property {TableSizeSettings} [tableSize] - The size of the table.
 * @property {AutofitSettings} [autofit] - The autofit settings for the table.
 * @property {SeparateTextSettings} [separateText] - The text separation settings for the table.
 */
/**
 * Converts the selected text to a table.
 * @param {ConvertTextToTableSettings} settings - The settings for the table conversion.
 */
Table.convertTextToTable(settings);
```

### Table.openInsertSpreadsheet()

```javascript
/**
 * Opens the insert spreadsheet modal.
 */
Table.openInsertSpreadsheet();
```

### Table.closeInsertSpreadsheet()

```javascript
/**
 * Closes the insert spreadsheet modal.
 */
Table.closeInsertSpreadsheet();
```

### Table.setTableSettings(options)

See [TableSettings](../../../../rightmenu/basesettings/tablesettings/tablebasesettings/README.md) in settings.

```javascript
/**
 * @typedef {Object} TableSettings
 * @property {TableBaseSettingsObject} [baseSettings]
 */

/**
 * Sets the table base settings.
 * @param {TableSettings} options
 */
Table.setTableSettings(options);
```

### Table.setTableAdvancedSettings(options)

See [TableOptions](../../../../rightmenu/basesettings/tablesettings/README.md) in settings.

```javascript
/**
 * @typedef {Object} TableOptions
 * @property {TableSettingsObject} [table]
 * @property {CellSettingsObject} [cell]
 * @property {BackgroundBorderSettingsObject} [border]
 * @property {TextWrappingSettingsObject} [textWrapping]
 * @property {AlternativeTextSettings} [alternativeText]
 */
/**
 * Method for set table settings
 * @param {TableOptions} options
 */
Table.setTableAdvancedSettings(options);
```

## Example1

```javascript
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
// convert text to table
Table.convertTextToTable({
    tableSize: { columns: { value: 5 } },
    autofit: { type: "fixed", value: { value: 5 } },
    separateText: { type: "other", value: { value: 5 } },
});

// change table options
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
```

## Example2

```javascript
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
```
