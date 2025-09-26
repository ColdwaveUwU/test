const HomeTab = require("../hometab");
const selectors = require("./selectors.json");
const { Input, ModalButton, Dropdown } = require("../../../../elements");

/**
 * @typedef {Object} Function
 * @property { "SUM" | "AVERAGE" | "MIN" | "MAX" | "COUNT" | "Additional" } value - The function to set.
 * @property {boolean} [pressEnter=false] - Whether to press Enter after selecting the function.
 */

/**
 * @typedef {Object} InsertFunctionSettings
 * @property {string} functionName - The name of the function to search and insert in the insert function modal window.
 * @property {Array<string>} parameters - Array of parameter values for the function arguments window (e.g., ["A1:A10", "B1:B10"]).
 */

/**
 * @typedef {Object} FunctionsSettings
 * @property {Function} function - The function to set.
 * @property {InsertFunctionSettings} insertFunction - The insert function to set.
 * @property {Array<string>} functionArguments - The function arguments to set.
 */

class Functions extends HomeTab {
    constructor(tester) {
        super(tester);
        this.insertFunctionModalWindow = new ModalButton(
            this.tester,
            "",
            Functions.SELECTORS.MODAL_WINDOW.INSERT_FUNCTION.WINDOW
        );
        this.functionArgumentsModalWindow = new ModalButton(
            this.tester,
            "",
            Functions.SELECTORS.MODAL_WINDOW.FUNCTION_ARGUMENTS.WINDOW,
            Functions.SELECTORS.MODAL_WINDOW.FUNCTION_ARGUMENTS.OK_BUTTON
        );
    }

    static SELECTORS = selectors;

    static SETTINGS_MAP = {
        function: "setFunction",
        insertFunction: "insertFunction",
        functionArguments: "setFunctionArguments",
    };

