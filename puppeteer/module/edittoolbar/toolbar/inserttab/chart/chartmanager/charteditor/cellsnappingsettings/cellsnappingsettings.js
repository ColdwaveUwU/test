const { ChartSelectors, ChartType } = require("../../../../../../../../constants");
const InsertTab = require("../../../../inserttab");
class CellSnappingSettings extends InsertTab {
    constructor(tester) {
        super(tester);
    }

    async applySettings(cellOption) {
        if (ChartType.EDIT_CHART.CELL_SNAPPING.includes(cellOption)) {
            await this.tester.selectByText(cellOption, ChartSelectors.EDIT_CHART.CELL_SNAPPING.CELL_OPTIONS);
        } else {
            console.error(`Cell Option "${cellOption}" not found`);
        }
    }
}

module.exports = CellSnappingSettings;
