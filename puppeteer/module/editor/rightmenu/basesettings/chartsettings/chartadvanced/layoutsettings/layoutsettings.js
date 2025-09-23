const BaseSettings = require("../../../basesettings");
const { Button, Input, Dropdown, Checkbox } = require("../../../../../../elements");
const selectors = require("./selectors.json");
const { createErrorHandler, createExecuteAction } = require("../../../../../../../engine/script/js/utils");

/**
 * @typedef {Object} ChartTitle
 * @property {"None" | "Overlay" | "No Overlay"} [optionValue] - The option value for the chart title
 */

/**
 * @typedef {Object} DataLabels
 * @property {"None" | "Center"} [optionValue] - The option value for the data labels
 */

/**
 * @typedef {Object} Legend
 * @property {"None" | "Bottom" | "Top" | "Right" | "Left" | "Left Overlay" | "Right Overlay"} [optionValue] - The option value for the legend
 */

/**
 * @typedef {Object} LayoutSettingsObject
 * @property {ChartTitle} [chartTitle] - Chart title
 * @property {DataLabels} [dataLabels] - Data labels
 * @property {Legend} [legend] - Legend
 * @property {boolean} [series] - Series  only for data labels Center option
 * @property {boolean} [category] - Category  only for data labels Center option
 * @property {boolean} [value] - Value  only for data labels Center option
 * @property {string} [dataLabelsSeparator] - Data labels separator only for data labels Center option
 */

class LayoutSettings extends BaseSettings {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    static SETTINGS_MAP = {
        chartTitle: "setChartTitle",
        dataLabels: "setDataLabels",
        dataLabelsSeparator: "setDataLabelsSeparator",
        legend: "setLegend",
        series: "setSeries",
        category: "setCategory",
        value: "setValue",
    };

    constructor(tester) {
        super(tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Set the layout settings
     * @param {LayoutSettingsObject} settings - The settings to set
     */
    async setSettings(settings) {
        await this.#selectTab();
        await this.setSettingsByMap(settings, LayoutSettings.SETTINGS_MAP);
    }

    /**
     * Set the chart title
     * @param {ChartTitle} optionValue - The option value for the chart title
     */
    async setChartTitle(optionValue) {
        const selector = LayoutSettings.SELECTORS.CHART_TITLE_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setChartTitle", [optionValue]);
    }

    /**
     * Set the data labels
     * @param {DataLabels} optionValue - The option value for the data labels
     */
    async setDataLabels(optionValue) {
        const selector = LayoutSettings.SELECTORS.DATA_LABELS.DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setDataLabels", [optionValue]);
    }

    /**
     * Set the data labels separator
     * @param {string} separator - The separator for the data labels
     */
    async setDataLabelsSeparator(separator) {
        const selector = LayoutSettings.SELECTORS.DATA_LABELS.SEPARATOR;
        await this.executeAction(Input, selector, "set", "setDataLabelsSeparator", [separator], [false]);
    }

    /**
     * Set the legend
     * @param {Legend} optionValue - The option value for the legend
     */
    async setLegend(optionValue) {
        const selector = LayoutSettings.SELECTORS.LEGEND_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setLegend", [optionValue]);
    }

    /**
     * Set the Series Name checkbox
     * @param {boolean} condition - The condition for the checkbox
     */
    async setSeries(condition) {
        const selector = LayoutSettings.SELECTORS.SERIES_CHECKBOX;
        await this.executeAction(Checkbox, selector, "set", "setSeries", [condition]);
    }

    /**
     * Set the Category Name checkbox
     * @param {boolean} condition - The condition for the checkbox
     */
    async setCategory(condition) {
        const selector = LayoutSettings.SELECTORS.CATEGORY_CHECKBOX;
        await this.executeAction(Checkbox, selector, "set", "setCategory", [condition]);
    }

    /**
     * Set the Value checkbox
     * @param {boolean} condition - The condition for the checkbox
     */
    async setValue(condition) {
        const selector = LayoutSettings.SELECTORS.VALUE_CHECKBOX;
        await this.executeAction(Checkbox, selector, "set", "setValue", [condition]);
    }

    /**
     * Select the layout tab
     */
    async #selectTab() {
        const selector = LayoutSettings.SELECTORS.TAB_BUTTON;
        await this.executeAction(Button, selector, "click", "selectTab");
    }
}

module.exports = LayoutSettings;
