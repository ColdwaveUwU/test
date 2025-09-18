const UIElement = require("../uielement");
const selectors = require("./selectors.json");
/**
 * Represents a checkbox UI element that can be interacted with.
 * Provides methods to check, uncheck, and get the state of checkbox elements.
 */
class Checkbox extends UIElement {
    /**
     * Creates an instance of the Checkbox class.
     * @param {Tester} tester - The tester object responsible for browser automation.
     * @param {string} selector - The CSS selector for the checkbox element.
     * @param {string} [targetElement] - The target element for the checkbox.
     * @param {object} [context] - The context in which to operate (e.g., a specific frame or page).
     */
    constructor(tester, selector, targetElement = null, target = "frame") {
        super(tester, selector, target);
        this.targetElement = targetElement;
    }

    #targetElementsMap = selectors;

    /**
     * Gets the full selector for the target checkbox element.
     * @returns {Promise<string>} - Full CSS selector including container and target element.
     */
    async #getCheckboxSelector() {
        if (this.targetElement) {
            return `${this.selector} ${this.targetElement}`;
        }
        const foundSelector = await this.context.evaluate(
            (containerSelector, targetsMap) => {
                const container = document.querySelector(containerSelector);
                if (!container) {
                    return null;
                }

                for (const key in targetsMap) {
                    if (container.querySelector(targetsMap[key])) {
                        return `${containerSelector} ${targetsMap[key]}`;
                    }
                }

                throw new Error(`No target elements found inside container: ${containerSelector}`);
            },
            this.selector,
            this.#targetElementsMap
        );

        return foundSelector;
    }

    /**
     * Checks if the given element is checked.
     * @param {Element} el - The checkbox element to check.
     * @returns {boolean} - True if the checkbox is checked, false otherwise.
     */
    #isElementChecked(el) {
        return (
            el.getAttribute("aria-checked") === "true" ||
            el.classList.contains("checked") ||
            el.getAttribute("aria-pressed") === "true"
        );
    }

    /**
     * Sets the checkbox to the specified state.
     * @param {boolean} condition - The desired state of the checkbox (true for checked, false for unchecked).
     * @returns {Promise<void>}
     */
    async set(condition) {
        if (typeof condition !== "boolean") {
            throw new TypeError(`Invalid type for condition: expected boolean, got ${typeof condition}`);
        }

        const checkBoxSelector = await this.#getCheckboxSelector();
        const checkboxElement = await this.context.$(checkBoxSelector);

        if (!checkboxElement) {
            throw new Error(`Checkbox with selector "${checkBoxSelector}" not found`);
        }

        await this.context.waitForFunction(
            (el, expected) => {
                const state =
                    el.getAttribute("aria-checked") === "true" ||
                    el.classList.contains("checked") ||
                    el.getAttribute("aria-pressed") === "true";

                if (state !== expected) {
                    el.click();
                }
                return state == expected;
            },
            { timeout: 5000 },
            checkboxElement,
            condition
        );
    }

    /**
     * Checks the checkbox (sets it to true state).
     * @returns {Promise<void>}
     */
    async check() {
        await this.set(true);
    }

    /**
     * Unchecks the checkbox (sets it to false state).
     * @returns {Promise<void>}
     */
    async uncheck() {
        await this.set(false);
    }

    /**
     * Toggles the checkbox state.
     * @returns {Promise<void>}
     */
    async toggle() {
        return this.set(!(await this.isChecked()));
    }

    /**
     * Gets the current state of the checkbox.
     * @returns {Promise<boolean>} - Returns true if checkbox is checked, false otherwise.
     */
    isChecked() {
        return this.context.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (!element) {
                throw new Error(`Checkbox element not found for selector: ${selector}`);
            }

            return (
                element.getAttribute("aria-checked") === "true" ||
                element.classList.contains("checked") ||
                element.getAttribute("aria-pressed") === "true"
            );
        }, this.#getCheckboxSelector());
    }

    /**
     * Waits for the checkbox to reach the specified state.
     * @param {boolean} expectedState - The expected state to wait for.
     * @param {number} [timeout=5000] - Maximum time to wait in milliseconds.
     * @returns {Promise<void>}
     */
    waitForState(expected, timeout = 5000) {
        return this.context.waitForFunction(
            (selector, exp, checker) => {
                const el = document.querySelector(selector);
                return el && checker(el) === exp;
            },
            { timeout },
            this.#getCheckboxSelector(),
            expected,
            this.#isElementChecked
        );
    }
}

module.exports = Checkbox;
