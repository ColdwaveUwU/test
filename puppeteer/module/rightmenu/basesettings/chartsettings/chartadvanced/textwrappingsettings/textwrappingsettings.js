const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");

/**
 * @typedef {Object} WrappingStyle - Wrapping style
 * @property {"Inline" | "Square" | "Tight" | "Through" | "Topbottom" | "Infront"| "Behind"} [style] - Wrapping style
 */

/**
 * @typedef {Object} Distance - Distance settings
 * @property {{value: number, increment: number, decrement: number}} [top] - Top distance
 * @property {{value: number, increment: number, decrement: number}} [bottom] - Bottom distance
 * @property {{value: number, increment: number, decrement: number}} [left] - Left distance
 * @property {{value: number, increment: number, decrement: number}} [right] - Right distance
 */

/**
 * @typedef {Object} SetAdvancedWrapping
 * @property {Distance} [distance] - Distance settings
 * @property {WrappingStyle} [style] - Wrapping style
 */

class TextWrappingSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static ADVANCED_SETTINGS_SELECTORS = selectors;

    /**
     * Set the wrapping style
     * @param {WrappingStyle} [style] - The wrapping style to set
     */
    async setWrappingStyle(style) {
        const selector = TextWrappingSettings.ADVANCED_SETTINGS_SELECTORS.STYLE.replace("{style}", style.toLowerCase());
        await this.tester.click(selector);
    }

    /**
     * @param {Distance} settings
     */
    async setDistance(settings) {
        const selectors = TextWrappingSettings.ADVANCED_SETTINGS_SELECTORS;
        const props = [
            { key: "top", selector: selectors.DISTANCE.TOP },
            { key: "bottom", selector: selectors.DISTANCE.BOTTOM },
            { key: "left", selector: selectors.DISTANCE.LEFT },
            { key: "right", selector: selectors.DISTANCE.RIGHT },
        ];

        for (const { key, selector } of props) {
            const position = settings[key];
            if (position) {
                const isEnabled = await this.#isFieldEnabled(selector);
                const currentStyle = await this.#getCurrentWrappingStyle();
                if (!isEnabled) {
                    throw new Error(
                        `setDistance: Cann't set distance input field "${key}" while "${currentStyle}" wrapping style is active. Try different wrapping style.`
                    );
                }
                const { value, increment, decrement } = position;
                await this.tester.inputToForm(value, selector);
                await this.tester.click(selectors.FILD_CONTAINER);
                await this.#modifyValueByStep({ key, increment, decrement });
            }
        }
    }

    /**
     * Apply the settings
     * @param {SetAdvancedWrapping} [settings] - The settings to apply
     */
    async applySettings(settings) {
        const settingsMap = {
            style: this.setWrappingStyle.bind(this),
            distance: this.setDistance.bind(this),
        };

        for (const [key, method] of Object.entries(settingsMap)) {
            if (settings[key]) {
                await method(settings[key]);
            }
        }
    }
    /**
     * Handle the increment and decrement
     * @param {{key: string, increment: number, decrement: number}} [settings] - The settings to handle
     */
    async #modifyValueByStep(settings) {
        const { key, increment, decrement } = settings;
        const selectors = TextWrappingSettings.ADVANCED_SETTINGS_SELECTORS;
        const incrementSelector = selectors.INCREMENT_BTN.replace("{prop}", key);
        const decrementSelector = selectors.DECREMENT_BTN.replace("{prop}", key);

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

    async #isFieldEnabled(selector) {
        return await this.tester.frame.evaluate((selector) => {
            const el = document.querySelector(selector);
            return el && !el.disabled;
        }, selector);
    }

    async #getCurrentWrappingStyle() {
        const selector = TextWrappingSettings.ADVANCED_SETTINGS_SELECTORS.ACTIVE_STYLE;
        return await this.tester.frame.evaluate((selector) => {
            const el = document.querySelector(selector);
            return el ? el.getAttribute("aria-label") : null;
        }, selector);
    }
}

module.exports = TextWrappingSettings;