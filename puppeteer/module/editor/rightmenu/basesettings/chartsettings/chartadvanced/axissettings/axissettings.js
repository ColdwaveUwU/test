const BaseSettings = require("../../../basesettings");
const { Button, Input, Dropdown, Checkbox } = require("../../../../../../elements");
const { NumberFormat } = require("../../../../../../editor/modalwindows");
const { createErrorHandler, createExecuteAction } = require("../../../../../../../engine/script/js/utils");

/**
 * @typedef {Object} AxisTitles
 * @property {"None" | "Rotated" | "Horizontal"} [optionValue] - Axis title text
 */

/**
 * @typedef {Object} Gridlines
 * @property {"None" | "Major" | "Minor" | "Major and Minor"} [optionValue] - Gridlines
 */

/**
 * @typedef {Object} AxisCrosses
 * @property {"Auto" | "Value" | "Minimum Value" | "Maximum Value"} [type] - Axis crosses dropdown option
 * @property {import("../../../../../../elements/input/input").InputSettings} [value] - Axis crosses value input
 */

/**
 * @typedef {Object} AxisPosition
 * @property {"On Tick Marks" | "Between Tick Marks"} [type] - Axis position dropdown option
 */

/**
 * @typedef {Object} MarkTypes
 * @property {"None" | "Cross" | "In" | "Out"} [type] - Major and minor mark type dropdown option
 */

/**
 * @typedef {Object} DisplayUnits
 * @property {boolean} [valuesInReverseOrder] - Values in reverse order checkbox
 * @property {boolean} [logarithmicScale] - Logarithmic Scale checkbox
 * @property {import("../../../../../../elements/input/input").InputSettings} [base] - Base input for logarithmic scale
 */

/**
 * @typedef {Object} MinMaxValues
 * @property {"Auto" | "Fixed"} [type] - Min/Max value dropdown option
 * @property {import("../../../../../../elements/input/input").InputSettings} [value] - Min/Max value input
 */

/**
 * @typedef {Object} TickOptions
 * @property {MarkTypes} [majorType] - Major type dropdown option
 * @property {MarkTypes} [minorType] - Minor type dropdown option
 * @property {import("../../../../../../elements/input/input").InputSettings} [interval] - Interval input
 */

/**
 * @typedef {Object} LabelOptions
 * @property {"None" | "Low" | "High" | "Next to axis"} [position] - Label position dropdown option
 * @property {import("../../../../../../elements/input/input").InputSettings} [axisLabelDistance] - Axis label distance input
 * @property {"Auto" | "Manual"} [intervalBetweenType] - Interval between type dropdown option
 * @property {import("../../../../../../elements/input/input").InputSettings} [intervalBetweenValue] - Interval between value input
 * @property {NumberFormat} [numberFormat] - Format settings for the label
 */

/**
 * @typedef {Object} AxisSettingsObject
 * @property {boolean} [hideAxis] - Hide axis checkbox
 * @property {AxisTitles} [title] - Axis title dropdown option
 * @property {Gridlines} [gridlines] - Gridlines dropdown option
 * @property {AxisCrosses} [axisCrosses] - Axis crosses settings
 * @property {AxisPosition} [axisPosition] - Axis position settings
 * @property {DisplayUnits} [displayUnits] - Display units settings
 * @property {MinMaxValues} [minimumValue] - Minimum value settings
 * @property {MinMaxValues} [maximumValue] - Maximum value settings
 * @property {TickOptions} [tickOptions] - Tick options settings
 * @property {LabelOptions} [labelOptions] - Label options settings
 */

class AxisSettings extends BaseSettings {
    static SETTINGS_MAP = {
        AXIS_SETTINGS: {
            hideAxis: "setHideAxis",
            title: "setTitle",
            gridlines: "setGridlines",
            axisCrosses: "setAxisCrosses",
            axisPosition: "setAxisPosition",
            displayUnits: "setDisplayUnits",
            minimumValue: "setMinimumValue",
            maximumValue: "setMaximumValue",
            tickOptions: "setTickOptions",
            labelOptions: "setLabelOptions",
        },
        MINIMUM_VALUE: {
            type: "setMinValType",
            value: "setMinValValue",
        },
        MAXIMUM_VALUE: {
            type: "setMaxValType",
            value: "setMaxValValue",
        },
        AXIS_CROSSES: {
            type: "setAxisCrossesDropdown",
            value: "setAxisCrossesValue",
        },
        DISPLAY_UNITS: {
            valuesInReverseOrder: "setValuesInReverse",
            logarithmicScale: "setLogarithmicScale",
            base: "setBase",
        },
        TICK_OPTIONS: {
            majorType: "setMajorType",
            minorType: "setMinorType",
            interval: "setInterval",
        },
        LABEL_OPTIONS: {
            position: "setLabelPosition",
            axisLabelDistance: "setAxisLabelDistance",
            intervalBetweenType: "setIntervalBetweenType",
            intervalBetweenValue: "setIntervalBetweenValue",
            numberFormat: "setNumberFormat",
        },
    };

