const RightMenu = require("../../rightmenu");
const BaseSettings = require("../basesettings");
const selectors = require("./selectors.json");
const ChartAdvanced = require("./chartadvanced");

/**
 * @typedef {Object} Rotation
 * @property {{left: number, right: number, input: number}} [x]
 * @property {{up: number, down: number, input: number}} [y]
 * @property {{narrow: number, wide: number, input: number}} [perspective]
 * @property {number} [depth]
 * @property {number} [height]
 */

/**
 * @typedef {Object} Perspective
 * @property {number} [narrow]
 * @property {number} [wide]
 * @property {number} [input]
 */

/**
 * @typedef {Object} HandleRotations
 * @property {string} axis
 * @property {number} [left]
 * @property {number} [right]
 * @property {number} [up]
 * @property {number} [down]
 * @property {number} [input]
 * @property {number} [increment]
 * @property {number} [decrement]
 */

/**
 * @typedef {Object} SetChartType
 * @property {"Column" | "Line" | "Pie" | "Bar" | "Area"| "XY (Scatter)" | "Radar" | "Combo"} description
 * @property {number} id
 */

/**
 * @typedef {Object} SetWrappingStyle
 * @property {"Square" | "In line with text" | "Tight" | "Through" | "Top and bottom" | "In front of Text"} [wrapping]
 */

/**
 * @typedef {Object} WrappingStyleAdvanced
 * @property {"Inline" | "Square" | "Tight" | "Through" | "Topbottom" | "Infront"| "Behind"} [style]
 */

/**
 * @typedef {Object} SetAdvancedWrapping
 * @property {{top: number, bottom: number, left: number, right: number}} [distance]
 * @property {WrappingStyleAdvanced} [style]
 */

/**
 * @typedef {Object} HorizontalPosition
 * @property {{value: string, relativeTo: string}} [alignment]
 * @property {{value: number, toTheRightOf: string}} [position]
 * @property {{value: number, relativeTo: string}} [relativePosition]
 */

/**
 * @typedef {Object} VerticalPosition
 * @property {{value: string, relativeTo: string}} [alignment]
 * @property {{value: number, below: string}} [position]
 * @property {{value: number, relativeTo: string}} [relativePosition]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} [moveObjectWithText]
 * @property {boolean} [allowOverlap]
 */

/**
 * @typedef {Object} SetPosition
 * @property {HorizontalPosition} [horizontal]
 * @property {VerticalPosition} [vertical]
 * @property {Options} [options]
 */

/**
 * @typedef {Object} SetAltText
 * @property {string} [title]
 * @property {string} [description]
 */

/**
 * @typedef {Object} WrappingSettings
 * @property {string} [style]
 * @property {{top: number, bottom: number, left: number, right: number}} [distance]
 */

/**
 * @typedef {Object} SizesProperties
 * @property {{value: number, increment: number, decrement: number}} [width]
 * @property {{value: number, increment: number, decrement: number}} [height]
 * @property {boolean} [constant]
 */

class ChartSettings extends BaseSettings {
    constructor(tester = RegularTester) {
        super(tester, selectors.RIGHT_MENU_CHART);
        this.rightMenu = new RightMenu(this.tester);
        this.advancedSettings = new ChartAdvanced(this.tester);
    }

    /**
     * @enum
     */
    static CHART_TAB_SELECTORS = selectors;

    /**
     * Open the chart settings
     */
    async openChartSettings() {
        await this.tester.sleep(1000);
        await this.rightMenu.openSettings(this);
    }

