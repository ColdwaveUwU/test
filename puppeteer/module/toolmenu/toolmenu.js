class ToolMenu {
    constructor(selector, tester) {
        this.selector = selector;
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
    }

    async checkActive() {
        const activeSelector = this.selector + ".active";
        return await this.tester.checkSelector(activeSelector);
    }
}

module.exports = ToolMenu;
