const ReferencesTab = require("../referencestab");
const selectors = require("./selectors.json");
const { Input, ModalButton, OptionsButton, Dropdown } = require("../../../../elements");

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

    /**
     * @enum
     */
    static SETTINGS_MAP = {
        location: "selectLocation",
        numberFormat: "selectNumberFormat",
        startAt: "setStartAt",
        numbering: "selectNumbering",
        customMark: "setCustomMark",
        applyChangesTo: "selectApplyChangesTo",
    };

    /**
     * @enum
     */
    static LOCATION_CONFIG = {
        "Bottom of page": {
            radioSelector: Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.FOOTNOTE_RADIO,
            dropdownSelector: Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.FOOTNOTE_LOCATION_COMBO,
        },
        "Below text": {
            radioSelector: Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.FOOTNOTE_RADIO,
            dropdownSelector: Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.FOOTNOTE_LOCATION_COMBO,
        },
        "End of section": {
            radioSelector: Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.ENDNOTE_RADIO,
            dropdownSelector: Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.ENDNOTE_LOCATION_COMBO,
        },
        "End of document": {
            radioSelector: Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.ENDNOTE_RADIO,
            dropdownSelector: Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.ENDNOTE_LOCATION_COMBO,
        },
    };

    /**
     * Returns the notes settings modal
     * @returns {ModalButton} - The notes settings modal
     */
    get notesSettingsModal() {
        if (!this._notesSettingsModal) {
            this._notesSettingsModal = new ModalButton(
                this.tester,
                "",
                Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.WINDOW
            );
        }
        return this._notesSettingsModal;
    }

    /**
     * Opens 'Notes settings' modal
     */
    async openNotesSettings() {
        try {
            await Promise.all([this.notesSettingsModal.isModalOpen(), this.#footnoteDropdown("Notes settings")]);
        } catch (error) {
            this.#handleError("openNotesSettings", error);
        }
    }

    /**
     * Selects 'Convert all notes' option
     */
    async convertAllNotes() {
        try {
            await this.#footnoteDropdown("Convert all notes");
        } catch (error) {
            this.#handleError("convertAllNotes", error);
        }
    }

    /**
     * Clicks the footnote default button
     */
    async clickFootnote() {
        try {
            await this.#footnoteDropdown();
        } catch (error) {
            this.#handleError("clickFootnote", error);
        }
    }

    /**
     * Selects 'Insert footnote' option
     */
    async insertFootnote() {
        try {
            await this.#footnoteDropdown("Insert footnote");
        } catch (error) {
            this.#handleError("insertFootnote", error);
        }
    }

    /**
     * Selects 'Insert endnote' option
     */
    async insertEndnote() {
        try {
            await this.#footnoteDropdown("Insert endnote");
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
            const deleteNotesModal = new ModalButton(
                this.tester,
                "",
                checkboxSelectors.WINDOW,
                checkboxSelectors.OK_BUTTON
            );

            await Promise.all([deleteNotesModal.isModalOpen(), this.#footnoteDropdown("Delete all notes")]);

            await Promise.all([
                this.tester.clickCheckbox({ selector: checkboxSelectors.FOOTNOTE_CHECKBOX, condition: footnotes }),
                this.tester.clickCheckbox({ selector: checkboxSelectors.ENDNOTE_CHECKBOX, condition: endnotes }),
            ]);
            await deleteNotesModal.closeModal();
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
            await this.#clickFootnoteDropdownToggle();
            await Promise.all([this.convertAllNotes(), this.#footnoteDropdown("Convert all footnotes to endnotes")]);
        } catch (error) {
            this.#handleError("convertAllFootnotesToEndnotes", error);
        }
    }

    /**
     * Selects 'Convert all endnotes to footnotes' option
     */
    async convertAllEndnotesToFootnotes() {
        try {
            await this.#clickFootnoteDropdownToggle();
            await Promise.all([this.convertAllNotes(), this.#footnoteDropdown("Convert all endnotes to footnotes")]);
        } catch (error) {
            this.#handleError("convertAllEndnotesToFootnotes", error);
        }
    }

    /**
     * Selects 'Swap footnotes and endnotes' option
     */
    async swapFootnotesAndEndnotes() {
        try {
            await this.#clickFootnoteDropdownToggle();
            await Promise.all([this.convertAllNotes(), this.#footnoteDropdown("Swap footnotes and endnotes")]);
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
        await this.setSettingsByMap(settings, Footnote.SETTINGS_MAP);
        if (method.toLowerCase() === "insert") {
            await this.clickInsertNotesSettings();
        } else {
            await this.clickApplyNotesSettings();
        }
    }

    /**
     * Cancels the notes settings modal
     */
    async clickCancelNotesSettings() {
        try {
            await this.notesSettingsModal.closeModal(Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.CANCEL_BUTTON);
        } catch (error) {
            this.#handleError("clickCancelNotesSettings", error);
        }
    }

    /**
     * Applies the notes settings
     */
    async clickApplyNotesSettings() {
        try {
            await this.notesSettingsModal.closeModal(Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.APPLY_BUTTON);
        } catch (error) {
            this.#handleError("clickApplyNotesSettings", error);
        }
    }

    /**
     * Inserts the notes settings
     */
    async clickInsertNotesSettings() {
        try {
            await this.notesSettingsModal.closeModal(Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.INSERT_BUTTON);
        } catch (error) {
            this.#handleError("clickInsertNotesSettings", error);
        }
    }

    /**
     * Selects notes location
     * @param { "End of section" | "End of document" | "Bottom of page" | "Below text" } location - Notes location
     */
    async selectLocation(location) {
        const locationConfig = Footnote.LOCATION_CONFIG[location];
        if (!locationConfig) {
            throw new Error(`Invalid location: ${location}`);
        }

        try {
            await this.tester.click(locationConfig.radioSelector);
            const locationDropdown = new Dropdown(this.tester, locationConfig.dropdownSelector);
            await locationDropdown.selectDropdownItem(location);
        } catch (error) {
            this.#handleError("selectLocation", error);
        }
    }

    /**
     * Selects number format
     * @param { "1, 2, 3,..." | "a, b, c,..." | "A, B, C,..." | "i, ii, iii,..." | "I, II, III,..." } numberFormat
     */
    async selectNumberFormat(numberFormat) {
        const formatSelectors = Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.FORMAT_COMBO;
        const formatDropdown = new Dropdown(this.tester, formatSelectors);
        try {
            await formatDropdown.selectDropdownItem(numberFormat);
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
            const inputStartAt = new Input(
                this.tester,
                Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.START_AT_SPINNER,
                false
            );
            await inputStartAt.set(startAt);
        } catch (error) {
            this.#handleError("setStartAt", error);
        }
    }

    /**
     * Selects numbering type
     * @param { "Continuous" | "Restart each section" | "Restart each page" } numbering
     */
    async selectNumbering(numbering) {
        const numberingSelectors = Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.NUMBERING_COMBO;
        const numberingDropdown = new Dropdown(this.tester, numberingSelectors);
        try {
            await numberingDropdown.selectDropdownItem(numbering);
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
            const inputCustomMark = new Input(
                this.tester,
                Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.CUSTOM_MARK_INPUT,
                false
            );
            await inputCustomMark.set(customMark, 100);
        } catch (error) {
            this.#handleError("setCustomMark", error);
        }
    }

    /**
     * Selects apply changes to option
     * @param { "Whole document" } applyChangesTo - Apply changes to
     */
    async selectApplyChangesTo(applyChangesTo) {
        const applyChangesToSelectors = Footnote.SELECTORS.MODAL_WINDOW.NOTES_SETTINGS.APPLY_COMBO;
        const applyChangesToDropdown = new Dropdown(this.tester, applyChangesToSelectors);
        try {
            await applyChangesToDropdown.selectDropdownItem(applyChangesTo);
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
     * Selects a specific item from the dropdown.
     * @param {
     * "Insert footnote" |
     * "Insert endnote" |
     * "Delete all notes" |
     * "Convert all notes" |
     * "Convert all footnotes to endnotes" |
     * "Convert all endnotes to footnotes" |
     * "Swap footnotes and endnotes" |
     * "Notes settings"
     * } optionValue - The value of the dropdown item to select.
     * @throws {Error} - Throws an error if the specified option is not found in the dropdown.
     */
    async #footnoteDropdown(optionValue) {
        const notesButtonSelectors = Footnote.SELECTORS.TOOLBAR.NOTES_BUTTON;
        const notesOptionsButton = new OptionsButton(
            this.tester,
            notesButtonSelectors.selector,
            notesButtonSelectors.defaultButton,
            notesButtonSelectors
        );
        await notesOptionsButton.setOption(optionValue);
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
