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
        const prevState = await this.context.evaluate((sel) => {
            const btn = document.querySelector(sel);
            if (!btn) {
                return null;
            }
            return btn.classList.contains("active") || btn.getAttribute("aria-pressed") === "true";
        }, this.selector);

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
}

module.exports = StateButton;
