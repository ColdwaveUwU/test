const selectors = require("./selectors.json");
const { Checkbox } = require("../../../elements");
class CustomQuick {
    constructor(tester, openButtonSelector) {
        this.tester = tester;
        this.openButtonSelector = openButtonSelector;
    }

    static CUSTOM_QUICK_SELECTORS = selectors;

    async #openCustomQuickWindow() {
        const customQuickSelector = CustomQuick.CUSTOM_QUICK_SELECTORS.WINDOW_SELECTOR;

        const modalOpened = await this.tester.checkModalWindow();
        const selectorExists = await this.tester.checkSelector(customQuickSelector);
        const customQuickWindowIsOpened = modalOpened && selectorExists;
        if (!(await customQuickWindowIsOpened)) {
            await this.tester.click(this.openButtonSelector);
        }
    }

    /**
     *
     * @param {{save?: boolean, print?: boolean,
     *          undo?: boolean, redo?: boolean}} settings
     */
    async setCustomQuickSettings(settings) {
        const customQuickSelectors = CustomQuick.CUSTOM_QUICK_SELECTORS;
        try {
            await this.#openCustomQuickWindow();
            for (const [key, value] of Object.entries(settings)) {
                const selectorKey = key.toUpperCase();
                const selector = customQuickSelectors.CHECKBOXES[selectorKey];
                if (!selector) {
                    throw new Error(`Selector for key "${key}" not found in CUSTOM_QUICK_SELECTORS.CHECKBOXES`);
                }
                const checkbox = new Checkbox(this.tester, selector);
                await checkbox.set(value);
            }
            await this.tester.click(customQuickSelectors.OK_BUTTON);
        } catch (err) {
            throw new Error(`setCustomQuickSettings failed: ${err.message}`);
        }
    }
}

module.exports = CustomQuick;
