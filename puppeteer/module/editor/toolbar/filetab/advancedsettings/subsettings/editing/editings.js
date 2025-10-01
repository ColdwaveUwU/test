const { Checkbox } = require("../../../../../../elements");
const SubSettings = require("../subsettings");
const selectors = require("./selectors.json");

class Editing extends SubSettings {
    constructor(tester) {
        super();
        this.tester = tester;
    }

    /**
     * @enum
     */
    #settingsMap = {
        autosave: "AUTOSAVE",
        showPaste: "SHOW_PASTE",
        useSmart: "USE_SMART",
        makeComp: "MAKE_COMP",
    };

    static EDITING_SELECTORS = selectors;
    /**
     *
     * @param {{ autosave?: boolean, showPaste?: boolean, useSmart?: boolean, makeComp?: boolean }} settings
     */

    async setSettings(settings) {
        const editingSelectors = Editing.EDITING_SELECTORS;

        for (const [key, value] of Object.entries(settings)) {
            if (value !== undefined) {
                const selectorKey = this.#settingsMap[key];
                const selector = editingSelectors[selectorKey];
                if (selector) {
                    try {
                        const checkbox = new Checkbox(this.tester, selector);
                        await checkbox.set(value);
                    } catch (err) {
                        throw new Error(
                            `Failed to set setting "${key}"=${value} (selectorKey="${selectorKey}", selector="${selector}"): ${err.message}`
                        );
                    }
                }
            }
        }
    }
}

module.exports = Editing;
