const BaseSettings = require("../../../basesettings");
const { Dropdown, Input, Checkbox } = require("../../../../../elements");
const selectors = require("./selectors.json");

class IndentsSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static INDENTS_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        OUTLINE_LEVEL: [
            "Basic text",
            "Level 1",
            "Level 2",
            "Level 3",
            "Level 4",
            "Level 5",
            "Level 6",
            "Level 7",
            "Level 8",
            "Level 9",
        ],
    };

    /**
     * Sets alignment
     * @param {"Left" | "Center" | "Right" | "Justified"} type - The type of alignment
     */
    async setAlignment(type) {
        const alignmentMenuSelectors = IndentsSettings.INDENTS_SELECTORS.ALIGNMENT_MENU;
        const alignmentDropdown = new Dropdown(this.tester, {
            selector: alignmentMenuSelectors.MENU_SELECTOR,
            elementsValue: ["Left", "Center", "Right", "Justified"],
            elementsSelector: alignmentMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
        });

        await alignmentDropdown.selectDropdownItem(type);
    }

    /**
     * Sets the outline level
     * @param {
     *   "Basic text" |
     *   "Level 1" |
     *   "Level 2" |
     *   "Level 3" |
     *   "Level 4" |
     *   "Level 5" |
     *   "Level 6" |
     *   "Level 7" |
     *   "Level 8" |
     *   "Level 9"
     * } type - The outline level to set
     */
    async setOutlineLevel(type) {
        const outlineLevelMenuSelectors = IndentsSettings.INDENTS_SELECTORS.OUTLINE_LEVEL_MENU;
        const outlineLevelDropdown = new Dropdown(this.tester, {
            selector: outlineLevelMenuSelectors.MENU_SELECTOR,
            elementsValue: IndentsSettings.TYPES.OUTLINE_LEVEL,
            elementsSelector: outlineLevelMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
        });

        await outlineLevelDropdown.selectDropdownItem(type);
    }

    /**
     * Sets left indent
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} leftIndentSettings
     */
    async setLeftIndent(leftIndentSettings) {
        const leftIndentInput = new Input(this.tester, IndentsSettings.INDENTS_SELECTORS.LEFT_INDENT_INPUT);
        await leftIndentInput.setInputSettings(leftIndentSettings);
    }

    /**
     * Sets right indent
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} rightIndentSettings
     */
    async setRightIndent(rightIndentSettings) {
        const rightIndentInput = new Input(this.tester, IndentsSettings.INDENTS_SELECTORS.RIGHT_INDENT_INPUT);
        await rightIndentInput.setInputSettings(rightIndentSettings);
    }

    /**
     * Sets special indent
     * @param {{ type: "(none)" | "First line" | "Hanging",
     * inputSettings: { upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }}} specialIndentSettings
     */
    async setSpecialIndent(specialIndentSettings) {
        const { type, inputSettings } = specialIndentSettings;

        if (type) {
            const specialIndentMenuSelectors = IndentsSettings.INDENTS_SELECTORS.SPECIAL_INDENT_MENU;
            const specialIndentDropdown = new Dropdown(this.tester, {
                selector: specialIndentMenuSelectors.MENU_SELECTOR,
                elementsValue: ["(none)", "First line", "Hanging"],
                elementsSelector: specialIndentMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });

            await specialIndentDropdown.selectDropdownItem(type);
        }
        if (inputSettings) {
            const specialIndentInput = new Input(this.tester, IndentsSettings.INDENTS_SELECTORS.SPECIAL_INDENT_INPUT);
            await specialIndentInput.setInputSettings(inputSettings);
        }
    }

    /**
     * Sets before spacing
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} beforeSpacingSettings
     */
    async setBeforeSpacing(beforeSpacingSettings) {
        const beforeSpacingInput = new Input(this.tester, IndentsSettings.INDENTS_SELECTORS.BEFORE_SPACING_INPUT);
        await beforeSpacingInput.setInputSettings(beforeSpacingSettings);
    }

    /**
     * Sets after spacing
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} afterSpacingSettings
     */
    async setAfterSpacing(afterSpacingSettings) {
        const afterSpacingInput = new Input(this.tester, IndentsSettings.INDENTS_SELECTORS.AFTER_SPACING_INPUT);
        await afterSpacingInput.setInputSettings(afterSpacingSettings);
    }

    /**
     * Sets line spacing
     * @param {{ type: "At least" | "Multiple" | "Exactly",
     * inputSettings: { upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }}} lineSpacingSettings
     */
    async setLineSpacing(lineSpacingSettings) {
        const { type, inputSettings } = lineSpacingSettings;

        if (type) {
            const lineSpacingMenuSelectors = IndentsSettings.INDENTS_SELECTORS.LINE_SPACING_MENU;
            const lineSpacingDropdown = new Dropdown(this.tester, {
                selector: lineSpacingMenuSelectors.MENU_SELECTOR,
                elementsValue: ["At least", "Multiple", "Exactly"],
                elementsSelector: lineSpacingMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });

            await lineSpacingDropdown.selectDropdownItem(type);
        }
        if (inputSettings) {
            const lineSpacingInput = new Input(this.tester, IndentsSettings.INDENTS_SELECTORS.LINE_SPACING_INPUT);
            await lineSpacingInput.setInputSettings(inputSettings);
        }
    }

    /**
     * Sets "Don't add interval" checkbox
     * @param {boolean} [condition]
     */
    async setDontAddInterval(condition) {
        const addIntervalCheckboxSelector = IndentsSettings.INDENTS_SELECTORS.ADD_INTERVAL_CHECKBOX;
        const checkbox = new Checkbox(this.tester, addIntervalCheckboxSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets text direction
     * @param {"Left-to-right" | "Right-to-left"} type - The type of direction
     */
    async setTextDirection(type) {
        const textDirectionSelectors = IndentsSettings.INDENTS_SELECTORS.TEXT_DIRECTION;
        if (type === "Left-to-right") {
            await this.tester.click(textDirectionSelectors.LEFT_TO_RIGHT);
        }
        if (type === "Right-to-left") {
            await this.tester.click(textDirectionSelectors.RIGHT_TO_LEFT);
        }
    }

    async applySettings(indentsSettings) {
        const settingsMap = {
            alignment: this.setAlignment.bind(this),
            outlineLevel: this.setOutlineLevel.bind(this),
            leftIndent: this.setLeftIndent.bind(this),
            rightIndent: this.setRightIndent.bind(this),
            specialIndent: this.setSpecialIndent.bind(this),
            beforeSpacing: this.setBeforeSpacing.bind(this),
            afterSpacing: this.setAfterSpacing.bind(this),
            lineSpacing: this.setLineSpacing.bind(this),
            dontAddInterval: this.setDontAddInterval.bind(this),
            textDirection: this.setTextDirection.bind(this),
        };

        for (const [key, method] of Object.entries(settingsMap)) {
            if (indentsSettings[key]) {
                await method(indentsSettings[key]);
            }
        }
    }
}

module.exports = IndentsSettings;