    /**
     * Open the advanced settings
     */
    async openAdvancedSettings() {
        await this.openChartSettings();
        await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.RIGHT_MENU_CHART_ADVANCED);
    }

    /**
     * Set the wrapping style of the chart
     * @param {SetWrappingStyle} wrapping - The wrapping style to set
     */
    async setWrappingStyle(wrapping) {
        await this.openChartSettings();
        await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.WRAPPING.DROPDOWN);
        await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.WRAPPING.LIST_ITEM.replace("prop", wrapping));
    }

    /**
     * Set the chart type
     * @param {SetChartType} type - Name of the chart type and it's postion in the list
     */
    async setChartType(type) {
        try {
            await this.openChartSettings();
            const { description, id } = type;
            if (description && id) {
                await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.CHART_TYPE.DROPDOWN);
                const listSelector = ChartSettings.CHART_TAB_SELECTORS.CHART_TYPE.LIST;
                const itemSelector = ChartSettings.CHART_TAB_SELECTORS.CHART_TYPE.ITEM;
                const descriptionSelector = ChartSettings.CHART_TAB_SELECTORS.CHART_TYPE.DESCRIPTION;
                await this.tester.clickItem(description, id, listSelector, itemSelector, descriptionSelector);
            }
        } catch (error) {
            throw new Error(`setChartType: Failed to set chart type. ${error.message}`, { cause: error });
        }
    }

    /**
     * Set the chart style
     * @param {number} [styleNumber] - The number of the style to set
     */
    async setChartStyle(styleNumber) {
        try {
            await this.openChartSettings();
            const listSelector = ChartSettings.CHART_TAB_SELECTORS.CHART_STYLE.LIST;
            const itemSelector = ChartSettings.CHART_TAB_SELECTORS.CHART_STYLE.LIST_ITEM;
            const styles = await this.tester.parseItems(listSelector, itemSelector);
            await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.CHART_STYLE.DROPDOWN);

            if (styles[0].count >= styleNumber) {
                await this.tester.click(
                    ChartSettings.CHART_TAB_SELECTORS.CHART_STYLE.ITEM_LABLE.replace("number", styleNumber)
                );
            }
        } catch (error) {
            throw new Error(`setChartStyle: Failed to set chart style. ${error.message}`, { cause: error });
        }
    }

    /**
     * Open chart editor modal
     */
    async editData() {
        await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.EDIT_DATA_BTN);
    }

    /**
     * Set the 3D rotation
     * @param {Rotation} [settings]
     */
    async set3DRotation({ x, y, perspective, depth, height }) {
        await this.openChartSettings();
        if (x) {
            await this.#handleRotation({ axis: "X", ...x });
        }
        if (y) {
            await this.#handleRotation({ axis: "Y", ...y });
        }
        if (perspective) {
            await this.#toggleCheckbox("angle", false);
            await this.tester.sleep(1000);
            await this.#handlePerspective(perspective);
        }
        if (depth) {
            await this.#setDepth(depth);
        }
        if (height) {
            await this.#toggleCheckbox("auto", false);
            await this.#setHeight(height);
        }
    }

    /**
     * Set the default rotation of the chart
     */
    async setDefaultRotation() {
        await this.openChartSettings();
        await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.ROTATION.DEFAULT_ROTATION);
    }

    //Advanced settings

    /**
     * Set the sizes
     * @param {SizesProperties} settings - The sizes to set
     */
    async setSizes(settings) {
        await this.openAdvancedSettings();
        await this.advancedSettings.setSetting("Size", settings);
    }

    /**
     * Set the advanced wrapping
     * @param {WrappingSettings} settings - The wrapping settings to set
     */
    async setTextWrapping(settings) {
        await this.openAdvancedSettings();
        await this.advancedSettings.setSetting("Wrapping", settings);
    }

    /**
     * Set the position
     * @param {SetPosition} [settings] - The position to set
     */
    async setPosition(settings) {
        await this.openAdvancedSettings();
        await this.advancedSettings.setSetting("Position", settings);
    }

    /**
     * Set the alternative text
     * @param {SetAltText} [settings] - The alternative text to set
     */
    async setAltText(settings) {
        await this.openAdvancedSettings();
        await this.advancedSettings.setSetting("AltText", settings);
    }

    /**
     * Set the depth
     * @param {{depth: number, increment: number, decrement: number}} [depth] - The depth to set
     */
    async #setDepth({ depth, increment, decrement }) {
        try {
            await this.openChartSettings();
            await this.tester.inputToForm(depth, ChartSettings.CHART_TAB_SELECTORS.ROTATION.DEPTH);
            await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.RIGHT_MENU_PANEL);
            await this.#modifyValueByStep("3d-depth", increment, decrement);
        } catch (error) {
            throw new Error(`setDepth: Failed to set depth. ${error.message}`, { cause: error });
        }
    }

    /**
     * Set the height
     * @param {{height: number, increment: number, decrement: number}} [height] - The height to set
     */
    async #setHeight({ height, increment, decrement }) {
        try {
            await this.openChartSettings();
            await this.tester.inputToForm(height, ChartSettings.CHART_TAB_SELECTORS.ROTATION.HEIGHT);
            await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.RIGHT_MENU_PANEL);
            await this.#modifyValueByStep("3d-height", increment, decrement);
        } catch (error) {
            throw new Error(`setHeight: Failed to set height. ${error.message}`, { cause: error });
        }
    }

    /**
     * Set the right angle axis checkbox
     * @param {"angle" | "auto"} [name] - The name of the checkbox
     * @param {boolean} [condition] - The condition to set
     */
    async #toggleCheckbox(name, condition) {
        const selectors = {
            angle: ChartSettings.CHART_TAB_SELECTORS.ROTATION.CHECKBOX.RIGHT_ANGLE,
            auto: ChartSettings.CHART_TAB_SELECTORS.ROTATION.CHECKBOX.AUTOSCALE,
        };
        await this.tester.clickCheckbox({
            selector: selectors[name],
            condition,
        });
    }

    /**
     * Handle the rotations
     * @param {HandleRotations} [rotation] - The rotation to handle
     */
    async #handleRotation(rotation) {
        const { axis, left, right, up, down, input, increment, decrement } = rotation;
        const axisSelectors = ChartSettings.CHART_TAB_SELECTORS.ROTATION[axis];

        if (axis === "X") {
            await this.#handleAxisClicks(left, axisSelectors.LEFT);
            await this.#handleAxisClicks(right, axisSelectors.RIGHT);
            await this.#modifyValueByStep("x", increment, decrement);
        } else if (axis === "Y") {
            await this.#handleAxisClicks(up, axisSelectors.UP);
            await this.#handleAxisClicks(down, axisSelectors.DOWN);
            await this.#modifyValueByStep("y", increment, decrement);
        }
        if (input) {
            await this.tester.inputToForm(input, axisSelectors.INPUT);
            await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.RIGHT_MENU_PANEL);
        }
    }

    /**
     * Handle the axis clicks
     * @param {number} count
     * @param {string} selector
     * @param {number} [increment]
     * @param {number} [decrement]
     */
    async #handleAxisClicks(count, selector) {
        if (count) {
            for (let i = 0; i < count; i++) {
                await this.tester.click(selector);
            }
        }
    }

    /**
     * Handle the increment and decrement
     * @param {"x" | "y" | "persp" | "3d-depth" | "3d-height"} [prop] - The property to handle
     * @param {number} [increment] - The number of times to increment
     * @param {number} [decrement] - The number of times to decrement
     */
    async #modifyValueByStep(prop, increment, decrement) {
        const incrementSelector = ChartSettings.CHART_TAB_SELECTORS.ROTATION.INCREMENT_BTN.replace("{prop}", prop);
        const decrementSelector = ChartSettings.CHART_TAB_SELECTORS.ROTATION.DECREMENT_BTN.replace("{prop}", prop);

        if (increment) {
            for (let i = 0; i < increment; i++) {
                await this.tester.click(incrementSelector);
            }
        }
        if (decrement) {
            for (let i = 0; i < decrement; i++) {
                await this.tester.click(decrementSelector);
            }
        }
    }

    /**
     * Handle the perspective
     * @param {Perspective} [perspective] - The perspective to handle
     */
    async #handlePerspective({ narrow, wide, input, increment, decrement }) {
        const perspectiveSelectors = ChartSettings.CHART_TAB_SELECTORS.ROTATION.PERSPECTIVE;
        const params = [
            { value: narrow, selector: perspectiveSelectors.NARROW },
            { value: wide, selector: perspectiveSelectors.WIDE },
        ];

        for (const { value, selector } of params) {
            if (typeof value !== "undefined") {
                for (let i = 0; i < value; i++) {
                    await this.tester.click(selector);
                }
            }
        }

        if (typeof input !== "undefined") {
            await this.tester.inputToForm(input, perspectiveSelectors.INPUT);
            await this.tester.click(ChartSettings.CHART_TAB_SELECTORS.RIGHT_MENU_PANEL);
        }
        await this.#modifyValueByStep("persp", increment, decrement);
    }
}

module.exports = ChartSettings;
