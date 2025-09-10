const RightMenu = require("../../rightmenu");
const BaseSettings = require("../basesettings");
const selectors = require("./selectors.json");
const TableAdvanced = require("./tableadvanced");
const TableBaseSettings = require("./tablebasesettings");

class TableSettings extends BaseSettings {
    constructor(tester) {
        super(tester, selectors.RIGHT_MENU);
        this.rightMenu = new RightMenu(tester);
        this.advancedSettings = new TableAdvanced(tester);
        this.baseSettings = new TableBaseSettings(tester);
    }

    /**
     * @enum
     */
    static TABLE_TAB_SELECTORS = selectors;

    /**
     * Open table settings
     */
    async openTableSettings() {
        if (!(await this.#checkActive(TableSettings.TABLE_TAB_SELECTORS.RIGHT_MENU))) {
            await this.rightMenu.openSettings(this);
        }
    }

    /**
     * Checks if the element is active
     * @param {string} selector
     */
    async #checkActive(selector) {
        const activeSelector = selector + ".active";
        return await this.tester.checkSelector(activeSelector);
    }

    async setBaseSettings(settings) {
        await this.openTableSettings();
        await this.baseSettings.setSetting(settings);
    }

    /**
     * Open advanced settings
     */
    async openAdvancedSettings(tableSettingsModalWindow) {
        await this.openTableSettings();
        await tableSettingsModalWindow.openModal();
    }

    /**
     * Apply settings on chosen tab in advanced settings window
     * @param {"Table" | "Cell" | "BackgroundBorder" | "TextWrapping" | "AlternativeText"} [tabName] - Name of the tab to apply settings to
     * @param {TableOptions} [settings] - Settings to apply
     */
    async applySettings(tabName, settings, tableSettingsModalWindow) {
        await this.openAdvancedSettings(tableSettingsModalWindow);
        return await this.advancedSettings.setSetting(tabName, settings);
    }
}

module.exports = TableSettings;
