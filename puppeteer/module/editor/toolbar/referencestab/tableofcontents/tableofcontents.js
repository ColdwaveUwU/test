const ReferencesTab = require("../referencestab");
const { OptionsButton, Input, ModalButton, Checkbox } = require("../../../../elements");
const selectors = require("./selectors.json");

/**
 * @typedef {Object} TableOfContentsSettings
 * @property {boolean} [showPageNumbers] - Show page numbers
 * @property {boolean} [rightAlignPageNumbers] - Right align page numbers
 * @property {string} [leader] - Leader
 * @property {boolean} [formatAsLinks] - Format as links
 * @property {number} [buildFromLevels] - Build from levels
 * @property {BuildFromStyles} [buildFromStyles] - Build from styles
 * @property {string} [styles] - Styles
 */

/**
 * @typedef {
 * "Book title" | "Caption" | "Emphasis" | "Heading 1"
 * | "Heading 2" | "Heading 3" | "Heading 4" | "Heading 5" | "Heading 6"
 * | "Heading 7" | "Heading 8" | "Heading 9" | "Intense emphasis" | "Intense quote"
 * | "Intense reference" | "List paragraph" | "No spacing" | "Normal" | "Quote"
 * | "Strong" | "Subtitle" | "Subtle emphasis" | "Subtle reference" | "Title"
 * } TOCStyleName
 */

/**
 * @typedef {Object} BuildFromStyles
 * @property {TOCStyleName} [style] - Style Name
 * @property {string|number} [level] - Level
 * An object where each key is a style name (TOCStyleName) and the value is the level (number or string) for that style in the Table of Contents.
 * If a style is not present in this object or its value is 0, the corresponding field will be cleared by pressing Delete.
 *
 * Example:
 * {
 *   'Heading 1': 1,
 *   'Heading 2': 2,
 *   'Title': 0 // This field will be cleared
 * }
 */

/**
 * TableOfContents module for interacting with the Table of Contents dialog
 */
