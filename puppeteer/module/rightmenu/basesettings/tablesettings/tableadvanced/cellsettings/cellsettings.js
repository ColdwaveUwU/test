const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");
const { Input, Dropdown } = require("../../../../../elements");

/**
 * @typedef {Object} CellSettingsObject
 * @property {CellSizeSettings} [cellSize]
 * @property {CellMarginsSettings} [cellMargins]
 * @property {CellOptionsSettings} [options]
 */

class CellSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    static CELL_SETTINGS_SELECTORS = selectors;

    /**
     * @typedef {Object} CellSizeSettings
     * @property {import("../../../../../elements/input/input").InputSettings} [preffer]
     * @property {string} [measure]
     */

    /**
     * Sets the cell size settings.
     * @param {CellSizeSettings} settings
     */
    async #setCellSizeSettings(settings) {
        const cellSizeSelectors = CellSettings.CELL_SETTINGS_SELECTORS.CELL_SIZE;

        const handlers = {
            preffer: async (value) => {
                await this.tester.clickCheckbox({ selector: cellSizeSelectors.CHECKBOX, condition: true });
                const input = new Input(this.tester, cellSizeSelectors.PREFER_INPUR, false);
                await input.setInputSettings(value);
            },
            measure: async (value) => {
                await this.tester.clickCheckbox({ selector: cellSizeSelectors.CHECKBOX, condition: true });
                const dropdown = new Dropdown(this.tester, {
                    selector: cellSizeSelectors.MEASURE.SELECTOR,
                    elementsSelector: cellSizeSelectors.MEASURE.ELEMENTS_SELECTORS,
                });
                await dropdown.selectDropdownItem(value);
            },
        };

        await this.applySettingsMap(settings, handlers, "CellSize");
    }

    /**
     * @typedef {Object} CellMarginsSettings
     * @property {import("../../../../../elements/input/input").InputSettings} [top]
     * @property {import("../../../../../elements/input/input").InputSettings} [left]
     * @property {import("../../../../../elements/input/input").InputSettings} [right]
     * @property {import("../../../../../elements/input/input").InputSettings} [bottom]
     */
    /**
     * Sets the cell margins settings.
     * @param {CellMarginsSettings} settings
     */
    async #setCellMarginsSettings(settings) {
        const cellMarginsSelectors = CellSettings.CELL_SETTINGS_SELECTORS.CELL_MARGINS;

        const handlers = {
            top: async (value) => {
                const input = new Input(this.tester, cellMarginsSelectors.TOP, false);
                await this.tester.clickCheckbox({ selector: cellMarginsSelectors.CHECKBOX, condition: false });
                await input.setInputSettings(value);
            },
            left: async (value) => {
                const input = new Input(this.tester, cellMarginsSelectors.LEFT, false);
                await this.tester.clickCheckbox({ selector: cellMarginsSelectors.CHECKBOX, condition: false });
                await input.setInputSettings(value);
            },
            right: async (value) => {
                const input = new Input(this.tester, cellMarginsSelectors.RIGHT, false);
                await this.tester.clickCheckbox({ selector: cellMarginsSelectors.CHECKBOX, condition: false });
                await input.setInputSettings(value);
            },
            bottom: async (value) => {
                const input = new Input(this.tester, cellMarginsSelectors.BOTTOM, false);
                await this.tester.clickCheckbox({ selector: cellMarginsSelectors.CHECKBOX, condition: false });
                await input.setInputSettings(value);
            },
        };

        await this.applySettingsMap(settings, handlers, "CellMargins");
    }

    /**
     * @typedef {Object} CellOptionsSettings
     * @property {boolean} [wrapText]
     */
    /**
     * Sets the cell options settings.
     * @param {CellOptionsSettings} settings
     */
    async #setCellOptionsSettings(settings) {
        const cellOptionsSelectors = CellSettings.CELL_SETTINGS_SELECTORS.OPTIONS;

        const handlers = {
            wrapText: async (value) => {
                await this.tester.clickCheckbox({ selector: cellOptionsSelectors.CHECKBOX, condition: value });
            },
        };

        await this.applySettingsMap(settings, handlers, "CellOptions");
    }

    /**
     * Sets the cell settings.
     * @param {CellSettingsObject} settings
     */
    async applySettings(settings) {
        const handlers = {
            cellSize: this.#setCellSizeSettings.bind(this),
            cellMargins: this.#setCellMarginsSettings.bind(this),
            options: this.#setCellOptionsSettings.bind(this),
        };

        await this.applySettingsMap(settings, handlers, "Cell");
    }
}

module.exports = CellSettings;
