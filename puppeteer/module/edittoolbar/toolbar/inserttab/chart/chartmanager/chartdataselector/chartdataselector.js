const { ChartSelectors } = require("../../../../../../../constants");
const InsertTab = require("../../../inserttab");

class ChartDataSelector extends InsertTab {
    constructor(tester) {
        super(tester);
    }

    #isOpen = false;
    #existSeries = [];
    #existCategory = [];

    /**
     * @typedef {Object} SeriesItem
     * @property {string} description - The description of the series item.
     * @property {number} index - The index of the series item.
     */

    /**
     * @typedef {Object} CategoryItem
     * @property {string} description - The description of the category item.
     * @property {number} index - The index of the category item.
     */

    /**
     * @typedef {Object} SeriesConfig
     * @property {string} name - The name of the series.
     * @property {string} values - The values of the series.
     * @property {boolean} [edit] - Flag indicating if the series should be edited.
     * @property {boolean} [add] - Flag indicating if a new series should be added.
     * @property {boolean} [remove] - Flag indicating if the series should be removed.
     * @property {number} [position] - The new position of the series.
     * @property {boolean} [switchRC] - Flag indicating if rows and columns should be switched.
     */

    /**
     * @typedef {Object} LegendConfig
     * @property {SeriesConfig} series - The series configuration for the legend.
     */

    /**
     * @typedef {Object} CategoryConfig
     * @property {string} name - The name of the category.
     * @property {string} [range] - The new range to set for the category.
     */

    /**
     * @typedef {Object} SelectedData
     * @property {string} [range] - The range of data to select.
     * @property {LegendConfig} [legend] - The legend configuration.
     * @property {CategoryConfig} [category] - The category configuration.
     */

    /**
     * Updates the list of items for the specified list type ("series" or "category").
     * @param {"series" | "category"} listType - The type of list to update.
     */
    async #updateList(listType) {
        const listSelector =
            listType === "series" ? ChartSelectors.SELECT_DATA.SERIES_LIST : ChartSelectors.SELECT_DATA.CATEGORY_LIST;

        const parsedItems = await this.tester.parseItems(
            listSelector,
            ChartSelectors.SELECT_DATA.ITEM,
            ChartSelectors.SELECT_DATA.DESCRIPTION
        );

