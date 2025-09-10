const LayoutTab = require("../layouttab");
const { Dropdown, Input } = require("../../../../elements");
const selectors = require("./selectors.json");

class Hyphenation extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static HYPHENATION_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        HYPHENATION_TYPES: ["None", "Automatic", "Hyphenation options"],
    };

    /**
     * Select hyphenation option from dropdown menu
     * @param {"None" | "Automatic" | "Hyphenation options"} [optionValue]
     */
    async setHyphenation(optionValue) {
        const hyphenationMenuSelectors = Hyphenation.HYPHENATION_SELECTORS.HYPHENATION_MENU;
        const hyphenationDropdown = new Dropdown(this.tester, {
            selector: hyphenationMenuSelectors.MENU_SELECTOR,
            elementsValue: Hyphenation.TYPES.HYPHENATION_TYPES,
            elementsSelector: hyphenationMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
        });
        try {
            await hyphenationDropdown.selectDropdownItem(optionValue);
        } catch (error) {
            throw new Error(`setHyphenation: Failed to set hyphenation". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Open Hyphenation window
     */
    async openHyphenationWindow() {
        const hyphenationWindowSelector = Hyphenation.HYPHENATION_SELECTORS.HYPHENATION_WINDOW.WINDOW;
        try {
            await this.setHyphenation("Hyphenation options");
            await this.tester.checkSelector(hyphenationWindowSelector);
        } catch (error) {
            throw new Error(`openHyphenationWindow: Failed to open hyphenation". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set "Automatically hyphenate document" checkbox
     * @param {boolean} [condition]
     */
    async setAutomaticallyHyphenate(condition) {
        const automaticallyHyphenateSelector =
            Hyphenation.HYPHENATION_SELECTORS.HYPHENATION_WINDOW.AUTOMATICALLY_HYPHENATE_CHECKBOX;
        try {
            await this.tester.clickCheckbox({ selector: automaticallyHyphenateSelector, condition: condition });
        } catch (error) {
            throw new Error(`setAutomaticallyHyphenate: Failed to set hyphenate". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set "Hyphenate words in CAPS" checkbox
     * @param {boolean} [condition]
     */
    async setHyphenateWordsInCaps(condition) {
        const hyphenateWordsInCapsSelector =
            Hyphenation.HYPHENATION_SELECTORS.HYPHENATION_WINDOW.HYPHENATE_IN_CAPS_CHECKBOX;
        try {
            await this.tester.clickCheckbox({ selector: hyphenateWordsInCapsSelector, condition: condition });
        } catch (error) {
            throw new Error(`setHyphenateWordsInCaps: Failed to set checkbox". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set hyphenation zone
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} hyphenationZoneSettings
     */
    async setHyphenationZone(hyphenationZoneSettings) {
        const hyphenationZoneInputSelector =
            Hyphenation.HYPHENATION_SELECTORS.HYPHENATION_WINDOW.HYPHENATION_ZONE_INPUT;
        const hyphenationZoneInput = new Input(this.tester, hyphenationZoneInputSelector, false);
        try {
            await hyphenationZoneInput.setInputSettings(hyphenationZoneSettings);
        } catch (error) {
            throw new Error(`setHyphenationZone: Failed to set input settings". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Set consecutive hyphens limit
     * @param {{ upArrow: boolean, downArrow: boolean, arrowClickCount: number, value: string }} limitHyphensSettings
     */
    async setLimitConsecutiveHyphens(limitHyphensSettings) {
        const limitHyphensInputSelector = Hyphenation.HYPHENATION_SELECTORS.HYPHENATION_WINDOW.LIMIT_HYPHENS_INPUT;
        const limitHyphensInput = new Input(this.tester, limitHyphensInputSelector, false);
        try {
            await limitHyphensInput.setInputSettings(limitHyphensSettings);
        } catch (error) {
            throw new Error(`setLimitConsecutiveHyphens: Failed to set input settings". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Apply settings in Hyphenation window
     * @param {Object} hyphenationSettings
     */
    async applySettings(hyphenationSettings) {
        const settingsMap = {
            automaticallyHyphenate: this.setAutomaticallyHyphenate.bind(this),
            hyphenateWordsInCaps: this.setHyphenateWordsInCaps.bind(this),
            hyphenationZone: this.setHyphenationZone.bind(this),
            limitConsecutiveHyphens: this.setLimitConsecutiveHyphens.bind(this),
        };
        try {
            for (const [key, method] of Object.entries(settingsMap)) {
                if (key in hyphenationSettings) {
                    try {
                        await method(hyphenationSettings[key]);
                    } catch (error) {
                        throw new Error(`Failed to use method ${key}". \n${error.message}`, {
                            cause: error,
                        });
                    }
                }
            }
        } catch (error) {
            throw new Error(`applySettings: Failed to apply settings". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Click OK button in Hyphenation window
     */
    async clickOkButton() {
        try {
            await this.tester.click(Hyphenation.HYPHENATION_SELECTORS.HYPHENATION_WINDOW.OK_BUTTON);
        } catch (error) {
            throw new Error(`clickOkButton: Failed click ok button". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Open Hyphenation window, apply settings and click OK button
     * @param {Object} hyphenationSettings
     */
    async setHyphenationSettings(hyphenationSettings) {
        try {
            await this.openHyphenationWindow();
            await this.applySettings(hyphenationSettings).then(async () => {
                await this.clickOkButton();
            });
        } catch (error) {
            throw new Error(`setHyphenationSettings: Failed set settings". \n${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = Hyphenation;
