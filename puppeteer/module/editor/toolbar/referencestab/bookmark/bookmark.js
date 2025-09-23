const ReferencesTab = require("../referencestab");
const selectors = require("./selectors.json");
const { Input, ModalButton, Button } = require("../../../../elements");

class Bookmark extends ReferencesTab {
    constructor(tester) {
        super(tester);
        this._bookmarkModalButton = null;
    }

    /**
     * @enum
     */
    static BOOKMARK_SELECTORS = selectors;

    /**
     * Get or create bookmark modal button with lazy initialization
     * @returns {ModalButton}
     */
    get bookmarkModalButton() {
        if (!this._bookmarkModalButton) {
            const selectors = Bookmark.BOOKMARK_SELECTORS;
            this._bookmarkModalButton = new ModalButton(
                this.tester,
                selectors.TOOLBAR.BOOKMARK_BUTTON,
                selectors.MODAL_WINDOW.BOOKMARK_WINDOW,
                selectors.MODAL_WINDOW.CLOSE_BUTTON
            );
        }
        return this._bookmarkModalButton;
    }

    /**
     * Adds a bookmark with the given name
     * @param {string} name Bookmark name
     */
    async addBookmark(name) {
        return this.#executeBookmarkOperation("addBookmark", async () => {
            const selectors = Bookmark.BOOKMARK_SELECTORS.MODAL_WINDOW;
            await this.#getInput(selectors.NAME_INPUT, [false]).set(name, 100);
            await this.#getButton(selectors.ADD_BUTTON).click();
            await this.tester.waitModalWindowClosed();
        });
    }

    /**
     * Deletes a bookmark with the given name
     * @param {string} name Bookmark name
     */
    async deleteBookmark(name) {
        return this.#executeBookmarkOperation("deleteBookmark", async () => {
            await this.#selectBookmarkByName(name);
            await this.#getButton(Bookmark.BOOKMARK_SELECTORS.MODAL_WINDOW.DELETE_BUTTON).click();
        });
    }

    /**
     * Clicks the Go to button
     * @param {string} name Bookmark name
     */
    async goToBookmark(name) {
        return this.#executeBookmarkOperation("goToBookmark", async () => {
            await this.#selectBookmarkByName(name);
            await this.#getButton(Bookmark.BOOKMARK_SELECTORS.MODAL_WINDOW.GOTO_BUTTON).click();
        });
    }

    /**
     * Gets the link for the bookmark
     * @param {string} name Bookmark name
     * @returns {Promise<string>} Link value
     */
    async getBookmarkLink(name) {
        return this.#executeBookmarkOperation("getBookmarkLink", async () => {
            await this.#selectBookmarkByName(name);
            return await this.#getLinkFromField();
        });
    }

    /**
     * Finds a bookmark item by name and clicks on it
     * @param {string} name Bookmark name
     */
    async #selectBookmarkByName(name) {
        try {
            await this.tester.selectByText(name, Bookmark.BOOKMARK_SELECTORS.MODAL_WINDOW.BOOKMARK_ITEM_BY_NAME);
        } catch (error) {
            this.#handleError("selectBookmarkByName", error);
        }
    }

    /**
     * Gets the link from the field
     * @returns {Promise<string>} Link value
     */
    async #getLinkFromField() {
        const modalWindowSelectors = Bookmark.BOOKMARK_SELECTORS.MODAL_WINDOW;
        await this.#getButton(modalWindowSelectors.GET_LINK_BUTTON).click();
        await this.#getButton(modalWindowSelectors.OPENED_GET_LINK_ITEM).click();
        const link = await this.tester.getTextElement(modalWindowSelectors.LINK_INPUT, "value");
        if (!link || link.trim() === "") {
            throw new Error("Bookmark.#getLinkFromField: Link is empty.");
        }
        return link.trim();
    }

    /**
     * Gets an input element
     * @param {string} selector Input selector
     * @param {Array} constructor Input constructor
     * @returns {Input}
     */
    #getInput(selector, constructor = []) {
        return new Input(this.tester, selector, ...constructor);
    }

    /**
     * Gets a button element
     * @param {string} selector
     * @returns {Button}
     */
    #getButton(selector) {
        return new Button(this.tester, selector);
    }

    /**
     * Executes a bookmark operation within modal window context
     * @param {string} methodName Name of the calling method
     * @param {Function} operation - Async function to execute
     * @returns {Promise<*>} Result of the operation
     */
    async #executeBookmarkOperation(methodName, operation) {
        try {
            await this.bookmarkModalButton.openModal();
            const result = await operation();
            await this.bookmarkModalButton.closeModal();
            return result;
        } catch (error) {
            this.#handleError(methodName, error);
        }
    }

    /**
     * Handles errors by throwing a new error with method name and original error message.
     * @param {string} methodName The name of the method where the error occurred.
     * @param {Error} error The original error object.
     * @param {string} [context] Additional context information (e.g., bookmark name)
     */
    #handleError(methodName, error, context = "") {
        const contextInfo = context ? ` for '${context}'` : "";
        throw new Error(`Bookmark.${methodName}: Failed${contextInfo}. ${error.message}`, {
            cause: error,
        });
    }
}

module.exports = Bookmark;
