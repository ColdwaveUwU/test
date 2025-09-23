const BaseSettings = require("../../basesettings");
const selectors = require("./selectors.json");
const { Input, Dropdown, Button, ModalButton, Checkbox } = require("../../../../../elements");
const { Color } = require("../../../../../common");
const { createErrorHandler } = require("../../../../../../engine/script/js");

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
 * } TemplatesTypes - The templates names.
 */

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
 * } BordersStyle - The borders style to select.
 */

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
 * >} BordersTypes - The borders type to select.
 */

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
 * >} RowsAndColumnsTypes - The rows and columns type name.
 */

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
 * >} FunctionNamesTypes - The function name to select.
 */

/**
 * @typedef {
 * | "#,##0"
 * | "#,##0.00"
 * | "$#,##0.00;($#,##0.00)"
 * | "0"
 * | "0%"
 * | "0.00"
 * | "0.00%"
 * } NumberFormatsTypes - The number format to select.
 */

/**
 * @typedef {
 * | "Semicolons"
 * | "Other"
 * | "Tabs"
 * | "Paragraph marks"
 * } SeparateTextWithTypes - The type of the separate text with.
 */

/**
 * @typedef {Object} TableBaseSettingsObject
 * @property {RowsSettings} [rows] - The rows settings.
 * @property {ColumnsSettings} [columns] - The columns settings.
 * @property {RowsAndColumnsSize} [rowsAndColumnsSize] - The rows and columns size settings.
 * @property {TemplatesTypes} [template] - The template name.
 * @property {BordersTypes} [borders] - The borders type name in array.
 * @property {BordersStyle} [bordersStyle] - The borders style settings.
 * @property {Color} [bordersColor] - The borders color settings.
 * @property {Color} [backgroundColor] - The background color settings.
 * @property {boolean} [repeatAsHeader] - The repeat as header settings.
 * @property {SplitCellOptions} [splitCell] - The split cell settings.
 * @property {RowsAndColumnsTypes} [rowsAndColumns] - The rows and columns type name in array.
 * @property {AddFormulaOptions} [addFormula] - The add formula settings.
 * @property {ConvertTableToTextOptions} [convertTableToText] - The convert to text settings.
 */

/**
 * @typedef {Object} RowsSettings
 * @property {boolean} [header] - The header settings.
 * @property {boolean} [total] - The total settings.
 * @property {boolean} [banded] - The banded settings.
 */

/**
 * @typedef {Object} ColumnsSettings
 * @property {boolean} [first] - The first settings.
 * @property {boolean} [last] - The last settings.
 * @property {boolean} [banded] - The banded settings.
 */

/**
 * @typedef {Object} RowsAndColumnsSize
 * @property {string} [height] - The rows size.
 * @property {string} [width] - The columns size.
 * @property {boolean} [distributeRows] - The distribute rows settings.
 * @property {boolean} [distributeColumns] - The distribute columns settings.
 */

/**
 * @typedef {Object} SplitCellOptions
 * @property {number} [numberOfColumns] - The number of columns to split the cell into.
 * @property {number} [numberOfRows] - The number of rows to split the cell into.
 */

/**
 * @typedef {Object} AddFormulaOptions
 * @property {string} [formula] - The formula to set.
 * @property {NumberFormatsTypes} [numberFormat] - The number format to select.
 * @property {FunctionNamesTypes} [functionName] - The function name to select.
 * @property {string} [bookmarkName] - The bookmark name to select.
 */

/**
 * @typedef {Object} SeparateTextWithOptions
 * @property {SeparateTextWithTypes} [type] - The type of the separate text with.
 * @property {string} [value] - The value of the separate text with.
 */

/**
 * @typedef {Object} ConvertTableToTextOptions
 * @property {SeparateTextWithOptions} [separateTextWith] - The type of the separate text with.
 * @property {boolean} [convertNestedTables] - The condition of the checkbox to set.
 */

class TableBaseSettings extends BaseSettings {
    constructor(tester) {
        super(tester, TableBaseSettings.SELECTORS.RIGHT_MENU_TABLE_BASE_SETTINGS);
        this.color = new Color(this.tester);
        this.handleError = createErrorHandler("TableBaseSettings");
    }