    constructor(tester, selectors) {
        super(tester);
        this.selectors = selectors;
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Set the vertical axis settings
     * @param {AxisSettingsObject} settings - The settings to set
     */
    async setSettings(settings) {
        await this.#selectTab();
        await this.setSettingsByMap(settings, AxisSettings.SETTINGS_MAP.AXIS_SETTINGS);
    }

    /**
     * Set the display units settings
     * @param {DisplayUnits} settings - The settings to set (valuesInReverseOrder, logarithmicScale, base)
     */
    async setDisplayUnits(settings) {
        await this.setSettingsByMap(settings, AxisSettings.SETTINGS_MAP.DISPLAY_UNITS);
    }

    /**
     * Set the minimum value settings
     * @param {MinMaxValues} settings - The settings to set (type and value)
     */
    async setMinimumValue(settings) {
        await this.setSettingsByMap(settings, AxisSettings.SETTINGS_MAP.MINIMUM_VALUE);
    }

    /**
     * Set the maximum value settings
     * @param {MinMaxValues} settings - The settings to set (type and value)
     */
    async setMaximumValue(settings) {
        await this.setSettingsByMap(settings, AxisSettings.SETTINGS_MAP.MAXIMUM_VALUE);
    }

    /**
     * Set the axis crosses settings
     * @param {AxisCrosses} settings - The settings to set (optionValue and value)
     */
    async setAxisCrosses(settings) {
        await this.setSettingsByMap(settings, AxisSettings.SETTINGS_MAP.AXIS_CROSSES);
    }

    /**
     * Set the tick options settings
     * @param {TickOptions} settings - The settings to set (majorType and minorType)
     */
    async setTickOptions(settings) {
        await this.setSettingsByMap(settings, AxisSettings.SETTINGS_MAP.TICK_OPTIONS);
    }

    /**
     * Set the label options settings
     * @param {LabelOptions} settings - The settings to set (position)
     */
    async setLabelOptions(settings) {
        await this.setSettingsByMap(settings, AxisSettings.SETTINGS_MAP.LABEL_OPTIONS);
    }

    /**
     * Set the hide axis checkbox
     * @param {boolean} condition - The condition to set the hide axis
     */
    async setHideAxis(condition) {
        const selector = this.selectors.HIDE_AXIS_CHECKBOX;
        await this.executeAction(Checkbox, selector, "set", "setHideAxis", [condition]);
    }

    /**
     * Set the axis title dropdown
     * @param {AxisTitles} [optionValue] - The option value to set
     */
    async setTitle(optionValue) {
        const selector = this.selectors.TITLE_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setTitle", [optionValue]);
    }

    /**
     * Set the gridlines dropdown
     * @param {Gridlines} [optionValue] - The option value to set
     */
    async setGridlines(optionValue) {
        const selector = this.selectors.GRIDLINES_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setGridlines", [optionValue]);
    }

    /**
     * Set the minimum value type dropdown
     * @param {MinMaxValues} [optionValue] - The option value to set
     */
    async setMinValType(type) {
        const selector = this.selectors.MINIMUM_VALUE.TYPE_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setMinimumValue", [type]);
    }

    /**
     * Set the minimum value input
     * @param {MinMaxValues} [value] - The value to set
     */
    async setMinValValue(value) {
        const selector = this.selectors.MINIMUM_VALUE.INPUT_FIELD;
        await this.executeAction(Input, selector, "setInputSettings", "setMinimumValue", [value], [false]);
    }

    /**
     * Set the maximum value type dropdown
     * @param {MinMaxValues} [type] - The option value to set
     */
    async setMaxValType(type) {
        const selector = this.selectors.MAXIMUM_VALUE.TYPE_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setMaximumValue", [type]);
    }

    /**
     * Set the maximum value input
     * @param {MinMaxValues} [value] - The value to set
     */
    async setMaxValValue(value) {
        const selector = this.selectors.MAXIMUM_VALUE.INPUT_FIELD;
        await this.executeAction(Input, selector, "setInputSettings", "setMaximumValue", [value], [false]);
    }

    /**
     * Set the axis crosses value
     * @param {AxisCrosses} [value] - The value to set
     */
    async setAxisCrossesValue(value) {
        const selector = this.selectors.AXIS_CROSSES.INPUT_FIELD;
        await this.executeAction(Input, selector, "setInputSettings", "setAxisCrosses", [value], [false]);
    }

    /**
     * Set the axis position dropdown
     * @param {AxisPosition} [type] - The option value to set
     */
    async setAxisPosition(type) {
        const selector = this.selectors.AXIS_POSITION.DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setAxisPosition", [type]);
    }

    /**
     * Set the axis crosses dropdown
     * @param {AxisCrosses} [type] - The option value to set dropdown
     */
    async setAxisCrossesDropdown(type) {
        const selector = this.selectors.AXIS_CROSSES.DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setAxisCrosses", [type]);
    }

    /**
     * Sets the Values in reverse order checkbox
     * @param {boolean} condition - The condition to set the values in reverse
     */
    async setValuesInReverse(condition) {
        const selector = this.selectors.DISPLAY_UNITS.REVERSE_CHECKBOX;
        await this.executeAction(Checkbox, selector, "set", "setValuesInReverse", [condition]);
    }

    /**
     * Set the logarithmic scale checkbox
     * @param {boolean} condition - The condition to set the logarithmic scale
     */
    async setLogarithmicScale(condition) {
        const selector = this.selectors.DISPLAY_UNITS.LOG_SCALE_CHECKBOX;
        await this.executeAction(Checkbox, selector, "set", "setLogarithmicScale", [condition]);
    }

    /**
     * Set the base input
     * @param {DisplayUnits} [base] - The base to set
     */
    async setBase(base) {
        const selector = this.selectors.DISPLAY_UNITS.BASE_INPUT;
        await this.executeAction(Input, selector, "setInputSettings", "setBase", [base], [false]);
    }

    /**
     * Set the major type dropdown
     * @param {MarkTypes} [optionValue] - The option value to set
     */
    async setMajorType(optionValue) {
        const selector = this.selectors.TICK_OPTIONS.MAJOR_TYPE_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setMajorType", [optionValue]);
    }

    /**
     * Set the minor type dropdown
     * @param {MarkTypes} [optionValue] - The option value to set
     */
    async setMinorType(optionValue) {
        const selector = this.selectors.TICK_OPTIONS.MINOR_TYPE_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setMinorType", [optionValue]);
    }

    /**
     * Set the interval input
     * @param {TickOptions} [interval] - The interval to set
     */
    async setInterval(interval) {
        const selector = this.selectors.TICK_OPTIONS.INTERVAL_INPUT;
        await this.executeAction(Input, selector, "setInputSettings", "setInterval", [interval], [false]);
    }

    /**
     * Set the label position dropdown
     * @param {LabelOptions} [position] - The option value to set
     */
    async setLabelPosition(position) {
        const selector = this.selectors.LABEL_OPTIONS.POSITION_DROPDOWN;
        await this.executeAction(Dropdown, selector, "selectDropdownItem", "setLabelPosition", [position]);
    }

    /**
     * Set the axis label distance input
     * @param {LabelOptions} [axisLabelDistance] - The option value to set
     */
    async setAxisLabelDistance(axisLabelDistance) {
        const selector = this.selectors.LABEL_OPTIONS.DISTANCE_INPUT;
        const methodName = "setAxisLabelDistance";
        await this.executeAction(Input, selector, "setInputSettings", methodName, [axisLabelDistance], [false]);
    }

    /**
     * Set the interval between type dropdown
     * @param {LabelOptions} [intervalBetweenType] - The option value to set
     */
    async setIntervalBetweenType(intervalBetweenType) {
        const selector = this.selectors.LABEL_OPTIONS.INTERVAL_TYPE_DROPDOWN;
        const methodName = "setIntervalBetweenType";
        await this.executeAction(Dropdown, selector, "selectDropdownItem", methodName, [intervalBetweenType]);
    }

    /**
     * Set the interval between value input
     * @param {LabelOptions} [intervalBetweenValue] - The option value to set
     */
    async setIntervalBetweenValue(intervalBetweenValue) {
        const selector = this.selectors.LABEL_OPTIONS.INTERVAL_VALUE_INPUT;
        const methodName = "setIntervalBetweenValue";
        await this.executeAction(Input, selector, "setInputSettings", methodName, [intervalBetweenValue], [false]);
    }

    /**
     * Set the number format
     * @param {NumberFormat} [numberFormat] - The number format to set
     */
    async setNumberFormat(numberFormat) {
        const selector = this.selectors.LABEL_OPTIONS.FORMAT_BUTTON;
        await this.executeAction(NumberFormat, undefined, "setSettings", "setNumberFormat", [numberFormat, selector]);
    }

    /**
     * Select the vertical axis tab
     */
    async #selectTab() {
        const selector = this.selectors.TAB_BUTTON;
        await this.executeAction(Button, selector, "click", "selectTab");
    }
}

module.exports = AxisSettings;
