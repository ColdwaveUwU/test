const { ChartSettings } = require("../../../rightmenu");
const InsertTab = require("../inserttab");
const { createErrorHandler, createExecuteObjectAction } = require("../../../../../engine/script/js/utils");
const { ChartActions } = require("../../common");
const selectors = require("./selectors.json");

/**
 * @typedef {Object} ChartType
 * @property {import("../../../../common/chartactions/chartactions").ChartGroupNames} [groupName] - The name of the group to create the chart in
 * @property {import("../../../../common/chartactions/chartactions").ChartNames | number} [chartName] - The name of the chart to create or index number (0-based)
 */

class Chart extends InsertTab {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(tester);
        this.chartSettings = new ChartSettings(tester);
        this.chartActions = new ChartActions(tester, Chart.SELECTORS.CHART_BUTTON);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeObjectAction = createExecuteObjectAction(this.handleError);
    }

    /**
     * Open the chart editor
     */
    async openEditor() {
        await this.executeObjectAction(this.chartSettings, "openEditor", "openEditor");
    }

    /**
     * Close the chart editor
     */
    async closeEditor() {
        await this.executeObjectAction(this.chartSettings, "closeEditor", "closeEditor");
    }

    /**
     * Set the editor settings for the chart
     * @param {import("../../../../rightmenu/basesettings/chartsettings/charteditor/charteditor").EditorSettings} settings - The settings to set
     */
    async setEditorSettings(settings) {
        await this.executeObjectAction(this.chartSettings, "setEditorSettings", "setEditorSettings", [settings]);
    }

    /**
     * Create a chart
     * @param {ChartType} options - The options to create the chart
     */
    async createChart(options) {
        const { groupName, chartName } = options;
        await this.executeObjectAction(this.chartActions, "selectChart", "selectChart", [groupName, chartName]);
        await this.executeObjectAction(this.chartSettings.chartEditor, "initializeFrame", "initializeFrame");
    }

    /**
     * Set the base settings for the chart in right menu panel
     * @param {import("../../../../rightmenu/basesettings/chartsettings/chartbasesettings/chartbasesettings").BaseSettings} settings - The settings to set
     */
    async setSettings(settings) {
        await this.executeObjectAction(this.chartSettings, "setBaseSettings", "setSettings", [settings]);
    }

    /**
     * Set the advanced settings for the chart in right menu panel
     * @param {import("../../../../rightmenu/basesettings/chartsettings/chartadvanced/chartadvanced").AdvancedSettingsOptions} settings - The settings to set
     */
    async setAdvancedSettings(settings) {
        await this.executeObjectAction(this.chartSettings, "setAdvancedSettings", "setAdvancedSettings", [settings]);
    }
}

module.exports = Chart;
