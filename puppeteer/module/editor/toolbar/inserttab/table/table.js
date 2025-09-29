const InsertTab = require("../inserttab");
const { TableSettings } = require("../../../rightmenu");
const { ConvertTextToTableModal } = require("./converttexttotablemodal");
const { Dropdown, CanvasHoverTracker, ModalButton, Input } = require("../../../../elements");
const selectors = require("./selectors.json");

/**
 * @typedef {Object} TableOptions
 * @property {import("../../../../rightmenu/basesettings/tablesettings/tableadvanced/tablesettings/tablesettings").TableSettingsObject} [table]
 * @property {import("../../../../rightmenu/basesettings/tablesettings/tableadvanced/cellsettings/cellsettings").CellSettingsObject} [cell]
 * @property {import("../../../../rightmenu/basesettings/tablesettings/tableadvanced/backgroundbordersettings/backgroundbordersettings").BackgroundBorderSettingsObject} [border]
 * @property {import("../../../../rightmenu/basesettings/tablesettings/tableadvanced/textwrappingsettings/textwrappingsettings").TextWrappingSettingsObject} [textWrapping]
 * @property {import("../../../../rightmenu/basesettings/tablesettings/tableadvanced/alternativetextsettings/alternativetextsettings").AlternativeTextSettings} [alternativeText]
 */

/**
 * @typedef {Object} TableSettings
 * @property {import("../../../../rightmenu/basesettings/tablesettings/tablebasesettings/tablebasesettings").TableBaseSettingsObject} [baseSettings]
 */

class Table extends InsertTab {
    constructor(tester) {
        super(tester, "#slot-btn-instable");
        this.tableSettings = new TableSettings(tester);
    }

    static TABLE_SELECTORS = selectors;

    #tableDropdownButton = null;
    #insertSpreadSheetModal = null;

