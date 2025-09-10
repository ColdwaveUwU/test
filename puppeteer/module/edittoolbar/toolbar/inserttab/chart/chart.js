const { ChartManager, ChartEditor, ChartCell } = require("./chartmanager");
const ChartDataSelector = require("./chartmanager/chartdataselector");
const ChartTypeChanger = require("./chartmanager/charttypechanger");
const { ChartSettings } = require("../../../../rightmenu");

class Chart {
    constructor(tester) {
        this.chartManager = new ChartManager(tester);
        this.chartEditor = new ChartEditor(tester);
        this.chartCell = new ChartCell(tester);
        this.chartTypeChanger = new ChartTypeChanger(tester);
        this.chartDataSelector = new ChartDataSelector(tester);
        this.chartSettings = new ChartSettings(tester);
    }

    async getChartList() {
        return await this.chartManager.getChartList();
    }

    /**
     * Create chart
     * @param {"Column" | "Line" | "Pie" | "Bar" | "Area" | "Stock"
     *          | "XY (Scatter)" | "Radar" | "Combo"} description - chart section description
     * @param {number} index - chart element index (0 - first element)
     */
    async createChart(description, index) {
        await this.chartManager.createChart(description, index);
    }

    // async selectCell(cellName) {
    //     await this.chartCell.selectCellById(cellName); dont work with canvas
    // }

    // async changeCellFormat(format) {
    //     await this.chartCell.changeCellFormat(format); dont work with canvas
    // }

    /**
     * Set chart settings in settings menu
     * @param {"Layout" | "VerticalAxis" | "HorizontalAxis" | "CellSnapping" | "AltText"} tabName
     * @param {object} settings
     */
    async setSettings(tabName, settings) {
        await this.chartEditor.setSetting(tabName, settings);
    }

    async addSettings() {
        await this.chartEditor.addSettings();
    }

    async changeType(type, style) {
        await this.chartTypeChanger.changeType(type, style);
    }

    async selectData(selectSettings) {
        await this.chartDataSelector.selectData(selectSettings);
    }

    async addSelectData() {
        await this.chartDataSelector.addSelectData();
    }

    async addChart() {
        await this.chartManager.addChart();
    }

    // Right menu base settings

    /**
     * Set the wrapping style of the chart
     * @param {"Square" | "In line with text" | "Tight" | "Through" | "Top and bottom" | "In front of Text"} wrapping
     */
    async setWrappingStyle(wrapping) {
        await this.chartSettings.setWrappingStyle(wrapping);
    }

    /**
     * Set the chart type
     * @param {{description: "Column" | "Line" | "Pie" | "Bar" | "Area"| "XY (Scatter)" | "Radar" | "Combo",
     *          id: number}} type - Name of the chart type and it's postion in the list
     */
    async setChartType(type) {
        await this.chartSettings.setChartType(type);
    }

    /**
     * Set the chart style
     * @param {number} styleNumber - The number of the style to set
     */
    async setChartStyle(styleNumber) {
        await this.chartSettings.setChartStyle(styleNumber);
    }

    /**
     * Set the 3D rotation
     * @param {{x: {left: number, right: number, input: number} | undefined,
     *          y: {up: number, down: number, input: number} | undefined,
     *          perspective: {narrow: number, wide: number, input: number} | undefined,
     *          depth: number | undefined,
     *          height: number | undefined} settings
     */
    async set3DRotation(settings) {
        await this.chartSettings.set3DRotation(settings);
    }

    // Right menu advanced settings

    /**
     * Set the sizes
     * @param {{width: {value: number, increment: number, decrement: number} | undefined,
     *          height: {value: number, increment: number, decrement: number} | undefined,
     *          constant: boolean | undefined}} settings - The sizes to set
     */
    async setSizes(settings) {
        await this.chartSettings.setSizes(settings);
    }

    /**
     * Set the advanced wrapping
     * @param {{style: string | undefined,
     *          distance: {top: number | undefined, left: number | undefined, right: number | undefined} | undefined}} [settings] - The wrapping settings to set
     */
    async setTextWrapping(settings) {
        await this.chartSettings.setTextWrapping(settings);
    }

    /**
     * Set the position
     * @param {import("../../../../rightmenu/basesettings/chartsettings/chartsettings").SetPosition} [settings] - The position to set
     */
    async setPosition(settings) {
        await this.chartSettings.setPosition(settings);
    }

    /**
     * Set the alternative text
     * @param {import("../../../../rightmenu/basesettings/chartsettings/chartsettings").SetAltText} [settings] - The alternative text to set
     */
    async setAltText(settings) {
        await this.chartSettings.setAltText(settings);
    }
}

module.exports = Chart;
