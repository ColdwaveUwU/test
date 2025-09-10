const LayoutTab = require("../layouttab");
const { Dropdown } = require("../../../../elements");
const selectors = require("./selectors.json");

class AlignLayout extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static ALIGN_LAYOUT_SELECTORS = selectors;

    /**
     * @enum
     */
    static ALIGN_LAYOUT_TYPES = [
        "Align left",
        "Align center",
        "Align right",
        "Align top",
        "Align middle",
        "Align bottom",
        "Distribute horizontally",
        "Distribute vertically",
        "Align to page",
        "Align to margin",
        "Align selected objects",
    ];

    /**
     * Select align type from dropdown menu
     * @param {"Align left" | "Align center" | "Align right" | "Align top" | "Align middle" | "Align bottom"
     *         | "Distribute horizontally" | "Distribute vertically" | "Align to page" | "Align to margin"
     *         | "Align selected objects"} [alignType]
     */
    async setAlign(alignType) {
        const alignMenuSelectors = AlignLayout.ALIGN_LAYOUT_SELECTORS.ALIGN_MENU;
        try {
            const alignDropdown = new Dropdown(this.tester, {
                selector: alignMenuSelectors.MENU_SELECTOR,
                elementsValue: AlignLayout.ALIGN_LAYOUT_TYPES,
                elementsSelector: alignMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });

            await alignDropdown.selectDropdownItem(alignType);
        } catch (error) {
            throw new Error(`setAlign: Failed to select align option "${alignType}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = AlignLayout;
