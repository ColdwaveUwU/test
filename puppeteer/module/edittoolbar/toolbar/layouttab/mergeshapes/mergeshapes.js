const LayoutTab = require("../layouttab");
const { Dropdown } = require("../../../../elements");
const selectors = require("./selectors.json");

class MergeShapes extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static MERGE_SHAPES_SELECTORS = selectors;

    /**
     * @enum
     */
    static MERGE_SHAPES_TYPES = ["Union", "Combine", "Fragment", "Intersect", "Subtract"];

    /**
     * Select merge type from dropdown menu
     * @param {"Union" | "Combine" | "Fragment" | "Intersect" | "Subtract"} [mergeType]
     */
    async setMergeShapes(mergeType) {
        const mergeShapesMenuSelectors = MergeShapes.MERGE_SHAPES_SELECTORS.MERGE_SHAPES_MENU;
        try {
            const mergeShapesDropdown = new Dropdown(this.tester, {
                selector: mergeShapesMenuSelectors.MENU_SELECTOR,
                elementsValue: MergeShapes.MERGE_SHAPES_TYPES,
                elementsSelector: mergeShapesMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });

            await mergeShapesDropdown.selectDropdownItem(mergeType);
        } catch (error) {
            throw new Error(`setMergeShapes: Failed to select merge option "${mergeType}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = MergeShapes;
