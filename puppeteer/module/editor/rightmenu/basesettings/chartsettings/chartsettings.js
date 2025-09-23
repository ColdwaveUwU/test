const RightMenu = require("../../../rightmenu/rightmenu");
const BaseSettings = require("../../../../editor/rightmenu/basesettings/basesettings");
const selectors = require("./selectors.json");
const ChartAdvanced = require("../chartsettings/chartadvanced/chartadvanced");
const ChartBaseSettings = require("../chartsettings/chartbasesettings/chartbasesettings");
const ChartEditor = require("..//chartsettings/charteditor/charteditor");
const { createErrorHandler } = require("../../../../../engine/script/js/utils");

class ChartSettings extends BaseSettings {
    constructor(tester = RegularTester) {
        super(tester, ChartSettings.SELECTORS.RIGHT_MENU_CHART);
        this.rightMenu = new RightMenu(this.tester);
        this.chartBaseSettings = new ChartBaseSettings(this.tester);
        this.advancedSettings = new ChartAdvanced(this.tester);
        this.chartEditor = new ChartEditor(this.tester);
        this.handleError = createErrorHandler(this.constructor.name);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * Open the chart settings in right menu
     */
    async openChartSettings() {
        await this.rightMenu.openSettings(this);
    }

    /**
     * Set the advanced settings
     * @param {import("./chartadvanced/chartadvanced").AdvancedSettingsOptions} settings - The settings to set
     */
    async setAdvancedSettings(settings) {
        await this.closeEditor();
        await this.openChartSettings();
        await this.advancedSettings.setSettings(settings);
    }

    /**
     * Set the base settings
     * @param {import("./chartbasesettings/chartbasesettings").BaseSettings} settings - The settings to set
     */
    async setBaseSettings(settings) {
        await this.closeEditor();
        await this.openChartSettings();
        await this.chartBaseSettings.setSettings(settings);
    }

    /**
     * Set the editor settings
     * @param {import("./charteditor/charteditor").EditorSettings} settings - The settings to set
     */
    async setEditorSettings(settings) {
        await this.openEditor();
        await this.chartEditor.setEditorSettings(settings);
    }

    /**
     * Open the chart editor
     */
    async openEditor() {
        if (!(await this.chartEditor.isEditorOpen())) {
            await this.openChartSettings();
            await this.chartEditor.openEditor();
        }
    }

    /**
     * Close the chart editor
     */
    async closeEditor() {
        if (await this.chartEditor.isEditorOpen()) {
            await this.chartEditor.closeEditor();
        }
    }
}

module.exports = ChartSettings;
