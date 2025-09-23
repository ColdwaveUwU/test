const { ChartSettings } = require("../../../rightmenu");
const InsertTab = require("../inserttab");
const { createErrorHandler } = require("../../../../../engine/script/js/utils");
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
    }

    /**
     * Open the chart editor
     */
    async openEditor() {
        await this.chartSettings.openEditor();
    }

    /**
     * Close the chart editor
     */
    async closeEditor() {
        await this.chartSettings.closeEditor();
    }

    /**
     * Set the editor settings for the chart
     * @param {import("../../../../rightmenu/basesettings/chartsettings/charteditor/charteditor").EditorSettings} settings - The settings to set
     */
    async setEditorSettings(settings) {
        try {
            await this.chartSettings.setEditorSettings(settings);
        } catch (error) {
            this.handleError(error, "setEditorSettings");
        }
    }

    /**
     * Create a chart
     * @param {ChartType} options - The options to create the chart
     */
    async createChart(options) {
        try {
            const { groupName, chartName } = options;
            await this.chartActions.selectChart(groupName, chartName);
            await this.chartSettings.chartEditor.initializeFrame();
        } catch (error) {
            this.handleError(error, "createChart");
        }
    }

    /**
     * Set the base settings for the chart in right menu panel
     * @param {import("../../../../rightmenu/basesettings/chartsettings/chartbasesettings/chartbasesettings").BaseSettings} settings - The settings to set
     */
    async setSettings(settings) {
        try {
            await this.chartSettings.setBaseSettings(settings);
        } catch (error) {
            this.handleError(error, "setSettings");
        }
    }

    /**
     * Set the advanced settings for the chart in right menu panel
     * @param {import("../../../../rightmenu/basesettings/chartsettings/chartadvanced/chartadvanced").AdvancedSettingsOptions} settings - The settings to set
     */
    async setAdvancedSettings(settings) {
        try {
            await this.chartSettings.setAdvancedSettings(settings);
        } catch (error) {
            this.handleError(error, "setAdvancedSettings");
        }
    }
}

module.exports = Chart;
