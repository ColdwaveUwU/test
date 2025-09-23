const Toolbar = require("../toolbar");

class HomeTab extends Toolbar {
    constructor(tester) {
        super(tester, "Home");
    }

    /**
     * Applies settings using a mapping from keys to method names
     * @param {Object} settings - Settings object
     * @param {Object} map - Map of setting keys to method names
     */
    async setSettingsByMap(settings, map) {
        if (!settings || !map) {
            return;
        }

        for (const key of Object.keys(settings)) {
            const methodName = map[key];
            if (methodName && typeof this[methodName] === "function") {
                await this[methodName](settings[key]);
            }
        }
    }

    /**
     * Click Home button section
     */
    async clickHomeTab() {
        await super.clickTargetTab();
    }
}

module.exports = HomeTab;
