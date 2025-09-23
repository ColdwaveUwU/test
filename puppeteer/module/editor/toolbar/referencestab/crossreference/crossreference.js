const ReferencesTab = require("../referencestab");
const selectors = require("./selectors.json");
const { Input, ModalButton, Checkbox } = require("../../../../elements");

/**
 * CrossReference module for interacting with the Cross-reference dialog
 */
class CrossReference extends ReferencesTab {
    constructor(tester) {
        super(tester);
        this.crossReferenceModalButton = new ModalButton(
            this.tester,
            CrossReference.SELECTORS.TOOLBAR.CROSS_REFERENCE_BUTTON.ELEMENT_SELECTOR,
            CrossReference.SELECTORS.MODAL_WINDOW.CROSS_REFERENCE_WINDOW
        );
    }

    /**
     * Map of settings keys to method names for CrossReference settings
     */
    static SETTINGS_MAP = {
        referenceType: "setReferenceType",
        selectItemByName: "selectItemByName",
        insertReferenceTo: "setInsertReferenceTo",
        insertAsHyperlink: "setInsertAsHyperlink",
        includeAboveBelow: "setIncludeAboveBelow",
        separator: "setSeparator",
    };

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * @typedef {Object} CrossReferenceSettings
     * @property {"Numbered item" | "Heading" | "Bookmark" | "Footnote" | "Endnote" | "Equation" | "Figure" | "Table"} [referenceType] - Reference type
     * @property {string} [selectItemByName] - Name of the item to select
     * @property {string} [insertReferenceTo] - Insert reference to
     * @property {boolean} [insertAsHyperlink] - Insert as hyperlink
     * @property {boolean} [includeAboveBelow] - Include above/below
     * @property {string} [separator] - Separator value
     */

    /**
     * Sets multiple settings in the Cross-reference dialog
     * @param {CrossReferenceSettings} settings - CrossReference settings
     */
    async setCrossReferenceSettings(settings) {
        const btn = CrossReference.SELECTORS.TOOLBAR.CROSS_REFERENCE_BUTTON.ELEMENT_SELECTOR;
        await this.crossReferenceModalButton.openModal(btn);

        await this.setSettingsByMap(settings, CrossReference.SETTINGS_MAP);
        await this.insertSettings();
    }

    /**
     * Sets Reference type dropdown
     * @param {"Numbered item" | "Heading" | "Bookmark" | "Footnote" | "Endnote" | "Equation" | "Figure" | "Table"} optionValue
     */
    async setReferenceType(optionValue) {
        try {
            await super.selectDropdown(CrossReference.SELECTORS.MODAL_WINDOW.REFERENCE_TYPE_MENU, optionValue);
        } catch (error) {
            throw new Error(
                `CrossReference.setReferenceType: Failed to set reference type '${optionValue}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets Insert reference to dropdown
     * @param {
     * "Heading text" |
     * "Page number" |
     * "Heading number" |
     * "Heading number (no context)" |
     * "Heading number (full context)" |
     * "Above/below" |
     * "Paragraph number" |
     * "Paragraph number (no context)" |
     * "Paragraph number (full context)" |
     * "Paragraph text"
     * "Entire caption" |
     * "Only label and number" |
     * "Only caption text" |
     * "Bookmark text" |
     * "Footnote number" |
     * "Footnote number (formatted)" |
     * "Endnote number" |
     * "Endnote number (formatted)" |
     * } optionValue
     */
    async setInsertReferenceTo(optionValue) {
        try {
            await super.selectDropdown(CrossReference.SELECTORS.MODAL_WINDOW.INSERT_REFERENCE_TO_MENU, optionValue);
        } catch (error) {
            throw new Error(
                `CrossReference.setInsertReferenceTo: Failed to set insert reference to '${optionValue}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets Insert as hyperlink checkbox
     * @param {boolean} condition
     */
    async setInsertAsHyperlink(condition) {
        try {
            const selector = CrossReference.SELECTORS.MODAL_WINDOW.INSERT_AS_HYPERLINK_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `CrossReference.setInsertAsHyperlink: Failed to set insert as hyperlink to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets Include above/below checkbox
     * @param {boolean} condition
     */
    async setIncludeAboveBelow(condition) {
        try {
            const selector = CrossReference.SELECTORS.MODAL_WINDOW.INCLUDE_ABOVE_BELOW_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `CrossReference.setIncludeAboveBelow: Failed to set include above/below to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets separator value
     * @param {string} separator
     */
    async setSeparator(separator) {
        try {
            const inputSelector = CrossReference.SELECTORS.MODAL_WINDOW.SEPARATOR_INPUT.ELEMENT_SELECTOR;
            const checkboxSelector =
                CrossReference.SELECTORS.MODAL_WINDOW.SEPARATE_NUMBERS_WITH_CHECKBOX.ELEMENT_SELECTOR;
                
            const checkbox = new Checkbox(this.tester, checkboxSelector);
            await checkbox.set(true);
            const inputSeparator = new Input(this.tester, inputSelector, false);
            await inputSeparator.set(separator, 100);
        } catch (error) {
            throw new Error(`CrossReference.setSeparator: Failed to set separator '${separator}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Selects an item from the list by name
     * @param {string} name - Name of the item to select
     */
    async selectItemByName(name) {
        try {
            const listSelector = CrossReference.SELECTORS.MODAL_WINDOW.ITEMS_LIST.ELEMENT_SELECTOR;
            await this.tester.selectByText(name, listSelector);
        } catch (error) {
            throw new Error(
                `CrossReference.selectItemByName: Failed to select item by name '${name}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Applies settings (Insert)
     */
    async insertSettings() {
        try {
            const okBtn = CrossReference.SELECTORS.MODAL_WINDOW.INSERT_BUTTON.ELEMENT_SELECTOR;
            await this.tester.click(okBtn);
            await this.cancelSettings();
        } catch (error) {
            throw new Error(`CrossReference.insertSettings: Failed to insert settings. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Cancels settings (Close)
     */
    async cancelSettings() {
        try {
            const cancelBtn = CrossReference.SELECTORS.MODAL_WINDOW.CANCEL_BUTTON.ELEMENT_SELECTOR;
            await this.tester.click(cancelBtn);
            await this.crossReferenceModalButton.closeModal(cancelBtn);
        } catch (error) {
            throw new Error(`CrossReference.cancelSettings: Failed to cancel settings. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = CrossReference;
