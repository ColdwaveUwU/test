const ToolMenu = require("../toolmenu");
const selectors = require("./selectors.json");
const { createExecuteAction, createErrorHandler } = require("../../../../engine/script/js");
const { Button, Input, Checkbox, Dropdown } = require("../../../elements");

/**
 * @typedef {Object} SearchOptions
 * @property {boolean} sensitive - Whether the search should be case-sensitive.
 * @property {boolean} words - Whether the search should match whole words.
 * @property {number} resultIndex - The index of the search result to select (1-based index).
 * @property {"Sheet" | "Workbook" | "Specific range"} within - The within option to select. Only for spreadsheet editor.
 * @property {"By rows" | "By columns"} search - The search option to select. Only for spreadsheet editor.
 * @property {"Formulas" | "Values"} lookIn - The lookIn option to select. Only for spreadsheet editor.
 */

/**
 * @typedef {Object} SpreadsheetTextContent
 * @property {string} sheet - The sheet name.
 * @property {string} name - The name of the search result.
 * @property {string} cell - The cell of the search result.
 * @property {string} value - The value of the search result.
 * @property {string} formula - The formula of the search result.
 */

/**
 * @typedef {Object} SearchResult
 * @property {number} index - The index of the search result.
 * @property {string|SpreadsheetTextContent} textContent - The text content of the search result or structured data object with sheet, name, cell, value, formula properties.
 * @property {string} id - The id of the search result.
 * @property {string} className - The class name of the search result.
 * @property {string} buttonSelector - The button selector of the search result.
 * @property {boolean} isSelected - Whether the search result is selected.
 */

/**
 * @typedef {Object} ReplaceOptions
 * @property {string} find - The text to search for.
 * @property {string} replace - The text to replace.
 * @property {"once" | "all"} method - The replacement method. Use "all" to replace all occurrences, by default method it's set to "once".
 * @property {boolean} sensitive - Whether the search should be case-sensitive.
 * @property {boolean} words - Whether the search should match whole words.
 * @property {number} resultIndex - The index of the search result to select (1-based index).
 */

class ToolMenuSearch extends ToolMenu {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(ToolMenuSearch.SELECTORS.SEARCH_MENU, tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Finds text in the editor.
     * @param {string} text - The text to search for.
     * @param {SearchOptions} [options] - Search options.
     */
    async findText(text, options) {
        await this.openMenu();
        await this.executeAction(Input, ToolMenuSearch.SELECTORS.FIND_INPUT_FIELD, "set", "findText", [text], [true]);
        await this.#setSearchOptions(options);
        if (options?.resultIndex) {
            await this.selectSearchResultByIndex(options.resultIndex);
        }
    }

    /**
     * Retrieves a search result by index.
     * @param {number} index - The index of the search result to retrieve (1-based index).
     * @returns {SearchResult} The search result.
     */
    async getSearchResultByIndex(index = 1) {
        const searchResultsList = await this.#parseSearchResultsList();
        return this.#getSearchResultByIndex(searchResultsList, index);
    }

    /**
     * Retrieves the search results list.
     * @returns {Promise<Array<SearchResult>>} The search results list.
     */
    async getSearchResultsList() {
        return await this.#parseSearchResultsList();
    }

    /**
     * Replaces occurrences of a specified text in the editor.
     * @param {ReplaceOptions} options - Replacement parameters.
     * @throws {Error} If the text is not found.
     */
    async replaceText(options) {
        const methodName = "replaceText";
        const { find, replace, method, resultIndex } = options;
        const selectors = ToolMenuSearch.SELECTORS;
        await this.openMenu();
        await this.#setSearchOptions(options);
        await this.executeAction(Input, selectors.FIND_INPUT_FIELD, "set", methodName, [find], [true]);
        await this.executeAction(Input, selectors.REPLACE.INPUT_FIELD, "set", methodName, [replace], [false]);
        const searchResultsList = await this.#parseSearchResultsList();
        if (resultIndex) {
            await this.selectSearchResultByIndex(resultIndex, searchResultsList);
        }
        const buttonSelector = method === "all" ? selectors.REPLACE.ALL_BUTTON : selectors.REPLACE.BUTTON;
        await this.executeAction(Button, buttonSelector, "waitSelector", methodName);
        await this.executeAction(Button, buttonSelector, "click", methodName);
    }

    /**
     * Selects a search result by index.
     * @param {number} index - The index of the search result to select (1-based index).
     */
    async selectSearchResultByIndex(index = 1, resultsList = null) {
        const searchResultsList = resultsList || (await this.#parseSearchResultsList());
        const searchResult = this.#getSearchResultByIndex(searchResultsList, index);
        if (searchResult.isSelected) return;
        await this.executeAction(Button, searchResult.buttonSelector, "click", "selectSearchResultByIndex");
    }

    /**
     * Waits for the search results list to be present on the page or frame.
     * @param {number} timeout - The timeout in milliseconds.
     * @returns {Promise<boolean>} - Returns `true` if the element is found, `false` otherwise.
     */
    async #waitForSearchResultsList(timeout = 5000) {
        const selectors = ToolMenuSearch.SELECTORS.SEARCH_RESULTS_LIST.elementsSelector;
        return await this.executeAction(Button, selectors, "waitSelector", "waitForSearchResultsList", [timeout]);
    }

    /**
     * Applies search options.
     * @param {SearchOptions} options - Search options.
     */
    async #setSearchOptions(options) {
        if (!options) return;
        const methodName = "setSearchOptions";
        const selectors = ToolMenuSearch.SELECTORS.OPTIONS;
        const { sensitive, words, within, search, lookIn } = options;
        await this.#openSearchOptions();
        if (sensitive !== undefined) {
            await this.executeAction(Checkbox, selectors.SENSITIVE_CHECKBOX, "set", methodName, [sensitive]);
        }
        if (words !== undefined) {
            await this.executeAction(Checkbox, selectors.WORDS_CHECKBOX, "set", methodName, [words]);
        }
        if (within !== undefined) {
            await this.executeAction(Dropdown, selectors.WITHIN_DROPDOWN, "selectDropdownItem", methodName, [within]);
        }
        if (search !== undefined) {
            await this.executeAction(Dropdown, selectors.SEARCH_DROPDOWN, "selectDropdownItem", methodName, [search]);
        }
        if (lookIn !== undefined) {
            await this.executeAction(Dropdown, selectors.LOOK_IN_DROPDOWN, "selectDropdownItem", methodName, [lookIn]);
        }
    }

