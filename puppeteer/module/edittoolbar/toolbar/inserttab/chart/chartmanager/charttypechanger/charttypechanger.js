const { ChartSelectors } = require("../../../../../../../constants");
const InsertTab = require("../../../inserttab");

class ChartTypeChanger extends InsertTab {
    constructor(tester) {
        super(tester);
    }

    async #openChangeType() {
        if (this.tester.checkSelector(ChartSelectors.SETTINGS_MENU)) {
            const currFrame = this.tester.getFrame();
            await currFrame.click(ChartSelectors.CHANGE_TYPE.TYPE.CHANGE_BUTTON);
        }
    }

    async #changeChartType(type) {
        const { description, id } = type;
        if (description && id) {
            await this.tester.click(ChartSelectors.CHANGE_TYPE.TYPE.DROPDOWN);
            const listSelector = ChartSelectors.CHANGE_TYPE.TYPE.LIST;
            const itemSelector = ChartSelectors.CHANGE_TYPE.TYPE.ITEM;
            const descriptionSelector = ChartSelectors.CHANGE_TYPE.TYPE.DESCRIPTION;
            await this.tester.clickItem(description, id, listSelector, itemSelector, descriptionSelector);
        }
    }

    async #changeChartStyle(styleNumber) {
        const listSelector = ChartSelectors.CHANGE_TYPE.STYLE.LIST;
        const itemSelector = ChartSelectors.CHANGE_TYPE.STYLE.ITEM;
        const styles = await this.tester.parseItems(listSelector, itemSelector);

        if (styles[0].count >= styleNumber) {
            await this.tester.click(ChartSelectors.CHANGE_TYPE.STYLE.ITEM_STYLE(styleNumber));
        }
    }

    async #addChartType() {
        await this.tester.click(ChartSelectors.CHANGE_TYPE.OK_BUTTON);
        await this.tester.sleep(500); // change to chart event
    }

    async changeType(type, styleNumber) {
        await this.#openChangeType();
        await this.#changeChartType(type);
        await this.#changeChartStyle(styleNumber);
        await this.#addChartType();
    }
}
module.exports = ChartTypeChanger;
