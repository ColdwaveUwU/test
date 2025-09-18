const BaseSettings = require("../../../basesettings");
const { Dropdown, Input, Checkbox } = require("../../../../../elements");
const selectors = require("./selectors.json");

class FontSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static FONT_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        LIGATURES_TYPES: [
            "None",
            "Standard only",
            "Contextual",
            "Historical",
            "Discretionary",
            "Standard and contextual",
            "Standard and historical",
            "Contextual and historical",
            "Standard and discretionary",
            "Contextual and discretionary",
            "Historical and discretionary",
            "Standard, contextual and historical",
            "Standard, contextual and discretionary",
            "Standard, historical and discretionary",
            "Contextual, historical and discretionary",
            "All",
        ],
    };

    /**
     * Sets "Strikethrough" checkbox
     * @param {boolean} [condition]
     */
    async setStrikethrough(condition) {
        const strikethroughSelector = FontSettings.FONT_SELECTORS.STRIKETHROUGH_CHECKBOX;
        const checkbox = new Checkbox(this.tester, strikethroughSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets "Double strikethrough" checkbox
     * @param {boolean} [condition]
     */
    async setDoubleStrikethrough(condition) {
        const doubleStrikethroughSelector = FontSettings.FONT_SELECTORS.DOUBLE_STRIKETHROUGH_CHECKBOX;
        const checkbox = new Checkbox(this.tester, doubleStrikethroughSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets "Superscript" checkbox
     * @param {boolean} [condition]
     */
    async setSuperscript(condition) {
        const superscriptSelector = FontSettings.FONT_SELECTORS.SUPERSCRIPT_CHECKBOX;
        const checkbox = new Checkbox(this.tester, superscriptSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets "Subscript" checkbox
     * @param {boolean} [condition]
     */
    async setSubscript(condition) {
        const subscriptSelector = FontSettings.FONT_SELECTORS.SUBSCRIPT_CHECKBOX;
        const checkbox = new Checkbox(this.tester, subscriptSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets "Small caps" checkbox
     * @param {boolean} [condition]
     */
    async setSmallCaps(condition) {
        const smallCapsSelector = FontSettings.FONT_SELECTORS.SMALL_CAPS_CHECKBOX;
        const checkbox = new Checkbox(this.tester, smallCapsSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets "All caps" checkbox
     * @param {boolean} [condition]
     */
    async setAllCaps(condition) {
        const allCapsSelector = FontSettings.FONT_SELECTORS.ALL_CAPS_CHECKBOX;
        const checkbox = new Checkbox(this.tester, allCapsSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets character spacing
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} spacingSettings
     */
    async setSpacing(spacingSettings) {
        const spacingInput = new Input(this.tester, FontSettings.FONT_SELECTORS.SPACING_INPUT);
        await spacingInput.setInputSettings(spacingSettings);
    }

    /**
     * Sets character position
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} positionSettings
     */
    async setPosition(positionSettings) {
        const positionInput = new Input(this.tester, FontSettings.FONT_SELECTORS.POSITION_INPUT);
        await positionInput.setInputSettings(positionSettings);
    }

    /**
     * Sets ligatures
     * @param {
     * "None" |
     * "Standard only" |
     * "Contextual" |
     * "Historical" |
     * "Discretionary" |
     * "Standard and contextual" |
     * "Standard and historical" |
     * "Contextual and historical" |
     * "Standard and discretionary"|
     * "Contextual and discretionary" |
     * "Historical and discretionary" |
     * "Standard, contextual and historical" |
     * "Standard, contextual and discretionary" |
     * "Standard, historical and discretionary" |
     * "Contextual, historical and discretionary" |
     * "All"
     * } type - The type of ligatures to set
     */
    async setLigatures(type) {
        const ligaturesMenuSelectors = FontSettings.FONT_SELECTORS.LIGATURES_MENU;
        const ligaturesDropdown = new Dropdown(this.tester, {
            selector: ligaturesMenuSelectors.MENU_SELECTOR,
            elementsValue: FontSettings.TYPES.LIGATURES_TYPES,
            elementsSelector: ligaturesMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
        });

        await ligaturesDropdown.selectDropdownItem(type);
    }

    async applySettings(fontSettings) {
        const settingsMap = {
            strikethrough: this.setStrikethrough.bind(this),
            doubleStrikethrough: this.setDoubleStrikethrough.bind(this),
            superscript: this.setSuperscript.bind(this),
            subscript: this.setSubscript.bind(this),
            smallCaps: this.setSmallCaps.bind(this),
            allCaps: this.setAllCaps.bind(this),
            spacing: this.setSpacing.bind(this),
            position: this.setPosition.bind(this),
            ligatures: this.setLigatures.bind(this),
        };

        for (const [key, method] of Object.entries(settingsMap)) {
            if (fontSettings[key]) {
                await method(fontSettings[key]);
            }
        }
    }
}

module.exports = FontSettings;