    static SELECTORS = selectors;

    /**
     * Borders types
     */
    static BORDER_TYPES = {
        "set outer border and all inner lines": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.ALL,
        "set no borders": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.NONE,
        "set inner lines only": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.INNER,
        "set outer border only": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.OUTER,
        "set outer left border only": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.LEFT,
        "set outer right border only": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.RIGHT,
        "set outer top border only": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.TOP,
        "set outer bottom border only": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.BOTTOM,
        "set vertical inner lines only": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.INNER_VERTICAL,
        "set horizontal inner lines only": TableBaseSettings.SELECTORS.BORDERS_BUTTONS.INNER_HORIZONTAL,
    };

    /**
     * Separates text with.
     */
    static SEPARATE_TYPES = {
        semicolons: TableBaseSettings.SELECTORS.MODAL_WINDOWS.CONVERT_TABLE_TO_TEXT.SEPARATE_TYPES.SEMI,
        other: TableBaseSettings.SELECTORS.MODAL_WINDOWS.CONVERT_TABLE_TO_TEXT.SEPARATE_TYPES.OTHER,
        tabs: TableBaseSettings.SELECTORS.MODAL_WINDOWS.CONVERT_TABLE_TO_TEXT.SEPARATE_TYPES.TABS,
        "paragraph marks": TableBaseSettings.SELECTORS.MODAL_WINDOWS.CONVERT_TABLE_TO_TEXT.SEPARATE_TYPES.PARA,
    };

    static SELECTORS_MAP = {
        ROWS: {
            header: TableBaseSettings.SELECTORS.ROWS_CHECKBOXES.HEADER,
            total: TableBaseSettings.SELECTORS.ROWS_CHECKBOXES.TOTAL,
            banded: TableBaseSettings.SELECTORS.ROWS_CHECKBOXES.BANDED,
        },
        COLUMNS: {
            first: TableBaseSettings.SELECTORS.COLUMNS_CHECKBOXES.FIRST,
            last: TableBaseSettings.SELECTORS.COLUMNS_CHECKBOXES.LAST,
            banded: TableBaseSettings.SELECTORS.COLUMNS_CHECKBOXES.BANDED,
        },
    };

    static SETTINGS_MAP = {
        SET_SETTINGS: {
            rows: "setRows",
            columns: "setColumns",
            rowsAndColumnsSize: "selectRowsAndColumnsSize",
            template: "selectTemplate",
            borders: "selectBorders",
            bordersStyle: "selectBordersStyle",
            bordersColor: "selectBordersColor",
            backgroundColor: "selectBackgroundColor",
            convertToText: "clickConvertToText",
            rowsAndColumns: "selectRowsAndColumns",
            repeatAsHeader: "clickRepeatAsHeader",
            splitCell: "setSplitCell",
            addFormula: "addFormula",
            convertTableToText: "convertTableToText",
        },
        SET_SPLIT_CELL: {
            numberOfColumns: "splitCellNumberOfColumns",
            numberOfRows: "splitCellNumberOfRows",
        },
        SET_ADD_FORMULA: {
            formula: "setFormula",
            numberFormat: "selectNumberFormat",
            functionName: "selectFunction",
            bookmarkName: "selectBookmark",
        },
        CONVERT_TABLE_TO_TEXT: {
            separateTextWith: "separateTextWith",
            convertNestedTables: "setConvertNestedTablesCheckbox",
        },
        ROWS_AND_COLUMNS_SIZE: {
            height: "setTableHeight",
            width: "setTableWidth",
            distributeRows: "distributeTableRows",
            distributeColumns: "distributeTableColumns",
            autoFit: "setAutoFit",
        },
    };

    /**
     * Lazy getter for split cell modal window
     */
    get splitCellModalWindow() {
        if (!this._splitCellModalWindow) {
            this._splitCellModalWindow = new ModalButton(
                this.tester,
                "",
                TableBaseSettings.SELECTORS.MODAL_WINDOWS.SPLIT_CELL.WINDOW,
                TableBaseSettings.SELECTORS.MODAL_WINDOWS.SPLIT_CELL.OK_BUTTON
            );
        }
        return this._splitCellModalWindow;
    }

