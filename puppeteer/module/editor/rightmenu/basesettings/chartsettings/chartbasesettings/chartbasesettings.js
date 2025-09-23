const BaseSettings = require("../../basesettings");
const selectors = require("./selectors.json");
const { Button, Dropdown, Input, Checkbox } = require("../../../../../elements");
const { createErrorHandler, createExecuteAction } = require("../../../../../../engine/script/js/utils");
const { ChartActions } = require("../../../../toolbar/common");

/**
 * @typedef {Object} ChartStyle
 * @property {
 * "Style 1"
 * | "Style 2"
 * | "Style 3"
 * | "Style 4"
 * | "Style 5"
 * | "Style 6"
 * | "Style 7"
 * | "Style 8"
 * | "Style 9"
 * | "Style 10"
 * | "Style 11"
 * | "Style 12"
 * | "Style 13"
 * | "Style 14"
 * | "Style 15"
 * | "Style 16"} [styleName]
 */

/**
 * @typedef {Object} Sizes
 * @property {import("../../../../../elements/input/index").InputSettings} [width] - The width to set
 * @property {import("../../../../../elements/input/index").InputSettings} [height] - The height to set
 */

/**
 * @typedef {Object} SetChartType
 * @property {import("../../../../common/chartactions/chartactions").ChartGroupNames} [groupName]
 * @property {import("../../../../common/chartactions/chartactions").ChartNames} [chartName]
 */

/**
 * @typedef {Object} SetWrappingStyle
 * @property {"In line with text" | "Square" | "Tight" | "Through" | "Top and bottom" | "In front of Text" | "Behind text"} [wrapping]
 */

/**
 * @typedef {Object} BaseSettings
 * @property {Sizes} [size] - The sizes to set
 * @property {SetWrappingStyle} [wrappingStyle] - The wrapping style to set
 * @property {SetChartType} [changeChartType] - The chart type to set
 * @property {ChartStyle} [chartStyle] - The chart style to set
 * @property {boolean} [defaultRotation] - The default rotation to set
 * @property {import("../../../../../elements/input/index").InputSettings} [setXRotation] - The x rotation to set
 * @property {import("../../../../../elements/input/index").InputSettings} [setYRotation] - The y rotation to set
 * @property {number} [clickXRotationLeft] - The x rotation left to set
 * @property {number} [clickXRotationRight] - The x rotation right to set
 * @property {number} [clickYRotationUp] - The y rotation up to set
 * @property {number} [clickYRotationDown] - The y rotation down to set
 * @property {import("../../../../../elements/input/index").InputSettings} [setPerspective] - The perspective to set
 * @property {boolean} [rightAngle] - The right angle checkbox to set
 * @property {boolean} [autoScale] - The auto scale checkbox to set
 * @property {import("../../../../../elements/input/index").InputSettings} [depth] - The depth to set
 * @property {import("../../../../../elements/input/index").InputSettings} [height] - The height to set
 */

