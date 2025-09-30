const selectors = require("./selectors.json");
const { Checkbox, ModalButton } = require("../../../elements");
class CustomQuick {
    constructor(tester, openButtonSelector) {
        this.tester = tester;
        this.openButtonSelector = openButtonSelector;
    }

    #customQuickWindow = null;

    #getCustomQuickWindow() {
        if (!this.#customQuickWindow) {
            const customQuickSelectors = CustomQuick.CUSTOM_QUICK_SELECTORS;
            this.#customQuickWindow = new ModalButton(
                this.tester,
                this.openButtonSelector,
                customQuickSelectors.WINDOW_SELECTOR,
                customQuickSelectors.OK_BUTTON
            );
        }
        return this.#customQuickWindow;
    }

    static CUSTOM_QUICK_SELECTORS = selectors;

    /**
     *
     * @param {{save?: boolean, print?: boolean,
     *          undo?: boolean, redo?: boolean}} settings
     */
    async setCustomQuickSettings(settings) {
        const customQuickSelectors = CustomQuick.CUSTOM_QUICK_SELECTORS;
        try {
            const customQuickModalWindow = this.#getCustomQuickWindow();
            await customQuickModalWindow.openModal();
            for (const [key, value] of Object.entries(settings)) {
                const selectorKey = key.toUpperCase();
                const selector = customQuickSelectors.CHECKBOXES[selectorKey];
                if (!selector) {
                    throw new Error(`Selector for key "${key}" not found in CUSTOM_QUICK_SELECTORS.CHECKBOXES`);
                }
                const checkbox = new Checkbox(this.tester, selector);
                await checkbox.set(value);
            }
            await customQuickModalWindow.closeModal();
        } catch (err) {
            throw new Error(`setCustomQuickSettings failed: ${err.message}`);
        }
    }
}

module.exports = CustomQuick;
