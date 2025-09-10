const Toolbar = require("../toolbar");
const { Dropdown } = require("../../../elements");

class ReferencesTab extends Toolbar {
    constructor(tester) {
        super(tester, "References");
        this.modalWindowSelector = ".modals-mask";
    }

    /**
     * Helper for dropdown selection
     * @param {Object} menuSelectors - selectors for the dropdown { MENU_SELECTOR, DROPDOWN_ELEMENTS_SELECTOR, DESCRIPTION_SELECTOR }
     * @param {string} value - value to select
     * @returns {Promise<void>}
     */
    async selectDropdown(menuSelectors, value) {
        const dropdown = new Dropdown(this.tester, {
            selector: menuSelectors.MENU_SELECTOR,
            elementsValue: [],
            elementsSelector: menuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            descriptionSelector: menuSelectors.DESCRIPTION_SELECTOR,
        });
        await dropdown.selectDropdownItem(value);
    }

    /**
     * Applies settings using a mapping from keys to method names
     * @param {Object} settings - Settings object
     * @param {Object} map - Map of setting keys to method names
     */
    async setSettingsByMap(settings, map) {
        if (!settings || !map) {
            return;
        }

        for (const key of Object.keys(settings)) {
            const methodName = map[key];
            if (methodName && typeof this[methodName] === "function") {
                await this[methodName](settings[key]);
            }
        }
    }
}

module.exports = ReferencesTab;
