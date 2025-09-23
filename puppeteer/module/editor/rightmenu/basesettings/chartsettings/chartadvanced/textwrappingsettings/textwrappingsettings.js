const BaseSettings = require("../../../basesettings");
const { Button, Input } = require("../../../../../../elements");
const selectors = require("./selectors.json");
const { createErrorHandler, createExecuteAction } = require("../../../../../../../engine/script/js/utils");

/**
 * @typedef {Object} WrappingStyle - Wrapping style
 * @property {"Inline" | "Square" | "Tight" | "Through" | "Topbottom" | "Infront"| "Behind"} [style] - Wrapping style
 */

/**
 * @typedef {Object} Distance - Distance settings
 * @property {import("../../../../../../elements/input/input").InputSettings} [top] - Top distance
 * @property {import("../../../../../../elements/input/input").InputSettings} [bottom] - Bottom distance
 * @property {import("../../../../../../elements/input/input").InputSettings} [left] - Left distance
 * @property {import("../../../../../../elements/input/input").InputSettings} [right] - Right distance
 */

/**
 * @typedef {Object} TextWrappingSettingsObject
 * @property {Distance} [distance] - Distance settings
 * @property {WrappingStyle} [style] - Wrapping style
 */

class TextWrappingSettings extends BaseSettings {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    static SETTINGS_MAP = {
        style: "setWrappingStyle",
        distance: "setDistance",
    };

    constructor(tester) {
        super(tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Set the text wrapping settings
     * @param {TextWrappingSettingsObject} settings - The settings to set
     */
    async setSettings(settings) {
        await this.#selectTab();
        await this.setSettingsByMap(settings, TextWrappingSettings.SETTINGS_MAP);
    }

    /**
     * Set the wrapping style
     * @param {WrappingStyle} [style] - The wrapping style to set
     */
    async setWrappingStyle(style) {
        const selector = TextWrappingSettings.SELECTORS.STYLE.replace("{style}", style.toLowerCase());
        await this.executeAction(Button, selector, "click", "setWrappingStyle");
    }

    /**
     * @param {Distance} settings - The distance settings
     */
    async setDistance(settings) {
        const selectors = TextWrappingSettings.SELECTORS.DISTANCE;
        const distanceSelectors = {
            top: selectors.TOP,
            bottom: selectors.BOTTOM,
            left: selectors.LEFT,
            right: selectors.RIGHT,
        };
        for (const [key, value] of Object.entries(settings)) {
            const selector = distanceSelectors[key.toLowerCase()];
            if (selector) {
                await this.executeAction(Input, selector, "setInputSettings", "setDistance", [value]);
            }
        }
    }

    async #selectTab() {
        const selector = TextWrappingSettings.SELECTORS.TAB_BUTTON;
        await this.executeAction(Button, selector, "click", "selectTab");
    }
}

module.exports = TextWrappingSettings;
