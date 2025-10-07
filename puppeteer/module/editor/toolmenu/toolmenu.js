const { createExecuteAction, createErrorHandler } = require("../../../engine/script/js");
const { StateButton } = require("../../elements");

class ToolMenu {
    constructor(selector, tester) {
        this.selector = selector;
        if (tester) {
            this.tester = tester;
        } else {
            this.tester = RegularTester;
        }
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Opens the menu
     */
    async openMenu() {
        await this.executeAction(StateButton, this.selector, "setState", "openMenu", [true]);
    }

    /**
     * Closes the menu
     */
    async closeMenu() {
        await this.executeAction(StateButton, this.selector, "setState", "closeMenu", [false]);
    }

    /**
     * Checks if the menu is active
     * @returns {Promise<boolean>}
     */
    async checkActive() {
        return await this.executeAction(StateButton, this.selector, "getState");
    }
}

module.exports = ToolMenu;
