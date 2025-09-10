const ViewTab = require("../viewtab");
const selectors = require("./selectors.json");
const { MoreButtons } = require("../../../../common");

class UIVisibility extends ViewTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * Private method for setting the visibility of a UI element
     * @param {string} selectorKey
     * @param {boolean} condition
     */
    async #setVisibility(selectorKey, condition) {
        const moreButtons = new MoreButtons(this.tester);
        await moreButtons.open();

        const selector = UIVisibility.SELECTORS[selectorKey];
        await this.tester.clickCheckbox({ selector, condition });
    }

    /**
     * Set the visibility of the toolbar
     * @param {boolean} condition
     */
    async setToolbarVisibility(condition) {
        await this.#setVisibility("TOOLBAR", condition);
    }

    /**
     * Set the visibility of the statusbar
     * @param {boolean} condition
     */
    async setStatusbarVisibility(condition) {
        await this.#setVisibility("STATUSBAR", condition);
    }

    /**
     * Set the visibility of the left panel
     * @param {boolean} condition
     */
    async setLeftPanelVisibility(condition) {
        await this.#setVisibility("LEFTPANEL", condition);
    }

    /**
     * Set the visibility of the right panel
     * @param {boolean} condition
     */
    async setRightPanelVisibility(condition) {
        await this.#setVisibility("RIGHTPANEL", condition);
    }

    /**
     * Set the visibility of the rulers (only for CDE)
     * @param {boolean} condition
     */
    async setRulersVisibility(condition) {
        await this.#setVisibility("RULERS", condition);
    }

    /**
     * Set the visibility of the formula bar only for CSE
     * @param {boolean} condition
     */
    async setFormulaBarVisibility(condition) {
        await this.#setVisibility("FORMULABAR", condition);
    }

    /**
     * Set the visibility of the heading (only for CSE)
     * @param {boolean} condition
     */
    async setHeadingVisibility(condition) {
        await this.#setVisibility("HEADING", condition);
    }

    /**
     * Set the visibility of the gridlines (only for CSE)
     * @param {boolean} condition
     */
    async setGridlinesVisibility(condition) {
        await this.#setVisibility("GRIDLINES", condition);
    }

    /**
     * Set the visibility of the zeros (only for CSE)
     * @param {boolean} condition
     */
    async setZerosVisibility(condition) {
        await this.#setVisibility("ZEROS", condition);
    }

    /**
     * Set the visibility of the notes (only for CPE)
     * @param {boolean} condition
     */
    async setNotesVisibility(condition) {
        await this.#setVisibility("NOTES", condition);
    }
}

module.exports = UIVisibility;
