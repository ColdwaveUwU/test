const HomeTab = require("../hometab");
const { Button, OptionsButton } = require("../../../../elements");
const selectors = require("./selectors.json");

class EditPdf extends HomeTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static EDIT_PDF_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        INSERT_PAGE: ["Insert blank page before", "Insert blank page after"],
        ROTATE_PAGE: ["Rotate right", "Rotate left"],
    };

    /**
     * Click edit pdf button
     * @param {boolean} [condition] - Condition to check if the button should be clicked if true - open edit panel, if false - close edit panel (Default: true)
     */
    async clickEditPdf(condition = true) {
        try {
            const isActive = await this.#isEditPdfButtonActive();
            if ((condition && !isActive) || (!condition && isActive)) {
                await this.#getButton(EditPdf.EDIT_PDF_SELECTORS.EDIT_PDF.BUTTON).click();
                if (condition && !isActive) {
                    await this.#waitForEditPdfButtonActivation();
                }
            }
        } catch (error) {
            this.#handleError("clickEditPdf", error);
        }
    }

    /**
     * Click the default insert page button or click the insert page button with options.
     * @param {"Insert blank page before" | "Insert blank page after"} [optionValue]
     */
    async insertPage(optionValue) {
        const insertPageButton = this.#getOptionsButton("INSERT_PAGE", EditPdf.TYPES.INSERT_PAGE);
        await this.#executeAction(insertPageButton, "setOption", "insertPage", [optionValue]);
    }

    /**
     * Click the default rotate page button or click the rotate page button with options.
     * @param {"Rotate right" | "Rotate left"} [optionValue]
     */
    async rotatePage(optionValue) {
        const rotatePageButton = this.#getOptionsButton("RORATE_PAGE", EditPdf.TYPES.ROTATE_PAGE);
        await this.#executeAction(rotatePageButton, "setOption", "rotatePage", [optionValue]);
    }

    /**
     * Click the Edit Text button
     */
    async editText() {
        const editTextSelectors = EditPdf.EDIT_PDF_SELECTORS.EDIT_TEXT;
        await this.#executeAction(this.#getButton(editTextSelectors.BUTTON), "click", "editText");
    }

    /**
     * Click the Delete Page button
     */
    async deletePage() {
        const deletePageSelectors = EditPdf.EDIT_PDF_SELECTORS.DELETE_PAGE;
        await this.#executeAction(this.#getButton(deletePageSelectors.BUTTON), "click", "deletePage");
    }

    /**
     * Get button instance
     * @param {string} selector
     * @return {Button}
     */
    #getButton(selector) {
        return new Button(this.tester, selector);
    }

    /**
     * Get options button instance
     * @param {string} selectorKey - Key in EDIT_PDF_SELECTORS
     * @param {Array} optionValues - Array of option values
     * @return {OptionsButton}
     */
    #getOptionsButton(selectorKey, optionValues) {
        const selectors = EditPdf.EDIT_PDF_SELECTORS[selectorKey];
        return new OptionsButton(this.tester, selectors.ELEMENT_SELECTOR, selectors.DEFAULT_BUTTON, {
            elementsSelector: selectors.DROPDOWN_ELEMENTS_SELECTOR,
            elementsValue: optionValues,
        });
    }

    /**
     * Universal method for executing actions on elements with retry logic
     * @param {Object} element - Element instance
     * @param {string} action - Action method to call on the element
     * @param {Array} actionParams - Parameters to pass to the action method
     * @param {string} methodName - Name of the method where the error occurred
     * @return {Promise<any>}
     */
    async #executeAction(element, action, methodName, actionParams = []) {
        try {
            await this.clickEditPdf(true);
            return await element[action](...actionParams);
        } catch (error) {
            this.#handleError(methodName, error);
        }
    }

    /**
     * Wait for edit pdf button to become active
     * @param {number} [timeout=5000] - Timeout in milliseconds
     */
    async #waitForEditPdfButtonActivation(timeout = 5000) {
        const activeButtonSelector = EditPdf.EDIT_PDF_SELECTORS.EDIT_PDF.ACTIVE_BUTTON;
        try {
            await this.tester.frame.waitForFunction(
                (selector) => {
                    const element = document.querySelector(selector);
                    return (
                        element &&
                        element.checkVisibility() &&
                        !element.disabled &&
                        element.getAttribute("aria-pressed") === "true"
                    );
                },
                { timeout, polling: 100 },
                activeButtonSelector
            );
        } catch (error) {
            throw new Error(`Edit PDF button failed to activate within ${timeout}ms: ${error.message}`);
        }
    }

    /**
     * Check if edit pdf button is currently active
     * @return {Promise<boolean>} True if button is active, false otherwise
     */
    async #isEditPdfButtonActive() {
        return await this.#getButton(EditPdf.EDIT_PDF_SELECTORS.EDIT_PDF.ACTIVE_BUTTON).checkSelector();
    }

    /**
     * Handles errors by throwing a new error with method name and original error message.
     * @param {string} methodName - The name of the method where the error occurred.
     * @param {Error} error - The original error object.
     */
    #handleError(methodName, error) {
        throw new Error(`EditPdf.${methodName}: ${error.message}`, {
            cause: error,
        });
    }
}

module.exports = EditPdf;
