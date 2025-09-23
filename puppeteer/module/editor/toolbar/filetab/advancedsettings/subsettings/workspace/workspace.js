const SubSettings = require("../subsettings");
const selectors = require("./selectors.json");
const { Checkbox } = require("../../../../../../elements");
const { Dropdown } = require("../../../../../../elements");

/**
 * @typedef WorkspaceCheckboxSettings
 * @property {boolean} [turnOnScreen]
 * @property {boolean} [aligment]
 * @property {boolean} [useAlt]
 */

/**
 * @typedef WorkspaceCustomQuickAccessSettings
 * @property {boolean} [save]
 * @property {boolean} [print]
 * @property {boolean} [undo]
 * @property {boolean} [redo]
 */

/**
 * @typedef WorkspaceDropdownSettings
 * @property {string} [unit]
 * @property {string} [zoomValue]
 * @property {string} [fontHint]
 * @property {string} [macrosSettings]
 */

/**
 * @typedef WorkspaceSettings
 * @property {boolean} [turnOnScreen]
 * @property {boolean} [aligment]
 * @property {boolean} [useAlt]
 * @property {WorkspaceCustomQuickAccessSettings} customQuickAcces
 * @property {string} [unit]
 * @property {string} [zoomValue]
 * @property {string} [fontHint]
 * @property {string} [macrosSettings]
 */
class Workspace extends SubSettings {
    constructor(tester) {
        super();
        this.tester = tester;
    }

    static WORKSPACE_SELECTORS = selectors;

    static CHECKBOX_MAP = {
        turnOnScreen: selectors.CHECKBOX.TURN_ON_SCREEN,
        aligment: selectors.CHECKBOX.ALIGMENT,
        useAlt: selectors.CHECKBOX.USE_ALT,
    };

    static DROPDOWN_MAP = {
        unit: selectors.DROPDOWN.UNIT,
        zoomValue: selectors.DROPDOWN.DEFAULT_ZOOM,
        fontHint: selectors.DROPDOWN.FONT_HINT,
        macrosSettings: selectors.DROPDOWN.MACROS_SETTINGS,
    };

    static QUICK_ACCESS_KEYS = ["save", "print", "undo", "redo"];

    /**
     *
     * @param {WorkspaceCheckboxSettings} checkboxSettings
     */
    async #setCheckboxSettings(checkboxSettings) {
        const checkboxMap = Workspace.CHECKBOX_MAP;

        for (const [key, selector] of Object.entries(checkboxMap)) {
            if (key in checkboxSettings) {
                const value = checkboxSettings[key];
                if (!selector) {
                    throw new Error(`Selector for key "${key}" not found in checkboxMap`);
                }

                const checkbox = new Checkbox(this.tester, selector);
                await checkbox.set(value);
            }
        }
    }

    /**
     *
     * @param {WorkspaceCustomQuickAccessSettings} settings
     */
    async #setCustomQuickSettings(settings) {
        const customQuickSelectors = Workspace.WORKSPACE_SELECTORS.QUICK_ACCESS.BUTTON;
        const customQuickWindow = new CustomQuick(this.tester, customQuickSelectors);
        await customQuickWindow.setCustomQuickSettings(settings);
    }

    /**
     *
     * @param {WorkspaceDropdownSettings} settings
     */
    async #setDropdownSettings(settings) {
        const dropdownMap = Workspace.DROPDOWN_MAP;

        for (const [key, dropdownInfo] of Object.entries(dropdownMap)) {
            if (!Object.prototype.hasOwnProperty.call(settings, key)) continue;

            const value = settings[key];
            if (!dropdownInfo?.SELECTOR || !dropdownInfo?.ELEMENTS_SELECTOR) {
                throw new Error(`Dropdown selector configuration missing for key "${key}"`);
            }

            const dropdown = new Dropdown(this.tester, {
                selector: dropdownInfo.SELECTOR,
                elementsSelector: dropdownInfo.ELEMENTS_SELECTOR,
                descriptionSelector: dropdownInfo?.DESCRIPTION_SELECTOR,
            });
            await dropdown.getItemsAndSelectDropdown(value);
        }
    }

    /**
     *
     * @param {WorkspaceSettings} workspaceSettings
     */
    async setSettings(workspaceSettings) {
        const checkboxSettings = {};
        const dropdownSettings = {};

        for (const [key, value] of Object.entries(workspaceSettings)) {
            if (key in Workspace.CHECKBOX_MAP) {
                checkboxSettings[key] = value;
            } else if (key in Workspace.DROPDOWN_MAP) {
                dropdownSettings[key] = value;
            }
        }

        if (Object.keys(checkboxSettings).length) {
            await this.#setCheckboxSettings(checkboxSettings);
        }

        if (workspaceSettings?.customQuickAcces && Object.keys(workspaceSettings?.customQuickAcces).length) {
            await this.#setCustomQuickSettings(workspaceSettings.customQuickAcces);
        }

        if (Object.keys(dropdownSettings).length) {
            await this.#setDropdownSettings(dropdownSettings);
        }
    }
}
module.exports = Workspace;