    /**
     * Opens the search options.
     */
    async #openSearchOptions() {
        const selectors = ToolMenuSearch.SELECTORS.OPTIONS;
        const methodName = "openSearchOptions";
        if (
            await this.executeAction(Button, selectors.TABLE_SEARCH_OPTIONS_TOGGLE_CLOSED, "checkSelector", methodName)
        ) {
            await this.executeAction(Button, selectors.TABLE_SEARCH_OPTIONS_TOGGLE, "click", methodName);
        }
    }

    /**
     * Retrieves a search result by index.
     * @param {Array<SearchResult>} searchResultsList - The list of search results.
     * @param {number} index - The index of the search result to retrieve.
     * @returns {SearchResult} The search result.
     */
    #getSearchResultByIndex(searchResultsList, index) {
        try {
            let searchResult;
            if (index >= 1 && index <= searchResultsList.length) {
                searchResult = searchResultsList.find((result) => result.index === index);
            }
            if (!searchResult) {
                throw new Error(`Search result with index ${index} was not found`);
            }
            return searchResult;
        } catch (error) {
            this.handleError("#getSearchResultByIndex", error);
        }
    }

    /**
     * Parses the search results list.
     * @returns {Promise<Array<SearchResult>>} The search results list.
     */
    async #parseSearchResultsList() {
        try {
            const selectors = ToolMenuSearch.SELECTORS.SEARCH_RESULTS_LIST;
            if (!(await this.#waitForSearchResultsList())) {
                throw new Error(`Search results list was not found.`);
            }
            return await this.tester.frame.evaluate(
                ({ selector, elementsSelector, selectedElementSelector }) => {
                    const elements = Array.from(document.querySelectorAll(elementsSelector));
                    return elements.map((element, index) => {
                        const elementIndex = index + 1;
                        let textContent = element.textContent || "";

                        // Parse structured data if element has role="row" (for spreadsheet editor)
                        if (element.getAttribute("role") === "row") {
                            const cells = element.querySelectorAll('[role="cell"]');
                            const structuredData = {};
                            cells.forEach((cell) => {
                                const cellClass = cell.className.split(" ")[0];
                                if (cellClass) {
                                    structuredData[cellClass] = cell.textContent || "";
                                }
                            });
                            textContent = structuredData;
                        }

                        const id = element.id ? `#${element.id}` : "";
                        const className = element.className
                            ? `${selector} .${element.className.split(" ").join(".")}:nth-child(${elementIndex})`
                            : `${selector}:nth-child(${elementIndex})`;
                        const buttonSelector = id || className;
                        const isSelected = className.includes(selectedElementSelector);
                        return {
                            index: elementIndex,
                            textContent: textContent,
                            id: id,
                            className: className,
                            buttonSelector: buttonSelector,
                            isSelected: isSelected,
                        };
                    });
                },
                {
                    selector: selectors.selector,
                    elementsSelector: selectors.elementsSelector,
                    selectedElementSelector: selectors.selectedElementSelector,
                }
            );
        } catch (error) {
            this.handleError("#parseSearchResultsList", error);
        }
    }
}
module.exports = ToolMenuSearch;
