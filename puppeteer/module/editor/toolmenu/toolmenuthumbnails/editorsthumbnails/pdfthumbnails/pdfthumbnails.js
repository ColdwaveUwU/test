const selectors = require("./selectors.json");
const ToolMenu = require("../../../toolmenu");
const { createExecuteAction, createErrorHandler } = require("../../../../../../engine/script/js");
const { Dropdown, Checkbox, Button } = require("../../../../../elements");

/**
 * @typedef {Object} PDFThumbnailsOptions
 * @property {number | undefined} size - The size of the thumbnail.
 * @property {boolean | undefined} highlight - Whether the thumbnail should be highlighted.
 */

class PDFThumbnails extends ToolMenu {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(PDFThumbnails.SELECTORS.LEFT_MENU.THUMB_BUTTON, tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Select inside thumbnail list
     */
    async selectThumbnailsMenu() {
        await this.openMenu();
        await this.executeAction(Button, PDFThumbnails.SELECTORS.THUMB_MENU.MENU.THUNB_LIST, "click", "selectThumbnailsMenu");
    }

    /**
     * Sets thumbnails options
     * @param {PDFThumbnailsOptions} options
     * @returns {Promise<void>}
     */
    async setThumbnailsOption(options) {
        const { SIZE, HIGHLIGHT, THUMB_BUTTON_SETTINGS, SETTINGS_MENU } = PDFThumbnails.SELECTORS.THUMB_MENU.OPTIONS;
        try {
            await this.openMenu();
            const methodName = "setThumbnailsOption";
            const dropdownSelectors = {
                selector: THUMB_BUTTON_SETTINGS,
                menuSelector: SETTINGS_MENU,
            };

            const hasSize = options.size !== undefined;
            const hasHighlight = options.highlight !== undefined;

            if (!hasSize && !hasHighlight) return;

            await this.executeAction(Dropdown, dropdownSelectors, "selectDropdown", methodName);

            if (hasSize) {
                await this.tester.mouseClickInsideElement(SIZE, options.size, 0);
            }

            if (hasHighlight) {
                await this.executeAction(Checkbox, HIGHLIGHT, "set", methodName, [options.highlight]);
            }
        } catch (error) {
            this.handleError("setThumbnailsOption", error);
        }
    }
}

module.exports = PDFThumbnails;
