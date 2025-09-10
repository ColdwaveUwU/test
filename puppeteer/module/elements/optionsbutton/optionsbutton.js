const UIElement = require("../uielement");
const Button = require("../button");
const Dropdown = require("../dropdown");

/**
 * Represents an options button that can open a dropdown and allow selection of an option.
 */
class OptionsButton extends UIElement {
    /**
     * @param {Tester} tester - The tester object responsible for browser automation.
     * @param {string} selector - The CSS selector for the options button.
     * @param {string} buttonSelector - The CSS selector for the button inside the options element.
     * @param {import("../dropdown").DropdownOptions} dropdownSelectors - The selectors for the dropdown elements.
     * @param {string} [target="frame"] - The target context for the element, either "page" or "frame".
     */
    constructor(tester, selector, buttonSelector, dropdownSelectors, target = "frame") {
        super(tester, selector, target);

        this.buttonSelector = buttonSelector;
        this.dropdownSelectors = dropdownSelectors;
    }

    /**
     * Sets the selected option in the dropdown.
     * If no option is provided, the default option button will be clicked.
     * @param {string} [optionValue] - The value of the option to select from the dropdown.
     */
    async setOption(optionValue) {
        if (!optionValue) {
            const defaultOptionButton = new Button(this.tester, this.buttonSelector);
            await defaultOptionButton.click();
        } else {
            const optionsDropdown = new Dropdown(this.tester, {
                selector: this.selector,
                ...this.dropdownSelectors,
            });
            await optionsDropdown.selectDropdownItem(optionValue);
        }
    }
}

module.exports = OptionsButton;
