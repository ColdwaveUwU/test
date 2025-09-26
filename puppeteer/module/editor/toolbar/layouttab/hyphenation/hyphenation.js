const LayoutTab = require("../layouttab");
const { Dropdown, Input, Checkbox, ModalButton } = require("../../../../elements");
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

    #hyphenationDropdown = null;
    #hyphenationModalWindow = null;
    #getHyphenationDropdown() {
        if (!this.#hyphenationDropdown) {
            const hyphenationMenuSelectors = Hyphenation.HYPHENATION_SELECTORS.HYPHENATION_MENU;
            this.#hyphenationDropdown = new Dropdown(this.tester, {
                selector: hyphenationMenuSelectors.MENU_SELECTOR,
                elementsValue: Hyphenation.TYPES.HYPHENATION_TYPES,
                elementsSelector: hyphenationMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            });
        }
        return this.#hyphenationDropdown;
    }

    async #getHyphenationModalWindow() {
        if (!this.#hyphenationModalWindow) {
            const targetElement = await this.#getHyphenationDropdown().getDropdownItem(
                "description",
                "Hyphenation options"
            );
            debugger;
            const hyphenationModalSelectors = Hyphenation.HYPHENATION_SELECTORS.HYPHENATION_WINDOW;
            this.#hyphenationModalWindow = new ModalButton(
                this.tester,
                targetElement.id,
                hyphenationModalSelectors.WINDOW,
                hyphenationModalSelectors.OK_BUTTON
            );
        }
        return this.#hyphenationModalWindow;
    }
    /**
     * Select hyphenation option from dropdown menu
     * @param {"None" | "Automatic" | "Hyphenation options"} [optionValue]
     */
    async setHyphenation(optionValue) {
        const hyphenationDropdown = this.#getHyphenationDropdown();
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
        try {
            const hyphenationModalWindow = await this.#getHyphenationModalWindow();
            await hyphenationModalWindow.openModal();
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
            const checkbox = new Checkbox(this.tester, automaticallyHyphenateSelector);
            await checkbox.set(condition);
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
            const checkbox = new Checkbox(this.tester, hyphenateWordsInCapsSelector);
            await checkbox.set(condition);
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
            const hyphenationModalWindow = await this.#getHyphenationModalWindow();
            await hyphenationModalWindow.closeModal();
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
            await this.applySettings(hyphenationSettings);
            await this.clickOkButton();
        } catch (error) {
            throw new Error(`setHyphenationSettings: Failed set settings". \n${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = Hyphenation;
