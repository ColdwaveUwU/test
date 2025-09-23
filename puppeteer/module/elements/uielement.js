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
        this.context = target === "page" ? this.tester?.page : this.tester?.frame;
    }

    /**
     * Checks if the UI element is present on the page or frame.
     * @returns {Promise<boolean>} - Returns `true` if the element is found, `false` otherwise.
     */
    async checkSelector() {
        return await this.tester.checkSelector(this.selector);
    }

    /**
     * Clicks the UI element.
     * @param {number} count - The number of times to click the element.
     */
    async click(count = 1) {
        for (let i = 0; i < count; i++) {
            await this.tester.click(this.selector, this.context);
        }
    }
}

module.exports = UIElement;
