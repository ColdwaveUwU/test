const LayoutTab = require("../layouttab");
const { OptionsButton } = require("../../../../elements");
const selectors = require("./selectors.json");

class BringForward extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static BRINGFORWARD_SELECTORS = selectors;

    /**
     * @enum
     */
    static BRINGFORWARD_TYPES = ["Bring to foreground", "Bring forward"];

    /**
     * Click the default bring forward button or select option from menu.
     * @param {"Bring to foreground" | "Bring forward"} [bringForwardType]
     */
    async bringForward(bringForwardType) {
        const bringForwardSelectors = BringForward.BRINGFORWARD_SELECTORS.BRINGFORWARD;
        const bringForwardButton = new OptionsButton(
            this.tester,
            bringForwardSelectors.ELEMENT_SELECTOR,
            bringForwardSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: bringForwardSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: BringForward.BRINGFORWARD_TYPES,
            }
        );
        try {
            await bringForwardButton.setOption(bringForwardType);
        } catch (error) {
            throw new Error(`bringForward: Failed to bring forward. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = BringForward;
