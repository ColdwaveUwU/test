const HomeTab = require("../hometab");
const selectors = require("./selectors.json");
const ToolMenuSearch = require("../../../../toolmenu/toolmenusearch/toolmenusearch");

/**
 * @typedef {Object} ReplaceOption
 * @property {string} find - The text to find.
 * @property {string} replace - The text to replace.
 * @property {"once" | "all"} method - The replacement method. Use "all" to replace all occurrences, by default method it's set to "once".
 * @property {boolean} sensitive - Whether the search should be case-sensitive.
 * @property {boolean} words - Whether the search should match whole words.
 */

/**
 * @typedef {Object} FindOption
 * @property {string} find - The text to find.
 * @property {boolean} sensitive - Whether the search should be case-sensitive.
 * @property {boolean} words - Whether the search should match whole words.
 */

class Replace extends HomeTab {
    constructor(tester) {
        super(tester);
        this.toolMenuSearch = tester ? new ToolMenuSearch(tester) : new ToolMenuSearch();
    }

    static SELECTORS = selectors;

    /**
     * Selects all text in the editor
     * @return {Promise<void>}
     */
    async selectAll() {
        const selector = Replace.SELECTORS.TOOLBAR.SELECT_ALL_BUTTON;
        await this.tester.click(selector);
    }

    /**
     * Replaces text in the editor
     * @param {ReplaceOption} options - The options for the replace operation.
     * @return {Promise<void>}
     */
    async replace(options) {
        const selector = Replace.SELECTORS.TOOLBAR.REPLACE_BUTTON;
        await this.tester.click(selector);
        await this.toolMenuSearch.replaceText(options);
    }

    /**
     * Finds text in the editor
     * @param {FindOption} options - The options for the find operation.
     * @return {Promise<void>}
     */
    async find(options) {
        const selector = Replace.SELECTORS.TOOLBAR.REPLACE_BUTTON;
        await this.tester.click(selector);
        await this.toolMenuSearch.findText(options.find, { sensitive: options.sensitive, words: options.words });
    }
}

module.exports = Replace;
