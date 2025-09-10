const { Input } = require("../../../../../elements");
const selectors = require("./selectors.json");

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

class ConvertTextToTableModal {
    constructor(tester) {
        this.tester = tester;
    }

    static CONVERT_TEXT_SELECTORS = selectors;

    static AUTOFIT_TYPES = {
        FIXED: "fixed",
        CONTENTS: "contents",
        WINDOW: "window",
    };

    static SEPARATE_TYPES = {
        PARA: "para",
        TABS: "tabs",
        SEMI: "semi",
        OTHER: "other",
    };

    async #setCheckboxSettings(setting, inputSelector) {
        if (!setting) {
            return;
        }

        await this.tester.clickCheckbox({ selector: setting.selector, condition: true });

        if (setting.value !== undefined && inputSelector) {
            const input = new Input(this.tester, inputSelector, false);
            await input.setInputSettings(setting.value);
        }
    }

    /**
     * @param {number} columnsValue - Number of columns in the table
     * @param {number} rowsValue - Number of rows in the table
     */
    async #setTableSize(columnsValue, rowsValue) {
        const tableSizeSelectors = ConvertTextToTableModal.CONVERT_TEXT_SELECTORS.TABLE_SIZE;
        if (columnsValue) {
            const columnInput = new Input(this.tester, tableSizeSelectors.COLUMNS_INPUT, false);
            await columnInput.setInputSettings(columnsValue);
        }

        if (rowsValue) {
            const rowInput = new Input(this.tester, tableSizeSelectors.ROWS_INPUT, false);
            await rowInput.setInputSettings(rowsValue);
        }
    }

    /**
     * @param {"fixed"|"contents"|"window"} autofitType - Type of autofit behavior
     * @param {number} value - Value associated with the autofit behavior
     */
    async #setAutofitBehavior(autofit) {
        const selectors = ConvertTextToTableModal.CONVERT_TEXT_SELECTORS.AUTOFIT;
        const checkboxSelectors = selectors.CHECKBOXES;

        const map = {
            fixed: { selector: checkboxSelectors.FIXED_COLUMN, value: autofit.value },
            contents: { selector: checkboxSelectors.AUTOFIT_CONTENTS },
            window: { selector: checkboxSelectors.AUTOFIT_WINDOW },
        };

        const setting = map[autofit.type];
        await this.#setCheckboxSettings(setting, autofit.type === "fixed" ? selectors.INPUT_WIDTH : undefined);
    }

    /**
     * @param {string} separateType - Type of text separation
     * @param {string} value - Value associated with the text separation
     */
    async #setSeparateText(separateText) {
        const selectors = ConvertTextToTableModal.CONVERT_TEXT_SELECTORS.SEPARATE;

        const map = {
            para: { selector: selectors.CHECKBOXES.PARA },
            tabs: { selector: selectors.CHECKBOXES.TABS },
            semi: { selector: selectors.CHECKBOXES.SEMI },
            other: { selector: selectors.CHECKBOXES.OTHER, value: separateText.value },
        };

        const setting = map[separateText.type];
        await this.#setCheckboxSettings(setting, separateText.type === "other" ? selectors.INPUT_OTHER : undefined);
    }

    /**
     * @param {ConvertTextToTableSettings} settings
     */
    async setSettings(settings) {
        if (settings?.tableSize) {
            await this.#setTableSize(settings.tableSize.columns, settings.tableSize.rows);
        }

        if (settings?.autofit) {
            await this.#setAutofitBehavior(settings.autofit);
        }

        if (settings?.separateText) {
            await this.#setSeparateText(settings.separateText);
        }
    }
}

module.exports = ConvertTextToTableModal;
