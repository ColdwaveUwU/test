const Toolbar = require("../toolbar");

class LayoutTab extends Toolbar {
    static MODAL_SELECTORS = {
        MODAL_FOOTER_BUTTON: ".footer button",
        MODAL_WINDOW_LINE_NUMBERS: "#window-line-numbers",
        MORE_BUTTON_TOOLBAR: "section.panel.active span.slot-btn-more button",
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
}

module.exports = LayoutTab;
