const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");
const { Input } = require("../../../../../elements");

/**
 * @typedef {Object} TextWrappingSettingsObject
 * @property {string} [wrappingStyle] - The wrapping style settings.
 * @property {AlignmentSettings} [alignment] - The alignment settings.
 * @property {DistanceSettings} [distance] - The distance settings.
 */

class TextWrappingSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    static TEXT_WRAPPING_SELECTORS = selectors;

    /**
     * Sets the text wrapping style.
     * @param {string} style - The wrapping style to apply (gets from wrap button selector).
     * @example
     * #tableadv-button-wrap-none - none is wrap style
     */
    async #setWrappingStyle(style) {
        try {
            const selector = TextWrappingSettings.TEXT_WRAPPING_SELECTORS.WRAP_BUTTON.replace("{prop}", style);
            await this.tester.click(selector);
        } catch (err) {
            throw new Error(`setWrappingStyle: Failed to apply style: "${style}"`, { cause: err });
        }
    }

    /**
     * @typedef {Object} AlignmentSettings
     * @property {string} [alignment] - The text alignment (e.g., "left", "center", "right").
     * @property {import("../../../../../elements/input/input").InputSettings} [indent] - The indentation settings.
     */

    /**
     * Sets the text alignment.
     * @param {AlignmentSettings} settings
     */
    async #setAlignment(settings) {
        const alignmentSelectors = TextWrappingSettings.TEXT_WRAPPING_SELECTORS.ALIGMENT;

        if (settings.alignment) {
            try {
                const selector = alignmentSelectors.ALIGN_BUTTON.replace("{prop}", settings.alignment);
                await this.tester.click(selector);
            } catch (err) {
                throw new Error(`setAlignment: Failed to apply alignment: "${settings.alignment}"`, { cause: err });
            }
        }

        if (settings.indent) {
            try {
                const input = new Input(this.tester, alignmentSelectors.INDENT_INPUT, false);
                await input.setInputSettings(settings.indent);
            } catch (err) {
                throw new Error(`setAlignment: Failed to apply indent: "${settings.indent}"`, { cause: err });
            }
        }
    }

    /**
     * @typedef {Object} DistanceSettings
     * @property {import("../../../../../elements/input/input").InputSettings} [top] - The top distance settings.
     * @property {import("../../../../../elements/input/input").InputSettings} [left] - The left distance settings.
     * @property {import("../../../../../elements/input/input").InputSettings} [bottom] - The bottom distance settings.
     * @property {import("../../../../../elements/input/input").InputSettings} [right] - The right distance settings.
     */

    /**
     * Sets the text distance.
     * @param {DistanceSettings} settings
     */
    async #setDistance(settings) {
        const distanceSelectors = TextWrappingSettings.TEXT_WRAPPING_SELECTORS.DISTANCE;

        const handlers = {
            top: async (value) => {
                const input = new Input(this.tester, distanceSelectors.TOP, false);
                await input.setInputSettings(value);
            },
            left: async (value) => {
                const input = new Input(this.tester, distanceSelectors.LEFT, false);
                await input.setInputSettings(value);
            },
            bottom: async (value) => {
                const input = new Input(this.tester, distanceSelectors.BOTTOM, false);
                await input.setInputSettings(value);
            },
            right: async (value) => {
                const input = new Input(this.tester, distanceSelectors.RIGHT, false);
                await input.setInputSettings(value);
            },
        };

        await this.applySettingsMap(settings, handlers, "TextWrappingDistance");
    }

    /**
     * Applies text wrapping settings.
     * @param {TextWrappingSettingsObject} settings
     */
    async applySettings(settings) {
        const handlers = {
            wrappingStyle: this.#setWrappingStyle.bind(this),
            alignment: this.#setAlignment.bind(this),
            distance: this.#setDistance.bind(this),
        };

        await this.applySettingsMap(settings, handlers, "TextWrapping");
    }
}

module.exports = TextWrappingSettings;
