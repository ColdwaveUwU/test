const BaseSettings = require("../../basesettings");
const selectors = require("./selectors.json");
const TextWrappingSettings = require("./textwrappingsettings/textwrappingsettings");
const PositionSettings = require("./positionsettings/positionsettings");
const AlternativeTextSettings = require("./alternativetextsettings/alternativetextsettings");
const LayoutSettings = require("./layoutsettings/layoutsettings");
const { VerticalAxisSettings, HorizontalAxisSettings } = require("./axissettings");
const { ModalButton } = require("../../../../../elements");
const { createErrorHandler, createExecuteObjectAction } = require("../../../../../../engine/script/js/utils");

/**
 * @typedef {Object} AdvancedSettingsOptions
 * @property {import("./textwrappingsettings/textwrappingsettings").TextWrappingSettingsObject} [textWrapping]
 * @property {import("./positionsettings/positionsettings").PositionSettingsObject} [position]
 * @property {import("./alternativetextsettings/alternativetextsettings").AlternativeTextSettingsObject} [altText]
 * @property {import("./layoutsettings/layoutsettings").LayoutSettingsObject} [layout]
 * @property {import("./axissettings/axissettings").AxisSettingsObject} [verticalAxis]
 * @property {import("./axissettings/axissettings").AxisSettingsObject} [horizontalAxis]
 */

class ChartAdvanced extends BaseSettings {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * @enum
     */
    static SETTINGS_MAP = {
        textWrapping: "setTextWrapping",
        position: "setPosition",
        altText: "setAltText",
        layout: "setLayout",
        verticalAxis: "setVerticalAxis",
        horizontalAxis: "setHorizontalAxis",
    };

    constructor(tester) {
        super(tester);
        this.textWrappingSettings = new TextWrappingSettings(tester);
        this.positionSettings = new PositionSettings(tester);
        this.alternativeTextSettings = new AlternativeTextSettings(tester);
        this.layoutSettings = new LayoutSettings(tester);
        this.verticalAxisSettings = new VerticalAxisSettings(tester);
        this.horizontalAxisSettings = new HorizontalAxisSettings(tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeModalAction = createExecuteObjectAction(this.handleError);
    }

    /**
     * Get the advanced settings modal window
     * @returns {ModalButton}
     */
    get advancedSettingsModalWindow() {
        if (!this._advancedSettingsModalWindow) {
            const selectors = ChartAdvanced.SELECTORS;
            this._advancedSettingsModalWindow = new ModalButton(
                this.tester,
                selectors.RIGHT_MENU.ADVANCED_SETTINGS_BUTTON,
                selectors.MODAL_WINDOW.WINDOW,
                selectors.MODAL_WINDOW.OK_BUTTON
            );
        }
        return this._advancedSettingsModalWindow;
    }

    /**
     * Set the advanced settings
     * @param {AdvancedSettingsOptions} settings - The settings to set
     */
    async setSettings(settings) {
        await this.openAdvancedSettings();
        await this.setSettingsByMap(settings, ChartAdvanced.SETTINGS_MAP);
        await this.closeAdvancedSettings();
    }

    /**
     * Open the advanced settings modal window
     */
    async openAdvancedSettings() {
        await this.executeModalAction(this.advancedSettingsModalWindow, "openModal", "openAdvancedSettings");
    }

    /**
     * Close the advanced settings modal window (apply settings)
     */
    async closeAdvancedSettings() {
        await this.executeModalAction(this.advancedSettingsModalWindow, "closeModal", "closeAdvancedSettings");
    }

    /**
     * Set the text wrapping settings
     * @param {TextWrappingSettingsObject} settings - The settings to set
     */
    async setTextWrapping(settings) {
        await this.textWrappingSettings.setSettings(settings);
    }

    /**
     * Set the position settings
     * @param {import("./positionsettings/positionsettings").PositionSettingsObject} settings - The settings to set
     */
    async setPosition(settings) {
        await this.positionSettings.setSettings(settings);
    }

    /**
     * Set the alternative text settings
     * @param {import("./alternativetextsettings/alternativetextsettings").AlternativeTextSettingsObject} settings - The settings to set
     */
    async setAltText(settings) {
        await this.alternativeTextSettings.setSettings(settings);
    }

    /**
     * Set the layout settings
     * @param {import("./layoutsettings/layoutsettings").LayoutSettingsObject} settings - The settings to set
     */
    async setLayout(settings) {
        await this.layoutSettings.setSettings(settings);
    }

    /**
     * Set the vertical axis settings
     * @param {import("./verticalaxissettings/verticalaxissettings").VerticalAxisSettingsObject} settings - The settings to set
     */
    async setVerticalAxis(settings) {
        await this.verticalAxisSettings.setSettings(settings);
    }

    /**
     * Set the horizontal axis settings
     * @param {import("./horizontalaxissettings/horizontalaxissettings").HorizontalAxisSettingsObject} settings - The settings to set
     */
    async setHorizontalAxis(settings) {
        await this.horizontalAxisSettings.setSettings(settings);
    }
}

module.exports = ChartAdvanced;
