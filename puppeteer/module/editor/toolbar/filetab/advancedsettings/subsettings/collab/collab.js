const SubSettings = require("../subsettings");
const { Checkbox } = require("../../../../../../elements");
const selectors = require("./selectors.json");

class Collaboration extends SubSettings {
    constructor(tester) {
        super();
        this.tester = tester;
    }

    static COLLABORATION_SELECTORS = selectors;

    #settingsMap = {
        coEditingMode: (value) => [Collaboration.COLLABORATION_SELECTORS.CO_EDITING?.[value], true],
        showChanges: (value) => [Collaboration.COLLABORATION_SELECTORS.SHOW_TACK?.[value], true],
        realTime: (value) => [Collaboration.COLLABORATION_SELECTORS.REAL_TIME?.[value], true],
        showComments: (value) => [Collaboration.COLLABORATION_SELECTORS.SHOW_COMMENT, value],
        showResolved: (value) => [Collaboration.COLLABORATION_SELECTORS.SHOW_RESOLVED, value],
    };

    /**
     *
     * @param {{
     *   coEditing?: "fast" | "strict",
     *   showChanges?: "balloons" | "tooltips",
     *   realTime?: "none" | "all",
     *   showComments?: boolean,
     *   showResolved?: boolean
     * }} settings
     */
    async setSettings(settings) {
        for (const [key, value] of Object.entries(settings)) {
            if (value === undefined) {
                throw new Error(`Value for setting "${key}" is undefined`);
            }

            const getConfig = this.#settingsMap[key];
            if (!getConfig) {
                throw new Error(`Unknown setting key: "${key}"`);
            }

            const normalizedValue = typeof value === "string" ? value.toLocaleUpperCase() : value;
            const [selector, finalValue] = getConfig(normalizedValue);

            if (!selector) {
                throw new Error(`Selector not found for setting "${key}" with value "${value}"`);
            }

            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(finalValue);
        }
    }
}

module.exports = Collaboration;