    #functionsDropdown = null;
    #getFunctionsDropdown() {
        if (!this.#functionsDropdown) {
            this.#functionsDropdown = new Dropdown(this.tester, Functions.SELECTORS.TOOLBAR.FUNCTIONS_BUTTON);
        }
        return this.#functionsDropdown;
    }

    /**
     * Sets multiple settings in the Functions dialog
     * @param {FunctionsSettings} settings - Functions settings
     */
    async setSettings(settings) {
        await this.setSettingsByMap(settings, Functions.SETTINGS_MAP);
    }

    /**
     * Selects a function from the insert function dropdown button
     * @param { "SUM" | "AVERAGE" | "MIN" | "MAX" | "COUNT" | "Additional" } optionValue - The value of the function to select.
     * @param {boolean} [pressEnter=false] - Whether to press Enter after selecting the function.
     */
    async setFunction(optionValue, pressEnter = false) {
        const functionsDropdown = this.#getFunctionsDropdown();
        try {
            await functionsDropdown.selectDropdownItem(optionValue);
            if (pressEnter) {
                await this.tester.keyPress("Enter");
            }
        } catch (error) {
            this.#handleError("setFunction", error);
        }
    }

    /**
     * Inserts a function into the worksheet from additional functions dropdown "Additional" button
     * Call this function only on an empty cell.
     * @param {InsertFunctionSettings} options - The options for the function.
     */
    async insertFunction(options) {
        const { functionName, parameters } = options;
        await this.openInsertFunction();
        await this.searchFunction(functionName);
        await this.selectFunction(functionName);
        await this.applyInsertFunction();
        await this.setFunctionArguments(parameters);
    }

    /**
     * Sets function arguments in the function arguments modal window
     * Call this function only after the function is inserted.
     * @param {Array<string>} parameters - Array of parameter values to set (e.g., ["A1:A10", "B1:B10"])
     */
    async setFunctionArguments(parameters) {
        await this.openFunctionArguments();
        if (parameters && Array.isArray(parameters)) {
            for (let i = 0; i < parameters.length; i++) {
                await this.#setArgumentValue(i, parameters[i]);
            }
        }
        await this.applyFunctionArguments();
    }

    /**
     * Opens the insert function modal window from the insert function dropdown "Additional" button
     * Call this function only on an empty cell.
     */
    async openInsertFunction() {
        try {
            await this.#openFunctionModalWindow(this.insertFunctionModalWindow);
        } catch (error) {
            this.#handleError("openInsertFunction", error);
        }
    }

    /**
     * Opens the function arguments modal window from the insert function dropdown "Additional" button
     * Call this function only after the function is inserted.
     */
    async openFunctionArguments() {
        await this.#openFunctionModalWindow(this.functionArgumentsModalWindow);
    }

    /**
     * Applies the inserted function and waits for the function arguments modal window to open
     */
    async applyInsertFunction() {
        const okButtonSelector = Functions.SELECTORS.MODAL_WINDOW.INSERT_FUNCTION.OK_BUTTON;
        try {
            await Promise.all([this.tester.click(okButtonSelector), this.functionArgumentsModalWindow.isModalOpen()]);
        } catch (error) {
            this.#handleError("applyInsertFunction", error);
        }
    }

    /**
     * Applies the function arguments and closes the function arguments modal window
     */
    async applyFunctionArguments() {
        try {
            await this.functionArgumentsModalWindow.closeModal();
        } catch (error) {
            this.#handleError("applyFunctionArguments", error);
        }
    }

    /**
     * Clicks the range selection button for a specific function argument
     * @param {number} argumentIndex - The index of the argument (0-based)
     */
    async clickArgumentRangeSelector(argumentIndex) {
        const rangeSelectorButton = `${Functions.SELECTORS.MODAL_WINDOW.FUNCTION_ARGUMENTS.ARGUMENT_CONTAINER}${argumentIndex} ${Functions.SELECTORS.MODAL_WINDOW.FUNCTION_ARGUMENTS.SELECT_RANGE_BUTTON}`;

        try {
            await this.tester.click(rangeSelectorButton);
        } catch (error) {
            this.#handleError("clickArgumentRangeSelector", error);
        }
    }

    /**
     * Selects a function group in the insert function modal window
     * @param {
     * "10 last used"
     * | "All"
     * | "Text & Data"
     * | "Statistical"
     * | "Date & Time"
     * | "Engineering"
     * | "Database"
     * | "Financial"
     * | "Math & Trig"
     * | "Lookup & Reference"
     * | "Information"
     * | "Logical"
     * | "Custom"
     * } optionValue - The value of the function group to select.
     */
    async selectFunctionGroup(optionValue) {
        const selector = Functions.SELECTORS.MODAL_WINDOW.INSERT_FUNCTION.FUNCTION_GROUP_DROPDOWN;
        const functionGroupDropdown = new Dropdown(this.tester, selector);
        try {
            await functionGroupDropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("selectFunctionGroup", error);
        }
    }

    /**
     * Searches for a function by name in the insert function modal window
     * @param {string} name - The name of the function to search for.
     */
    async searchFunction(name) {
        const input = new Input(this.tester, Functions.SELECTORS.MODAL_WINDOW.INSERT_FUNCTION.SEARCH_INPUT, false);
        try {
            await input.set(name);
        } catch (error) {
            this.#handleError("searchFunction", error);
        }
    }

    /**
     * Selects a function by name in the insert function modal window
     * @param {string} name - The name of the function to select.
     */
    async selectFunction(name) {
        try {
            await this.tester.selectByText(name, Functions.SELECTORS.MODAL_WINDOW.INSERT_FUNCTION.FUNCTION_LIST);
        } catch (error) {
            this.#handleError("selectFunction", error);
        }
    }

    /**
     * Sets the value for a specific function argument by index
     * @param {number} argumentIndex - The index of the argument (0-based)
     * @param {string} value - The value to set for the argument
     */
    async #setArgumentValue(argumentIndex, value) {
        const argumentsSelector = Functions.SELECTORS.MODAL_WINDOW.FUNCTION_ARGUMENTS;
        const argumentInput = new Input(
            this.tester,
            `${argumentsSelector.ARGUMENT_CONTAINER}${argumentIndex}`,
            false,
            argumentsSelector.ARGUMENT_INPUT
        );
        try {
            await argumentInput.set(value);
        } catch (error) {
            this.#handleError("setArgumentValue", error);
        }
    }

    /**
     * Opens a function modal window and sets the function to "Additional"
     * @param {ModalButton} modalWindow - The modal window to open.
     */
    async #openFunctionModalWindow(modalWindow) {
        const functionsDropdown = this.#getFunctionsDropdown();
        const { id } = await functionsDropdown.getDropdownItem("description", "Additional");
        modalWindow.selector = id;
        await modalWindow.openModal();
    }

    /**
     * Handles errors by throwing a new error with method name and original error message.
     * @param {string} methodName The name of the method where the error occurred.
     * @param {Error} error The original error object.
     */
    #handleError(methodName, error) {
        throw new Error(`Functions.${methodName}: ${error.message}`, {
            cause: error,
        });
    }
}

module.exports = Functions;
