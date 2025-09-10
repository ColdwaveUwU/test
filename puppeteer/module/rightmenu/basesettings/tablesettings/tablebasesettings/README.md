# TableBaseSettings

This library implements interaction with the Table Base Settings panel in the right menu.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Table.setTableSettings(settings)`](#tablebasesettingssettsettingsettings)
-   [**Objects**](#objects)
    -   [`TableBaseSettingsObject`](#tablebasesettingsobject)
    -   [`RowsSettings`](#rowssettings)
    -   [`ColumnsSettings`](#columnssettings)
    -   [`RowsAndColumnsSize`](#rowsandcolumnssize)
    -   [`SplitCellOptions`](#splitcelloptions)
    -   [`AddFormulaOptions`](#addformulaoptions)
    -   [`ConvertTableToTextOptions`](#converttabletotextoptions)
    -   [`SeparateTextWithOptions`](#separatetextwithoptions)
    -   [`TemplatesTypes`](#templatestypes)
    -   [`BordersStyle`](#bordersstyle)
    -   [`BordersTypes`](#borderstypes)
    -   [`RowsAndColumnsTypes`](#rowsandcolumnstypes)
    -   [`FunctionNamesTypes`](#functionnamestypes)
    -   [`NumberFormatsTypes`](#numberformatstypes)
    -   [`SeparateTextWithTypes`](#separatetextwithtypes)
-   [**Examples**](#examples)

## Methods

### Table.setTableSettings(settings)

```javascript
/**
 * Sets the table base settings
 * @param {TableBaseSettingsObject} settings - The settings to set
 */
Table.setTableSettings(settings);
```

## Objects

### TableBaseSettingsObject

```javascript
/**
 * @typedef {Object} TableBaseSettingsObject
 * @property {RowsSettings} [rows] - The rows settings
 * @property {ColumnsSettings} [columns] - The columns settings
 * @property {RowsAndColumnsSize} [rowsAndColumnsSize] - The rows and columns size settings
 * @property {TemplatesTypes} [template] - The template name
 * @property {BordersTypes} [borders] - The borders type name in array
 * @property {BordersStyle} [bordersStyle] - The borders style settings
 * @property {Color} [bordersColor] - The borders color settings
 * @property {Color} [backgroundColor] - The background color settings
 * @property {boolean} [repeatAsHeader] - The repeat as header settings
 * @property {SplitCellOptions} [splitCell] - The split cell settings
 * @property {RowsAndColumnsTypes} [rowsAndColumns] - The rows and columns type name in array
 * @property {AddFormulaOptions} [addFormula] - The add formula settings
 * @property {ConvertTableToTextOptions} [convertTableToText] - The convert to text settings
 */
```

### RowsSettings

```javascript
/**
 * @typedef {Object} RowsSettings
 * @property {boolean} [header] - The header settings
 * @property {boolean} [total] - The total settings
 * @property {boolean} [banded] - The banded settings
 */
```

### ColumnsSettings

```javascript
/**
 * @typedef {Object} ColumnsSettings
 * @property {boolean} [first] - The first settings
 * @property {boolean} [last] - The last settings
 * @property {boolean} [banded] - The banded settings
 */
```

### RowsAndColumnsSize

```javascript
/**
 * @typedef {Object} RowsAndColumnsSize
 * @property {string} [height] - The rows size
 * @property {string} [width] - The columns size
 * @property {boolean} [distributeRows] - The distribute rows settings
 * @property {boolean} [distributeColumns] - The distribute columns settings
 */
```

### SplitCellOptions

```javascript
/**
 * @typedef {Object} SplitCellOptions
 * @property {number} [numberOfColumns] - The number of columns to split the cell into
 * @property {number} [numberOfRows] - The number of rows to split the cell into
 */
```

### AddFormulaOptions

```javascript
/**
 * @typedef {Object} AddFormulaOptions
 * @property {string} [formula] - The formula to set
 * @property {NumberFormatsTypes} [numberFormat] - The number format to select
 * @property {FunctionNamesTypes} [functionName] - The function name to select
 * @property {string} [bookmarkName] - The bookmark name to select
 */
```

### ConvertTableToTextOptions

```javascript
/**
 * @typedef {Object} ConvertTableToTextOptions
 * @property {SeparateTextWithOptions} [separateTextWith] - The type of the separate text with
 * @property {boolean} [convertNestedTables] - The condition of the checkbox to set
 */
```

### SeparateTextWithOptions

```javascript
/**
 * @typedef {Object} SeparateTextWithOptions
 * @property {SeparateTextWithTypes} [type] - The type of the separate text with
 * @property {string} [value] - The value of the separate text with
 */
