const selectors = require("./selectors.json");
const { Button, Checkbox, Input, Dropdown } = require("../../../elements");
class AutoCorrect {
    constructor(tester) {
        this.tester = tester;
    }

    static AUTO_CORRECT_SELECTORS = selectors;

    #sectionMap = {
        math: {
            section: "MATH",
            apply: this.#applyMathSettings.bind(this),
        },
        recognized: {
            section: "RECOGNIZED",
            apply: this.#applyRecognizedSettings.bind(this),
        },
        autoFormat: {
            section: "AS_TYPE",
            apply: this.#applyAutoFormatSettings.bind(this),
        },
        autoCorrect: {
            section: "TEXT_AUTOCORRECT",
            apply: this.#applyTextAutoCorrectSettings.bind(this),
        },
    };

    async #selectAutoCorrectSection(sectionKey) {
        const section = AutoCorrect.AUTO_CORRECT_SELECTORS.CONTENT[sectionKey];
        if (!section || !section.SECTION?.BUTTON) {
            throw new Error(`Selector for section ${sectionKey} not found`);
        }

        const button = new Button(this.tester, section.SECTION.BUTTON);
        if (!(await button.isActive())) {
            await button.click();
        }
        return;
    }

    /**
     *
     * @param {import('../../toolbar/edit/filemenutab/advancedsettings/subsettings/proofing').MathAutoCorrect} mathSettings
     */
    async #applyMathSettings(mathSettings) {
        const mathSettingsSelectors = AutoCorrect.AUTO_CORRECT_SELECTORS.CONTENT.MATH.CONTENT;

        if (mathSettings?.asType) {
            const asTypeCheckbox = new Checkbox(this.tester, mathSettingsSelectors.REPLACE_AS_TYPE);
            await asTypeCheckbox.clickCheckbox(mathSettings.asType);
        }

        if (mathSettings?.replace) {
            const replaceInput = new Input(this.tester, mathSettingsSelectors.REPLACE_INPUT);
            await replaceInput.set(mathSettings.replace);
        }

        if (mathSettings?.by) {
            const byInput = new Input(this.tester, mathSettingsSelectors.BY_INPUT);
            await byInput.set(mathSettings.by);
        }

        if (mathSettings?.action) {
            const actionMap = {
                add: mathSettingsSelectors.ACTIONS.ADD,
                replace: mathSettingsSelectors.ACTIONS.REPLACE,
                delete: mathSettingsSelectors.ACTIONS.DELETE,
                default: mathSettingsSelectors.ACTIONS.DEFAULT,
            };

            const actionKey = mathSettings.action.toLowerCase();
            const selector = actionMap[actionKey];

            if (selector) {
                const expectedCounter = (await this.tester.getModalsMaskCounter()) + 1;

                await this.tester.click(selector);

                if (await this.tester.checkModalMask(expectedCounter)) {
                    await this.tester.click(mathSettingsSelectors.MODAL_MASK.YES_BUTTON);
                }
            } else {
                throw new Error(`Unknown math action: "${mathSettings.action}"`);
            }
        }
    }

    /**
     *
     * @param {import('../../toolbar/edit/filemenutab/advancedsettings/subsettings/proofing').Recognized} recognizedSettings
     */
    async #applyRecognizedSettings(recognizedSettings) {
        const recognizedSelectors = AutoCorrect.AUTO_CORRECT_SELECTORS.CONTENT.RECOGNIZED.CONTENT;
        if (recognizedSettings?.value) {
            const valueInput = new Input(this.tester, recognizedSelectors.VALUE_INPUT);
            await valueInput.set(recognizedSettings.value);
        }
        if (recognizedSettings?.action) {
            const actionMap = {
                add: recognizedSelectors.ACTIONS.ADD,
                replace: recognizedSelectors.ACTIONS.REPLACE,
                delete: recognizedSelectors.ACTIONS.DELETE,
                default: recognizedSelectors.ACTIONS.DEFAULT,
            };

            const actionKey = recognizedSettings.action.toLocaleLowerCase();
            const selector = actionMap[actionKey];
            if (selector) {
                await this.tester.click(selector);
            } else {
                throw new Error(`Unknown math action: "${mathSettings.action}"`);
            }
        }
    }

    /**
     *
     * @param {import('../../toolbar/edit/filemenutab/advancedsettings/subsettings/proofing').AutoFormat} autoFormatSettings
     */
    async #applyAutoFormatSettings(autoFormatSettings) {
        const checkBoxesSettings = {
            ...autoFormatSettings.replace,
            ...autoFormatSettings.applyType,
        };

        const selectorMap = {
            quotes: "QUOTES",
            hyphens: "HYPHENS",
            hyperlinks: "HYPERLINKS",
            addPeriod: "PERIOD",
            bullet: "BULLETED",
            numbered: "NUMBERED",
        };

        const selectors = AutoCorrect.AUTO_CORRECT_SELECTORS.CONTENT.AS_TYPE.CONTENT;

        for (const [key, value] of Object.entries(checkBoxesSettings)) {
            if (typeof value !== "boolean") continue;

            const selectorKey = selectorMap[key];
            const selector = selectors[selectorKey];

            if (!selector) {
                throw new Error(`Selector not found for key: ${key}`);
            }

            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.clickCheckbox(value);
        }
    }

    /**
     *
     * @param {import('../../toolbar/edit/filemenutab/advancedsettings/subsettings/proofing').AutoCorrect} textAutoCorrectSettings
     */
    async #applyTextAutoCorrectSettings(textAutoCorrectSettings) {
        const autoCorrectSelectors = AutoCorrect.AUTO_CORRECT_SELECTORS.CONTENT.TEXT_AUTOCORRECT;

        const checkBoxes = { cells: textAutoCorrectSettings?.cells, sentences: textAutoCorrectSettings?.sentences };
        for (const [key, value] of Object.entries(checkBoxes)) {
            const checkBox = new Checkbox(this.tester, autoCorrectSelectors.CONTENT[key.toUpperCase()]);
            await checkBox.clickCheckbox(value);
        }

        if (textAutoCorrectSettings?.exceptions) {
            const exceptionsSelectors = autoCorrectSelectors.CONTENT.EXCEPTIONS;
            const dropdown = new Dropdown(this.tester, {
                selector: exceptionsSelectors.BUTTON,
                elementsSelector: exceptionsSelectors.ELEMENTS,
            });
            await dropdown.getItemsAndSelectDropdown(textAutoCorrectSettings.exceptions);
        }

        if (textAutoCorrectSettings?.dontCapitalize) {
            const dontCapitalizeSelectors = autoCorrectSelectors.CONTENT.CAPITALIZE;
            if (textAutoCorrectSettings.dontCapitalize?.value) {
                const valueInput = new Input(this.tester, dontCapitalizeSelectors.VALUE_INPUT);
                await valueInput.set(textAutoCorrectSettings.dontCapitalize?.value);
            }

            if (textAutoCorrectSettings.dontCapitalize?.action) {
                const actionMap = {
                    add: dontCapitalizeSelectors.ACTIONS.ADD,
                    replace: dontCapitalizeSelectors.ACTIONS.REPLACE,
                    delete: dontCapitalizeSelectors.ACTIONS.DELETE,
                    default: dontCapitalizeSelectors.ACTIONS.DEFAULT,
                };

                const actionKey = textAutoCorrectSettings.dontCapitalize.action.toLocaleLowerCase();
                const selector = actionMap[actionKey];
                if (selector) {
                    await this.tester.click(selector);
                } else {
                    throw new Error(`Unknown math action: "${mathSettings.action}"`);
                }
            }
        }
    }

    async setAutoCorrectSettings(settings) {
        for (const [key, value] of Object.entries(settings)) {
            if (!value || !this.#sectionMap[key]) continue;

            const { section, apply } = this.#sectionMap[key];

            await this.#selectAutoCorrectSection(section);
            await apply(value);
        }

        await this.tester.click(AutoCorrect.AUTO_CORRECT_SELECTORS.CLOSE_BUTTON);
    }
}

module.exports = AutoCorrect;
