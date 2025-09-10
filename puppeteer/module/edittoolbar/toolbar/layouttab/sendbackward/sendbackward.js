const LayoutTab = require("../layouttab");
const { OptionsButton } = require("../../../../elements");
const selectors = require("./selectors.json");

class SendBackward extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SENDBACKWARD_SELECTORS = selectors;

    /**
     * @enum
     */
    static SENDBACKWARD_TYPES = ["Send to background", "Send backward"];

    /**
     * Click the default send backward button or select option from menu.
     * @param {"Send to background" | "Send backward"} [sendBackwardType]
     */
    async sendBackward(sendBackwardType) {
        const sendBackwardSelectors = SendBackward.SENDBACKWARD_SELECTORS.SENDBACKWARD;
        const sendBackwardButton = new OptionsButton(
            this.tester,
            sendBackwardSelectors.ELEMENT_SELECTOR,
            sendBackwardSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: sendBackwardSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: SendBackward.SENDBACKWARD_TYPES,
            }
        );
        try {
            await sendBackwardButton.setOption(sendBackwardType);
        } catch (error) {
            throw new Error(`bringForward: Failed to bring forward. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = SendBackward;
