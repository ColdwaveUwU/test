const AxisSettings = require("../axissettings");
const selectors = require("./selectors.json");

class HorizontalAxisSettings extends AxisSettings {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(tester, HorizontalAxisSettings.SELECTORS);
    }
}

module.exports = HorizontalAxisSettings;