    /**
     * Lazy getter for add formula modal window
     */
    get addFormulaModalWindow() {
        if (!this._addFormulaModalWindow) {
            this._addFormulaModalWindow = new ModalButton(
                this.tester,
                "",
                TableBaseSettings.SELECTORS.MODAL_WINDOWS.ADD_FORMULA.WINDOW,
                TableBaseSettings.SELECTORS.MODAL_WINDOWS.ADD_FORMULA.OK_BUTTON
            );
        }
        return this._addFormulaModalWindow;
    }

    /**
     * Lazy getter for convert table to text modal window
     */
    get convertTableToTextModalWindow() {
        if (!this._convertTableToTextModalWindow) {
            this._convertTableToTextModalWindow = new ModalButton(
                this.tester,
                "",
                TableBaseSettings.SELECTORS.MODAL_WINDOWS.CONVERT_TABLE_TO_TEXT.WINDOW,
                TableBaseSettings.SELECTORS.MODAL_WINDOWS.CONVERT_TABLE_TO_TEXT.OK_BUTTON
            );
        }
        return this._convertTableToTextModalWindow;
    }

    /**
     * Sets the setting.
     * @param {TableBaseSettingsObject} settings - The settings to set.
     */
    async setSetting(settings) {
        await this.#setSettingsByMap(settings, TableBaseSettings.SETTINGS_MAP.SET_SETTINGS);
    }

    /**
     * Sets the rows settings.
     * @param {RowsSettings} rows_settings - The rows settings.
     */
    async setRows(rows_settings) {
        await this.#setCheckboxSettings(rows_settings, "ROWS", "setRows");
    }

    /**
     * Sets the columns settings.
     * @param {ColumnsSettings} columns_settings - The columns settings.
     */
    async setColumns(columns_settings) {
        await this.#setCheckboxSettings(columns_settings, "COLUMNS", "setColumns");
    }

    /**
     * Selects a template.
     * @param {TemplatesTypes} template - The template to select.
     */
    async selectTemplate(template) {
        const selectors = TableBaseSettings.SELECTORS.TAMPLATE_DROPDOWN;
        await this.#executeAction(Dropdown, selectors, "selectDropdownItem", "selectTemplate", [template]);
    }

    /**
     * Selects a borders style.
     * @param {BordersStyle} borderStyle - The borders size to select.
     */
    async selectBordersStyle(borderStyle) {
        const selectors = TableBaseSettings.SELECTORS.BORDERS_STYLE_DROPDOWN;
        await this.#executeAction(Dropdown, selectors, "selectDropdownItem", "selectBordersStyle", [borderStyle]);
    }

    /**
     * Selects a borders color.
     * @param {Color} сolor - The borders color to select.
     */
    async selectBordersColor(сolor) {
        await this.#selectColor(TableBaseSettings.SELECTORS.BORDERS_COLOR_BUTTON, сolor, "selectBordersColor");
    }

    /**
     * Selects a background color.
     * @param {Color} сolor - The background color to select.
     */
    async selectBackgroundColor(сolor) {
        await this.#selectColor(TableBaseSettings.SELECTORS.BACKGROUND_COLOR_BUTTON, сolor, "selectBackgroundColor");
    }

    /**
     * Clicks a border button based on the specified border type description.
     * @param {BordersTypes} borderType - The borders type name in array.
     */
    async selectBorders(borderType) {
        const borderTypes = Array.isArray(borderType) ? borderType : [borderType];
        for (const type of borderTypes) {
            const selector = TableBaseSettings.BORDER_TYPES[type.toLowerCase()];
            if (!selector) {
                throw new Error(`TableBaseSettings.selectBorders: Invalid border type "${type}"`);
            }
            await this.#executeAction(Button, selector, "click", "selectBorders");
        }
    }

