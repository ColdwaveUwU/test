const { Dropdown } = require("../../../../elements");
const selectors = require("./selectors.json");
const { createErrorHandler } = require("../../../../../engine/script/js/utils");

/**
 * @typedef {Object} ChartGroupNames
 * @property {
 * "Column"
 * | "Line"
 * | "Pie"
 * | "Bar"
 * | "Area"
 * | "Stock"
 * | "XY (Scatter)"
 * | "Radar"
 * | "Combo"} [groupName] - The name of the chart group
 */

/**
 * @typedef {Object} ChartNames
 * @property {
 * "Clustered column" | "Stacked column" | "100% Stacked column" | "3-D Clustered column" |
 * "3-D Stacked column" | "3-D 100% Stacked column" | "3-D column" |
 * "Line" | "Stacked line" | "100% Stacked line" | "Line with markers" |
 * "Stacked line with markers" | "100% Stacked line with markers" | "3-D line" |
 *  "Pie" | "Doughnut" | "3-D pie" |
 * "Clustered bar" | "Stacked bar" | "100% Stacked bar" | "3-D Clustered bar" |
 * "3-D Stacked bar" | "3-D 100% Stacked bar" |
 * "Area" | "Stacked area" | "100% Stacked area" | "Stock" |
 * "Scatter" | "Scatter with smooth lines and markers" | "Scatter with smooth lines" |
 * "Scatter with straight lines and markers" | "Scatter with straight lines" |
 * "Radar" | "Radar with markers" | "Filled radar" |
 * "Clustered column - line" | "Clustered column - line on secondary axis" |
 * "Stacked area - clustered column" | "Custom combination"
 * } [chartName] - The name of the chart to select or index number (0-based)
 */

/**
 * Base class for chart operations providing common functionality
 * for chart type selection and manipulation
 */
class ChartActions {
    constructor(tester, buttonSelector) {
        this.tester = tester || RegularTester;
        this.buttonSelector = buttonSelector;
        this.handleError = createErrorHandler(this.constructor.name);
    }

    /**
     * @enu
     */
    static SELECTORS = selectors;

    /**
     * Base method for chart type selection
     * @param {ChartGroupNames} groupName - The name of the chart group
     * @param {ChartNames|number} chartName - The name of the chart to select or index number (0-based)
     * @returns {Promise<void>}
     */
    async selectChart(groupName, chartName) {
        const groupId = await this.#getGroupIdByName(groupName);
        const itemsSelectors = this.#buildItemsSelectors(groupId);
        const isIndex = typeof chartName === "number" || !isNaN(Number(chartName));
        if (isIndex) {
            const index = Number(chartName);
            await this.#executeAction(Dropdown, itemsSelectors, "selectDropdownItemByIndex", [index]);
        } else {
            await this.#executeAction(Dropdown, itemsSelectors, "selectDropdownItem", [chartName]);
        }
    }

    /**
     * Retrieves the group id by name.
     * @param {string} groupName - The name of the group.
     * @returns {string} - The id of the group.
     */
    async #getGroupIdByName(groupName) {
        try {
            const selectors = this.#buildGroupSelectors();
            const items = await this.#executeAction(Dropdown, selectors, "getDropdownItems", "#getGroupIdByName");
            const group = items.find((item) => item.description === groupName);
            if (!group && !group?.id) {
                throw new Error(`Chart group "${groupName}" not found`);
            }
            return group.id;
        } catch (error) {
            this.handleError(error, "#getGroupIdByName");
        }
    }

    /**
     * Build selectors for chart items based on group ID
     * @param {Object} selectors - Chart selectors configuration
     * @param {string} groupId - The group ID to use
     * @returns {Object} Modified selectors with group ID interpolated
     */
    #buildItemsSelectors(groupId) {
        try {
            const itemsSelectors = { ...ChartActions.SELECTORS.CHART_ITEMS_DROPDOWN };
            itemsSelectors.selector = this.buttonSelector;
            itemsSelectors.elementsSelector = itemsSelectors.elementsSelector.replace(
                "${buttonSelector}",
                this.buttonSelector
            );
            itemsSelectors.elementsSelector = itemsSelectors.elementsSelector.replace("${groupId}", groupId);
            return itemsSelectors;
        } catch (error) {
            this.handleError(error, "#buildItemsSelectors");
        }
    }

    /**
     * Build selectors for chart group based on button selector
     * @returns {Object} Modified selectors with button selector interpolated
     */
    #buildGroupSelectors() {
        try {
            const groupSelectors = { ...ChartActions.SELECTORS.CHART_GROUP_DROPDOWN };
            groupSelectors.selector = this.buttonSelector;
            groupSelectors.elementsSelector = groupSelectors.elementsSelector.replace(
                "${buttonSelector}",
                this.buttonSelector
            );
            return groupSelectors;
        } catch (error) {
            this.handleError(error, "#buildGroupSelectors");
        }
    }

    /**
     * Execute dropdown action with error handling
     * @param {Class} elementClass - The dropdown class to instantiate
     * @param {Object} selectors - Selectors for the dropdown
     * @param {string} method - Method to call on the dropdown
     * @param {string} actionName - Name of the action for error messages
     * @param {Array} args - Arguments to pass to the method
     * @returns {Promise<void>}
     */
    async #executeAction(elementClass, selectors, method, args = []) {
        try {
            const element = new elementClass(this.tester, selectors);
            return await element[method](...args);
        } catch (error) {
            this.handleError(error, "#executeAction");
        }
    }
}

module.exports = ChartActions;
