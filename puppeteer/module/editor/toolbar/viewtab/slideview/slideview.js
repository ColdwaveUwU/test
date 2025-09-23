const ViewTab = require("../viewtab");
const selectors = require("./selectors.json");

class SlideView extends ViewTab {
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
        await this.tester.click(SlideView.SELECTORS.NORMAL_VIEW);
    }

    /**
     * Set the view to slide master
     */
    async setSlideMasterView() {
        await this.tester.click(SlideView.SELECTORS.SLIDE_MASTER_VIEW);
    }
}

module.exports = SlideView;
