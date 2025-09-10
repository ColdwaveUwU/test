const CollaborationTab = require("../collaborationtab");
const { OptionsButton } = require("../../../../elements");
const selectors = require("./selectors.json");

class DisplayMode extends CollaborationTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static DISPLAY_MODE_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        DISPLAY_MODES: ["Markup and balloons", "Only markup", "Final", "Original"],
    };

    /**
     * Click the default display mode button or click the display mode button with options.
     * @param {"Markup and balloons" | "Only markup" | "Final" | "Original"} [optionValue]
     */
    async setMode(optionValue) {
        const displayModeSelectors = DisplayMode.DISPLAY_MODE_SELECTORS.DISPLAY_MODE;
        const displayModeButton = new OptionsButton(
            this.tester,
            displayModeSelectors.ELEMENT_SELECTOR,
            displayModeSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: displayModeSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: DisplayMode.TYPES.DISPLAY_MODES,
            }
        );
        try {
            await displayModeButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`setMode: Failed to set display mode ${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = DisplayMode;
