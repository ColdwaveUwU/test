const { Button } = require("../../../../elements");
const selectors = require("./selectors.json");

class MoreButton {
    constructor(tester) {
        this.tester = tester || RegularTester;
    }

    static SELECTORS = selectors;

    /**
     * Check if element is displayed by selector - browser context function
     * @param {string} selector - Element selector
     * @return {boolean}
     */
    static #isDisplayedFunction = (selector) => {
        const container = document.querySelector(selector);
        if (!container) {
            return false;
        }
        const style = window.getComputedStyle(container);
        return style.display !== "none";
    };

    /**
     * Set visibility of more buttons
     * @param {boolean} condition - true to open, false to close
     */
    async #setVisibility(condition) {
        const moreBoxButtonElementSelector = MoreButton.SELECTORS.MORE_BUTTON_ELEMENT;

        if (!(await this.isDisplayed())) {
            return;
        }

        const moreBoxButtonElement = await this.tester.frame.$(moreBoxButtonElementSelector);

        if (!moreBoxButtonElement) {
            return;
        }

        const isEnabled = await moreBoxButtonElement.evaluate((el) => el.getAttribute("aria-pressed") === "true");

        if (condition !== isEnabled) {
            const button = new Button(this.tester, moreBoxButtonElementSelector);
            await button.click();
        }
    }

    /**
     * Check if the element is displayed
     * @return {boolean}
     */
    async isDisplayed() {
        const selector = MoreButton.SELECTORS.MORE_BUTTON;
        return await this.tester.frame.evaluate(MoreButton.#isDisplayedFunction, selector);
    }

    /**
     * Wait for more buttons to be displayed
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForDisplayed(timeout = 5000) {
        const selector = MoreButton.SELECTORS.MORE_BUTTON;
        try {
            await this.tester.frame.waitForFunction(
                MoreButton.#isDisplayedFunction,
                { timeout, polling: 100 },
                selector
            );
        } catch (error) {
            throw new Error(`More buttons failed to display within ${timeout}ms: ${error.message}`);
        }
    }

    /**
     * Open more buttons
     */
    async open() {
        await this.#setVisibility(true);
    }

    /**
     * Close more buttons
     */
    async close() {
        await this.#setVisibility(false);
    }
}

module.exports = MoreButton;
