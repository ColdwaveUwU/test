const InsertTab = require("../inserttab");
const Shape = require("../shape/shape");
const { OptionsButton } = require("../../../../elements");
const selectors = require("./selectors.json");

class TextBox extends InsertTab {
    constructor(tester) {
        super(tester);
        this.shape = new Shape(tester);
    }

    /**
     * @enum
     */
    static TEXT_BOX_SELECTORS = selectors;

    /**
     * @enum
     */
    static TEXT_BOX_TYPES = ["Insert horizontal text box", "Insert vertical text box"];

    /**
     * Click the default Text Box button or select option from menu.
     * @param {"Insert horizontal text box" | "Insert vertical text box"} [optionValue]
     */
    async textBox(optionValue) {
        const textBoxSelectors = TextBox.TEXT_BOX_SELECTORS;
        const textBoxButton = new OptionsButton(
            this.tester,
            textBoxSelectors.TEXT_BOX.ELEMENT_SELECTOR,
            textBoxSelectors.TEXT_BOX.DEFAULT_BUTTON,
            {
                elementsSelector: textBoxSelectors.TEXT_BOX.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: TextBox.TEXT_BOX_TYPES,
            }
        );
        try {
            await textBoxButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`textBox: Failed to select text box option "${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Draws a text box on the page by coordinates,
     * if coordinates are not specified,
     * the standard size of the text box will be displayed
     * @param {Coordinates} [coord]
     */
    async drawTextBox(coord = {}) {
        await this.shape.drawShape(coord);
    }
}

module.exports = TextBox;