```

### TemplatesTypes

```javascript
/**
 * @typedef {
 * | "Table grid"
 * | "Table grid Light"
 * | "Plain table 1"
 * | "Plain table 2"
 * | "Plain table 3"
 * | "Plain table 4"
 * | "Plain table 5"
 * | "Grid table 1 Light"
 * | "Grid table 1 Light - Accent 1"
 * | "Grid table 1 Light - Accent 2"
 * | "Grid table 1 Light - Accent 3"
 * | "Grid table 1 Light - Accent 4"
 * | "Grid table 1 Light - Accent 5"
 * | "Grid table 1 Light - Accent 6"
 * | "Grid table 2"
 * | "Grid table 2 - Accent 1"
 * | "Grid table 2 - Accent 2"
 * | "Grid table 2 - Accent 3"
 * | "Grid table 2 - Accent 4"
 * | "Grid table 2 - Accent 5"
 * | "Grid table 2 - Accent 6"
 * | "Grid table 3"
 * | "Grid table 3 - Accent 1"
 * | "Grid table 3 - Accent 2"
 * | "Grid table 3 - Accent 3"
 * | "Grid table 3 - Accent 4"
 * | "Grid table 3 - Accent 5"
 * | "Grid table 3 - Accent 6"
 * | "Grid table 4"
 * | "Grid table 4 - Accent 1"
 * | "Grid table 4 - Accent 2"
 * | "Grid table 4 - Accent 3"
 * | "Grid table 4 - Accent 4"
 * | "Grid table 4 - Accent 5"
 * | "Grid table 4 - Accent 6"
 * | "Grid table 5 Dark"
 * | "Grid table 5 Dark - Accent 1"
 * | "Grid table 5 Dark - Accent 2"
 * | "Grid table 5 Dark - Accent 3"
 * | "Grid table 5 Dark - Accent 4"
 * | "Grid table 5 Dark - Accent 5"
 * | "Grid table 5 Dark - Accent 6"
 * | "Grid table 6 Colorful"
 * | "Grid table 6 Colorful - Accent 1"
 * | "Grid table 6 Colorful - Accent 2"
 * | "Grid table 6 Colorful - Accent 3"
 * | "Grid table 6 Colorful - Accent 4"
 * | "Grid table 6 Colorful - Accent 5"
 * | "Grid table 6 Colorful - Accent 6"
 * | "Grid table 7 Colorful"
 * | "Grid table 7 Colorful - Accent 1"
 * | "Grid table 7 Colorful - Accent 2"
 * | "Grid table 7 Colorful - Accent 3"
 * | "Grid table 7 Colorful - Accent 4"
 * | "Grid table 7 Colorful - Accent 5"
 * | "Grid table 7 Colorful - Accent 6"
 * | "List table 1 Light"
 * | "List table 1 Light - Accent 1"
 * | "List table 1 Light - Accent 2"
 * | "List table 1 Light - Accent 3"
 * | "List table 1 Light - Accent 4"
 * | "List table 1 Light - Accent 5"
 * | "List table 1 Light - Accent 6"
 * | "List table 2"
 * | "List table 2 - Accent 1"
 * | "List table 2 - Accent 2"
 * | "List table 2 - Accent 3"
 * | "List table 2 - Accent 4"
 * | "List table 2 - Accent 5"
 * | "List table 2 - Accent 6"
 * | "List table 3"
 * | "List table 3 - Accent 1"
 * | "List table 3 - Accent 2"
 * | "List table 3 - Accent 3"
 * | "List table 3 - Accent 4"
 * | "List table 3 - Accent 5"
 * | "List table 3 - Accent 6"
 * | "List table 4"
 * | "List table 4 - Accent 1"
 * | "List table 4 - Accent 2"
 * | "List table 4 - Accent 3"
 * | "List table 4 - Accent 4"
 * | "List table 4 - Accent 5"
 * | "List table 4 - Accent 6"
 * | "List table 5 Dark"
 * | "List table 5 Dark - Accent 1"
 * | "List table 5 Dark - Accent 2"
 * | "List table 5 Dark - Accent 3"
 * | "List table 5 Dark - Accent 4"
 * | "List table 5 Dark - Accent 5"
 * | "List table 5 Dark - Accent 6"
 * | "List table 6 Colorful"
 * | "List table 6 Colorful - Accent 1"
 * | "List table 6 Colorful - Accent 2"
 * | "List table 6 Colorful - Accent 3"
 * | "List table 6 Colorful - Accent 4"
 * | "List table 6 Colorful - Accent 5"
 * | "List table 6 Colorful - Accent 6"
 * | "List table 7 Colorful"
 * | "List table 7 Colorful - Accent 1"
 * | "List table 7 Colorful - Accent 2"
 * | "List table 7 Colorful - Accent 3"
 * | "List table 7 Colorful - Accent 4"
 * | "List table 7 Colorful - Accent 5"
 * | "List table 7 Colorful - Accent 6"
 * | "Lined - Accent"
 * | "Lined - Accent 1"
 * | "Lined - Accent 2"
 * | "Lined - Accent 3"
 * | "Lined - Accent 4"
 * | "Lined - Accent 5"
 * | "Lined - Accent 6"
 * | "Bordered & Lined - Accent"
 * | "Bordered & Lined - Accent 1"
 * | "Bordered & Lined - Accent 2"
 * | "Bordered & Lined - Accent 3"
 * | "Bordered & Lined - Accent 4"
 * | "Bordered & Lined - Accent 5"
 * | "Bordered & Lined - Accent 6"
 * | "Bordered"
 * | "Bordered - Accent 1"
 * | "Bordered - Accent 2"
 * | "Bordered - Accent 3"
 * | "Bordered - Accent 4"
 * | "Bordered - Accent 5"
 * | "Bordered - Accent 6"
 * | "Normal Table"
 * } TemplatesTypes - The templates names
 */
