const { Dropdown } = require("../../../../../../../elements");
const selectors = require("./selectors.json");
/**
 * Class representing the wrapping style functionality.
 */
class WrappingStyle {
    constructor(tester, basicImageSettings) {
        this.tester = tester || RegularTester;
        this.basicImageSettings = basicImageSettings;
    }

    static SELECTORS = selectors;

    #wrappingStyleDropdown = null;

    #getWrappingStyleDropdown() {
        if (!this.#wrappingStyleDropdown) {
            const { WRAPPING_DRODROPDOWN, ELEMENTS_SELECTOR, DESCRIPTION } = WrappingStyle.SELECTORS;
            this.#wrappingStyleDropdown = new Dropdown(this.tester, {
                selector: WRAPPING_DRODROPDOWN,
                elementsSelector: ELEMENTS_SELECTOR,
                descriptionSelector: DESCRIPTION,
            });
        }
        return this.#wrappingStyleDropdown;
    }
    
    async clickWrappingStyle(wrappingStyleName) {
        try {
            const wrappingStyleDropdown = this.#getWrappingStyleDropdown();
            await wrappingStyleDropdown.selectDropdownItem(wrappingStyleName);
        } catch (error) {
            throw new Error(`clickWrappingStyle: ${error.message}`, { cause: error });
        }
    }
}

module.exports = WrappingStyle;
