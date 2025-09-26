const UIElement = require("../uielement");

/**
 * @typedef {Object} DropdownOptions
 * @property {string} selector - The CSS selector for the dropdown element.
 * @property {Array<string>} elementsValue - An array of values for dropdown options.
 * @property {string} elementsSelector - The CSS selector for the individual dropdown items.
 * @property {string} descriptionSelector - The CSS selector for the item description.
 * @property {string} [targetSelector="a"] - The target element selector to click (default is "a").
 * @property {string} [menuSelector="ul.dropdown-menu"] - The CSS selector for the dropdown menu (default is "ul.dropdown-menu").
 * @property {string} [idSelector=null] - The CSS selector for the element containing the ID.
 */

/**
 * Represents a dropdown UI element that can be interacted with.
 */
class Dropdown extends UIElement {
    /**
     * Creates an instance of the Dropdown class.
     * @param {Tester} tester - The tester object responsible for browser automation.
     * @param {DropdownOptions} options - Configuration options for the dropdown.
     */
    constructor(
        tester,
        {
            selector,
            elementsValue,
            elementsSelector,
            descriptionSelector,
            targetSelector = "a",
            menuSelector = "ul.dropdown-menu",
            idSelector = null,
        },
        target = "frame"
    ) {
        super(tester, selector, target);
        this.dropdownMenuSelector = menuSelector;
        this.dropdownElementsValue = elementsValue;
        this.dropdownElementsSelector = elementsSelector;
        this.dropdownDescriptionSelector = descriptionSelector;
        this.dropdownTargetElementSelector = targetSelector;
        this.dropdownIdSelector = idSelector;
    }

    /**
     * Opens the dropdown menu if it is not already visible.
     * @returns {Promise<void>} - Resolves when the dropdown menu is open.
     */
    async selectDropdown() {
        try {
            await this.context.waitForFunction(
                (selector, dropdownMenuSelector) => {
                    const dropdownSelector = document.querySelector(`${selector} .dropdown-toggle`)
                        ? `${selector} .dropdown-toggle`
                        : document.querySelector(`${selector} .dropdown-manual`)
                        ? `${selector} .dropdown-manual`
                        : selector;

                    const menuSelector =
                        dropdownSelector === `${selector} .dropdown-manual`
                            ? dropdownMenuSelector
                            : `${selector} ${dropdownMenuSelector}`;
                    const isVisiableDropdown = document.querySelector(menuSelector).checkVisibility();
                    if (!isVisiableDropdown) {
                        document.querySelector(dropdownSelector).click();
                    }
                    return isVisiableDropdown;
                },
                { timeout: 5000 },
                this.selector,
                this.dropdownMenuSelector
            );
        } catch (error) {
            throw new Error(`Error selectDropdown: ${error.message}`);
        }
    }

    /**
     * Retrieves all dropdown items.
     * @returns {Promise<Array<Object>>} - Resolves with an array of dropdown item objects.
     */
    async getDropdownItems() {
        await this.selectDropdown();
        const items = await this.tester.parseItems(
            this.dropdownElementsSelector,
            this.dropdownTargetElementSelector,
            this.dropdownDescriptionSelector,
            this.dropdownIdSelector
        );
        return items;
    }

    /**
     * Selects a specific item from the dropdown.
     * Uses id if available, otherwise falls back to className.
     * @param {string} optionValue - The value of the dropdown item to select.
     * @throws {Error} - Throws an error if the specified option is not found in the dropdown.
     */
    async selectDropdownItem(optionValue) {
        const items = await this.getDropdownItems();
        const elementsValues =
            this.dropdownElementsValue && this.dropdownElementsValue.length > 0
                ? this.dropdownElementsValue
                : items.map((item) => item.description);

        const itemsMap = Object.fromEntries(
            items
                .slice(0, elementsValues.length)
                .map((item, index) => [elementsValues[index], { id: item.id, className: item.className }])
        );
        if (!itemsMap[optionValue]) {
            throw new Error(
                `Dropdown option of type "${optionValue}" with selector "${this.selector}" was not found in the available options.`
            );
        }

        const item = itemsMap[optionValue];
        const selector =
            item.id && item.id.trim() !== "" ? item.id : `${this.dropdownElementsSelector}${item.className}`;
        await this.tester.click(selector);
    }

    /**
     * Selects a specific item from the dropdown by its index.
     * @param {number} index - The index of the dropdown item to select.
     * @throws {Error} - Throws an error if the specified index is out of bounds.
     */
    async selectDropdownItemByIndex(index) {
        const items = await this.getDropdownItems();
        if (index < 0 || index >= items.length) {
            throw new Error(
                `Dropdown option with index "${index}" with selector "${this.selector}" was not found in the available options.`
            );
        }
        await this.tester.click(items[index].id);
    }

    /**
     * Get dropdown item by key & value
     * @param {string} itemKey
     * @param {string} itemValue
     * @returns {string}
     */
    async getDropdownItem(itemKey, itemValue) {
        const dropdownItems = await this.getDropdownItems();
        const targetItem = dropdownItems.find((elem) => elem[itemKey] === itemValue);
        return targetItem;
    }
}

module.exports = Dropdown;
