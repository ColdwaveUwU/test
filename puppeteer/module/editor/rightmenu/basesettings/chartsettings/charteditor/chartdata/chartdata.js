const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");
const { ModalButton, Input, Button } = require("../../../../../../elements");
const {
    createErrorHandler,
    createExecuteAction,
    createExecuteObjectAction,
} = require("../../../../../../../engine/script/js/utils");

/**
 * @typedef {Object} MoveSeriesConfig
 * @property {string} seriesName - The name of the series to move.
 * @property {number} clickCount - The number of times to click the up button.
 */

/**
 * @typedef {Object} EditSeriesConfig
 * @property {string} seriesName - The name of the series to edit.
 * @property {string} newSeriesName - The name of the series.
 * @property {string} values - The values of the series.
 */

/**
 * @typedef {Object} AxisLabelsConfig
 * @property {string} axisLabelsName - The name of the axis labels to edit.
 * @property {string} labelRange - The axis label range.
 * @property {string} selectData - The selection data for the axis label range.
 */

/**
 * @typedef {Object} ChartDataSettings
 * @property {string} chartDataRange - The chart data range.
 * @property {string} selectSeries - The series to select.
 * @property {EditSeriesConfig} addSeries - The series to add.
 * @property {EditSeriesConfig} editSeries - The series to edit.
 * @property {string} removeSeries - The series to remove.
 * @property {MoveSeriesConfig} moveSeriesUp - The series to move up.
 * @property {MoveSeriesConfig} moveSeriesDown - The series to move down.
 * @property {AxisLabelsConfig} editCategory - The axis labels to edit.
 * @property {string} selectCategory - The category to select.
 * @property {boolean} switchRowsColumns - The switch rows and columns.
 */

