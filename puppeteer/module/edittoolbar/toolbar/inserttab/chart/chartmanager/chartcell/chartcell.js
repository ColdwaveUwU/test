const { ChartSelectors } = require("../../../../../../../constants");
const InsertTab = require("../../../inserttab");

class ChartCell extends InsertTab {
    constructor(tester) {
        super(tester);
    }

    //todo dont work with canvas
    async selectCellById(cellId) {
        await this.tester.mouseClickInsideElement(ChartSelectors.CELL.CANVAS, 0, 0);
        await this.tester.inputToForm(cellId, ChartSelectors.CELL.CELL_NAME);
        await this.tester.keyPress("Enter");
    }

    async changeCellFormat(optionDescription) {
        try {
            await this.tester.click(ChartSelectors.CELL.FORMAT);
            const listSelector = `#${ChartSelectors.CELL.FORMAT} ul li`;
            const itemSelector = "a";
            const settings = await this.tester.parseItems(listSelector, itemSelector, itemSelector);
            const targetOption = settings.find((item) => item.description === optionDescription);

            if (targetOption?.id) {
                await this.tester.click(targetOption.id);
            } else {
                console.error("Option not found.");
            }
        } catch (error) {
            throw new Error(`Failed to set option for ${optionDescription}: ${error}`);
        }
    }
}

module.exports = ChartCell;
