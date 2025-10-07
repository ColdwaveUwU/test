const ToolMenu = require("../toolmenu");
const selectors = require("./selectors.json");
const { createExecuteAction, createErrorHandler } = require("../../../../engine/script/js");
const { Dropdown, Button } = require("../../../elements");

/**
 * @typedef {Object} HeadingOptions
 *  @property  {
 * "Expand all"
 * | "Collapse all"
 * | "Expand to level"
 * | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
 * | "Font size"
 * | "Small"
 * | "Medium"
 * | "Large"
 * | "Wrap long headings"
 * } optionValue - The option to set.
 */

class ToolMenuHeadings extends ToolMenu {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(ToolMenuHeadings.SELECTORS.HEADINGS_MENU, tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Sets the heading options based on provided settings.
     * @param {HeadingOptions} optionValue - The option to set.
     */
    async setHeadingsSettings(optionValue) {
        const selector = ToolMenuHeadings.SELECTORS.HEADINGS_SETTINGS_DROPDOWN;
        await this.openMenu();
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setHeadingsSettings", [optionValue]);
    }

    /**
     * Set Expand all
     */
    async setExpand() {
        await this.setHeadingsSettings("Expand all");
    }

    /**
     * Click Collapse all
     */
    async setCollapse() {
        await this.setHeadingsSettings("Collapse all");
    }

    /**
     * Sets Expand to level
     * @param {"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"} lvl
     */
    async setExpandLvl(lvl) {
        await this.setHeadingsSettings("Expand to level");
        await this.setHeadingsSettings(lvl);
    }

    /**
     * Sets Font size
     * @param {"Small" | "Medium" | "Large"} size
     */
    async setFontSize(size) {
        await this.setHeadingsSettings("Font size");
        await this.setHeadingsSettings(size);
    }

    /**
     * Click Wrap long headings
     */
    async setWrap() {
        await this.setHeadingsSettings("Wrap long headings");
    }
}

module.exports = ToolMenuHeadings;
