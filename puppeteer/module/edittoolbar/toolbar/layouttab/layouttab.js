const Toolbar = require("../toolbar");

class LayoutTab extends Toolbar {
    static MODAL_SELECTORS = {
        MODAL_FOOTER_BUTTON: ".footer button",
        MODAL_WINDOW_LINE_NUMBERS: "#window-line-numbers",
    };

    constructor(tester, buttonSelector) {
        super(tester, "Layout", buttonSelector);
    }

    /**
     * Applies modal window settings by clicking the OK button
     */
    async applyModalSettings() {
        try {
            await this.tester.selectByText("OK", LayoutTab.MODAL_SELECTORS.MODAL_FOOTER_BUTTON);
            await this.tester.checkModalWindow();
        } catch (error) {
            throw new Error(`Error applying modal settings: ${error}`);
        }
    }

    /**
     * Cancels modal window settings by clicking the Cancel button
     */
    async cancelModalSettings() {
        try {
            await this.tester.selectByText("Cancel", LayoutTab.MODAL_SELECTORS.MODAL_FOOTER_BUTTON);
            await this.tester.checkModalWindow();
        } catch (error) {
            throw new Error(`Error canceling modal settings: ${error}`);
        }
    }
}

module.exports = LayoutTab;
