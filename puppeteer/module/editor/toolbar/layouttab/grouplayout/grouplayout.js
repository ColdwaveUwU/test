const LayoutTab = require("../layouttab");
const { Dropdown } = require("../../../../elements");
const selectors = require("./selectors.json");

class GroupLayout extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static GROUP_LAYOUT_SELECTORS = selectors;

    /**
     * @enum
     */
    static GROUP_LAYOUT_TYPES = ["Group", "Ungroup"];

    /**
     * Select group type from dropdown menu
     * @param {"Group" | "Ungroup"} [groupType]
     */
    async setGroup(groupType) {
        const groupMenuSelectors = GroupLayout.GROUP_LAYOUT_SELECTORS.GROUP_MENU;
        try {
            const groupDropdown = new Dropdown(this.tester, {
                selector: groupMenuSelectors.MENU_SELECTOR,
                elementsValue: GroupLayout.GROUP_LAYOUT_TYPES,
                elementsSelector: groupMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });

            await groupDropdown.selectDropdownItem(groupType);
        } catch (error) {
            throw new Error(`setGroup: Failed to select group option "${groupType}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = GroupLayout;