class ChartData extends BaseSettings {
    constructor(tester) {
        super(tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
        this.executeModalAction = createExecuteObjectAction(this.handleError);
    }

    static SELECTORS = selectors;

    static SETTINGS_MAP = {
        chartDataRange: "setChartDataRange",
        selectSeries: "selectSeries",
        addSeries: "addSeries",
        editSeries: "editSeries",
        removeSeries: "removeSeries",
        moveSeriesUp: "moveSeriesUp",
        moveSeriesDown: "moveSeriesDown",
        editCategory: "editCategory",
        selectCategory: "selectCategory",
        switchRowsColumns: "clickSwitchRowsColumns",
    };

    get chartDataModal() {
        if (!this._chartDataModal) {
            const selectors = ChartData.SELECTORS;
            this._chartDataModal = new ModalButton(
                this.tester,
                selectors.TOOLBAR.SELECT_DATA,
                selectors.MODAL_WINDOWS.CHART_EDITOR.WINDOW,
                selectors.MODAL_WINDOWS.CHART_EDITOR.BASE_BUTTONS.OK_BUTTON
            );
        }
        return this._chartDataModal;
    }

    get editSeriesModal() {
        if (!this._editSeriesModal) {
            const selectors = ChartData.SELECTORS;
            this._editSeriesModal = new ModalButton(
                this.tester,
                "",
                selectors.MODAL_WINDOWS.EDIT_SERIES.WINDOW,
                selectors.MODAL_WINDOWS.EDIT_SERIES.OK_BUTTON
            );
        }
        return this._editSeriesModal;
    }

    get axisLabelsModal() {
        if (!this._axisLabelsModal) {
            const selectors = ChartData.SELECTORS;
            this._axisLabelsModal = new ModalButton(
                this.tester,
                "",
                selectors.MODAL_WINDOWS.AXIS_LABELS.WINDOW,
                selectors.MODAL_WINDOWS.AXIS_LABELS.OK_BUTTON
            );
        }
        return this._axisLabelsModal;
    }

    get selectDataModal() {
        if (!this._selectDataModal) {
            const selectors = ChartData.SELECTORS;
            this._selectDataModal = new ModalButton(
                this.tester,
                "",
                selectors.MODAL_WINDOWS.SELECT_DATA.WINDOW,
                selectors.MODAL_WINDOWS.SELECT_DATA.OK_BUTTON
            );
        }
        return this._selectDataModal;
    }

    /**
     * Sets the chart data
     * @param {ChartDataSettings} settings - The settings to set
     */
    async setChartData(settings) {
        if (!settings) {
            return;
        }
        await this.openChartData();
        await this.setSettingsByMap(settings, ChartData.SETTINGS_MAP);
        await this.applyChartData();
    }

    /**
     * Opens the chart data modal
     */
    async openChartData() {
        await this.executeModalAction(this.chartDataModal, "openModal", "openChartData");
    }

    /**
     * Applies the chart data
     */
    async applyChartData() {
        await this.executeModalAction(this.chartDataModal, "closeModal", "applyChartData");
    }

    /**
     * Clicks the "Switch rows/columns" button
     */
    async clickSwitchRowsColumns() {
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.SWITCH_ROWS_COLUMNS_BUTTON;
        await this.executeAction(Button, selector, "click", "clickSwitchRowsColumns");
    }

    /**
     * Sets the chart data range
     * @param {string} range - The range to set
     */
    async setChartDataRange(range) {
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.DATA_RANGE_INPUT;
        await this.executeAction(Input, selector, "set", "setChartDataRange", [range], [false]);
        await this.#selectWindow("setChartDataRange");
    }

    /**
     * Selects a legend entries series by text
     * @param {string} seriesName - The series name to select
     */
    async selectSeries(seriesName) {
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.LEGEND_ENTRIES.SERIES_LIST_ITEMS;
        await this.#selectByText(seriesName, selector, "selectSeries");
    }

    /**
     * Selects a horizontal (category) axis labels by text
     * @param {string} categoryName - The category to select
     */
    async selectCategory(categoryName) {
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.HORISONTAL_AXIS.CATEGORY_LIST_ITEMS;
        await this.#selectByText(categoryName, selector, "selectCategory");
    }

    /**
     * Adds a legend entries series
     * @param {EditSeriesConfig} series - The series to add
     */
    async addSeries(series) {
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.LEGEND_ENTRIES.ADD_BUTTON;
        await this.#setEditSeriesModal(series, selector, "addSeries");
    }

    /**
     * Edits a legend entries series
     * @param {EditSeriesConfig} series - The series to edit
     */
    async editSeries(series) {
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.LEGEND_ENTRIES.EDIT_BUTTON;
        const { seriesName, newSeriesName } = series;
        if (newSeriesName) {
            series.name = newSeriesName;
        }
        await this.selectSeries(seriesName);
        await this.#setEditSeriesModal(series, selector, "editSeries");
    }

    /**
     * Deletes a legend entries series
     * @param {string} seriesName - The name of the series to delete
     */
    async removeSeries(seriesName) {
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.LEGEND_ENTRIES.REMOVE_BUTTON;
        await this.selectSeries(seriesName);
        await this.executeAction(Button, selector, "click", "removeSeries");
    }

    /**
     * Moves a legend entries series up
     * @param {MoveSeriesConfig} options - The options for the series to move
     */
    async moveSeriesUp(options) {
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.LEGEND_ENTRIES.UP_BUTTON;
        const { seriesName, clickCount } = options;
        await this.selectSeries(seriesName);
        await this.executeAction(Button, selector, "click", "moveSeriesUp", [clickCount]);
    }

    /**
     * Moves a legend entries series down
     * @param {MoveSeriesConfig} options - The options for the series to move
     */
    async moveSeriesDown(options) {
        const { seriesName, clickCount } = options;
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.LEGEND_ENTRIES.DOWN_BUTTON;
        await this.selectSeries(seriesName);
        await this.executeAction(Button, selector, "click", "moveSeriesDown", [clickCount]);
    }

    /**
     * Edits Horizontal (category) axis labels
     * @param {AxisLabelsConfig} axisLabels - The axis labels to edit
     */
    async editCategory(axisLabels) {
        const selector = ChartData.SELECTORS.MODAL_WINDOWS.CHART_EDITOR.HORISONTAL_AXIS.EDIT_BUTTON;
        await this.selectCategory(axisLabels.axisLabelsName);
        await this.#setAxisLabels(axisLabels, selector, "editCategory");
    }

    /**
     * Focuses the chart data modal window
     * @param {string} methodName - The name of the method to call
     */
    async #selectWindow(methodName) {
        await this.executeAction(Button, this.chartDataModal.modalWindowSelector, "click", methodName);
    }

