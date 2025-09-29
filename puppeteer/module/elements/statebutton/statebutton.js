const Button = require("../button");

class StateButton extends Button {
    constructor(tester, selector, target) {
        super(tester, selector, target);
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
        return this.context.evaluate((sel) => {
            const btn = document.querySelector(sel);
            if (!btn) {
                return null;
            }
            return btn.classList.contains("active") || btn.getAttribute("aria-pressed") === "true";
        }, this.selector);
    }

    /**
     * Wait until the button state changes from prevState
     * @param {boolean|null} prevState
     * @returns {Promise<void>}
     */
    async waitForStateChange(prevState) {
        await this.context.waitForFunction(
            (sel, prev) => {
                const btn = document.querySelector(sel);
                const curr = btn
                    ? btn.classList.contains("active") || btn.getAttribute("aria-pressed") === "true"
                    : false;
                return prev === null ? curr : curr !== prev;
            },
            { timeout: 5000 },
            this.selector,
            prevState
        );
    }
}

module.exports = StateButton;