class ChartBaseSettings extends BaseSettings {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.chartActions = new ChartActions(tester, ChartBaseSettings.SELECTORS.CHART_BUTTON);
        this.executeAction = createExecuteAction(tester, this.handleError);
    }

    /**
     * @enum
     */
    static SETTINGS_MAP = {
        size: "setSizes",
        wrappingStyle: "setWrappingStyle",
        changeChartType: "setChartType",
        chartStyle: "setChartStyle",
        defaultRotation: "clickDefaultRotation",
        setXRotation: "setXRotation",
        setYRotation: "setYRotation",
        clickXRotationLeft: "clickXRotationLeft",
        clickXRotationRight: "clickXRotationRight",
        clickYRotationUp: "clickYRotationUp",
        clickYRotationDown: "clickYRotationDown",
        setPerspective: "setPerspective",
        clickPerspectiveNarrow: "clickPerspectiveNarrow",
        clickPerspectiveWide: "clickPerspectiveWide",
        rightAngle: "setRightAngle",
        autoScale: "setAutoScale",
        depth: "setDepth",
        height: "setHeight",
    };

    /**
     * Set the chart base settings
     * @param {BaseSettings} settings - The settings to set
     */
    async setSettings(settings) {
        await this.setSettingsByMap(settings, ChartBaseSettings.SETTINGS_MAP);
    }

    /**
     * Set the sizes of the chart
     * @param {Sizes} sizes - The sizes to set
     */
    async setSizes(sizes) {
        const { width, height } = sizes;
        const selectors = ChartBaseSettings.SELECTORS.SIZE;
        if (width) {
            await this.executeAction(Input, selectors.WIDTH, "setInputSettings", "setSizes", [width]);
        }
        if (height) {
            await this.executeAction(Input, selectors.HEIGHT, "setInputSettings", "setSizes", [height]);
        }
    }

    /**
     * Set the wrapping style of the chart
     * @param {SetWrappingStyle} wrapping - The wrapping style to set
     */
    async setWrappingStyle(wrapping) {
        const selectors = ChartBaseSettings.SELECTORS.WRAPPING_DROPDOWN;
        await this.executeAction(Dropdown, selectors, "selectDropdownItem", "setWrappingStyle", [wrapping]);
    }

    /**
     * Set the chart type
     * @param {SetChartType} chartType - The name of the chart to set
     */
    async setChartType(chartType) {
        try {
            const { groupName, chartName } = chartType;
            await this.chartActions.selectChart(groupName, chartName);
        } catch (error) {
            this.handleError(error, "setChartType");
        }
    }

    /**
     * Set the chart style
     * @param {ChartStyle} [styleName] - The name of the style to set
     */
    async setChartStyle(styleName) {
        const selectors = ChartBaseSettings.SELECTORS.CHART_STYLE_DROPDOWN;
        await this.executeAction(Dropdown, selectors, "selectDropdownItem", "setChartStyle", [styleName]);
    }

    /**
     * Click the default rotation of the chart
     */
    async clickDefaultRotation() {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.DEFAULT_ROTATION;
        await this.executeAction(Button, selector, "click", "clickDefaultRotation");
    }

    /**
     * Set the x rotation of the chart
     * @param {import("../../../../../elements/input/index").InputSettings} rotation - The rotation to set
     */
    async setXRotation(rotation) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.X.INPUT;
        await this.executeAction(Input, selector, "setInputSettings", "setXRotation", [rotation]);
    }

    /**
     * Click the x rotation left of the chart
     * @param {number} count - The number of times to click the left button
     */
    async clickXRotationLeft(count = 1) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.X.LEFT;
        await this.executeAction(Button, selector, "click", "clickXRotationLeft", [count]);
    }

    /**
     * Click the x rotation right of the chart
     * @param {number} count - The number of times to click the right button
     */
    async clickXRotationRight(count = 1) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.X.RIGHT;
        await this.executeAction(Button, selector, "click", "clickXRotationRight", [count]);
    }

    /**
     * Set the x rotation of the chart
     * @param {import("../../../../../elements/input/index").InputSettings} rotation - The rotation to set
     */
    async setYRotation(rotation) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.Y.INPUT;
        await this.executeAction(Input, selector, "setInputSettings", "setYRotation", [rotation]);
    }

    /**
     * Click the y rotation up of the chart
     * @param {number} count - The number of times to click the up button
     */
    async clickYRotationUp(count = 1) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.Y.UP;
        await this.executeAction(Button, selector, "click", "clickYRotationUp", [count]);
    }

    /**
     * Click the y rotation down of the chart
     * @param {number} count - The number of times to click the down button
     */
    async clickYRotationDown(count = 1) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.Y.DOWN;
        await this.executeAction(Button, selector, "click", "clickYRotationDown", [count]);
    }

    /**
     * Set the perspective of the chart
     * @param {import("../../../../../elements/input/index").InputSettings} perspective - The perspective to set
     */
    async setPerspective(perspective) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.PERSPECTIVE.INPUT;
        await this.executeAction(Input, selector, "setInputSettings", "setPerspective", [perspective]);
    }

    /**
     * Click the perspective narrow of the chart
     * @param {number} count - The number of times to click the narrow button
     */
    async clickPerspectiveNarrow(count = 1) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.PERSPECTIVE.NARROW;
        await this.executeAction(Button, selector, "click", "clickPerspectiveNarrow", [count]);
    }

    /**
     * Click the perspective wide of the chart
     * @param {number} count - The number of times to click the wide button
     */
    async clickPerspectiveWide(count = 1) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.PERSPECTIVE.WIDE;
        await this.executeAction(Button, selector, "click", "clickPerspectiveWide", [count]);
    }

    /**
     * Set the right angle axes checkbox
     * @param {boolean} condition - The condition to set
     */
    async setRightAngle(condition) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.CHECKBOX.RIGHT_ANGLE;
        await this.executeAction(Checkbox, selector, "set", "setRightAngle", [condition]);
    }

    /**
     * Set the Autoscale checkbox
     * @param {boolean} condition - The condition to set
     */
    async setAutoScale(condition) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.CHECKBOX.AUTOSCALE;
        await this.executeAction(Checkbox, selector, "set", "setAutoScale", [condition]);
    }

    /**
     * Set the depth of the chart
     * @param {import("../../../../../elements/input/index").InputSettings} depth - The depth to set
     */
    async setDepth(depth) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.DEPTH;
        await this.executeAction(Input, selector, "setInputSettings", "setDepth", [depth]);
    }

    /**
     * Set the height of the chart
     * @param  {import("../../../../../elements/input/index").InputSettings} height - The height to set
     */
    async setHeight(height) {
        const selector = ChartBaseSettings.SELECTORS.ROTATION.HEIGHT;
        await this.executeAction(Input, selector, "setInputSettings", "setHeight", [height]);
    }
}

module.exports = ChartBaseSettings;
