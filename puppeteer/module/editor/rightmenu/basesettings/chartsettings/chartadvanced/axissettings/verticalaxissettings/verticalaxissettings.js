const AxisSettings = require("../axissettings");
const selectors = require("./selectors.json");

class VerticalAxisSettings extends AxisSettings {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(tester, VerticalAxisSettings.SELECTORS);
    }
}

module.exports = VerticalAxisSettings;
