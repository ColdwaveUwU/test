const ReferencesTab = require("../referencestab");
const selectors = require("./selectors.json");
const { Input, ModalButton, OptionsButton, Dropdown, Checkbox } = require("../../../../elements");
const { NotesSettings, DeleteNotes } = require("../../../modalwindows");
/**
 * @typedef {Object} NotesSettings
 * @property {string} [location] - Notes location ("Bottom of page" or "Below text" or "End of section" or "End of document")
 * @property {string} [numberFormat] - Number format ("1, 2, 3,...", "a, b, c,...", "A, B, C,...", "i, ii, iii,...", "I, II, III,...")
 * @property {string} [startAt] - Start from number
 * @property {string} [numbering] - Numbering ("Continuous", "Restart each section", "Restart each page")
 * @property {string} [customMark] - Custom mark
 * @property {string} [applyChangesTo] - Apply changes to ("Whole document" etc.)
 */

class Footnote extends ReferencesTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    #footnoteDropdown = null;
    #notesSettingsModal = null;
    #notesSettings = null;

    get footnoteDropdown() {
        if (!this.#footnoteDropdown) {
            const btn = Footnote.SELECTORS.TOOLBAR.NOTES_BUTTON;
            this.#footnoteDropdown = new OptionsButton(this.tester, btn.selector, btn.defaultButton, btn);
        }
        return this.#footnoteDropdown;
    }

    get notesSettings() {
        if (!this.#notesSettings && this.#notesSettingsModal) {
            this.#notesSettings = new NotesSettings(this.tester, this.#notesSettingsModal);
        }
        return this.#notesSettings;
    }

    async #selectFootnoteOption(optionValue) {
        await this.footnoteDropdown.setOption(optionValue);
    }

    #getNotesSettingsModal(selector) {
        if (!this.#notesSettingsModal) {
            const { WINDOW, APPLY_BUTTON } = Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS;
            this.#notesSettingsModal = new ModalButton(this.tester, selector, WINDOW, APPLY_BUTTON);
        }
        return this.#notesSettingsModal;
    }

    /**
     * Opens 'Notes settings' modal
     */
    async openNotesSettings() {
        try {
            const notesDropdownButtons = await this.footnoteDropdown.getOptions();
            const notesSettings = notesDropdownButtons.find((elem) => elem.description === "Notes settings");
            this.#getNotesSettingsModal(notesSettings.id);
            await this.notesSettings.openNotesSettings();
        } catch (error) {
            this.#handleError("openNotesSettings", error);
        }
    }

    /**
     * Selects 'Convert all notes' option
     */
    async convertAllNotes() {
        try {
            await this.#selectFootnoteOption("Convert all notes");
        } catch (error) {
            this.#handleError("convertAllNotes", error);
        }
    }

    /**
     * Clicks the footnote default button
     */
    async clickFootnote() {
        try {
            await this.#selectFootnoteOption();
        } catch (error) {
            this.#handleError("clickFootnote", error);
        }
    }

    /**
     * Selects 'Insert footnote' option
     */
    async insertFootnote() {
        try {
            await this.#selectFootnoteOption("Insert footnote");
        } catch (error) {
            this.#handleError("insertFootnote", error);
        }
    }

    /**
     * Selects 'Insert endnote' option
     */
    async insertEndnote() {
        try {
            await this.#selectFootnoteOption("Insert endnote");
        } catch (error) {
            this.#handleError("insertEndnote", error);
        }
    }

    /**
     * Selects 'Delete all notes' option
     * @param {boolean} footnotes - Delete footnotes (default: true)
     * @param {boolean} endnotes - Delete endnotes (default: true)
     */
    async deleteAllNotes(footnotes = true, endnotes = true) {
        const checkboxSelectors = Footnote.SELECTORS.MODAL_WINDOW.DELETE_ALL_NOTES;
        try {
            const notesDropdownButtons = await this.footnoteDropdown.getOptions();
            const notesSettings = notesDropdownButtons.find((elem) => elem.description === "Delete all notes");
            const deleteNotesModal = new ModalButton(
                this.tester,
                notesSettings.id,
                checkboxSelectors.WINDOW,
                checkboxSelectors.OK_BUTTON
            );

            const deleteNotesSettings = new DeleteNotes(this.tester, deleteNotesModal);
            await deleteNotesSettings.deleteAllNotes(footnotes, endnotes);
        } catch (error) {
            this.#handleError("deleteAllNotes", error);
        }
    }

    /**
     * Goes to footnotes
     * @param {"next" | "previous"} option - Next or previous
     * @param {number} clickCount - Number of clicks
     */
    async goToFootnotes(option, clickCount = 1) {
        const goToFootnoteSelectors = Footnote.SELECTORS.TOOLBAR.GO_TO_FOOTNOTE[option.toUpperCase()];
        try {
            await this.#clickFootnoteDropdownToggle();
            for (let i = 0; i < clickCount; i++) {
                await this.tester.click(goToFootnoteSelectors);
            }
            await this.#clickFootnoteDropdownToggle();
        } catch (error) {
            this.#handleError("goToFootnotes", error);
        }
    }

    /**
     * Goes to endnotes
     * @param {"next" | "previous"} option - Next or previous
     * @param {number} clickCount - Number of clicks
     */
    async goToEndnotes(option, clickCount = 1) {
        const goToEndnoteSelectors = Footnote.SELECTORS.TOOLBAR.GO_TO_ENDNOTE[option.toUpperCase()];
        try {
            await this.#clickFootnoteDropdownToggle();
            for (let i = 0; i < clickCount; i++) {
                await this.tester.click(goToEndnoteSelectors);
            }
            await this.#clickFootnoteDropdownToggle();
        } catch (error) {
            this.#handleError("goToEndnotes", error);
        }
    }

    /**
     * Selects 'Convert all footnotes to endnotes' option
     */
    async convertAllFootnotesToEndnotes() {
        try {
            await this.convertAllNotes();
            await this.#selectFootnoteOption("Convert all footnotes to endnotes");
        } catch (error) {
            this.#handleError("convertAllFootnotesToEndnotes", error);
        }
    }

    /**
     * Selects 'Convert all endnotes to footnotes' option
     */
    async convertAllEndnotesToFootnotes() {
        try {
            await this.convertAllNotes();
            await this.#selectFootnoteOption("Convert all endnotes to footnotes");
        } catch (error) {
            this.#handleError("convertAllEndnotesToFootnotes", error);
        }
    }

    /**
     * Selects 'Swap footnotes and endnotes' option
     */
    async swapFootnotesAndEndnotes() {
        try {
            await this.convertAllNotes();
            await this.#selectFootnoteOption("Swap footnotes and endnotes");
        } catch (error) {
            this.#handleError("swapFootnotesAndEndnotes", error);
        }
    }

    /**
     * Opens the notes settings modal, applies the provided settings, and closes the modal.
     * @param {NotesSettings} settings - Notes settings
     * @param {"insert" | "apply"} method - Method to use to set the settings
     */
    async setNotesSettings(settings, method = "insert") {
        await this.openNotesSettings();
        await this.notesSettings.setNotesSettings(settings, method);
    }

    /**
     * Cancels the notes settings modal
     */
    async clickCancelNotesSettings() {
        try {
            await this.notesSettings.clickCancelNotesSettings();
        } catch (error) {
            this.#handleError("clickCancelNotesSettings", error);
        }
    }

    /**
     * Applies the notes settings
     */
    async clickApplyNotesSettings() {
        try {
            await this.notesSettings.clickApplyNotesSettings();
        } catch (error) {
            this.#handleError("clickApplyNotesSettings", error);
        }
    }

    /**
     * Inserts the notes settings
     */
    async clickInsertNotesSettings() {
        try {
            await this.notesSettings.clickInsertNotesSettings();
        } catch (error) {
            this.#handleError("clickInsertNotesSettings", error);
        }
    }

    /**
     * Selects notes location
     * @param { "End of section" | "End of document" | "Bottom of page" | "Below text" } location - Notes location
     */
    async selectLocation(location) {
        try {
            await this.notesSettings.selectLocation(location);
        } catch (error) {
            this.#handleError("selectLocation", error);
        }
    }

    /**
     * Selects number format
     * @param { "1, 2, 3,..." | "a, b, c,..." | "A, B, C,..." | "i, ii, iii,..." | "I, II, III,..." } numberFormat
     */
    async selectNumberFormat(numberFormat) {
        try {
            await this.notesSettings.selectNumberFormat(numberFormat);
        } catch (error) {
            this.#handleError("selectNumberFormat", error);
        }
    }

    /**
     * Sets start number
     * @param {string | number} startAt - Start number
     */
    async setStartAt(startAt) {
        try {
            await this.notesSettings.setStartAt(startAt);
        } catch (error) {
            this.#handleError("setStartAt", error);
        }
    }

    /**
     * Selects numbering type
     * @param { "Continuous" | "Restart each section" | "Restart each page" } numbering
     */
    async selectNumbering(numbering) {
        try {
            await this.notesSettings.selectNumbering(numbering);
        } catch (error) {
            this.#handleError("selectNumbering", error);
        }
    }

    /**
     * Sets custom mark
     * @param {string} customMark - Custom mark
     */
    async setCustomMark(customMark) {
        try {
            await this.notesSettings.setCustomMark(customMark);
        } catch (error) {
            this.#handleError("setCustomMark", error);
        }
    }

    /**
     * Selects apply changes to option
     * @param { "Whole document" } applyChangesTo - Apply changes to
     */
    async selectApplyChangesTo(applyChangesTo) {
        try {
            await this.notesSettings.selectApplyChangesTo(applyChangesTo);
        } catch (error) {
            this.#handleError("selectApplyChangesTo", error);
        }
    }

    /**
     * Clicks the footnote dropdown toggle
     */
    async #clickFootnoteDropdownToggle() {
        try {
            await this.tester.click(Footnote.SELECTORS.TOOLBAR.NOTES_BUTTON.dropdownToggle);
        } catch (error) {
            this.#handleError("#clickFootnoteDropdown", error);
        }
    }

    /**
     * Handles errors by throwing a new error with method name and original error message.
     * @param {string} methodName The name of the method where the error occurred.
     * @param {Error} error The original error object.
     */
    #handleError(methodName, error) {
        throw new Error(`Footnote.${methodName}: ${error.message}`, {
            cause: error,
        });
    }
}

module.exports = Footnote;
