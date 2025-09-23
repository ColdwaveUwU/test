const BaseSettings = require("../basesettings");
const selectors = require("./selectors.json");

/**
 * Class representing format settings in RightMenu.
 * Extends BaseSettings to provide interaction capabilities.
 */
class FormatSettings extends BaseSettings {
    /**
     * @param {Object} tester
     */
    constructor(tester = RegularTester) {
        super(tester, selectors.RIGHT_MENU);
    }
}

module.exports = FormatSettings;
