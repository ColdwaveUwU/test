const selectors = require("./selectors.json");
const ToolMenu = require("../../../toolmenu");
const { createExecuteAction, createErrorHandler } = require("../../../../../../engine/script/js");
const { Button } = require("../../../../../elements");

class SlideThumbnails extends ToolMenu {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(SlideThumbnails.SELECTORS.LEFT_MENU.THUMB_BUTTON, tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Select thumbnail list area
     */
    async selectThumbnailsMenu() {
        await this.openMenu();
        await this.executeAction(Button, SlideThumbnails.SELECTORS.THUMB_MENU.MENU.THUNB_LIST, "click", "selectThumbnailsMenu");
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
