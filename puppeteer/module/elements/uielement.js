/**
 * Represents a UI element on a page or frame for interaction.
 */
class UIElement {
    /**
     * Creates an instance of the UIElement class.
     * @param {Tester} tester - The tester object responsible for browser automation.
     * @param {string} selector - The CSS selector for the UI element.
     * @param {string} [target="frame"] - The target context for the element, either "page" or "frame".
     */
    constructor(tester, selector, target = "frame") {
        this.tester = tester;
        this.selector = selector;
        this.context = target === "page" ? this.tester.page : this.tester.frame;
    }

    /**
     * Clicks the UI element.
     */
    async click() {
        await this.tester.click(this.selector, this.context);
    }

    /**
     * Checks if the UI element is present on the page or frame.
     * @returns {Promise<boolean>} - Returns `true` if the element is found, `false` otherwise.
     */
    async checkSelector() {
        try {
            await this.context.waitForFunction(
                (selector) => {
                    return document.querySelector(selector);
                },
                { timeout: 5000, polling: 100 },
                this.selector
            );
            return true;
        } catch {
            return false;
        }
    }
}

module.exports = UIElement;
