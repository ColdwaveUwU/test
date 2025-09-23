const BaseSettings = require("../../../basesettings");
const { Input, Button } = require("../../../../../../elements");
const selectors = require("./selectors.json");
const { createErrorHandler, createExecuteAction } = require("../../../../../../../engine/script/js/utils");

/**
 * @typedef {Object} AlternativeTextSettingsObject
 * @property {string} [title]
 * @property {string} [description]
 */

class AlternativeTextSettings extends BaseSettings {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    static SETTINGS_MAP = {
        title: "setTitle",
        description: "setDescription",
    };

    constructor(tester) {
        super(tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Set the alternative text
     * @param {AlternativeTextSettingsObject} [settings] - The settings to set
     */
    async setSettings(settings) {
        await this.#selectTab();
        await this.setSettingsByMap(settings, AlternativeTextSettings.SETTINGS_MAP);
    }

    /**
     * Set the alternative text title
     * @param {string} [title] - The title to set
     */
    async setTitle(title) {
        const selector = AlternativeTextSettings.SELECTORS.TITLE;
        await this.executeAction(Input, selector, "set", "setTitle", [title], [false]);
    }

    /**
     * Set the alternative text description
     * @param {string} [description] - The description to set
     */
    async setDescription(description) {
        const selector = AlternativeTextSettings.SELECTORS.DESCRIPTION;
        await this.executeAction(Input, selector, "set", "setDescription", [description], [false, ""]);
    }

    /**
     * Select the alternative text tab
     */
    async #selectTab() {
        await this.executeAction(Button, AlternativeTextSettings.SELECTORS.TAB_BUTTON, "click", "selectTab");
    }
}

module.exports = AlternativeTextSettings;
