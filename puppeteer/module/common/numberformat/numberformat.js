const selectors = require("./selectors.json");
const { Dropdown, Input, ModalButton } = require("../../elements");
class NumberFormat {
    constructor(tester) {
        this.tester = tester;
        this.modalButton = new ModalButton(this.tester,
            NumberFormat.NumberFormatSelectors.MODAL_WINDOW,
            NumberFormat.NumberFormatSelectors.MODAL_WINDOW,
            NumberFormat.NumberFormatSelectors.OK_BUTTON
        );
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
        const { CATEGORY, CATEGORY_ITEM } = NumberFormat.NumberFormatSelectors;
        if (!NumberFormat.NumberFormatType.CATEGORIES.includes(type)) {
            console.error(`Category ${type} unknown`);
            return;
        } 
        
        await new Dropdown(this.tester, {
            selector: CATEGORY,
            elementsValue: NumberFormat.NumberFormatType.CATEGORIES,
            elementsSelector: CATEGORY_ITEM,
        }).selectDropdownItem(type);

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
        if (symbols) {
            const { SELECTOR, ITEM, DESCRIPTION } = NumberFormat.NumberFormatSelectors.SYMBOLS;
            await new Dropdown(this.tester, {
                selector: SELECTOR,
                elementsSelector: ITEM,
                descriptionSelector: DESCRIPTION
            }).selectDropdownItem(symbols);
        }
        await this.#handleFormatIndex({ formatIndex });
        await this.#handleDecimal({ decimal });
    }

    /**
     * Handles custom format settings
     * @param {Category} category
     */
    async #handleCustom({ format }) {
        const { FORMAT_INPUT } = NumberFormat.NumberFormatSelectors.CUSTOM;
        if (format) {           
            await new Input(this.tester, FORMAT_INPUT).set(format);
        }
    }

    /**
     * Handles setting decimal values
     * @param {string | number} decimal
     */
    async #handleDecimal({ decimal }) {
        const { DECIMAL } = NumberFormat.NumberFormatSelectors.NUMBER;
        if (decimal) {
            await new Input(this.tester, DECIMAL).set(decimal);
        }
    }

    /**
     * Handles selecting a format index
     * @param {Object} options
     */
    async #handleFormatIndex({ formatIndex }) {
        try {
            if (formatIndex !== undefined) {
                const { SELECTOR, ITEM, DESCRIPTION } = NumberFormat.NumberFormatSelectors.FORMAT;
                const dropdown = new Dropdown(this.tester, {
                    selector: SELECTOR,
                    elementsSelector: ITEM,
                    descriptionSelector: DESCRIPTION,
                });
                await dropdown.selectDropdownItemByIndex(formatIndex);
            }
        }
        catch(error){
            throw new Error(`handleFormatIndex: Invalid index:  ${formatIndex}. ${error.message}`, { cause: error });
        }
    }

    /**
     * Handles setting format option
     * @param {Object} options
     */
    async #handleFormatOption({ format }) {
        const { FORMAT_TYPE } = NumberFormat.NumberFormatSelectors;
        if (format) {
          await this.tester.selectByText(format,FORMAT_TYPE);
        }
    }

    /**
     * Clicks OK button to apply the changes
     */
    async #clickOkButton() {
        if (await this.modalButton.isModalOpen()){
            await this.modalButton.closeModal();
        }
    }
}

module.exports = NumberFormat;
