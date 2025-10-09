const selectors = require("./selectors.json");
class Review {
    constructor(selector, tester) {
        this.selector = selector;
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
    }

    static SELECTORS = selectors;

    /**
     * Checks if review mode is active
     * @returns {boolean}
     */
    async isReviewActive() {
        return await this.tester.waitSelector(Review.SELECTORS.REVIEW_ITEM);
    }
}

module.exports = Review;
