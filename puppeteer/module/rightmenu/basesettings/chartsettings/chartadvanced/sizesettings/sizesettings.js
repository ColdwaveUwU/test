const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");

/**
 * @typedef {Object} SizesProperties
 * @property {{value: number, increment: number, decrement: number}} [width] - Width of the chart
 * @property {{value: number, increment: number, decrement: number}} [height] - Height of the chart
 * @property {boolean} [constant] - Constant proportions
 */

class SizesSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static ADVANCED_SETTINGS_SELECTORS = selectors;

    /**
     * Sets the sizes properties.
     * @param {SizesProperties} [sizes] - The sizes settings to apply, max size is 22".
     */
    async setSizes(settings) {
        try {
            const selectors = SizesSettings.ADVANCED_SETTINGS_SELECTORS;
            const { width, height, constant } = settings;
            const handleSize = async (prop, propSettings, selector) => {
                if (propSettings) {
                    const { value, increment, decrement } = propSettings;
                    await this.tester.inputToForm(value, selector);
                    await this.tester.click(selectors.FILD_CONTAINER);
                    await this.#modifyValueByStep(prop, increment, decrement);
                }
            };

            if (constant) {
                await this.tester.click(selectors.CONSTANT);
            }
            await handleSize("width", width, selectors.WIDTH);
            await handleSize("height", height, selectors.HEIGHT);
        } catch (error) {
            throw new Error(`setSizes: Failed to set sizes. ${error.message}`, { cause: error });
        }
    }

    /**
     * Applies the sizes settings.
     * @param {SizesProperties} [settings] - The sizes settings to apply.
     */
    async applySettings(settings) {
        await this.setSizes(settings);
    }

    /**
     * Handle the increment and decrement
     * @param {"width" | "height"} [prop] - The property to handle
     * @param {number} [increment] - The number of times to increment
     * @param {number} [decrement] - The number of times to decrement
     */
    async #modifyValueByStep(prop, increment, decrement) {
        const selectors = SizesSettings.ADVANCED_SETTINGS_SELECTORS;
        const incrementSelector = selectors.INCREMENT_BTN.replace("{prop}", prop);
        const decrementSelector = selectors.DECREMENT_BTN.replace("{prop}", prop);

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
}

module.exports = SizesSettings;