const InsertTab = require("../inserttab");
const { OptionsButton } = require("../../../../elements");
const selectors = require("./selectors.json");

class BlankPagePdf extends InsertTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static BLANK_PAGE_SELECTORS = selectors;

    /**
     * @enum
     */
    static BLANK_PAGE_TYPES = ["Insert blank page before", "Insert blank page after"];

    /**
     * Click the default Blank page button or select option from menu.
     * @param {"Insert blank page before" | "Insert blank page after"} [optionValue]
     */
    async blankPage(optionValue) {
        const blankPageSelectors = BlankPagePdf.BLANK_PAGE_SELECTORS;
        const blankPageButton = new OptionsButton(
            this.tester,
            blankPageSelectors.BLANK_PAGE.ELEMENT_SELECTOR,
            blankPageSelectors.BLANK_PAGE.DEFAULT_BUTTON,
            {
                elementsSelector: blankPageSelectors.BLANK_PAGE.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: BlankPagePdf.BLANK_PAGE_TYPES,
            }
        );
        try {
            await blankPageButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`blankPage: Failed to select blank page option "${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = BlankPagePdf;
