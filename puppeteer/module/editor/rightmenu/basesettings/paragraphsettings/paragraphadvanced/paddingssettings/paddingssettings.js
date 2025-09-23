const BaseSettings = require("../../../basesettings");
const { Input } = require("../../../../../../elements");
const selectors = require("./selectors.json");

class PaddingsSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static PADDINGS_SELECTORS = selectors;

    /**
     * Sets top padding
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} topPaddingSettings
     */
    async setTopPadding(topPaddingSettings) {
        const topPaddingInput = new Input(this.tester, PaddingsSettings.PADDINGS_SELECTORS.TOP_PADDING_INPUT);
        await topPaddingInput.setInputSettings(topPaddingSettings);
    }

    /**
     * Sets left padding
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} leftPaddingSettings
     */
    async setLeftPadding(leftPaddingSettings) {
        const leftPaddingInput = new Input(this.tester, PaddingsSettings.PADDINGS_SELECTORS.LEFT_PADDING_INPUT);
        await leftPaddingInput.setInputSettings(leftPaddingSettings);
    }

    /**
     * Sets bottom padding
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} bottomPaddingSettings
     */
    async setBottomPadding(bottomPaddingSettings) {
        const bottomPaddingInput = new Input(this.tester, PaddingsSettings.PADDINGS_SELECTORS.BOTTOM_PADDING_INPUT);
        await bottomPaddingInput.setInputSettings(bottomPaddingSettings);
    }

    /**
     * Sets right padding
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} rightPaddingSettings
     */
    async setRightPadding(rightPaddingSettings) {
        const rightPaddingInput = new Input(this.tester, PaddingsSettings.PADDINGS_SELECTORS.RIGHT_PADDING_INPUT);
        await rightPaddingInput.setInputSettings(rightPaddingSettings);
    }

    async applySettings(paddingsSettings) {
        const settingsMap = {
            topPadding: this.setTopPadding.bind(this),
            leftPadding: this.setLeftPadding.bind(this),
            bottomPadding: this.setBottomPadding.bind(this),
            rightPadding: this.setRightPadding.bind(this),
        };

        for (const [key, method] of Object.entries(settingsMap)) {
            if (paddingsSettings[key]) {
                await method(paddingsSettings[key]);
            }
        }
    }
}

module.exports = PaddingsSettings;
