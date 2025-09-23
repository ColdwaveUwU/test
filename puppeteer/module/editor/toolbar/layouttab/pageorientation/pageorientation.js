const LayoutTab = require("../layouttab");
const { Dropdown } = require("../../../../elements");
const selectors = require("./selectors.json");

class PageOrientation extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static PAGE_ORIENTATION_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        PAGE_ORIENTATION_TYPES: ["Portrait", "Landscape"],
    };

    /**
     * Select page orientation option from dropdown menu
     * @param {"Portrait" | "Landscape"} [optionValue]
     */
    async setOrientation(optionValue) {
        const orientationMenuSelectors = PageOrientation.PAGE_ORIENTATION_SELECTORS.PAGE_ORIENTATION_MENU;
        const orientationDropdown = new Dropdown(this.tester, {
            selector: orientationMenuSelectors.MENU_SELECTOR,
            elementsValue: PageOrientation.TYPES.PAGE_ORIENTATION_TYPES,
            elementsSelector: orientationMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            descriptionSelector: orientationMenuSelectors.DESCRIPTION_SELECTOR,
        });

        await orientationDropdown.selectDropdownItem(optionValue);
    }
}

module.exports = PageOrientation;
