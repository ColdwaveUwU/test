const ReferencesTab = require("../referencestab");
const selectors = require("./selectors.json");
const { ModalButton, Checkbox } = require("../../../../elements");

/**
 * TableOfFigures module for interacting with the Table of figures dialog
 */
class TableOfFigures extends ReferencesTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * @typedef {Object} TableOfFiguresSettings
     * @property {boolean} [showPageNumbers] - Show page numbers
     * @property {boolean} [rightAlignPageNumbers] - Right align page numbers
     * @property {string} [leader] - Leader
     * @property {boolean} [formatAsLinks] - Sets Format table of figures as links checkbox
     * @property {string} [buildTableOfFiguresFromCaption] - Build Table of Figures from caption dropdown value
     * @property {string} [buildTableOfFiguresFromStyle] - Build Table of Figures from style dropdown value
     * @property {string} [styles] - Styles dropdown value
     * @property {boolean} [includeLabelAndNumber] - Include label and number checkbox
     */

    /**
     * Map of settings keys to method names for TableOfFigures settings
     */
    static SETTINGS_MAP = {
        showPageNumbers: "setShowPageNumbers",
        rightAlignPageNumbers: "setRightAlignPageNumbers",
        leader: "setLeader",
        formatAsLinks: "setFormatAsLinks",
        buildTableOfFiguresFromCaption: "setBuildTableOfFiguresFromCaption",
        buildTableOfFiguresFromStyle: "setBuildTableOfFiguresFromStyle",
        styles: "setStyles",
        includeLabelAndNumber: "setIncludeLabelAndNumber",
    };

    /**
     * Sets multiple settings in the Table of Figures dialog
     * @param {TableOfFiguresSettings} settings - Table of Figures settings
     */
    async setTableOfFiguresSettings(settings) {
        const tableOfFiguresSettingsModalWindow = new ModalButton(
            this.tester,
            TableOfFigures.SELECTORS.TOOLBAR.TABLE_OF_FIGURES_BUTTON.ELEMENT_SELECTOR,
            TableOfFigures.SELECTORS.MODAL_WINDOW.TABLE_OF_FIGURES_WINDOW.ELEMENT_SELECTOR
        );

        await tableOfFiguresSettingsModalWindow.openModal();
        await this.setSettingsByMap(settings, TableOfFigures.SETTINGS_MAP);
        await tableOfFiguresSettingsModalWindow.closeModal(
            TableOfFigures.SELECTORS.MODAL_WINDOW.OK_BUTTON.ELEMENT_SELECTOR
        );
    }

    async cancelTableOfFiguresSettings(settings) {
        const tableOfFiguresSettingsModalWindow = new ModalButton(
            this.tester,
            TableOfFigures.SELECTORS.TOOLBAR.TABLE_OF_FIGURES_BUTTON.ELEMENT_SELECTOR,
            TableOfFigures.SELECTORS.MODAL_WINDOW.TABLE_OF_FIGURES_WINDOW
        );
        await tableOfFiguresSettingsModalWindow.open();
        await this.setSettingsByMap(settings, TableOfFigures.SETTINGS_MAP);
        await tableOfFiguresSettingsModalWindow.close(
            TableOfFigures.SELECTORS.MODAL_WINDOW.CANCEL_BUTTON.ELEMENT_SELECTOR
        );
    }

    /**
     * Updates the table of figures
     */
    async updateTableOfFigures() {
        try {
            const updateButtonSelectors = TableOfFigures.SELECTORS.TOOLBAR.UPDATE_BUTTON.ELEMENT_SELECTOR;
            await this.tester.click(updateButtonSelectors);
        } catch (error) {
            throw new Error(
                `TableOfFigures.updateTableOfFigures: Failed to update table of figures. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets Show page numbers checkbox
     * @param {boolean} condition
     */
    async setShowPageNumbers(condition) {
        try {
            const selector = TableOfFigures.SELECTORS.MODAL_WINDOW.SHOW_PAGE_NUMBERS_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `TableOfFigures.setShowPageNumbers: Failed to set show page numbers to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets Right align page numbers checkbox
     * @param {boolean} condition
     */
    async setRightAlignPageNumbers(condition) {
        try {
            const selector = TableOfFigures.SELECTORS.MODAL_WINDOW.RIGHT_ALIGN_PAGE_NUMBERS_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `TableOfFigures.setRightAlignPageNumbers: Failed to set right align page numbers to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets Leader dropdown
     * @param { "None" | "...................." | "-----------------" | "__________" } optionValue
     */
    async setLeader(optionValue) {
        try {
            await super.selectDropdown(TableOfFigures.SELECTORS.MODAL_WINDOW.LEADER_MENU, optionValue);
        } catch (error) {
            throw new Error(`TableOfFigures.setLeader: Failed to set leader '${optionValue}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets Format table of figures as links checkbox
     * @param {boolean} condition
     */
    async setFormatAsLinks(condition) {
        try {
            const selector = TableOfFigures.SELECTORS.MODAL_WINDOW.FORMAT_AS_LINKS_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `TableOfFigures.setFormatAsLinks: Failed to set format as links to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Selects "Caption" radio button in "Build from" section
     */
    async setBuildFromCaption() {
        try {
            const captionRadio = TableOfFigures.SELECTORS.MODAL_WINDOW.BUILD_FROM_CAPTION_RADIO.ELEMENT_SELECTOR;
            await this.tester.click(captionRadio);
        } catch (error) {
            throw new Error(`TableOfFigures.setBuildFromCaption: Failed to set build from caption. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Selects "Style" radio button in "Build from" section
     */
    async setBuildFromStyle() {
        try {
            const styleRadio = TableOfFigures.SELECTORS.MODAL_WINDOW.BUILD_FROM_STYLE_RADIO.ELEMENT_SELECTOR;
            await this.tester.click(styleRadio);
        } catch (error) {
            throw new Error(`TableOfFigures.setBuildFromStyle: Failed to set build from style. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets Build Table of Figures from Style dropdown
     * @param { "Normal" } optionValue
     */
    async setBuildTableOfFiguresFromStyle(optionValue) {
        try {
            await this.setBuildFromStyle();
            await super.selectDropdown(TableOfFigures.SELECTORS.MODAL_WINDOW.BUILD_FROM_STYLE_MENU, optionValue);
        } catch (error) {
            throw new Error(
                `TableOfFigures.setBuildTableOfFiguresFromStyle: Failed to set build table of figures from style with value '${optionValue}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets Build Table of Figures from Captions dropdown
     * @param { "None" | "Equation" | "Figure" | "Table" } optionValue
     */
    async setBuildTableOfFiguresFromCaption(optionValue) {
        try {
            await this.setBuildFromCaption();
            await super.selectDropdown(TableOfFigures.SELECTORS.MODAL_WINDOW.BUILD_FROM_CAPTIONS_MENU, optionValue);
        } catch (error) {
            throw new Error(
                `TableOfFigures.setBuildTableOfFiguresFromCaption: Failed to set build table of figures from caption with value '${optionValue}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets Styles dropdown
     * @param { "Current" | "Simple" | "Online" | "Classic" | "Distinctive" | "Centered" | "Formal" } optionValue
     */
    async setStyles(optionValue) {
        try {
            await super.selectDropdown(TableOfFigures.SELECTORS.MODAL_WINDOW.STYLES_MENU, optionValue);
        } catch (error) {
            throw new Error(`TableOfFigures.setStyles: Failed to set styles '${optionValue}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets Include label and number checkbox
     * @param {boolean} condition
     */
    async setIncludeLabelAndNumber(condition) {
        try {
            const selector = TableOfFigures.SELECTORS.MODAL_WINDOW.INCLUDE_LABEL_AND_NUMBER_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `TableOfFigures.setIncludeLabelAndNumber: Failed to set include label and number to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }
}

module.exports = TableOfFigures;
