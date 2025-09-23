const RightMenu = require("../../rightmenu");
const BaseSettings = require("../basesettings");
const { Dropdown, Input } = require("../../../../elements");
const { Color } = require("../../../../common");
const selectors = require("./selectors.json");
const ParagraphAdvanced = require("./paragraphadvanced");

class ParagraphSettings extends BaseSettings {
    constructor(tester) {
        super(tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.PARAGHRAPH_TAB);
        this.rightMenu = new RightMenu(this.tester);
        this.ParagraphAdvanced = new ParagraphAdvanced(tester);
    }

    /**
     * @enum
     */
    static PARAGRAPH_TAB_SELECTORS = selectors;

    async openParagraphSettings() {
        await this.rightMenu.openSettings(this);
    }

    /**
     * Select line spacing option from dropdown menu
     * @param {"At least" | "Multiple" | "Exactly"} [optionValue]
     */
    async selectLineSpacing(optionValue) {
        await this.openParagraphSettings();
        const lineSpacingMenuSelectors = ParagraphSettings.PARAGRAPH_TAB_SELECTORS.LINE_SPACING_MENU;
        const lineSpacingDropdown = new Dropdown(this.tester, {
            selector: lineSpacingMenuSelectors.MENU_SELECTOR,
            elementsValue: ["At least", "Multiple", "Exactly"],
            elementsSelector: lineSpacingMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
        });

        await lineSpacingDropdown.selectDropdownItem(optionValue);
    }

    /**
     * Set value to line spacing input
     * @param {string} value
     */
    async setLineSpacing(value) {
        await this.openParagraphSettings();
        const lineSpacingInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.LINE_SPACING_INPUT);