    /**
     * Selects a rows and columns.
     * @param {RowsAndColumnsTypes} rowsAndColumns - The rows and columns to select.
     */
    async selectRowsAndColumns(rowsAndColumns) {
        const selectors = TableBaseSettings.SELECTORS.ROWS_AND_COLUMNS_DROPDOWN;
        const normalizedRowsAndColumns = Array.isArray(rowsAndColumns) ? rowsAndColumns : [rowsAndColumns];
        for (const rowAndColumn of normalizedRowsAndColumns) {
            await this.#executeAction(Dropdown, selectors, "selectDropdownItem", "selectRowsAndColumns", [
                rowAndColumn,
            ]);
        }
    }

    /**
     * Splits a cell.
     * @param {SplitCellOptions} options - The options for the split cell.
     */
    async setSplitCell(options) {
        await this.openSplitCell();
        await this.#setSettingsByMap(options, TableBaseSettings.SETTINGS_MAP.SET_SPLIT_CELL);
        await this.applySplitCell();
    }

    /**
     * Opens the split cell modal window.
     */
    async openSplitCell() {
        const triggerAction = () => this.selectRowsAndColumns("Split Cell...");
        await this.#openModalWithAction(this.splitCellModalWindow, triggerAction, "openSplitCell");
    }

    /**
     * Sets the number of columns to split the cell into.
     * @param {number} numberOfColumns - The number of columns to split the cell into.
     */
    async splitCellNumberOfColumns(numberOfColumns) {
        const selector = TableBaseSettings.SELECTORS.MODAL_WINDOWS.SPLIT_CELL.NUMBER_OF_COLUMNS_INPUT;
        await this.#executeAction(Input, selector, "set", "splitCellNumberOfColumns", [numberOfColumns, 100], [false]);
    }

    /**
     * Sets the number of rows to split the cell into.
     * @param {number} numberOfRows - The number of rows to split the cell into.
     */
    async splitCellNumberOfRows(numberOfRows) {
        const selector = TableBaseSettings.SELECTORS.MODAL_WINDOWS.SPLIT_CELL.NUMBER_OF_ROWS_INPUT;
        await this.#executeAction(Input, selector, "set", "splitCellNumberOfRows", [numberOfRows, 100], [false]);
    }

    /**
     * Applies the split cell.
     */
    async applySplitCell() {
        await this.#closeModal(this.splitCellModalWindow, "applySplitCell");
    }

    /**
     * Sets the table height.
     * @param {string} height - The height value to set.
     */
    async setTableHeight(height) {
        const selector = TableBaseSettings.SELECTORS.ROWS_AND_COLUMNS_SIZE.HEIGHT_INPUT;
        await this.#executeAction(Input, selector, "set", "setTableHeight", [height, 100], [true]);
    }

    /**
     * Sets the table width.
     * @param {string} width - The width value to set.
     */
    async setTableWidth(width) {
        const selector = TableBaseSettings.SELECTORS.ROWS_AND_COLUMNS_SIZE.WIDTH_INPUT;
        await this.#executeAction(Input, selector, "set", "setTableWidth", [width, 100], [true]);
    }

    /**
     * Distributes table rows evenly.
     */
    async distributeTableRows() {
        const selector = TableBaseSettings.SELECTORS.ROWS_AND_COLUMNS_SIZE.DISTRIBUTE_ROWS_BUTTON;
        await this.#executeAction(Button, selector, "click", "distributeTableRows");
    }

    /**
     * Distributes table columns evenly.
     */
    async distributeTableColumns() {
        const selector = TableBaseSettings.SELECTORS.ROWS_AND_COLUMNS_SIZE.DISTRIBUTE_COLUMNS_BUTTON;
        await this.#executeAction(Button, selector, "click", "distributeTableColumns");
    }

    /**
     * Sets the auto fit option for the table.
     * @param {boolean} condition - Whether to enable auto fit.
     */
    async setAutoFit(condition) {
        const selector = TableBaseSettings.SELECTORS.ROWS_AND_COLUMNS_SIZE.AUTO_FIT_CHECKBOX;

        await this.#clickCheckbox(selector, condition, "setAutoFit");
    }

    /**
     * Selects a rows and columns size.
     * @param {rowsAndColumnsSize} rowsAndColumnsSize - The rows and columns size to select.
     */
    async selectRowsAndColumnsSize(rowsAndColumnsSize) {
        await this.#setSettingsByMap(rowsAndColumnsSize, TableBaseSettings.SETTINGS_MAP.ROWS_AND_COLUMNS_SIZE);
    }

    /**
     * Clicks a Repeat as header row at the top of each page checkbox.
     * @param {boolean} condition - The condition of the checkbox to click.
     */
    async clickRepeatAsHeader(condition) {
        const selector = TableBaseSettings.SELECTORS.REPEAT_AS_HEADER_CHECKBOX;
        await this.#clickCheckbox(selector, condition, "clickRepeatAsHeader");
    }

    /**
     * Adds a formula.
     * @param {AddFormulaOptions} options - The options for the add formula.
     */
    async addFormula(options) {
        await this.openAddFormula();
        await this.#setSettingsByMap(options, TableBaseSettings.SETTINGS_MAP.SET_ADD_FORMULA);
        await this.applyAddFormula();
    }

    /**
     * Opens the add formula modal window.
     */
    async openAddFormula() {
        const buttonSelector = TableBaseSettings.SELECTORS.ADD_FORMULA_BUTTON;
        const triggerAction = () => this.#executeAction(Button, buttonSelector, "click", "openAddFormula");
        await this.#openModalWithAction(this.addFormulaModalWindow, triggerAction, "openAddFormula");
    }

    /**
     * Sets the formula.
     * @param {string} formula - The formula to set.
     */
    async setFormula(formula) {
        const selector = TableBaseSettings.SELECTORS.MODAL_WINDOWS.ADD_FORMULA.FORMULA_INPUT;
        await this.#executeAction(Input, selector, "set", "setFormula", [formula, 100], [false]);
    }

    /**
     * Selects a number format.
     * @param {NumberFormatsTypes} numberFormat - The number format to select.
     */
    async selectNumberFormat(numberFormat) {
        const selector = TableBaseSettings.SELECTORS.MODAL_WINDOWS.ADD_FORMULA.NUMBER_FORMAT_DROPDOWN;
        await this.#executeAction(Dropdown, selector, "selectDropdownItem", "selectNumberFormat", [numberFormat]);
    }

    /**
     * Selects a paste function.
     * @param {FunctionNamesTypes} functionName - The function name to select.
     */
    async selectFunction(functionName) {
        const selector = TableBaseSettings.SELECTORS.MODAL_WINDOWS.ADD_FORMULA.PASTE_FUNCTION_DROPDOWN;
        const functionNames = Array.isArray(functionName) ? functionName : [functionName];
        for (const name of functionNames) {
            await this.#executeAction(Dropdown, selector, "selectDropdownItem", "selectFunction", [name]);
        }
    }

    /**
     * Selects a bookmark.
     * @param {string} bookmarkName - The bookmark name to select.
     */
    async selectBookmark(bookmarkName) {
        const selector = TableBaseSettings.SELECTORS.MODAL_WINDOWS.ADD_FORMULA.BOOKMARK_DROPDOWN;
        await this.#executeAction(Dropdown, selector, "selectDropdownItem", "selectBookmark", [bookmarkName]);
    }

    /**
     * Applies the add formula.
     */
    async applyAddFormula() {
        await this.#closeModal(this.addFormulaModalWindow, "applyAddFormula");
    }

    /**
     * Converts the table to text.
     * @param {ConvertTableToTextOptions} options - The options for the convert table to text.
     */
    async convertTableToText(options) {
        await this.openConvertTableToText();
        await this.#setSettingsByMap(options, TableBaseSettings.SETTINGS_MAP.CONVERT_TABLE_TO_TEXT);
        await this.applyConvertTableToText();
    }

    /**
     * Opens the convert table to text modal window.
     */
    async openConvertTableToText() {
        const buttonSelector = TableBaseSettings.SELECTORS.CONVERT_TO_TEXT_BUTTON;
        const triggerAction = () => this.#executeAction(Button, buttonSelector, "click", "openConvertTableToText");
        await this.#openModalWithAction(this.convertTableToTextModalWindow, triggerAction, "openConvertTableToText");
    }

    /**
     * Separates text with.
     * @param {SeparateTextWithOptions} options - The options for the separate text with.
     */
    async separateTextWith(options) {
        const { type, value } = options;
        const selector = TableBaseSettings.SEPARATE_TYPES[type.toLowerCase()];
        await this.#executeAction(Button, selector, "click", "separateTextWith");
        if (value) {
            const inputSelector = TableBaseSettings.SELECTORS.MODAL_WINDOWS.CONVERT_TABLE_TO_TEXT.INPUT_OTHER;
            await this.#executeAction(Input, inputSelector, "set", "separateTextWith", [value]);
        }
    }

    /**
     * Sets the nested checkbox.
     * @param {boolean} condition - The condition of the checkbox to set.
     */
    async setConvertNestedTablesCheckbox(condition) {
        const selector = TableBaseSettings.SELECTORS.MODAL_WINDOWS.CONVERT_TABLE_TO_TEXT.CHECKBOX_NESTED;
        await this.#clickCheckbox(selector, condition, "setConvertNestedTablesCheckbox");
    }

    /**
     * Applies the convert table to text.
     */
    async applyConvertTableToText() {
        await this.#closeModal(this.convertTableToTextModalWindow, "applyConvertTableToText");
    }

    /**
     * Applies settings using a mapping from keys to method names
     * @param {Object} settings - Settings object
     * @param {Object} map - Map of setting keys to method names
     */
    async #setSettingsByMap(settings, map) {
        if (!settings || !map) {
            return;
        }

        for (const key of Object.keys(settings)) {
            const methodName = map[key];
            if (methodName && typeof this[methodName] === "function") {
                await this[methodName](settings[key]);
            }
        }
    }

    /**
     * Sets checkbox settings using the specified selector map type
     * @param {Object} settings - The settings object containing checkbox values
     * @param {string} selectorMapType - The type of selector map ("ROWS" or "COLUMNS")
     * @param {string} methodName - The name of the calling method for error handling
     */
    async #setCheckboxSettings(settings, selectorMapType, methodName) {
        if (!settings) {
            return;
        }

        const settingsMap = TableBaseSettings.SELECTORS_MAP[selectorMapType];
        for (const [property, selector] of Object.entries(settingsMap)) {
            if (settings[property] !== undefined) {
                await this.#clickCheckbox(selector, settings[property], methodName);
            }
        }
    }

    /**
     * Selects a color based on the specified selector and color.
     * @param {string} selector - The selector of the color dropdown
     * @param {Color} color - The color to select
     * @param {string} methodName - The name of the method that called this method
     * @return {Promise<void>}
     */
    async #selectColor(selector, color, methodName) {
        try {
            await this.color.selectColor(selector, color);
        } catch (error) {
            this.handleError(methodName, error);
        }
    }

    /**
     * Clicks a checkbox based on the specified selector and condition.
     * @param {string} selector - The selector of the checkbox to click.
     * @param {boolean} condition - The condition of the checkbox to click.
     */
    async #clickCheckbox(selector, condition, methodName) {
        try {
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            this.handleError(methodName, error);
        }
    }

    /**
     * Universal method for executing actions on elements with error handling
     * @param {string} elementClass Element class to instantiate (Button, DropdownInput, etc.)
     * @param {string} selector Selector for the element
     * @param {string} action Action method to call on the element
     * @param {string} methodName Name of the calling method for error handling
     * @param {string} actionParams Parameters to pass to the action method
     */
    async #executeAction(elementClass, selector, action, methodName, actionParams = [], constructorParams = []) {
        const element = new elementClass(this.tester, selector, ...constructorParams);
        try {
            await element[action](...actionParams);
        } catch (error) {
            this.handleError(methodName, error);
        }
    }

    /**
     * Common method for opening modal windows with trigger actions
     * @param {ModalButton} modalInstance - Modal window instance
     * @param {Function} triggerAction - Action to trigger modal opening
     * @param {string} methodName - Name of the calling method for error handling
     */
    async #openModalWithAction(modalInstance, triggerAction, methodName) {
        try {
            await triggerAction();
            await modalInstance.isModalOpen();
        } catch (error) {
            this.handleError(methodName, error);
        }
    }

    /**
     * Common method for closing modal windows
     * @param {ModalButton} modalInstance - Modal window instance
     * @param {string} methodName - Name of the calling method for error handling
     */
    async #closeModal(modalInstance, methodName) {
        try {
            await modalInstance.closeModal();
        } catch (error) {
            this.handleError(methodName, error);
        }
    }
}

module.exports = TableBaseSettings;
