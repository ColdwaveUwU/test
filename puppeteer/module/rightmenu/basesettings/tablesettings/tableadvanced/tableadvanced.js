const BaseSettings = require("../../basesettings");
const selectors = require("./selectors.json");
const TableSettings = require("./tablesettings");
const CellSettings = require("./cellsettings");
const BackgroundBorderSettings = require("./backgroundbordersettings");
const TextWrappingSettings = require("./textwrappingsettings");
const AlternativeTextSettings = require("./alternativetextsettings");
const TablePositionSettings = require("./tablepositionsettings");

class TableAdvanced extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static TAB_SELECTORS = selectors;

    /**
     * Selects a tab.
     * @param {string} tabSelector
     */
    async #selectTab(tabSelector) {
        if (!(await this.tester.checkSelector(`${tabSelector}.active`))) {
            await this.tester.click(tabSelector);
        }
    }

    /**
     * @typedef {Object} TableAdvancedOptions
     * @property {import("../tableadvanced/tablesettings/tablesettings").TableSettingsObject} [table]
     * @property {import("../tableadvanced/textwrappingsettings/textwrappingsettings").TextWrappingSettingsObject} [cell]
     * @property {import("../tableadvanced/backgroundbordersettings/backgroundbordersettings").BackgroundBorderSettingsObject} [backgroundBorder]
     * @property {import("../tableadvanced/tablepositionsettings/tablepositionsettings").TablePositionSettingsObject} [tablePosition]
     * @property {import("../tableadvanced/textwrappingsettings/textwrappingsettings").TextWrappingSettingsObject} [textWrapping]
     * @property {import("../tableadvanced/alternativetextsettings/alternativetextsettings").AlternativeTextSettings} [alternativeText]
     */
    /**
     * Sets a setting for a specific tab.
     * @param {string} tabName
     * @param {TableAdvancedOptions} settings
     */
    async setSetting(tabName, settings) {
        const handlers = {
            table: new TableSettings(this.tester),
            cell: new CellSettings(this.tester),
            backgroundBorder: new BackgroundBorderSettings(this.tester),
            tablePosition: new TablePositionSettings(this.tester),
            textWrapping: new TextWrappingSettings(this.tester),
            alternativeText: new AlternativeTextSettings(this.tester),
        };

        const tabSelectors = {
            table: TableAdvanced.TAB_SELECTORS.TABLESETTINGS_TAB,
            cell: TableAdvanced.TAB_SELECTORS.CELLSETTINGS_TAB,
            backgroundBorder: TableAdvanced.TAB_SELECTORS.BORDERSSETTINGS_TAB,
            tablePosition: TableAdvanced.TAB_SELECTORS.TABLEPOSITIONSETTINGS_TAB,
            textWrapping: TableAdvanced.TAB_SELECTORS.TEXTWRAPPINGSETTINGS_TAB,
            alternativeText: TableAdvanced.TAB_SELECTORS.ALTERNATIVETEXTSSETTINGS_TAB,
        };

        const handler = handlers[tabName];
        if (handler) {
            await this.#selectTab(tabSelectors[tabName]);
            await handler.applySettings(settings);
        } else {
            throw new Error(`Unknown tab: ${tabName}`);
        }
    }
}

module.exports = TableAdvanced;
