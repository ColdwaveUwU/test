const UIElement = require("../uielement");

/**
 * @typedef {Object} InputSettings
 * @property {boolean} [upArrow] - Indicates if the up arrow button should be clicked.
 * @property {boolean} [downArrow] - Indicates if the down arrow button should be clicked.
 * @property {number} [arrowClickCount] - The number of times to click the arrow buttons.
 * @property {string | number} [value] - The value to set in the input field.
 */

class Input extends UIElement {
    /**
     * Creates an instance of the Input class.
     * @param {Tester} tester - The tester object responsible for browser automation.
     * @param {string} selector - The CSS selector for the input element container.
     * @param {boolean} [pressEnter=true] - Whether to press Enter after setting the value.
     * @param {string} [targetElement="input"] - The tag or selector of the actual input element inside the container.
     */
    constructor(tester, selector, pressEnter = true, targetElement = "input", context = null) {
        super(tester, selector);
        this.pressEnter = pressEnter;
        this.targetElement = targetElement;
        this.context = context || this.tester.frame;
    }

    /**
     * Returns the full selector for the target input element.
     * @returns {string} - Full CSS selector including container and target element.
     */
    getInputSelector() {
        return `${this.selector} ${this.targetElement}`;
    }

    /**
     * Gets the current value of the input field.
     * @returns {Promise<string>} - The current value of the input field.
     */
    async getInputValue() {
        return this.context.evaluate((selector) => {
            const inputElement = document.querySelector(selector);
            return inputElement ? inputElement.value : "";
        }, this.getInputSelector());
    }

    /**
     * Sets the value of the input field, optionally pressing Enter.
     * @param {string} value - The value to set.
     * @param {number} [delay=0] - delay entering text
     * @param {boolean} [clearInput=true] - Whether to clear existing input before setting the new value.
     * @returns {Promise<void>}
     */
    async set(value, delay = 0, clearInput = true) {
        const inputSelector = this.getInputSelector();
        await this.tester.click(inputSelector);

        let inputText = value;
        if (!clearInput) {
            inputText = (await this.getInputValue()) + value;
        }
        await this.tester.inputToForm(inputText, inputSelector, delay, this.context);
        if (this.pressEnter) {
            await this.tester.keyPress("Enter", inputSelector);
        }
    }

    /**
     * Increases the value using the spinner up arrow.
     * @returns {Promise<void>}
     */
    async increase() {
        const arrowUpSelector = `${this.selector} .spinner-up`;
        await this.tester.click(arrowUpSelector);
    }

    /**
     * Decreases the value using the spinner down arrow.
     * @returns {Promise<void>}
     */
    async decrease() {
        const arrowDownSelector = `${this.selector} .spinner-down`;
        await this.tester.click(arrowDownSelector);
    }

    /**
     * Applies multiple input settings including arrow clicks and value setting.
     * @param {InputSettings} inputSettings
     * @returns {Promise<void>}
     */
    async setInputSettings(inputSettings) {
        if (!inputSettings || typeof inputSettings !== "object") {
            throw new Error("Input settings must be a non-empty object");
        }

        const { upArrow, downArrow, arrowClickCount = 0, value } = inputSettings;

        if (upArrow) {
            for (let i = 0; i < arrowClickCount; i++) {
                await this.increase();
            }
        }

        if (downArrow) {
            for (let i = 0; i < arrowClickCount; i++) {
                await this.decrease();
            }
        }

        if (value !== undefined && value !== null) {
            await this.set(value);
        }
    }
}

module.exports = Input;
