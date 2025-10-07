const Button = require("../button");

class StateButton extends Button {
    constructor(tester, selector, activeElementSelector, target) {
        super(tester, selector, target);
        this.activeElementSelector = activeElementSelector;
    }

    /**
     * Click the button and wait for its state to change.
     * @returns {Promise<void>}
     */
    async click() {
        const prevState = await this.getState();
        await super.click();
        await this.waitForStateChange(prevState);
    }

    /**
     * Set the button to the desired state (active/pressed or inactive/unpressed).
     * Clicks only if the current state is different.
     * @param {boolean} desiredState - true for active/pressed, false for inactive/unpressed.
     * @returns {Promise<void>}
     */
    async setState(desiredState) {
        const currentState = await this.getState();

        if (typeof currentState !== "boolean") {
            throw new Error("Failed to determine the current button state.");
        }

        if (currentState === desiredState) {
            return;
        }

        await super.click();
        await this.waitForStateChange(currentState);
    }

    /**
     * Get current state of the button
     * @returns {Promise<boolean|null>}
     */
    async getState() {
        const { isParentElement, activeElementSelector } = this.activeElementSelector || {};
        return this.context.evaluate(
            (selector, isParentElement, activeElementSelector) => {
                let element = document.querySelector(selector);
                if (!element) {
                    return null;
                }

                if (isParentElement) {
                    element = element.closest(activeElementSelector);
                    if (!element) {
                        return null;
                    }
                } else if (activeElementSelector) {
                    element = document.querySelector(activeElementSelector);
                    if (!element) {
                        return null;
                    }
                }

                return element.classList.contains("active") || element.getAttribute("aria-pressed") === "true";
            },
            this.selector,
            isParentElement,
            activeElementSelector
        );
    }

    /**
     * Wait until the button state changes from prevState
     * @param {boolean|null} prevState
     * @returns {Promise<void>}
     */
    async waitForStateChange(prevState, stateSelector = this.selector) {
        const { isParentElement, activeElementSelector } = this.activeElementSelector || {};

        if (typeof prevState !== "boolean") {
            throw new Error("Failed to wait for state change — expected boolean value for previous state.");
        }

        try {
            await this.context.waitForFunction(
                (selector, prev, isParentElement, activeElementSelector) => {
                    let element = document.querySelector(selector);
                    if (!element) {
                        return false;
                    }

                    if (isParentElement) {
                        element = element.closest(activeElementSelector);
                        if (!element) {
                            return false;
                        }
                    } else if (activeElementSelector) {
                        element = document.querySelector(activeElementSelector);
                        if (!element) {
                            return false;
                        }
                    }

                    const curr =
                        element.classList.contains("active") || element.getAttribute("aria-pressed") === "true";

                    return curr !== prev;
                },
                { timeout: 5000 },
                stateSelector,
                prevState,
                isParentElement,
                activeElementSelector
            );
        } catch (error) {
            throw new Error(
                `Timeout waiting for button state change for selector "${stateSelector}". Previous state: ${prevState}.`
            );
        }
    }
}

module.exports = StateButton;
