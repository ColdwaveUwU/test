/**
 * Class that allows opening specific settings in RightMenu.
 */
class RightMenu {
    constructor(tester = RegularTester) {
        this.tester = tester;
    }

    /**
     * Checks if a button is active.
     * @param {string} selector - Selector of the button.
     * @returns {Promise<boolean>} - Returns `true` if the button is active, otherwise `false`.
     */
    async isButtonActive(selector) {
        return await this.tester.frame.evaluate((selector) => {
            const button = document.querySelector(selector);
            return button && button.classList.contains("active");
        }, selector);
    }

    /**
     * Opens settings if they are not active.
     * @param {Object} settings - Settings instance
     * @returns {Promise<void>}
     */
    async openSettings(settings) {
        if (!(await this.isButtonActive(settings.selector))) {
            await settings.open();
        }
    }
}

module.exports = RightMenu;
