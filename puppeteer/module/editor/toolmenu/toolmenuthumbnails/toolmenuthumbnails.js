const ToolMenu = require("../toolmenu");
const StatusBar = require("../../statusbar");
const { PDFThumbnails, SlideThumbnails } = require("./editorsthumbnails");
const { createExecuteObjectAction, createErrorHandler } = require("../../../../engine/script/js");

class ToolMenuThumbnails extends ToolMenu {
    constructor(tester) {
        super("", tester);
        this.statusBar = new StatusBar(this.tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeObjectAction = createExecuteObjectAction(this.handleError);
    }

    #handler;

    #getHandler() {
        if (!this.#handler) {
            const type = this.tester.getEditorType();
            switch (type) {
                case "pdf":
                    this.#handler = new PDFThumbnails(this.tester);
                    break;
                case "slide":
                    this.#handler = new SlideThumbnails(this.tester);
                    break;
                default:
                    throw new Error(`Unsupported editor type: ${type}`);
            }
        }
        return this.#handler;
    }

    /**
     * Opens the menu
     * @returns {Promise<void>}
     */
    async openMenu() {
        await this.executeObjectAction(this.#getHandler(), "openMenu", "openMenu");
    }

    /**
     * Closes the menu
     * @returns {Promise<void>}
     */
    async closeMenu() {
        await this.executeObjectAction(this.#getHandler(), "closeMenu", "closeMenu");
    }

    /**
     * Select thumbnail list area
     * @returns {Promise<void>}
     */
    async selectThumbnailsMenu() {
        await this.executeObjectAction(this.#getHandler(), "selectThumbnailsMenu", "selectThumbnailsMenu");
    }

    /**
     * Sets thumbnails options
     * This method is not supported for the slide editor.
     * @param {{size: number | undefined, highlight: boolean | undefined}} options
     * @returns {Promise<void>}
     */
    async setThumbnailsOption(options) {
        await this.executeObjectAction(this.#getHandler(), "setThumbnailsOption", "setThumbnailsOption", [options]);
    }

    /**
     * Go to thumbnail by number
     * @param {number} thumbNumber
     * @returns {Promise<void>}
     */
    async goToThumbnail(thumbNumber) {
        await this.openMenu();
        await this.executeObjectAction(this.statusBar, "goToPage", "goToThumbnail", [thumbNumber]);
    }

    /**
     * Get current thumbnail number
     * @returns {Promise<number>}
     */
    async getCurrentThumbnailNumber() {
        await this.openMenu();
        return await this.executeObjectAction(this.statusBar, "getCurrentPage", "getCurrentThumbnailNumber");
    }

    /**
     * Get count thumbnails
     * @returns {Promise<number>}
     */
    async getCountThumbnails() {
        await this.openMenu();
        return await this.executeObjectAction(this.statusBar, "getCountPages", "getCountThumbnails");
    }
}

module.exports = ToolMenuThumbnails;