class TableOfContents extends ReferencesTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        TABLE_OF_CONTENTS_BUTTON: ["Table 1", "Table 2", "Settings", "Remove table of contents"],
        ADD_TEXT_BUTTON: [
            "Do not show in table of contents",
            "Level 1",
            "Level 2",
            "Level 3",
            "Level 4",
            "Level 5",
            "Level 6",
            "Level 7",
            "Level 8",
            "Level 9",
        ],
        UPDATE_BUTTON: ["Update entire table", "Update page numbers only"],
    };

    /**
     * Map of settings keys to method names for Table of Contents settings
     */
    static SETTINGS_MAP = {
        showPageNumbers: "setShowPageNumbers",
        rightAlignPageNumbers: "setRightAlignPageNumbers",
        leader: "setLeader",
        formatAsLinks: "setFormatAsLinks",
        buildFromLevels: "setBuildFromLevels",
        buildFromStyles: "setBuildFromStyles",
        styles: "setStyles",
    };

    /**
     * Clicks the Table of Contents button
     * @param { "Table 1" | "Table 2" | "Settings" | "Remove table of contents" } optionValue - Table of Contents option to click (by default, the table of contents button is clicked)
     */
    async clickTableOfContents(optionValue = null) {
        await this.#getTableOfContentsOptionsButton().setOption(optionValue);
    }

    /**
     * Opens the Table of Contents settings modal, applies settings, and closes it with the specified button.
     * @param {TableOfContentsSettings} settings - Settings to apply.
     * @param {string} closeButtonSelector - Selector of the button to close the modal (OK or Cancel).
     */
    async #handleTableOfContentsSettings(settings, closeButtonSelector) {
        const { id } = await this.#getTableOfContentsOptionsButton().getOption("description", "Settings");

        const tableOfContentsSettingsModalWindow = new ModalButton(
            this.tester,
            id,
            TableOfContents.SELECTORS.MODAL_WINDOW.TABLE_OF_CONTENTS_WINDOW
        );

        await tableOfContentsSettingsModalWindow.openModal();
        await this.setSettingsByMap(settings, TableOfContents.SETTINGS_MAP);
        await tableOfContentsSettingsModalWindow.closeModal(closeButtonSelector);
    }

    /**
     * Sets multiple settings in the Table of Contents dialog and confirms with OK.
     */
    async setTableOfContentsSettings(settings) {
        await this.#handleTableOfContentsSettings(
            settings,
            TableOfContents.SELECTORS.MODAL_WINDOW.OK_BUTTON.ELEMENT_SELECTOR
        );
    }

    /**
     * Sets multiple settings in the Table of Contents dialog and cancels.
     */
    async cancelTableOfContentsSettings(settings) {
        await this.#handleTableOfContentsSettings(
            settings,
            TableOfContents.SELECTORS.MODAL_WINDOW.CANCEL_BUTTON.ELEMENT_SELECTOR
        );
    }

    /**
     * Updates the table of contents via the toolbar
     * @param { 'Update entire table' | 'Update page numbers only' } [optionValue] - update option (by default updates the entire table)
     * @returns {Promise<void>}
     */
    async updateTable(optionValue = "Update entire table") {
        try {
            await this.#getUpdateTableButton().setOption(optionValue);
        } catch (error) {
            throw new Error(
                `TableOfContents.updateTable: Failed to update table with option '${optionValue}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Add text button
     * @param { "Do not show in table of contents" | "Level 1" | "Level 2" | "Level 3"
     * | "Level 4" | "Level 5" | "Level 6" | "Level 7" | "Level 8" | "Level 9" } optionValue
     */
    async addText(optionValue) {
        try {
            await this.#getAddTextButton().setOption(optionValue);
        } catch (error) {
            throw new Error(
                `TableOfContents.addText: Failed to add text with option '${optionValue}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Removes the table of contents
     */
    async removeTableOfContents() {
        try {
            await this.#getTableOfContentsOptionsButton().setOption("Remove table of contents");
        } catch (error) {
            throw new Error(
                `TableOfContents.removeTableOfContents: Failed to remove table of contents. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets the Show page numbers checkbox
     * @param {boolean} condition true/false (true - checked, false - unchecked)
     */
    async setShowPageNumbers(condition) {
        try {
            const selector = TableOfContents.SELECTORS.MODAL_WINDOW.SHOW_PAGE_NUMBERS_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `TableOfContents.setShowPageNumbers: Failed to set show page numbers to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets the Right align page numbers checkbox
     * @param {boolean} condition true/false (true - checked, false - unchecked)
     */
    async setRightAlignPageNumbers(condition) {
        try {
            const selector = TableOfContents.SELECTORS.MODAL_WINDOW.RIGHT_ALIGN_PAGE_NUMBERS_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `TableOfContents.setRightAlignPageNumbers: Failed to set right align page numbers to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets the Leader dropdown
     * @param { "None" | "...................." | "-----------------" | "__________" } optionValue
     */
    async setLeader(optionValue) {
        try {
            await super.selectDropdown(TableOfContents.SELECTORS.MODAL_WINDOW.LEADER_MENU, optionValue);
        } catch (error) {
            throw new Error(`TableOfContents.setLeader: Failed to set leader '${optionValue}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets the Format table of contents as links checkbox
     * @param {boolean} condition true/false (true - checked, false - unchecked)
     */
    async setFormatAsLinks(condition) {
        try {
            const selector = TableOfContents.SELECTORS.MODAL_WINDOW.FORMAT_AS_LINKS_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `TableOfContents.setFormatAsLinks: Failed to set format as links to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Selects the "Outline levels" radio button in Build from section
     * @param {number} levels - number of levels
     */
    async setBuildFromLevels(levels = null) {
        try {
            const radio = TableOfContents.SELECTORS.MODAL_WINDOW.BUILD_FROM_LEVELS_RADIO.ELEMENT_SELECTOR;
            await this.tester.click(radio);
            if (levels) {
                await this.setLevels(levels);
            }
        } catch (error) {
            throw new Error(
                `TableOfContents.setBuildFromLevels: Failed to set build from levels '${levels}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Selects the "Selected styles" radio button in the Build from section and sets levels for styles.
     * For all styles not specified in buildFromStyles or with level: 0, the field is cleared by pressing Delete.
     * @param {BuildFromStyles} buildFromStyles - Object where the key is the style name and the value is the level (number or string).
     * Example:
     * {
     *   'Heading 1': 1,
     *   'Heading 2': 2,
     *   'Title': 0 // This field will be cleared
     * }
     * @returns {Promise<void>}
     */
    async setBuildFromStyles(buildFromStyles = null) {
        try {
            const radio = TableOfContents.SELECTORS.MODAL_WINDOW.BUILD_FROM_STYLES_RADIO.ELEMENT_SELECTOR;
            await this.tester.click(radio);
            if (buildFromStyles && typeof buildFromStyles === "object") {
                const styleListSelector = TableOfContents.SELECTORS.MODAL_WINDOW.STYLES_LIST.ELEMENT_SELECTOR;
                const items = await this.tester.parseItems(styleListSelector, undefined, "div:first-child");

                for (const item of items) {
                    const style = item.description.trim();
                    const level = buildFromStyles[style];
                    const inputSelector = `${item.id}`;
                    if (typeof level !== "undefined" && level !== 0 && level !== "0" && level !== "") {
                        const inputLevel = new Input(this.tester, inputSelector, false);
                        await inputLevel.set(level);
                    } else {
                        await this.tester.click(inputSelector);
                        await this.tester.page.keyboard.press("Delete");
                    }
                }
            }
        } catch (error) {
            throw new Error(`TableOfContents.setBuildFromStyles: Failed to set build from styles. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets the number of levels (spinner)
     * @param {number} levels - number of levels
     */
    async setLevels(levels) {
        try {
            const selector = TableOfContents.SELECTORS.MODAL_WINDOW.LEVELS_SPINNER.ELEMENT_SELECTOR;
            const inputLevels = new Input(this.tester, selector, false);
            await inputLevels.set(levels);
        } catch (error) {
            throw new Error(`TableOfContents.setLevels: Failed to set levels '${levels}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets the Styles dropdown
     * @param { "Current" | "Simple" | "Online" | "Standard" | "Modern" | "Classic" } optionValue
     */
    async setStyles(optionValue) {
        try {
            await super.selectDropdown(TableOfContents.SELECTORS.MODAL_WINDOW.STYLES_MENU, optionValue);
        } catch (error) {
            throw new Error(`TableOfContents.setStyles: Failed to set styles '${optionValue}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Returns OptionsButton instance for Table of Contents
     * @returns {OptionsButton} - OptionsButton instance for Table of Contents
     */
    #getTableOfContentsOptionsButton() {
        const tocButtonSelectors = TableOfContents.SELECTORS.TOOLBAR.TABLE_OF_CONTENTS_BUTTON;
        return new OptionsButton(this.tester, tocButtonSelectors.ELEMENT_SELECTOR, tocButtonSelectors.DEFAULT_BUTTON, {
            elementsSelector: tocButtonSelectors.DROPDOWN_ELEMENTS_SELECTOR,
            elementsValue: TableOfContents.TYPES.TABLE_OF_CONTENTS_BUTTON,
        });
    }

    /**
     * Returns OptionsButton instance for Add text button
     * @returns {OptionsButton} - OptionsButton instance for Add text button
     */
    #getAddTextButton() {
        const addTextButtonSelectors = TableOfContents.SELECTORS.TOOLBAR.ADD_TEXT_BUTTON;
        return new OptionsButton(
            this.tester,
            addTextButtonSelectors.ELEMENT_SELECTOR,
            addTextButtonSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: addTextButtonSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: TableOfContents.TYPES.ADD_TEXT_BUTTON,
            }
        );
    }

    /**
     * Returns OptionsButton instance for Update table button
     * @returns {OptionsButton} - OptionsButton instance for Update table button
     */
    #getUpdateTableButton() {
        const updateTableButtonSelectors = TableOfContents.SELECTORS.TOOLBAR.UPDATE_TABLE_BUTTON;
        return new OptionsButton(
            this.tester,
            updateTableButtonSelectors.ELEMENT_SELECTOR,
            updateTableButtonSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: updateTableButtonSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: TableOfContents.TYPES.UPDATE_BUTTON,
            }
        );
    }
}

module.exports = TableOfContents;
