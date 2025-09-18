const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");
const { Input, Dropdown, Checkbox } = require("../../../../../elements");

/**
 * @typedef {Object} TableSettingsObject
 * @property {TableSizeSettings} [tableSize] - The table size settings.
 * @property {CellMarginsSettings} [cellMargins] - The cell margins settings.
 * @property {TableOptionsSettings} [options] - The table options settings.
 */

class TableSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    static TABLE_SETTINGS_SELECTORS = selectors;

    /**
     * @typedef {Object} TableSizeSettings
     * @property {import("../../../../../elements/input/input").InputSettings} [width] - The width settings.
     * @property {string} [measure] - The measure settings.
     * @property {boolean} [autoResize] - Whether to enable auto-resize.
     */

    /**
     * @param {TableSizeSettings} settings
     * Applies table size settings.
     */
    async #setTableSizeSettings(settings) {
        const tableSizeSelectors = TableSettings.TABLE_SETTINGS_SELECTORS.TABLE_SIZE;

        const handlers = {
            width: async (value) => {
                const checkbox = new Checkbox(this.tester, tableSizeSelectors.SIZE.CHECKBOX);
                await checkbox.set(true);
                const input = new Input(this.tester, tableSizeSelectors.SIZE.WIDTH, false);
                await input.setInputSettings(value);
            },
            measure: async (value) => {
                const checkbox = new Checkbox(this.tester, tableSizeSelectors.SIZE.CHECKBOX);
                await checkbox.set(true);
                const dropdown = new Dropdown(this.tester, {
                    selector: tableSizeSelectors.SIZE.MEASURE.SELECTOR,
                    elementsSelector: tableSizeSelectors.SIZE.MEASURE.ELEMENTS_SELECTORS,
                });
                await dropdown.selectDropdownItem(value);
            },
            autoResize: async (value) => {
                const checkbox = new Checkbox(this.tester, tableSizeSelectors.AUTO_RESIZE);
                await checkbox.set(value);
            },
        };

        await this.applySettingsMap(settings, handlers, "TableSize");
    }

    /**
     * @typedef {Object} CellMarginsSettings
     * @property {import("../../../../../elements/input/input").InputSettings} [top] - The top margin settings.
     * @property {import("../../../../../elements/input/input").InputSettings} [left] - The left margin settings.
     * @property {import("../../../../../elements/input/input").InputSettings} [right] - The right margin settings.
     * @property {import("../../../../../elements/input/input").InputSettings} [bottom] - The bottom margin settings.
     */
    /**
     * Applies cell margins settings.
     * @param {CellMarginsSettings} settings
     */
    async #setCellMarginsSettings(settings) {
        const cellMarginsSelectors = TableSettings.TABLE_SETTINGS_SELECTORS.CELL_MARGINS;

        const handlers = {
            top: async (value) => {
                const input = new Input(this.tester, cellMarginsSelectors.TOP, false);
                await input.setInputSettings(value);
            },
            left: async (value) => {
                const input = new Input(this.tester, cellMarginsSelectors.LEFT, false);
                await input.setInputSettings(value);
            },
            right: async (value) => {
                const input = new Input(this.tester, cellMarginsSelectors.RIGHT, false);
                await input.setInputSettings(value);
            },
            bottom: async (value) => {
                const input = new Input(this.tester, cellMarginsSelectors.BOTTOM, false);
                await input.setInputSettings(value);
            },
        };

        await this.applySettingsMap(settings, handlers, "CellMargins");
    }

    /**
     * @typedef {Object} TableOptionsSettings
     * @property {import("../../../../../elements/input/input").InputSettings} [inputSpacing] - The input spacing settings.
     */
    /**
     * Applies table options settings.
     * @param {TableOptionsSettings} settings
     */
    async #setTableOptionsSettings(settings) {
        const tableOptionsSelectors = TableSettings.TABLE_SETTINGS_SELECTORS.OPTIONS;

        const handlers = {
            inputSpacing: async (value) => {
                const checkbox = new Checkbox(this.tester, tableOptionsSelectors.CHECKBOX);
                await checkbox.set(true);
                const input = new Input(this.tester, tableOptionsSelectors.INPUT_SPACING, false);
                await input.setInputSettings(value);
            },
        };

        await this.applySettingsMap(settings, handlers, "TableOptions");
    }

    /**
     * Applies table settings.
     * @param {TableSettingsObject} settings
     */
    async applySettings(settings) {
        const handlers = {
            tableSize: this.#setTableSizeSettings.bind(this),
            cellMargins: this.#setCellMarginsSettings.bind(this),
            options: this.#setTableOptionsSettings.bind(this),
        };

        await this.applySettingsMap(settings, handlers, "Table");
    }
}

module.exports = TableSettings;