        await lineSpacingInput.set(value);
    }

    /**
     * Increase value in line spacing input
     */
    async increaseLineSpacing() {
        await this.openParagraphSettings();
        const lineSpacingInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.LINE_SPACING_INPUT);

        await lineSpacingInput.increase();
    }

    /**
     * Decrease value in line spacing input
     */
    async decreaseLineSpacing() {
        await this.openParagraphSettings();
        const lineSpacingInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.LINE_SPACING_INPUT);

        await lineSpacingInput.decrease();
    }

    /**
     * Set value to spacing before input
     * @param {string} value
     */
    async setSpacingBefore(value) {
        await this.openParagraphSettings();
        const spacingBeforeInput = new Input(
            this.tester,
            ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPACING_BEFORE_INPUT
        );

        await spacingBeforeInput.set(value);
    }

    /**
     * Increase value in spacing before input
     */
    async increaseSpacingBefore() {
        await this.openParagraphSettings();
        const spacingBeforeInput = new Input(
            this.tester,
            ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPACING_BEFORE_INPUT
        );

        await spacingBeforeInput.increase();
    }

    /**
     * Decrease value in spacing before input
     */
    async decreaseSpacingBefore() {
        await this.openParagraphSettings();
        const spacingBeforeInput = new Input(
            this.tester,
            ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPACING_BEFORE_INPUT
        );

        await spacingBeforeInput.decrease();
    }

    /**
     * Set value to spacing after input
     * @param {string} value
     */
    async setSpacingAfter(value) {
        await this.openParagraphSettings();
        const spacingAfterInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPACING_AFTER_INPUT);

        await spacingAfterInput.set(value);
    }

    /**
     * Increase value in spacing after input
     */
    async increaseSpacingAfter() {
        await this.openParagraphSettings();
        const spacingAfterInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPACING_AFTER_INPUT);

        await spacingAfterInput.increase();
    }

    /**
     * Decrease value in spacing after input
     */
    async decreaseSpacingAfter() {
        await this.openParagraphSettings();
        const spacingAfterInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPACING_AFTER_INPUT);

        await spacingAfterInput.decrease();
    }

    /**
     * Click "Don't add interval" checkbox
     */
    async clickDontAddInterval() {
        await this.openParagraphSettings();
        await this.tester.click(ParagraphSettings.PARAGRAPH_TAB_SELECTORS.ADD_INTERVAL_CHECKBOX);
    }

    /**
     * Set value to left indent input
     * @param {string} value
     */
    async setLeftIndent(value) {
        await this.openParagraphSettings();
        const leftIndentInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.LEFT_INDENT_INPUT);

        await leftIndentInput.set(value);
    }

    /**
     * Increase value in left indent input
     */
    async increaseLeftIndent() {
        await this.openParagraphSettings();
        const leftIndentInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.LEFT_INDENT_INPUT);

        await leftIndentInput.increase();
    }

    /**
     * Decrease value in left indent input
     */
    async decreaseLeftIndent() {
        await this.openParagraphSettings();
        const leftIndentInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.LEFT_INDENT_INPUT);

        await leftIndentInput.decrease();
    }

    /**
     * Set value to right indent input
     * @param {string} value
     */
    async setRightIndent(value) {
        await this.openParagraphSettings();
        const rightIndentInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.RIGHT_INDENT_INPUT);

        await rightIndentInput.set(value);
    }

    /**
     * Increase value in right indent input
     */
    async increaseRightIndent() {
        await this.openParagraphSettings();
        const rightIndentInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.RIGHT_INDENT_INPUT);

        await rightIndentInput.increase();
    }

    /**
     * Decrease value in right indent input
     */
    async decreaseRightIndent() {
        await this.openParagraphSettings();
        const rightIndentInput = new Input(this.tester, ParagraphSettings.PARAGRAPH_TAB_SELECTORS.RIGHT_INDENT_INPUT);

        await rightIndentInput.decrease();
    }

    /**
     * Select special indent option from dropdown menu
     * @param {"(none)" | "First line" | "Hanging"} [optionValue]
     */
    async selectSpecialIndent(optionValue) {
        await this.openParagraphSettings();
        const specialIndentMenuSelectors = ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPECIAL_INDENT_MENU;
        const specialIndentDropdown = new Dropdown(this.tester, {
            selector: specialIndentMenuSelectors.MENU_SELECTOR,
            elementsValue: ["(none)", "First line", "Hanging"],
            elementsSelector: specialIndentMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
        });

        await specialIndentDropdown.selectDropdownItem(optionValue);
    }

    /**
     * Set value to special indent input
     * @param {string} value
     */
    async setSpecialIndent(value) {
        await this.openParagraphSettings();
        const specialIndentInput = new Input(
            this.tester,
            ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPECIAL_INDENT_INPUT
        );

        await specialIndentInput.set(value);
    }

    /**
     * Increase value in special indent input
     */
    async increaseSpecialIndent() {
        await this.openParagraphSettings();
        const specialIndentInput = new Input(
            this.tester,
            ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPECIAL_INDENT_INPUT
        );

        await specialIndentInput.increase();
    }

    /**
     * Decrease value in special indent input
     */
    async decreaseSpecialIndent() {
        await this.openParagraphSettings();
        const specialIndentInput = new Input(
            this.tester,
            ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SPECIAL_INDENT_INPUT
        );

        await specialIndentInput.decrease();
    }

    /**
     * Select background color
     * @param {Color} color
     */
    async clickBackgroundColor(color) {
        await this.openParagraphSettings();
        const colorLib = new Color(this.tester);
        const dropdownSelector = ParagraphSettings.PARAGRAPH_TAB_SELECTORS.BACKGROUND_COLOR_BUTTON;
        await this.tester.selectDropdown(dropdownSelector);
        await colorLib.selectColor(dropdownSelector, color);
    }

    /**
     * Open advanced settings window
     */
    async showAdvancedSettings() {
        await this.openParagraphSettings();
        await this.tester.click(ParagraphSettings.PARAGRAPH_TAB_SELECTORS.SHOW_ADVANCED_SETTINGS);
    }

    /**
     * Apply settings on chosen tab in advanced settings window
     * @param {string} tabName
     * @param {Object} settings
     */
    async applySettings(tabName, settings) {
        await this.showAdvancedSettings();
        return await this.ParagraphAdvanced.setSetting(tabName, settings);
    }

    /**
     * Click OK button in advanced settings window
     */
    async clickOkButton() {
        await this.tester.click(ParagraphSettings.PARAGRAPH_TAB_SELECTORS.OK_BUTTON);
    }
}

module.exports = ParagraphSettings;
