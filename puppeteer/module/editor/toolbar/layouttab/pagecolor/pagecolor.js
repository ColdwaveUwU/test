const LayoutTab = require("../layouttab");
const { Color } = require("../../../../common");
const { Dropdown } = require("../../../../elements");
const selectors = require("./selectors.json");

class PageColor extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static PAGE_COLOR_SELECTORS = selectors;

    /**
     * Set page color
     * @param {Color} [pageColor]
     */
    async setPageColor(pageColor) {
        const pageColorSelector = PageColor.PAGE_COLOR_SELECTORS.PAGE_COLOR;
        const colorLib = new Color(this.tester);

        try {
            const pageColorDropdown = new Dropdown(this.tester, { selector: pageColorSelector });
            await pageColorDropdown.selectDropdown();
            await colorLib.selectColor(pageColorSelector, pageColor);
        } catch (error) {
            throw new Error(`setPageColor: Failed to set page color "${pageColor}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = PageColor;
