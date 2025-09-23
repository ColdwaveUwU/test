class ViewToolbarStatic {
    constructor(tester) {
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
    }
    async clickHand() {
        const handSelector = "#tlbtn-handtool";
        await this.tester.click(handSelector);
    }

    async clickSelect() {
        const selectSelector = "#tlbtn-selecttool";
        await this.tester.click(selectSelector);
    }
}
module.exports = ViewToolbarStatic;
