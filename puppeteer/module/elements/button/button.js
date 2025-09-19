const UIElement = require("../uielement");

/**
 * Represents a button UI element that can be interacted with.
 */
class Button extends UIElement {
    /**
     * Creates an instance of the Button class.
     * @param {Tester} tester - The tester object responsible for browser automation.
     * @param {string} selector - The CSS selector for the button element.
     */
    constructor(tester, selector, target) {
        super(tester, selector, target);
    }
}

module.exports = Button;
