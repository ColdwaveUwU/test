const ToolMenu = require("../toolmenu");
class ToolMenuSearch extends ToolMenu {
    constructor(tester) {
        super("#left-btn-searchbar", tester);
    }

    static SELECTORS = {
        FIND_INPUT_FIELD: "#search-adv-text div > input",
        REPLACE: {
            INPUT_FIELD: "#search-adv-replace-text div > input",
            BUTTON: "#search-adv-replace",
            ALL_BUTTON: "#search-adv-replace-all",
        },
        EDITOR_WORD: "#search-results .item b",
        EDITOR_CELL: "#search-results .search-table .search-items .item .value",
        EDITOR_SLIDE: "#search-results .item b",
        EDITOR_PDF: "#search-results .item b",
        CHECKBOX_SENSITIVE: "#search-adv-case-sensitive",
        CHECKBOX_WORDS: "#search-adv-match-word",
    };

    /**
     * Finds text in the editor.
     * @param {string} text - The text to search for.
     * @param {{sensitive: boolean, words: boolean}} [options] - Search options.
     */
    async findText(text, { sensitive = false, words = false } = {}) {
        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }

        const editorSpecificSelector = await this.getEditorSelector();
        await this.tester.inputToForm(text, ToolMenuSearch.SELECTORS.FIND_INPUT_FIELD);
        await this.tester.checkSelector(editorSpecificSelector);

        await this.#applySearchOptions({ sensitive, words });
    }

    /**
     * Replaces occurrences of a specified text in the editor.
     * @param {{find: string, replace: string, method: "once" | "all",
     *          sensitive: boolean, words: boolean}} options - Replacement parameters.
     * @throws {Error} If the text is not found.
     */
    async replaceText({ find = "", replace = "", method = "once", sensitive = false, words = false }) {
        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }

        const editorSpecificSelector = await this.getEditorSelector();
        await this.#applySearchOptions({ sensitive, words });

        await this.tester.inputToForm(find, ToolMenuSearch.SELECTORS.FIND_INPUT_FIELD);
        await this.tester.checkSelector(editorSpecificSelector);
        await this.tester.inputToForm(replace, ToolMenuSearch.SELECTORS.REPLACE.INPUT_FIELD);

        if (!(await this.#isTextFound(find, editorSpecificSelector))) {
            throw new Error(`Text "${find}" was not found.`);
        }

        await this.tester.click(
            method === "all" ? ToolMenuSearch.SELECTORS.REPLACE.ALL_BUTTON : ToolMenuSearch.SELECTORS.REPLACE.BUTTON
        );
    }

    /**
     * Retrieves the editor selector.
     * @returns {Promise<string>} The editor selector.
     * @throws {Error} If the editor type is unknown.
     */
    async getEditorSelector() {
        const editorType = await this.tester.getEditorType();
        const selector = ToolMenuSearch.SELECTORS[`EDITOR_${editorType.toUpperCase()}`];
        if (!selector) throw new Error(`Unknown editor type: ${editorType}`);
        return selector;
    }

    /**
     * Applies search options.
     * @param {{sensitive: boolean, words: boolean}} options - Search options.
     */
    async #applySearchOptions({ sensitive, words }) {
        if (sensitive) {
            await this.tester.click(ToolMenuSearch.SELECTORS.CHECKBOX_SENSITIVE);
        }
        if (words) {
            await this.tester.click(ToolMenuSearch.SELECTORS.CHECKBOX_WORDS);
        }
    }

    /**
     * Checks if the specified text exists in the editor.
     * @param {string} find - The text to search for.
     * @param {string} editorSpecificSelector - The editor selector.
     * @returns {Promise<boolean>} Whether the text is found.
     */
    async #isTextFound(find, editorSpecificSelector) {
        const searchList = await this.tester.frame.evaluate((selector) => {
            return Array.from(document.querySelectorAll(selector)).map((item) => item.textContent);
        }, editorSpecificSelector);
        return searchList.includes(find);
    }
}
module.exports = ToolMenuSearch;
