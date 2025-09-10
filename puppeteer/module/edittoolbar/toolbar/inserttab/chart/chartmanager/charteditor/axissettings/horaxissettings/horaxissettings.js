const { ChartSelectors, ChartType } = require("../../../../../../../../../constants");
const AxisSettings = require("../axissettings");

class HorAxisSettings extends AxisSettings {
    constructor(tester) {
        super(tester, ChartSelectors.EDIT_CHART.H_AXIS, ChartType.EDIT_CHART.H_AXIS);
    }
}

module.exports = HorAxisSettings;
