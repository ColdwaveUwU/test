const LayoutTab = require("../layouttab");
const selectors = require("./selectorts.json");
const { Input, Checkbox, ModalButton, Dropdown } = require("../../../../elements");
class LineNumbers extends LayoutTab {
    constructor(tester) {
        super(tester, "span#slot-btn-line-numbers div button");
    }

    static SELECTORS = selectors;

    #lineNumbersDropdown = null;
    #lineNumbersSettingsWindow = null;

    #getLineNumbersDropdown() {
        if (!this.#lineNumbersDropdown) {
            const { DEFAULT_MENU, DROPDOWN_ITEMS } = LineNumbers.SELECTORS.DROPDOWN_MENU;
            this.#lineNumbersDropdown = new Dropdown(this.tester, {
                selector: DEFAULT_MENU,
                elementsSelector: DROPDOWN_ITEMS,
            });
        }
        return this.#lineNumbersDropdown;
    }

    #getLineNumbersSettingsWindow(openSelector) {
        if (!this.#lineNumbersSettingsWindow) {
            const { MODAL_WINDOW, OK_BUTTON } = LineNumbers.SELECTORS;
            this.#lineNumbersSettingsWindow = new ModalButton(this.tester, openSelector, MODAL_WINDOW, OK_BUTTON);
        }
        return this.#lineNumbersSettingsWindow;
    }
    /**
     * Sets the page line numbers by selecting the specified option name from the dropdown menu.
     * @param {"None" | "Continuous" | "Restart each page" | "Restart each section" | "Suppress for current paragraph" | "Line numbering options"} optionName - The name of the line number option to select
     */
    async selectLineNumberDropdownOption(optionName) {
        try {
            const lineNumbersDropdown = this.#getLineNumbersDropdown();
            await lineNumbersDropdown.selectDropdownItem(optionName);
        } catch (error) {
            throw new Error(`Failed to select option: ${optionName}`, error);
        }
    }

    /**
     * Set custom line number settings
     * @param {{
     *     "EnableNumbering":boolean,
     *     "CustomValues": {
     *         StartAt: { value: number, increment: number, decrement: number },
     *         FormText: { value: number, increment: number, decrement: number },
     *         Count: { value: number, increment: number, decrement: number }
     *     },
     *     "Numbering":{"RestartPage":boolean,"RestartSection":boolean,"Continuous":boolean },
     *     "ApplyTo": "Current" | "Point" | "Whole"
     * }} customSettings - The custom settings object with desired settings
     */
    async setCustomLineNumbersSettings(customSettings) {
        const { EnableNumbering, CustomValues, Numbering, ApplyTo } = customSettings;
        // Validate settings before any operations
        if (!EnableNumbering && (CustomValues || Numbering)) {
            throw new Error("Cannot set CustomValues or Numbering when line numbering is disabled");
        }
        try {
            const lineNumbersDropdown = this.#getLineNumbersDropdown();
            const { id } = await lineNumbersDropdown.getDropdownItem("description", "Line numbering options");
            const settingsModalWIndow = this.#getLineNumbersSettingsWindow(id);
            await settingsModalWIndow.openModal();

            if (EnableNumbering) {
                const enableNumberingCheckbox = new Checkbox(
                    this.tester,
                    LineNumbers.SELECTORS.CHECKBOX_ADD_LINE_NUMBERING
                );
                await enableNumberingCheckbox.set(EnableNumbering);
            }

            if (EnableNumbering && CustomValues) {
                await this.#setCustomValues(CustomValues);
            }

            if (EnableNumbering && Numbering) {
                await this.#setNumberingOptions(Numbering);
            }

            if (ApplyTo) {
                await this.#setApplyToDropdownOptions(ApplyTo);
            }

            await settingsModalWIndow.closeModal();
        } catch (error) {
            throw new Error(`Failed to set custom line numbers: ${error.message}`);
        }
    }

    /**
     * Sets the custom values for the line numbers
     * @param {{
     *   StartAt: { value: number, increment: number, decrement: number },
     *   FormText: { value: number, increment: number, decrement: number },
     *   Count: { value: number, increment: number, decrement: number }
     * }} [customValues] - The custom values object with desired settings
     */
    async #setCustomValues(customValues) {
        try {
            const fieldSelectors = {
                StartAt: LineNumbers.SELECTORS.START_AT,
                FormText: LineNumbers.SELECTORS.FROM_TEXT,
                Count: LineNumbers.SELECTORS.COUNT_BY,
            };

            const fieldInputs = {
                StartAt: new Input(this.tester, fieldSelectors.StartAt, false),
                FormText: new Input(this.tester, fieldSelectors.FormText),
                Count: new Input(this.tester, fieldSelectors.Count, false),
            };

            const processField = async (fieldName) => {
                const fieldSettings = customValues[fieldName];
                if (!fieldSettings) return;

                const { value, increment, decrement } = fieldSettings;

                const field = fieldInputs[fieldName];

                if (value) {
                    await field.set(value);
                }
                if (increment) {
                    await field.setInputSettings({ upArrow: true, arrowClickCount: increment });
                }
                if (decrement) {
                    await field.setInputSettings({ downArrow: true, arrowClickCount: Math.abs(decrement) });
                }
            };

            for (const fieldName of Object.keys(fieldSelectors)) {
                await processField(fieldName);
            }
        } catch (error) {
            throw new Error(`Error in setCustomValues: ${error}`);
        }
    }

    /**
     * Sets the numbering options
     * @param {{"RestartPage":boolean,"RestartSection":boolean,"Continuous":boolean}} [numbering]
     */
    async #setNumberingOptions(numbering) {
        if (!numbering) {
            throw new Error("Numbering options are required");
        }
        try {
            const { RestartPage, RestartSection, Continuous } = numbering;

            if (RestartPage) {
                await this.tester.click(LineNumbers.SELECTORS.NUMBERING_OPTIONS.RESTART_PAGE);
            }
            if (RestartSection) {
                await this.tester.click(LineNumbers.SELECTORS.NUMBERING_OPTIONS.RESTART_SECTION);
            }
            if (Continuous) {
                await this.tester.click(LineNumbers.SELECTORS.NUMBERING_OPTIONS.CONTINUOUS);
            }
        } catch (error) {
            throw new Error(`Failed to set numbering options: ${error.message}`);
        }
    }

    /**
     * Sets the scope of line numbering application
     * @param {"Whole" | "Point" | "Current"} applyTo - Where to apply the line numbering
     */
    async #setApplyToDropdownOptions(applyTo) {
        const optionMap = {
            Whole: "Whole document",
            Point: "This point forward",
            Current: "Current section",
        };

        const option = optionMap[applyTo];
        if (!option) {
            throw new Error(`Invalid apply to option: ${applyTo}. Valid options are: Whole, Point, Current`);
        }

        try {
            await this.tester.selectDropdown(LineNumbers.SELECTORS.APPLY_TO.DROPDOWN);
            await this.tester.selectByText(option, LineNumbers.SELECTORS.APPLY_TO.OPTIONS);
        } catch (error) {
            throw new Error(`Error in setApplyToDropdownOptions: ${error.message}`);
        }
    }

    /**
     * Sets the option by clicking the button the specified number of times
     * @param {string} buttonSelector - The selector for the button to click
     * @param {number} clickCount - The number of times to click the button
     */
    async setOptionByClick(buttonSelector, clickCount) {
        if (!buttonSelector) {
            throw new Error("Button selector is required");
        }

        try {
            for (let i = 0; i < clickCount; i++) {
                await this.tester.click(buttonSelector);
            }
        } catch (error) {
            throw new Error(`Failed to click button ${buttonSelector} ${clickCount} times: ${error.message}`);
        }
    }
}

module.exports = LineNumbers;
