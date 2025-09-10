const selectors = require("./selectors.json");
class NumberFormat {
    constructor(tester) {
        this.tester = tester;
    }

    /**
     * @enum
     */
    static NumberFormatSelectors = selectors;

    /**
     * @enum
     */
    static NumberFormatType = {
        CATEGORIES: [
            "General",
            "Number",
            "Scientific",
            "Accounting",
            "Currency",
            "Date",
            "Time",
            "Percentage",
            "Fraction",
            "Text",
            "Custom",
        ],
    };

    /**
     *
     * @param {NumberFormatObject} format
     * @param {string} [triggerSelector]
     * @returns
     */
    async setSettings(format, triggerSelector = "") {
        if (!format) return;
        const { category, linked } = format;
        if (!(await this.tester.checkSelector(NumberFormat.NumberFormatSelectors.ACTIVE_PANEL_SELECTOR))) {
            await this.tester.click(triggerSelector);
        }

        if (category) {
            await this.#handleCategory(category);
        }

        if (linked !== undefined) {
            await this.tester.clickCheckbox({
                selector: NumberFormat.NumberFormatSelectors.LINKED_TO_SOURCE,
                condition: linked,
            });
        }

        await this.#clickOkButton();
    }

    /**
     * Handles category settings
     * @param {Category} category
     */
    async #handleCategory(category) {
        const { type } = category;

        if (!NumberFormat.NumberFormatType.CATEGORIES.includes(type)) {
            console.error(`Category ${type} unknown`);
            return;
        }

        await this.tester.setOption(NumberFormat.NumberFormatSelectors.CATEGORY, type);
        await this.#changeCategorySettings(category);
    }

    /**
     * Changes the label category settings in Vertical Axis
     * @param {Category} category
     */
    async #changeCategorySettings(category) {
        const handlers = {
            Number: this.#handleNumber.bind(this),
            Accounting: this.#handleAccounting.bind(this),
            Custom: this.#handleCustom.bind(this),
            Currency: this.#handleAccounting.bind(this),
            Scientific: this.#handleDecimal.bind(this),
            Percentage: this.#handleDecimal.bind(this),
            Date: this.#handleFormatOption.bind(this),
            Time: this.#handleFormatOption.bind(this),
            Fraction: this.#handleFormatOption.bind(this),
        };

        const handler = handlers[category.type];
        if (handler) await handler(category);
    }

    /**
     * Handles number-specific settings
     * @param {Category} category
     */
    async #handleNumber(numberCategory) {
        const { decimal, separator, formatIndex } = numberCategory;
        await this.#handleDecimal(decimal);
        if (separator !== undefined) {
            await this.tester.clickCheckbox({
                selector: NumberFormat.NumberFormatSelectors.NUMBER.SEPARATOR,
                condition: separator,
            });
        }
        await this.#handleFormatIndex(formatIndex);
    }

    /**
     * Handles accounting-specific settings
     * @param {Category} category
     */
    async #handleAccounting({ decimal, symbols, formatIndex }) {
        await this.#handleDecimal({ decimal });
        if (symbols) {
            await this.tester.setOption(NumberFormat.NumberFormatSelectors.SYMBOLS, symbols);
        }
        await this.#handleFormatIndex({ formatIndex });
    }

    /**
     * Handles custom format settings
     * @param {Category} category
     */
    async #handleCustom({ format }) {
        await this.tester.inputToForm(format, NumberFormat.NumberFormatSelectors.CUSTOM.FORMAT_INPUT);
    }

    /**
     * Handles setting decimal values
     * @param {string | number} decimal
     */
    async #handleDecimal(decimal) {
        if (decimal) {
            await this.tester.inputToForm(decimal, NumberFormat.NumberFormatSelectors.NUMBER.DECIMAL);
        }
    }

    /**
     * Handles selecting a format index
     * @param {Object} options
     */
    async #handleFormatIndex({ formatIndex }) {
        if (formatIndex !== undefined) {
            await this.tester.click(NumberFormat.NumberFormatSelectors.FORMAT);
            const formats = await this.tester.parseItems(
                `${NumberFormat.NumberFormatSelectors.FORMAT} ul li`,
                "a",
                "a"
            );
            await this.tester.click(formats[formatIndex].id);
        }
    }

    /**
     * Handles setting format option
     * @param {Object} options
     */
    async #handleFormatOption({ format }) {
        if (format) {
            await this.tester.setOption(NumberFormat.NumberFormatSelectors.FORMAT_TYPE, format);
        }
    }

    /**
     * Clicks OK button to apply the changes
     */
    async #clickOkButton() {
        const targetWindowId = await this.tester.frame.evaluate((modalWindowSelector) => {
            const modals = document.querySelectorAll(modalWindowSelector);
            const lastModal = modals[modals.length - 1];
            return `#${lastModal?.id}`;
        }, NumberFormat.NumberFormatSelectors.MODAL_WINDOW);
        await this.tester.click(`${targetWindowId} ${NumberFormat.NumberFormatSelectors.OK_BUTTON}`);
    }
}

module.exports = NumberFormat;
