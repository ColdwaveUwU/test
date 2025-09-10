const { ChartSelectors } = require("../../../../../../../../constants");
const InsertTab = require("../../../../inserttab");
class AltTextSettings extends InsertTab {
    constructor(tester) {
        super(tester);
    }

    async applySettings(altText) {
        const { title, description } = altText;
        if (title) {
            await this.tester.inputToForm(title, ChartSelectors.EDIT_CHART.ALT_TEXT.TITLE);
        }
        if (description) {
            await this.tester.inputToForm(description, ChartSelectors.EDIT_CHART.ALT_TEXT.DESCRIPTION);
        }
    }
}

module.exports = AltTextSettings;
