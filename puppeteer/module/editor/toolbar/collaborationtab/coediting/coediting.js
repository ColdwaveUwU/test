const CollaborationTab = require("../collaborationtab");
const selectors = require("./selectors.json");
const { OptionsButton } = require("../../../../elements");

class CoEditing extends CollaborationTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static CO_EDITING_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        MODES: ["Fast", "Strict"],
    };

    /**
     * Set the co-editing mode
     * @param {"Fast" | "Strict"} [optionValue]
     */
    async setMode(optionValue) {
        try {
            const coEditingSelectors = CoEditing.CO_EDITING_SELECTORS;
            const coEditingButton = new OptionsButton(
                this.tester,
                coEditingSelectors.ELEMENT_SELECTOR,
                coEditingSelectors.DEFAULT_BUTTON,
                {
                    elementsSelector: coEditingSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                    elementsValue: CoEditing.TYPES.MODES,
                }
            );

            await coEditingButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`setMode: Failed to set mode "${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = CoEditing;
