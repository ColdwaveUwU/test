const { ViewToolbarDocumentModeSelectors } = require("../../constants");
class Review {
    constructor(selector, tester) {
        this.selector = selector;
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
    }

    /**
     * Checks if review mode is active
     * @returns {boolean}
     */
    async isReviewActive() {
        return await this.tester.checkSelector(ViewToolbarDocumentModeSelectors.REVIEW_MODE.REVIEW_ITEM);
    }
}

module.exports = Review;
