const Toolbar = require("../toolbar");

class ViewTab extends Toolbar {
    constructor(tester, buttonSelector) {
        super(tester, "View");
        this.buttonSelector = buttonSelector;
    }

    /**
     * Clicks the target button on the page
     */
    async clickTargetButton() {
        await this.tester.click(this.buttonSelector);
    }
}

module.exports = ViewTab;