    #getTableDropdown() {
        if (!this.#tableDropdownButton) {
            const createTableSelectors = Table.TABLE_SELECTORS;
            this.#tableDropdownButton = new Dropdown(this.tester, {
                selector: createTableSelectors.TABLE_BUTTON_SELECTOR,
                elementsSelector: createTableSelectors.TABLE_ELEMENTS,
            });
        }
        return this.#tableDropdownButton;
    }

    #getInsertSpreadSheetModalWindow(selector) {
        if (!this.#insertSpreadSheetModal) {
            this.#insertSpreadSheetModal = new ModalButton(
                this.tester,
                selector,
                Table.TABLE_SELECTORS.INSERT_SPREADSHEET.MODAL_WINDOW,
                Table.TABLE_SELECTORS.INSERT_SPREADSHEET.SAVE_BUTTON
            );
        }
        return this.#insertSpreadSheetModal;
    }

    /**
     * Draws a rectangle on the canvas.
     * @param {{cellWidth: number, cellHeight: number}} tableSize
     * @param {{x: number, y: number}} position
     */
    async #drawRectangle(tableSize, position) {
        const { x = 0, y = 0 } = position;
        const { cellWidth = 0, cellHeight = 0 } = tableSize;

        const areaCanvasHandle = await this.tester.frame.$("#id_viewer");
        const boundingBox = await areaCanvasHandle.boundingBox();

        if (!boundingBox) {
            throw new Error("Canvas bounding box not found");
        }

        const startX = boundingBox.x + x;
        const startY = boundingBox.y + y;

        const endX = startX + cellWidth;
        const endY = startY + cellHeight;

        await this.tester.page.mouse.move(startX, startY);
        await this.tester.page.mouse.down();
        await this.tester.page.mouse.move(endX, endY);
        await this.tester.page.mouse.up();
    }

    /**
     * Creates a table with the specified number of columns and rows.
     * @param {number} column - The number of columns.
     * @param {number} row - The number of rows.
     */
    async createTable(column, row) {
        // todo (canvas)
        // const targetValue = `${column} x ${row}`;
        // const selectors = Table.TABLE_SELECTORS.CREATE_TABLE;
        // await this.#openTableDropdown();
        // const hoverTracker = new CanvasHoverTracker(this.tester, selectors.CANVAS_ELEMENT, selectors.VALUE_ELEMENT);
        // const { x, y } = await hoverTracker.hoverToValue(column, row, {
        //     initValue: "1 x 1",
        //     targetValue: targetValue,
        // });
        // await hoverTracker.click(x, y);
    }

    /**
     * Inserts a table with the specified number of columns and rows.
     * @param {number} column - The number of columns.
     * @param {number} row - The number of rows.
     */
    async insertTable(column, row) {
        const insertTableSelectors = Table.TABLE_SELECTORS.INSERT_TABLE;

        const covertTextButtons = await this.#getTableDropdown().getDropdownItems();
        const target = covertTextButtons.find((elem) => elem.description === "Insert custom table");
        const customTableModalWindow = new ModalButton(
            this.tester,
            target.id,
            insertTableSelectors.MODAL_WINDOW.SELECTOR,
            insertTableSelectors.MODAL_WINDOW.OK_BUTTON
        );
        await customTableModalWindow.openModal();
        if (await customTableModalWindow.isModalOpen()) {
            if (column) {
                const columnInput = new Input(this.tester, insertTableSelectors.MODAL_WINDOW.INPUT_COLUMN, false);
                await columnInput.set(column);
            }

            if (row) {
                const rowInput = new Input(this.tester, insertTableSelectors.MODAL_WINDOW.INPUT_ROW, false);
                await rowInput.set(row);
            }

            await customTableModalWindow.closeModal();
        }
    }

    /**
     * Draws a table on the canvas.
     * @param {{cellWidth: number, cellHeight: number}} tableSize
     * @param {{x: number, y: number}} position
     */
    async drawTable(tableSize, position) {
        await this.#getTableDropdown().selectDropdownItem("Draw table");
        await this.#drawRectangle(tableSize, position);
    }

    /**
     * Erases a table on the canvas.
     * @param {{cellWidth: number, cellHeight: number}} tableSize
     * @param {{x: number, y: number}} position
     */
    async eraseTable(tableSize, position) {
        await this.#getTableDropdown().selectDropdownItem("Erase table");
        await this.#drawRectangle(tableSize, position);
    }

    /**
     * Converts the selected text to a table.
     * @param {import("./converttexttotablemodal/converttexttotablemodal").ConvertTextToTableSettings} settings - The settings for the table conversion.
     */
    async convertTextToTable(settings) {
        const convertTextToTableSelectors = Table.TABLE_SELECTORS.COVERT_TEXT;
        const convertTextToTable = new ConvertTextToTableModal(this.tester);

        const covertTextButtons = await this.#getTableDropdown().getDropdownItems();
        const target = covertTextButtons.find((elem) => elem.description === "Convert Text to Table");
        const convertTextToTableModal = new ModalButton(
            this.tester,
            target.id,
            convertTextToTableSelectors.MODAL_WINDOW,
            convertTextToTableSelectors.OK_BUTTON
        );

        await convertTextToTableModal.openModal();
        await convertTextToTable.setSettings(settings);
        await convertTextToTableModal.closeModal();
    }

    /**
     * Opens the insert spreadsheet modal.
     */
    async openInsertSpreadsheet() {
        const waitInsertSpreadSheetFrame = new Promise((resolve) => {
            this.tester.page.once("frameattached", async (frame) => {
                await this.tester.waitEditor(frame.name(), frame);
                this.tester.changeCurrentFrame(frame);
                resolve();
            });
        });
        const targetItem = await this.#getTableDropdown().getDropdownItem("description", "Insert Spreadsheet");
        const insertSpreadSheetModal = this.#getInsertSpreadSheetModalWindow(targetItem.id);
        await insertSpreadSheetModal.openModal();
        await waitInsertSpreadSheetFrame;
    }

    /**
     * Closes the insert spreadsheet modal.
     */
    async closeInsertSpreadsheet() {
        const frame = this.tester.frame.parentFrame();
        this.tester.changeCurrentFrame(frame);
        await this.#insertSpreadSheetModal.closeModal();
    }

    /**
     * Method for set table base settings
     * @param {TableSettings} options
     */
    async setTableSettings(options) {
        await this.tableSettings.setBaseSettings(options);
    }

    /**
     * Method for set table settings
     * @param {TableOptions} options
     */
    async setTableAdvancedSettings(options) {
        const setAdvancedSettingsSelectors = selectors.ADVANCED_SETTINGS;
        const tableSettingsModalWindow = new ModalButton(
            this.tester,
            setAdvancedSettingsSelectors.BUTTON,
            setAdvancedSettingsSelectors.WINDOW,
            setAdvancedSettingsSelectors.OK_BUTTON
        );
        for (const [kind, prop] of Object.entries(options)) {
            await this.tableSettings.applySettings(kind, prop, tableSettingsModalWindow);
        }
        await tableSettingsModalWindow.closeModal();
    }
}

module.exports = Table;
