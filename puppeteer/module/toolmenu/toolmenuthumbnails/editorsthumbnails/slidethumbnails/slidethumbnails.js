const selectors = require("./selectors.json");
class SlideThumbnails {
    constructor(tester) {
        this.tester = tester;
    }

    static SELECTORS = selectors;

    /**
     * Click inside thumbnail list
     */
    async clickThumbnailsMenu() {
        await this.tester.click(SlideThumbnails.SELECTORS.THUMB_MENU.MENU.THUNB_LIST);
    }

    /**
     * This method is not supported for the slide editor.
     * Calling this will always throw an error.
     * @throws {Error} Always throws an error indicating unsupported operation.
     */
    async setThumbnailsOption() {
        throw new Error("The slide editor does not support interaction with setThumbnailsOption");
    }
}

module.exports = SlideThumbnails;