```

### BordersStyle

```javascript
/**
 * @typedef {
 * | "No borders"
 * | "0.5 pt"
 * | "1 pt"
 * | "1.5 pt"
 * | "2.25 pt"
 * | "3 pt"
 * | "4.5 pt"
 * | "6 pt"
 * } BordersStyle - The borders style to select
 */
```

### BordersTypes

```javascript
/**
 * @typedef {Array<
 * | "Set outer border and all inner lines"
 * | "Set no borders"
 * | "Set inner lines only"
 * | "Set outer border only"
 * | "Set outer left border only"
 * | "Set outer right border only"
 * | "Set outer top border only"
 * | "Set outer bottom border only"
 * | "Set vertical inner lines only"
 * | "Set horizontal inner lines only"
 * >} BordersTypes - The borders type to select
 */
```

### RowsAndColumnsTypes

```javascript
/**
 * @typedef {Array<
 * | "Select row"
 * | "Select column"
 * | "Select cell"
 * | "Select table"
 * | "Insert row above"
 * | "Insert row below"
 * | "Insert column left"
 * | "Insert column right"
 * | "Delete row"
 * | "Delete column"
 * | "Delete table"
 * | "Merge cells"
 * >} RowsAndColumnsTypes - The rows and columns type name
 */
```

### FunctionNamesTypes

```javascript
/**
 * @typedef {Array<
 * | "ABS"
 * | "AND"
 * | "AVERAGE"
 * | "COUNT"
 * | "DEFINED"
 * | "FALSE"
 * | "IF"
 * | "INT"
 * | "MAX"
 * | "MIN"
 * | "MOD"
 * | "NOT"
 * | "OR"
 * | "PRODUCT"
 * | "ROUND"
 * | "SIGN"
 * | "SUM"
 * | "TRUE"
 * >} FunctionNamesTypes - The function name to select
 */
```

### NumberFormatsTypes

```javascript
/**
 * @typedef {
 * | "#,##0"
 * | "#,##0.00"
 * | "$#,##0.00;($#,##0.00)"
 * | "0"
 * | "0%"
 * | "0.00"
 * | "0.00%"
 * } NumberFormatsTypes - The number format to select
 */
```

### SeparateTextWithTypes

```javascript
/**
 * @typedef {
 * | "Semicolons"
 * | "Other"
 * | "Tabs"
 * | "Paragraph marks"
 * } SeparateTextWithTypes - The type of the separate text with
 */
```

## Examples

```javascript
// Include the Table library
const { Table, Color } = require("lib");

// Open the file with table
Tester.createFile("docx");

// Insert table 3x3
Table.insertTable(3, 3);

// Create a basic table settings object
const basicTableSettings = {
    rows: {
        header: true,
        total: false,
        banded: true,
    },
    columns: {
        first: true,
        last: false,
        banded: false,
    },
    template: "Grid table 1 Light",
    borders: ["Set outer border and all inner lines"],
    bordersStyle: "1 pt",
    bordersColor: { type: Color.Type.Standard, index: 1 },
    backgroundColor: { type: Color.Type.Standard, index: 3 },
    repeatAsHeader: true,
};

// Apply basic table settings
Table.setTableSettings(basicTableSettings);

// Create table size settings object
const tableSizeSettings = {
    rowsAndColumnsSize: {
        height: "2.5cm",
        width: "5cm",
        distributeRows: true,
        distributeColumns: false,
    },
};

// Apply table size settings
Table.setTableSettings(tableSizeSettings);

// Create split cell settings object
const splitCellSettings = {
    splitCell: {
        numberOfColumns: 3,
        numberOfRows: 2,
    },
};

// Apply split cell settings
Table.setTableSettings(splitCellSettings);

// Create add formula settings object
const addFormulaSettings = {
    addFormula: {
        formula: "=SUM(ABOVE)",
        numberFormat: "#,##0.00",
        functionName: ["SUM"]
    },
};

// Apply add formula settings
Table.setTableSettings(addFormulaSettings);

// Create complex table settings object with multiple options
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

// Close the test example
Tester.close();
```
