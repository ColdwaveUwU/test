const Dropdown = require("../dropdown");
const Input = require("../input");

/**
 * @typedef {Object} DropdownInputOptions
 * @property {string} selector - The CSS selector for the dropdown element.
 * @property {Array<string>} elementsValue - An array of values for dropdown options.
 * @property {string} elementsSelector - The CSS selector for the individual dropdown items.
 * @property {string} [targetSelector="a"] - The target element selector to click (default is "a").
 * @property {string} [menuSelector="ul.dropdown-menu"] - The CSS selector for the dropdown menu (default is "ul.dropdown-menu").
 */

/**
 * Represents a dropdown UI element that can be interacted with.
 */
class DropdownInput extends Dropdown {
    /**
     * Creates an instance of the Dropdown class.
     * @param {Tester} tester - The tester object responsible for browser automation.
     * @param {DropdownInputOptions} options - Configuration options for the dropdown.
     */

    constructor(tester, options) {
        super(tester, options);
    }

    /**
     * Selects a specific item from the dropdown or enters text if it is not in the list.
     * @param {string} optionValue - The value of the dropdown item to set.
     */
    async set(optionValue) {
        if (this.dropdownElementsValue.includes(optionValue)) {
            await this.selectDropdownItem(optionValue);
        } else {
            const textInput = new Input(this.tester, this.selector, false);
            await textInput.set(optionValue);
        }
    }
}

module.exports = DropdownInput;
