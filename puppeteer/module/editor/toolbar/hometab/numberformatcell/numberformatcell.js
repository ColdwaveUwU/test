const HomeTab = require("../hometab");
const { NumberFormat } = require("../../../modalwindows");
const { Dropdown } = require("../../../../elements");
const selectors = require("./selectors.json");
class NumberFormatCell extends HomeTab {
    constructor(tester) {
        super(tester);
        this.NumberFormat = new NumberFormat(this.tester);
    }

    /**
     * @enum
     */
    static NumberFormatCellSelectors = selectors;

    /**
     * Select number format from list
     * @param {string} format
     * @return {Promise<void>}
     */
    async setFormat(format, moreFormatOptions) {
        const { FORMATS_LIST, FORMATS_ITEM, FORMATS_DESCRIPTION } = NumberFormatCell.NumberFormatCellSelectors;
        await new Dropdown(this.tester, {
            selector: FORMATS_LIST,
            elementsSelector: FORMATS_ITEM,
            descriptionSelector: FORMATS_DESCRIPTION,
        }).selectDropdownItem(format === "More formats" ? "More formats" : format);

        if (moreFormatOptions) {
            await this.NumberFormat.setSettings(moreFormatOptions);
        }
    }

    /**
     * Click on Accounting style button
     * @return {Promise<void>}
     */
    async clickAccountingStyle() {
        await this.tester.click(NumberFormatCell.NumberFormatCellSelectors.ACCOUNTING_STYLES_BUTTON);
    }

    /**
     * Select accounting style from list
     * @param {string} style
     * @return {Promise<void>}
     */
    async setAccountingStyle(style, moreFormatOptions) {
        const { ACCOUNTING_STYLES_OPENER, ACCOUNTING_STYLES_ITEM } = NumberFormatCell.NumberFormatCellSelectors;

        await new Dropdown(this.tester, {
            selector: ACCOUNTING_STYLES_OPENER,
            elementsSelector: ACCOUNTING_STYLES_ITEM,
        }).selectDropdownItem(style === "More formats" ? "More formats" : style);

        if (moreFormatOptions) {
            await this.NumberFormat.setSettings(moreFormatOptions);
        }
    }

    /**
     * Click on Percent style button
     * @return {Promise<void>}
     */
    async clickPercentStyle() {
        await this.tester.click(NumberFormatCell.NumberFormatCellSelectors.PERCENT_STYLE_BUTTON);
    }

    /**
     * Click on Comma style button
     * @return {Promise<void>}
     */
    async clickCommaStyle() {
        await this.tester.click(NumberFormatCell.NumberFormatCellSelectors.COMMA_STYLE_BUTTON);
    }

    /**
     * Click on Decrease decimal button
     * @param {number} clickCount
     * @return {Promise<void>}
     */
    async clickDecreaseDecimal(clickCount = 1) {
        for (let i = 0; i < clickCount; i++) {
            await this.tester.click(NumberFormatCell.NumberFormatCellSelectors.DECREASE_DECIMAL_BUTTON);
        }
    }

    /**
     * Click on Increase decimal button
     * @param {number} clickCount
     * @return {Promise<void>}
     */
    async clickIncreaseDecimal(clickCount = 1) {
        for (let i = 0; i < clickCount; i++) {
            await this.tester.click(NumberFormatCell.NumberFormatCellSelectors.INCREASE_DECIMAL_BUTTON);
        }
    }
}

module.exports = NumberFormatCell;
