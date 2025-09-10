const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");
const { Input } = require("../../../../../elements");

/**
 * @typedef {Object} AlternativeTextSettings
 * @property {import("../../../../../elements/input/index").InputSettings} [title]
 * @property {import("../../../../../elements/input/index").InputSettings} [description]
 */

class AlternativeTextSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * Sets the title.
     * @param {import("../../../../../elements/input/index").InputSettings} title
     */
    async #setTitle(title) {
        const titleInput = new Input(this.tester, selectors.ALT_TITLE_INPUT, false);
        await titleInput.setInputSettings(title);
    }

    /**
     * Sets the description.
     * @param {import("../../../../../elements/input/index").InputSettings} description
     */
    async #setDescription(description) {
        const descriptionInput = new Input(this.tester, selectors.ALT_DESCRIPTION_INPUT, false, "");
        await descriptionInput.setInputSettings(description);
    }

    /**
     * Applies the alternative text settings.
     * @param {AlternativeTextSettings} settings
     */
    async applySettings(settings) {
        const handlers = {
            title: this.#setTitle.bind(this),
            description: this.#setDescription.bind(this),
        };

        await this.applySettingsMap(settings, handlers, "AlternativeText");
    }
}

module.exports = AlternativeTextSettings;
