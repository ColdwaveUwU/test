const ToolMenu = require("../toolmenu");
const StatusBar = require("../../statusbar");
const { PDFThumbnails, SlideThumbnails } = require("./editorsthumbnails");

class ToolMenuThumbnails extends ToolMenu {
    constructor(tester) {
        super("", tester);
        this.statusBar = new StatusBar(this.tester);
        this.handler = null;
    }
    #handlerInitialized = false;

    #initHandler() {
        if (this.#handlerInitialized) {
            return;
        }

        const type = this.tester.getEditorType();
        switch (type) {
            case "pdf":
                this.handler = new PDFThumbnails(this.tester);
                this.selector = PDFThumbnails.SELECTORS.LEFT_MENU.THUMB_BUTTON;
                break;
            case "slide":
                this.handler = new SlideThumbnails(this.tester);
                this.selector = SlideThumbnails.SELECTORS.LEFT_MENU.THUMB_BUTTON;
                break;
            default:
                throw new Error(`Unsupported editor type: ${type}`);
        }

        this.#handlerInitialized = true;
    }

    async #ensureActive() {
        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }
    }

    /**
     * Sets thumbnails options
     * This method is not supported for the slide editor.
     * @param {{size: number | undefined, highlight: boolean | undefined}} options
     * @returns {Promise<void>}
     */
    async setThumbnailsOption(options) {
        try {
            this.#initHandler();
            await this.#ensureActive();
            await this.handler.setThumbnailsOption(options);
        } catch (error) {
            throw new Error(`setThumbnailsOption: ${error.message}`, { cause: error });
        }
    }

    /**
     * Click in thumbnails list area
     * @returns {Promise<void>}
     */
    async clickThumbnailsMenu() {
        try {
            this.#initHandler();
            await this.#ensureActive();
            await this.handler.clickThumbnailsMenu();
        } catch (error) {
            throw new Error(`clickThumbnailsMenu: ${error.message}`, { cause: error });
        }
    }

    /**
     * Go to thumbnail by number
     * @param {number} thumbNumber
     * @returns {Promise<void>}
     */
    async goToThumbnail(thumbNumber) {
        try {
            return this.statusBar.goToPage(thumbNumber);
        } catch (error) {
            throw new Error(`goToThumbnail: Failed to goto thumb. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Get current thumbnail number
     * @returns {Promise<number>}
     */
    async getCurrentThumbnailNumber() {
        try {
            return this.statusBar.getCurrentPage();
        } catch (error) {
            throw new Error(`getCurrentThumbnail: Failed to get current thumbnail. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Get count thumbnails
     * @returns {Promise<number>}
     */
    async getCountThumbnails() {
        try {
            return this.statusBar.getCountPages();
        } catch (error) {
            throw new Error(`getCountThumbnails: Failed to get count thumbnails. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = ToolMenuThumbnails;
