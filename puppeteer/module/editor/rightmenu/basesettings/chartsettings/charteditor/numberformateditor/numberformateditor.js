const { Button, Dropdown } = require("../../../../../../elements");
const { NumberFormat } = require("../../../../../modalwindows");
const { createErrorHandler, createExecuteAction } = require("../../../../../../../engine/script/js/utils");
const selectors = require("./selectors.json");
const BaseSettings = require("../../../basesettings");

/**
 * @typedef {Object} NumberFormatType
 * @property {
 * "General"
 * | "Number"
 * | "Scientific"
 * | "Accounting"
 * | "Currency"
 * | "Short Date"
 * | "Long Date"
 * | "Time"
 * | "Percentage"
 * | "Fraction"
 * | "Text"
 * | "More formats"
 * } [format] - The number format to select
 */

/**
 * @typedef {Object} NumberFormatSettings
 * @property {NumberFormatType} [format] - The number format to select
 * @property {import("../../../../../common/numberformat/numberformat").NumberFormatObject} [advancedSettings] - The number format settings to select
 * @property {number} [decreaseDecimal] - The number of times to click the decrease decimal button (default: 1)
 * @property {number} [increaseDecimal] - The number of times to click the increase decimal button (default: 1)
 */

/**
 * Number Format Editor for Chart Editor operations
 */
class NumberFormatEditor extends BaseSettings {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(tester);
        this.selectors = selectors;
        this.NumberFormat = new NumberFormat(tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    static SETTINGS_MAP = {
        format: "setNumberFormat",
        advancedSettings: "setNumberFormatAdvanced",
        decreaseDecimal: "clickDecreaseDecimal",
        increaseDecimal: "clickIncreaseDecimal",
    };

    /**
     * Sets the number format settings
     * @param {NumberFormatSettings} settings - The number format settings to set
     */
    async setSettings(settings) {
        await this.setSettingsByMap(settings, NumberFormatEditor.SETTINGS_MAP);
    }

    /**
     * Selects a number format
     * @param {NumberFormatType} format - The number format to select
     */
    async setNumberFormat(format) {
        const selector = NumberFormatEditor.SELECTORS.TOOLBAR.NUMBER_FORMAT_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setNumberFormat", [format]);
    }

    /**
     * # TODO need function for set advanced number format settings in NumberFormat class
     * Selects advanced number format settings
     * @param {import("../../../../../common/numberformat/numberformat").NumberFormatObject} settings - The number format settings to select
     */
    async setNumberFormatAdvanced(settings) {
        await this.NumberFormat.setSettings(settings);
    }

    /**
     * Clicks the decrease decimal button
     * @param {number} clickCount - The number of times to click the button
     */
    async clickDecreaseDecimal(clickCount = 1) {
        const selector = this.selectors.TOOLBAR.DECREASE_DECIMAL_BUTTON;
        await this.executeAction(Button, selector, "click", "clickDecreaseDecimal", [clickCount]);
    }

    /**
     * Clicks the increase decimal button
     * @param {number} clickCount - The number of times to click the button
     */
    async clickIncreaseDecimal(clickCount = 1) {
        const selector = this.selectors.TOOLBAR.INCREASE_DECIMAL_BUTTON;
        await this.executeAction(Button, selector, "click", "clickIncreaseDecimal", [clickCount]);
    }
}

module.exports = NumberFormatEditor;
