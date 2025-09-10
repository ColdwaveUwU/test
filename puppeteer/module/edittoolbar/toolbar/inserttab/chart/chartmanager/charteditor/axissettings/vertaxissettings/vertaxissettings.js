const { ChartSelectors, ChartType } = require("../../../../../../../../../constants");
const AxisSettings = require("../axissettings");
class VertAxisSettings extends AxisSettings {
    constructor(tester) {
        super(tester, ChartSelectors.EDIT_CHART.V_AXIS, ChartType.EDIT_CHART.V_AXIS);
    }
}

module.exports = VertAxisSettings;
