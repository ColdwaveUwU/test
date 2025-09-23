const BaseSettings = require("../../basesettings");
const selectors = require("./selectors.json");
const IndentsSettings = require("./indentssettings");
const LineSettings = require("./linesettings");
const BordersSettings = require("./borderssettings");
const FontSettings = require("./fontsettings");
const TabsSettings = require("./tabssettings");
const PaddingsSettings = require("./paddingssettings");

class ParagraphAdvanced extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

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
        if (!(await this.isButtonActive(tabSelector))) {
            await this.tester.click(tabSelector);
        }
    }

    async setSetting(tabName, settings) {
        const handlers = {
            IndentsSettings: new IndentsSettings(this.tester),
            LineSettings: new LineSettings(this.tester),
            BordersSettings: new BordersSettings(this.tester),
            FontSettings: new FontSettings(this.tester),
            TabsSettings: new TabsSettings(this.tester),
            PaddingsSettings: new PaddingsSettings(this.tester),
        };

        const tabSelectors = {
            IndentsSettings: selectors.INDENTS_TAB,
            LineSettings: selectors.LINE_TAB,
            BordersSettings: selectors.BORDERS_TAB,
            FontSettings: selectors.FONT_TAB,
            TabsSettings: selectors.TABS_TAB,
            PaddingsSettings: selectors.PADDINGS_TAB,
        };

        const handler = handlers[tabName];
        if (handler) {
            await this.#selectTab(tabSelectors[tabName]);
            await handler.applySettings(settings);
        } else {
            throw new Error(`Unknown tab: ${tabName}`);
        }
    }
}

module.exports = ParagraphAdvanced;
