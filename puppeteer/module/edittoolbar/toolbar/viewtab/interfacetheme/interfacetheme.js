const ViewTab = require("../viewtab");
const selectors = require("./selectors.json");
const { Dropdown } = require("../../../../elements");

class InterfaceTheme extends ViewTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * Click dark Document only for CDE
     */
    async clickDarkDocument() {
        const darkDocumentSelector = InterfaceTheme.SELECTORS.DARK_DOCUMENT.ELEMENT_SELECTOR;
        await this.tester.click(darkDocumentSelector);
    }

    /**
     * Set the interface theme
     * @param { "Same as system" | "Light" | "Classic Light" | "Dark" | "Contrast Dark" | "Gray" | "Modern Dark" | "Modern Light" } [optionValue]
     */
    async setInterfaceTheme(optionValue) {
        try {
            const interfaceThemeSelectors = InterfaceTheme.SELECTORS.INTERFACE_THEME;
            const interfaceThemeDropdown = new Dropdown(this.tester, {
                selector: interfaceThemeSelectors.ELEMENT_SELECTOR,
                elementsValue: [],
                elementsSelector: interfaceThemeSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });
            await interfaceThemeDropdown.selectDropdownItem(optionValue);
        } catch (error) {
            throw new Error(`setInterfaceTheme: Failed to set theme "${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = InterfaceTheme;
