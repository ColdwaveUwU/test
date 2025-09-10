const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");

class AlternativeTextSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * Set the alternative text
     * @param {{title: string, description: string}} [settings] - The settings to set
     */
    async setAltText(settings) {
        const { title, description } = settings;
        const selector = AlternativeTextSettings.SELECTORS;

        if (title) {
            await this.tester.inputToForm(title, selector.TITLE);
        }
        if (description) {
            await this.tester.inputToForm(description, selector.DESCRIPTION);
        }
    }

    /**
     * Apply the settings
     * @param {{title: string, description: string}} [settings] - The settings to set
     */
    async applySettings(settings) {
        await this.setAltText(settings);
    }
}

module.exports = AlternativeTextSettings;