    /**
     * Sets the axis labels
     * @param {AxisLabelsConfig} axisLabels - The axis labels to set
     */
    async #setAxisLabels(axisLabels, buttonSelector, methodName) {
        const selectors = ChartData.SELECTORS.MODAL_WINDOWS.AXIS_LABELS;
        const { labelRange, selectData } = axisLabels;
        await this.executeAction(Button, buttonSelector, "click", methodName);
        await this.executeModalAction(this.axisLabelsModal, "waitModalLoaded", methodName);
        if (labelRange) {
            await this.executeAction(Input, selectors.LABEL_RANGE, "set", methodName, [labelRange], [false]);
        }
        if (selectData) {
            await this.#selectData(selectors.SELECT_LABEL_RANGE_BUTTON, selectData, methodName);
        }
        await this.#pressEnter(methodName);
    }

    /**
     * Sets the edit series modal
     * @param {EditSeriesConfig} series - The series to set
     * @param {string} buttonSelector - The selector for the button to click
     * @param {string} methodName - The name of the method to call
     */
    async #setEditSeriesModal(series, buttonSelector, methodName) {
        const selectors = ChartData.SELECTORS.MODAL_WINDOWS;
        const { name, values, nameSelectData, valuesSelectData } = series;
        await this.executeAction(Button, buttonSelector, "click", methodName);
        await this.executeModalAction(this.editSeriesModal, "waitModalLoaded", methodName);
        if (name) {
            await this.executeAction(Input, selectors.EDIT_SERIES.NAME_INPUT, "set", methodName, [name], [false]);
        }
        if (values) {
            await this.executeAction(Input, selectors.EDIT_SERIES.VALUES_INPUT, "set", methodName, [values], [false]);
        }
        if (nameSelectData) {
            await this.#selectData(selectors.EDIT_SERIES.SELECT_NAME_RANGE_BUTTON, nameSelectData, methodName);
        }
        if (valuesSelectData) {
            await this.#selectData(selectors.EDIT_SERIES.SELECT_VALUES_RANGE_BUTTON, valuesSelectData, methodName);
        }
        await this.#pressEnter(methodName);
        await this.executeModalAction(this.editSeriesModal, "waitModalWindowClosed", methodName);
        await this.executeModalAction(this.chartDataModal, "waitModalLoaded", methodName);
    }

    /**
     * Applies the editor settings
     */
    async #pressEnter(methodName) {
        try {
            await this.tester.keyPress("Enter");
        } catch (error) {
            this.handleError(methodName, error, "Failed to press Enter");
        }
    }

    /**
     * Selects data for the chart in SelectDataRange modal.
     * @param {string} buttonSelector - The selector for the button to click
     * @param {string} data - The data to select
     * @param {string} methodName - The name of the method to call
     */
    async #selectData(buttonSelector, data, methodName) {
        if (!data) {
            return;
        }
        const selectors = ChartData.SELECTORS.MODAL_WINDOWS.SELECT_DATA;
        await this.executeAction(Button, buttonSelector, "click", methodName);
        await this.executeModalAction(this.selectDataModal, "waitModalLoaded", methodName);
        await this.executeAction(Input, selectors.INPUT, "set", methodName, [data], [false]);
        await this.executeAction(Button, selectors.OK_BUTTON, "click", methodName);
    }

    /**
     * Selects an item by text
     * @param {string} text - The text to select
     * @param {object} selectors - The selector to select
     * @param {string} methodName - The name of the method to call
     */
    async #selectByText(text, selectors, methodName) {
        try {
            const { selector, elementsSelector, idSelector, descriptionSelector } = selectors;
            await this.#selectWindow(methodName);
            const parsedItems = await this.tester.parseItems(
                selector,
                elementsSelector,
                descriptionSelector,
                idSelector
            );
            const item = parsedItems.find((item) => item.description === text);
            const buttonSelector = item.id && item.id.trim() !== "" ? item.id : `${selector} ${item.className}`;
            await this.executeAction(Button, buttonSelector, "click", methodName);
        } catch (error) {
            this.handleError(methodName, error);
        }
    }
}

module.exports = ChartData;
