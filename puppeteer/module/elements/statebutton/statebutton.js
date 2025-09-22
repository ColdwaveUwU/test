const Button = require("../button");

class StateButton extends Button {
    constructor(tester, selector, target) {
        super(tester, selector, target);
    }

    async #isActive() {
        return this.context.evaluate((sel) => {
            const btn = document.querySelector(sel);
            return btn ? btn.classList.contains("active") || btn.getAttribute("aria-pressed") === "true" : false;
        }, this.selector);
    }

    /**
     * Click the button and wait for its state to change.
     * @returns {Promise<void>}
     */
    async click() {
        const prevState = await this.#isActive();

        await super.click(this.selector);

        return this.context.waitForFunction(
            (sel, prev) => {
                const btn = document.querySelector(sel);
                const curr = btn
                    ? btn.classList.contains("active") || btn.getAttribute("aria-pressed") === "true"
                    : false;
                return prev === null ? curr : curr !== prev;
            },
            { timeout: 1000 },
            this.selector,
            prevState
        );
    }

    /**
     * Set the button to active state if it is not already active.
     */
    async setActive() {
        if (!(await this.#isActive())) {
            await this.click();
        }
    }

    /**
     * Set the button to inactive state if it is currently active.
     */
    async setInactive() {
        if (await this.#isActive()) {
            await this.click();
        }
    }

    /**
     * Set the button to the desired state (true = active, false = inactive).
     * @param {boolean} desiredState - Target state for the button.
     * @returns {Promise<void>}
     */
    async setState(desiredState) {
        const isActive = await this.#isActive();
        if (desiredState !== isActive) {
            await this.click();
        }
    }
}

module.exports = StateButton;
