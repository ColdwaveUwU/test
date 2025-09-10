const { OptionsButton } = require("../../elements");

function TextBoxActions(Base, selectors) {
    return class extends Base {
        /**
         * @enum
         */
        static TEXT_BOX_TYPES = ["Insert horizontal text box", "Insert vertical text box"];
    
        /**
         * Click the default Text Box button or select option from menu.
         * @param {"Insert horizontal text box" | "Insert vertical text box"} [optionValue]
         */
        async textBox(optionValue) {
            const textBoxSelectors = selectors.TEXT_BOX;
            const textBoxButton = new OptionsButton(
                this.tester,
                textBoxSelectors.ELEMENT_SELECTOR,
                textBoxSelectors.DEFAULT_BUTTON,
                {
                    elementsSelector: textBoxSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                    elementsValue: this.constructor.TEXT_BOX_TYPES,
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
            const coordinates = {
                startX: 0,
                startY: 0,
                endX: 100,
                endY: 100,
                ...coord,
            };
            const { startX, startY, endX, endY } = coordinates;
            await this.tester.mouseDrawingLine("#id_viewer", startX, startY, endX, endY);
        }
    };
}

module.exports = TextBoxActions;
