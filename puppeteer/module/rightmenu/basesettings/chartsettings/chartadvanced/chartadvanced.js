const BaseSettings = require("../../basesettings");
const selectors = require("./selectors.json");
const SizesSettings = require("./sizesettings");
const TextWrappingSettings = require("./textwrappingsettings");
const PositionSettings = require("./positionsettings");
const AlternativeTextSettings = require("./alternativetextsettings");

class ChartAdvanced extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static ADVANCED_SETTINGS_SELECTORS = selectors;

    /**
     * Checks if a button is active.
     * @param {string} selector - Selector of the button.
     * @returns {Promise<boolean>} - Returns `true` if the button is active, otherwise `false`.
     */
    async isButtonActive(selector) {
        return await this.tester.frame.evaluate((selector) => {
            const button = document.querySelector(selector);
            return button && button.classList.contains("active");
        }, selector);
    }

    async #selectTab(tabSelector) {
        try {
            if (!(await this.isButtonActive(tabSelector))) {
                await this.tester.click(tabSelector);
            }
        } catch (error) {
            if (tabSelector === ChartAdvanced.ADVANCED_SETTINGS_SELECTORS.POSITION_TAB) {
                throw new Error(
                    "Position tab is disabled. Cannot select position tab while Inline wrapping styleis active."
                );
            }
            throw new Error(`Failed to select tab: ${tabSelector}`);
        }
    }

    async setSetting(tabName, settings) {
        const handlers = {
            Size: new SizesSettings(this.tester),
            Wrapping: new TextWrappingSettings(this.tester),
            Position: new PositionSettings(this.tester),
            AltText: new AlternativeTextSettings(this.tester),
        };

        const tabSelectors = {
            Size: ChartAdvanced.ADVANCED_SETTINGS_SELECTORS.SIZE_TAB,
            Wrapping: ChartAdvanced.ADVANCED_SETTINGS_SELECTORS.WRAPPING_TAB,
            Position: ChartAdvanced.ADVANCED_SETTINGS_SELECTORS.POSITION_TAB,
            AltText: ChartAdvanced.ADVANCED_SETTINGS_SELECTORS.ALT_TEXT_TAB,
        };

        const handler = handlers[tabName];
        if (handler) {
            await this.#selectTab(tabSelectors[tabName]);
            await handler.applySettings(settings);
            await this.tester.click(ChartAdvanced.ADVANCED_SETTINGS_SELECTORS.OK_BTN);
        } else {
            throw new Error(`Unknown tab: ${tabName}`);
        }
    }
}

module.exports = ChartAdvanced;