        if (listType === "series") {
            this.#existSeries = parsedItems;
        } else {
            this.#existCategory = parsedItems;
        }
    }

    /**
     * Opens the "Select Data" dialog if it is not already open.
     */
    async #openSelectData() {
        if (!this.#isOpen) {
            const isChartChangeMenuLoaded = this.tester.checkSelector(ChartSelectors.SETTINGS_MENU);
            await this.tester.click(ChartSelectors.SELECT_DATA.OPEN_BUTTON);
            await isChartChangeMenuLoaded;
            this.#isOpen = true;
        }
    }

    /**
     * Changes the chart's data range.
     * @param {string} range - The new range to set.
     */
    async #changeRange(range) {
        await this.tester.inputToForm(range, ChartSelectors.SELECT_DATA.RANGE_INPUT_FORM);
        await this.tester.click(ChartSelectors.SETTINGS_MENU);
    }

    /**
     * Edits an existing series with new values.
     * @param {SeriesConfig} series - The series data to edit.
     */
    async #editSeries(series) {
        const { name, values } = series;
        await this.tester.inputToForm(name, ChartSelectors.SELECT_DATA.EDIT_SERIES.NAME);
        await this.tester.inputToForm(values, ChartSelectors.SELECT_DATA.EDIT_SERIES.VALUES);
        await this.tester.click(ChartSelectors.SELECT_DATA.EDIT_SERIES.OK_BUTTON);
        await this.#updateList("series");
    }

    /**
     * Modifies the chart legend based on the provided series configuration.
     * @param {LegendConfig} legend - The legend configuration.
     */
    async #changeLegend(legend) {
        const { series } = legend;
        if (series) {
            const { name, edit, add, remove, position, switchRC } = series;

            await this.#updateList("series");

            const seriesExists = this.#existSeries.find((ser) => ser.description === name);

            if (seriesExists) {
                await this.tester.selectByText(name, ChartSelectors.SELECT_DATA.SERIES_ITEM);

                if (edit) {
                    await Promise.all[
                        (this.tester.click(ChartSelectors.SELECT_DATA.EDIT_SERIES.EDIT_SERIES),
                        this.tester.checkSelector(name, ChartSelectors.SELECT_DATA.EDIT_SERIES.NAME))
                    ];
                    await this.#editSeries(series);
                }

                if (remove) {
                    await this.tester.click(ChartSelectors.SELECT_DATA.DELETE_SERIES);
                    await this.#updateList("series");
                }

                if (position && position !== seriesExists.index) {
                    const clickCount = Math.abs(position - seriesExists.index);
                    const buttonSelector =
                        seriesExists.index < position
                            ? ChartSelectors.SELECT_DATA.DOWN_BUTTON
                            : ChartSelectors.SELECT_DATA.UP_BUTTON;

                    for (let i = 0; i < clickCount; i++) {
                        await this.tester.click(buttonSelector);
                    }
                }
            }

            if (add) {
                await this.tester.click(ChartSelectors.SELECT_DATA.ADD_SERIES);
                await this.#editSeries(series);
            }

            if (switchRC) {
                await this.tester.click(ChartSelectors.SELECT_DATA.SWITCH_RC);
                await Promise.all([this.#updateList("series"), this.#updateList("category")]);
            }
        }
    }

    /**
     * Modifies the chart category based on the provided category configuration.
     * @param {CategoryConfig} category - The category configuration.
     * @private
     */
    async #changeCategory(category) {
        const { name, range } = category;
        await this.#updateList("category");

        if (this.#existCategory.find((ctg) => ctg.description === name)) {
            await this.tester.selectByText(name, ChartSelectors.SELECT_DATA.CATEGORY_ITEM);
        }

        if (range) {
            await Promise.all[
                (await this.tester.click(ChartSelectors.SELECT_DATA.CATEGORY.EDIT_CATEGORY),
                await this.tester.checkSelector(ChartSelectors.SELECT_DATA.CATEGORY.NAME))
            ];
            await this.tester.inputToForm(range, ChartSelectors.SELECT_DATA.CATEGORY.NAME);
            await this.tester.click(ChartSelectors.SELECT_DATA.EDIT_SERIES.OK_BUTTON);
        }
    }

    /**
     * Retrieves the current chart data for series and categories.
     * @returns {Promise<{series: Array<SeriesItem>, category: Array<CategoryItem>}>} An object containing the current series and category data.
     */
    async getChartData() {
        try {
            if (this.#isOpen) {
            }
            await Promise.all([this.#updateList("series"), this.#updateList("category")]);
            return { series: this.#existSeries, category: this.#existCategory };
        } catch (error) {
            console.error(`Error in getChartData: ${error.stack}`);
        }
    }

    /**
     * Selects data for the chart based on the provided configuration.
     * @param {SelectedData} selectedData - The data configuration to select.
     */
    async selectData(selectedData) {
        try {
            const { range, legend, category } = selectedData;
            await this.#openSelectData();

            if (range !== undefined) {
                await this.#changeRange(range);
            }

            if (legend) {
                await this.#changeLegend(legend);
            }

            if (category) {
                await this.#changeCategory(category);
            }
        } catch (error) {
            console.error(`Error in Chart.selectData: ${error.stack}`);
        }
    }

    async addSelectData() {
        if (this.#isOpen) {
            await this.tester.click(ChartSelectors.SELECT_DATA.OK_BUTTON);
            await this.tester.sleep(1000); //todo change to event
            this.#isOpen = false;
        }
    }
}

module.exports = ChartDataSelector;
