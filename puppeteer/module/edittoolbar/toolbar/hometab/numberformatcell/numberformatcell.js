const HomeTab = require("../hometab");
const { NumberFormat } = require("../../../../common");
const selectors = require("./selectors.json");
class NumberFormatCell extends HomeTab {
    constructor(tester) {
        super(tester);
        this.NumberFormat = new NumberFormat(this.tester);
    }

    /**
     * @enum
     */
    static NumberFormatCellType = {
        FORMATS: {
            BASIC: [
                "General",
                "Number",
                "Scientific",
                "Accounting",
                "Currency",
                "Short Date",
                "Long Date",
                "Time",
                "Percentage",
                "Fraction",
                "Text",
            ],
            ADVANCED: ["More formats"],
        },
        ACCOUNTING_STYLES: {
            BASIC: ["$ Dollar", "€ Euro", "£ Pound", "₽ Rouble", "¥ Yen"],
            ADVANCED: ["More formats"],
        },
    };

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
        const { BASIC, ADVANCED } = NumberFormatCell.NumberFormatCellType.FORMATS;
        const { FORMATS_LIST, BASIC_FORMATS_DESCRIPTION } = NumberFormatCell.NumberFormatCellSelectors;

        if (![...BASIC, ...ADVANCED].includes(format)) {
            throw new Error(`Error in setFormat: Category ${format} unknown`);
        }

        const description = BASIC.includes(format) ? BASIC_FORMATS_DESCRIPTION : undefined;

        await this.tester.setOption(FORMATS_LIST, format, description);

        if (ADVANCED.includes(format)) {
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
        const { BASIC, ADVANCED } = NumberFormatCell.NumberFormatCellType.ACCOUNTING_STYLES;

        if (![...BASIC, ...ADVANCED].includes(style)) {
            throw new Error(`Error in setAccountingStyle: Category ${style} unknown`);
        }

        const isBasicStyle = BASIC.includes(style);
        const isAdvancedStyle = ADVANCED.includes(style);

        await this.tester.selectDropdown(NumberFormatCell.NumberFormatCellSelectors.ACCOUNTING_STYLES_OPENER);
        const styles = await this.tester.parseItems(
            `${NumberFormatCell.NumberFormatCellSelectors.ACCOUNTING_STYLES_LIST} ul li`,
            "a",
            "a"
        );

        const targetStyle = styles.find((item) => item.description === style);

        if (isBasicStyle && targetStyle) {
            await this.tester.click(
                `${NumberFormatCell.NumberFormatCellSelectors.ACCOUNTING_STYLES_LIST} ul li:nth-child(${targetStyle.index})`
            );
        } else if (isAdvancedStyle) {
            await this.tester.click(
                `${NumberFormatCell.NumberFormatCellSelectors.ACCOUNTING_STYLES_LIST} ul li:nth-child(${targetStyle.index})`
            );
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
