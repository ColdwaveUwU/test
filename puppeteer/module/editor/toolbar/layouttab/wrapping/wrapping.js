const LayoutTab = require("../layouttab");
const { Dropdown } = require("../../../../elements");
const selectors = require("./selectors.json");

class Wrapping extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static WRAPPING_SELECTORS = selectors;

    /**
     * @enum
     */
    static WRAPPING_TYPES = [
        "In line with text",
        "Square",
        "Tight",
        "Through",
        "Top and bottom",
        "In front of text",
        "Behind text",
        "Edit wrap boundary",
    ];

    /**
     * Select wrapping from dropdown menu
     * @param {"In line with text" | "Square" | "Tight" | "Through" | "Top and bottom" | "In front of text"
     *         | "Behind text" | "Edit wrap boundary"} [wrappingType]
     */
    async setWrapping(wrappingType) {
        const wrappingMenuSelectors = Wrapping.WRAPPING_SELECTORS.WRAPPING_MENU;
        try {
            const wrappingDropdown = new Dropdown(this.tester, {
                selector: wrappingMenuSelectors.MENU_SELECTOR,
                elementsValue: Wrapping.WRAPPING_TYPES,
                elementsSelector: wrappingMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });

            await wrappingDropdown.selectDropdownItem(wrappingType);
        } catch (error) {
            throw new Error(`setWrapping: Failed to select wrapping option "${wrappingType}". ${error.message}`, {
                cause: error,
            });
        }
    }

    //todo need to get coordinates of points on the shape boundary on canvas
    // async editWrapBoundary() {}
}

module.exports = Wrapping;
