const selectors = require("./selectors.json");
const { Dropdown, Checkbox } = require("../../../../../../elements");
const SubSettings = require("../subsettings");

class Appearance extends SubSettings {
    constructor(tester) {
        super();
        this.tester = tester;
    }

    static APPEARANCE_SELECTORS = selectors;

    /**
     *
     * @param {{theme?: {value?: string, darkMode?: boolean},
     *          tabStyle?: string, background?: boolean}} appearanceSettings
     */
    async setSettings(appearanceSettings) {
        const selectors = Appearance.APPEARANCE_SELECTORS;

        const uiElements = [
            {
                type: "dropdown",
                value: appearanceSettings?.theme?.value,
                selector: selectors.THEME.VALUE.SELECTOR,
                elementsSelector: selectors.THEME.VALUE.ELEMENTS_SELECTOR,
            },
            {
                type: "dropdown",
                value: appearanceSettings?.tabStyle,
                selector: selectors.TAB_STYLE.VALUE.SELECTOR,
                elementsSelector: selectors.TAB_STYLE.VALUE.ELEMENTS_SELECTOR,
            },
            {
                type: "checkbox",
                value: appearanceSettings?.theme?.darkMode,
                selector: selectors.THEME.DARK_MODE,
            },
            {
                type: "checkbox",
                value: appearanceSettings?.useToolbarColor,
                selector: selectors.BACKGROUND,
            },
        ];

        for (const element of uiElements) {
            const { type, value, selector, elementsSelector } = element;
            if (value == null || !selector) continue;

            if (type === "dropdown" && elementsSelector) {
                const dropdown = new Dropdown(this.tester, {
                    selector,
                    elementsSelector,
                });
                await dropdown.selectDropdownItem(value);
            } else if (type === "checkbox") {
                const checkbox = new Checkbox(this.tester, selector);
                await checkbox.set(value);
            }
        }
    }
}
module.exports = Appearance;
