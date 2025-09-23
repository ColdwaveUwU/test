const LayoutTab = require("../layouttab");
const { Input } = require("../../../../elements");
const selectors = require("./selectors.json");

class IndentsLayout extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static INDENTS_LAYOUT_SELECTORS = selectors;

    /**
     * Set left indent
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} [leftIndentSettings]
     */
    async setLeftIndent(leftIndentSettings) {
        const leftIndentInputSelector = IndentsLayout.INDENTS_LAYOUT_SELECTORS.LEFT_INDENT_INPUT;
        const leftIndentInput = new Input(this.tester, leftIndentInputSelector);
        try {
            await leftIndentInput.setInputSettings(leftIndentSettings);
        } catch (error) {
            throw new Error(`setLeftIndent: Failed to set left indent". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set right indent
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} [rightIndentSettings]
     */
    async setRightIndent(rightIndentSettings) {
        const rightIndentInputSelector = IndentsLayout.INDENTS_LAYOUT_SELECTORS.RIGHT_INDENT_INPUT;
        const rightIndentInput = new Input(this.tester, rightIndentInputSelector);
        try {
            await rightIndentInput.setInputSettings(rightIndentSettings);
        } catch (error) {
            throw new Error(`setRightIndent: Failed to set right indent". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set space before
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} [spaceBeforeSettings]
     */
    async setSpaceBefore(spaceBeforeSettings) {
        const spaceBeforeInputSelector = IndentsLayout.INDENTS_LAYOUT_SELECTORS.SPACE_BEFORE_INPUT;
        const spaceBeforeInput = new Input(this.tester, spaceBeforeInputSelector);
        try {
            await spaceBeforeInput.setInputSettings(spaceBeforeSettings);
        } catch (error) {
            throw new Error(`setSpaceBefore: Failed to set space before". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set space after
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} [spaceAfterSettings]
     */
    async setSpaceAfter(spaceAfterSettings) {
        const spaceAfterInputSelector = IndentsLayout.INDENTS_LAYOUT_SELECTORS.SPACE_AFTER_INPUT;
        const spaceAfterInput = new Input(this.tester, spaceAfterInputSelector);
        try {
            await spaceAfterInput.setInputSettings(spaceAfterSettings);
        } catch (error) {
            throw new Error(`setSpaceAfter: Failed to set space after". \n${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = IndentsLayout;
