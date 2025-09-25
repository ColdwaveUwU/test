/**
 * @typedef LocationSettings
 * @property {string} type
 * @property {string} settings
 */
const { Dropdown, Input } = require("../../../elements");
const selectors = require("./selectors.json");

class NotesSettings {
    constructor(tester, notesSettingsModal) {
        this.tester = tester;
        this.notesSettingsModal = notesSettingsModal;
    }

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
            radioSelector: NotesSettings.SELECTORS.FOOTNOTE_RADIO,
            dropdownSelector: NotesSettings.SELECTORS.FOOTNOTE_LOCATION_COMBO,
        },
        "Below text": {
            radioSelector: NotesSettings.SELECTORS.FOOTNOTE_RADIO,
            dropdownSelector: NotesSettings.SELECTORS.FOOTNOTE_LOCATION_COMBO,
        },
        "End of section": {
            radioSelector: NotesSettings.SELECTORS.ENDNOTE_RADIO,
            dropdownSelector: NotesSettings.SELECTORS.ENDNOTE_LOCATION_COMBO,
        },
        "End of document": {
            radioSelector: NotesSettings.SELECTORS.ENDNOTE_RADIO,
            dropdownSelector: NotesSettings.SELECTORS.ENDNOTE_LOCATION_COMBO,
        },
    };

    async openNotesSettings() {
        await this.notesSettingsModal.openModal();
    }

    /**
     * Opens the notes settings modal, applies the provided settings, and closes the modal.
     * @param {NotesSettings} settings - Notes settings
     * @param {"insert" | "apply"} method - Method to use to set the settings
     */
    async setNotesSettings(settings, method = "insert") {
        await this.notesSettingsModal.openModal();
        await this.setSettingsByMap(settings, NotesSettings.SETTINGS_MAP);
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
            await this.notesSettingsModal.closeModal(NotesSettings.SELECTORS.CANCEL_BUTTON);
        } catch (error) {
            this.#handleError("clickCancelNotesSettings", error);
        }
    }

    /**
     * Applies the notes settings
     */
    async clickApplyNotesSettings() {
        try {
            await this.notesSettingsModal.closeModal(NotesSettings.SELECTORS.APPLY_BUTTON);
        } catch (error) {
            this.#handleError("clickApplyNotesSettings", error);
        }
    }

    /**
     * Inserts the notes settings
     */
    async clickInsertNotesSettings() {
        try {
            await this.notesSettingsModal.closeModal(NotesSettings.SELECTORS.INSERT_BUTTON);
        } catch (error) {
            this.#handleError("clickInsertNotesSettings", error);
        }
    }

    /**
     * Selects notes location
     * @param { "End of section" | "End of document" | "Bottom of page" | "Below text" } location - Notes location
     */
    async selectLocation(location) {
        const locationConfig = NotesSettings.LOCATION_CONFIG[location];
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
        const formatSelectors = NotesSettings.SELECTORS.FORMAT_COMBO;
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
            const inputStartAt = new Input(this.tester, NotesSettings.SELECTORS.START_AT_SPINNER, false);
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
        const numberingSelectors = NotesSettings.SELECTORS.NUMBERING_COMBO;
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
            const inputCustomMark = new Input(this.tester, NotesSettings.SELECTORS.CUSTOM_MARK_INPUT, false);
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
        const applyChangesToSelectors = NotesSettings.SELECTORS.APPLY_COMBO;
        const applyChangesToDropdown = new Dropdown(this.tester, applyChangesToSelectors);
        try {
            await applyChangesToDropdown.selectDropdownItem(applyChangesTo);
        } catch (error) {
            this.#handleError("selectApplyChangesTo", error);
        }
    }

    /**
     * Applies settings using a mapping from keys to method names
     * @param {Object} settings - Settings object
     * @param {Object} map - Map of setting keys to method names
     */
    async setSettingsByMap(settings, map) {
        if (!settings || !map) {
            return;
        }

        for (const key of Object.keys(settings)) {
            const methodName = map[key];
            if (methodName && typeof this[methodName] === "function") {
                await this[methodName](settings[key]);
            }
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
module.exports = NotesSettings;
