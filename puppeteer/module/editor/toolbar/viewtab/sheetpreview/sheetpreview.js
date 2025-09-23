const ViewTab = require("../viewtab");
const selectors = require("./selectors.json");

class SheetPreview extends ViewTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * Set the view to normal
     */
    async setNormalView() {
        await this.tester.click(SheetPreview.SELECTORS.NORMAL_VIEW);
    }

    /**
     * Set page break preview
     */
    async setPageBreakPreview() {
        await this.tester.click(SheetPreview.SELECTORS.PAGE_BREAK_VIEW);
    }
}

module.exports = SheetPreview;
