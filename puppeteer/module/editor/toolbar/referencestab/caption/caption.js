const ReferencesTab = require("../referencestab");
const selectors = require("./selectors.json");
const { Input, ModalButton, Checkbox } = require("../../../../elements");

/**
 * @typedef {Object} CaptionSettings
 * @property {string} [numbering] - Numbering format ("1, 2, 3,...", "a, b, c,...", etc.)
 * @property {string} [useSeparator] - Separator ("-     (hyphen)", ".     (period)", etc.)
 * @property {string} [chapterStyle] - Chapter style ("Heading 1", "Heading 2", etc.)
 * @property {string} [label] - Label name
 * @property {string} [captionName] - Caption name
 * @property {boolean} [excludeLabelFromCaption] - Exclude label from caption
 * @property {boolean} [includeChapterNumber] - Include chapter number
 */

class Caption extends ReferencesTab {
    constructor(tester) {
        super(tester);
        this.captionModalButton = new ModalButton(
            this.tester,
            Caption.SELECTORS.TOOLBAR.CAPTION_BUTTON.ELEMENT_SELECTOR,
            Caption.SELECTORS.MODAL_WINDOW.CAPTION_WINDOW
        );
    }

    /**
     * Map of settings keys to method names for Caption settings
     */
    static SETTINGS_MAP = {
        numbering: "setNumbering",
        useSeparator: "setUseSeparator",
        chapterStyle: "setChapterStyle",
        label: "setLabel",
        captionName: "setCaptionName",
        excludeLabelFromCaption: "setExcludeLabelFromCaption",
        includeChapterNumber: "setIncludeChapterNumber",
    };

    /**
     * @param {enum} selectors - selectors for the caption module
     */
    static SELECTORS = selectors;

    /**
     * Sets settings in the Caption settings window
     * @param {CaptionSettings} settings - Caption settings
     */
    async setCaptionSettings(settings) {
        await this.captionModalButton.openModal();
        await this.setSettingsByMap(settings, Caption.SETTINGS_MAP);
        await this.#applyCaptionSettings();
    }

    /**
     * Opens the caption settings dialog, applies the provided settings, and then cancels the changes.
     * @param {CaptionSettings} settings - An object containing the caption settings to apply before cancellation.
     * @returns {Promise<void>} Resolves when the cancel operation is complete.
     */
    async cancelCaptionSettings(settings) {
        await this.captionModalButton.openModal();
        await this.setSettingsByMap(settings, Caption.SETTINGS_MAP);

        const cancelButtonSelector = Caption.SELECTORS.MODAL_WINDOW.CANCEL_BUTTON.ELEMENT_SELECTOR;
        await this.captionModalButton.closeModal(cancelButtonSelector);
    }

    /**
     * Adds a new label
     * @param {string} labelName
     */
    async addLabel(labelName) {
        try {
            await this.captionModalButton.openModal();
            const addLabelSelectors = Caption.SELECTORS.MODAL_WINDOW.ADD_LABEL_MENU;
            await this.tester.click(addLabelSelectors.ADD_LABEL_BUTTON);
            await this.tester.checkSelector(addLabelSelectors.LABEL_INPUT);
            const inputLabel = new Input(this.tester, addLabelSelectors.LABEL_INPUT);
            await inputLabel.set(labelName);
            await this.#applyCaptionSettings();
        } catch (error) {
            throw new Error(`Caption.addLabel: Failed to add label '${labelName}'. ${error.message}`, { cause: error });
        }
    }

    /**
     * Deletes a label
     * @param {string} labelName
     */
    async deleteLabel(labelName) {
        try {
            await this.captionModalButton.openModal();
            const deleteLabelSelectors = Caption.SELECTORS.MODAL_WINDOW.DELETE_LABEL_BUTTON;
            await this.setLabel(labelName);
            await this.tester.click(deleteLabelSelectors.ELEMENT_SELECTOR);
            await this.#applyCaptionSettings();
        } catch (error) {
            throw new Error(`Caption.deleteLabel: Failed to delete label '${labelName}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets the numbering for the caption
     * @param { "1, 2, 3,..." | "a, b, c,..." | "A, B, C,..." | "i, ii, iii,..." | "I, II, III,..." } optionValue
     */
    async setNumbering(optionValue) {
        try {
            await super.selectDropdown(Caption.SELECTORS.MODAL_WINDOW.NUMBERING_MENU, optionValue);
        } catch (error) {
            throw new Error(`Caption.setNumbering: Failed to set numbering '${optionValue}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets the use separator for the caption
     * @param { "-     (hyphen)" | ".     (period)" | ":     (colon)" | "—  (long dash)" | "–    (dash)" } optionValue
     */
    async setUseSeparator(optionValue) {
        try {
            await this.setIncludeChapterNumber(true);
            await super.selectDropdown(Caption.SELECTORS.MODAL_WINDOW.USE_SEPARATOR_MENU, optionValue);
        } catch (error) {
            throw new Error(`Caption.setUseSeparator: Failed to set use separator '${optionValue}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets the chapter style for the caption
     * @param { "Heading 1" | "Heading 2" | "Heading 3" | "Heading 4" | "Heading 5" | "Heading 6" | "Heading 7" | "Heading 8" | "Heading 9" } optionValue
     */
    async setChapterStyle(optionValue) {
        try {
            await this.setIncludeChapterNumber(true);
            await super.selectDropdown(Caption.SELECTORS.MODAL_WINDOW.CHAPTER_STYLE_MENU, optionValue);
        } catch (error) {
            throw new Error(`Caption.setChapterStyle: Failed to set chapter style '${optionValue}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets the label for the caption
     * @param {string} labelName
     */
    async setLabel(labelName) {
        try {
            await super.selectDropdown(Caption.SELECTORS.MODAL_WINDOW.LABEL_MENU, labelName);
        } catch (error) {
            throw new Error(`Caption.setLabel: Failed to set label '${labelName}'. ${error.message}`, { cause: error });
        }
    }

    /**
     * Sets the caption name
     * @param {string} captionName
     */
    async setCaptionName(captionName) {
        try {
            const captionInputSelectors = Caption.SELECTORS.MODAL_WINDOW.CAPTION_INPUT;
            const inputCaption = new Input(this.tester, captionInputSelectors.ELEMENT_SELECTOR, false);
            await inputCaption.set(captionName, 100, false);
        } catch (error) {
            throw new Error(`Caption.setCaptionName: Failed to set caption name '${captionName}'. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets the Exclude label from caption checkbox
     * @param {boolean} condition
     */
    async setExcludeLabelFromCaption(condition) {
        try {
            const selector = Caption.SELECTORS.MODAL_WINDOW.EXCLUDE_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `Caption.setExcludeLabelFromCaption: Failed to set exclude label from caption to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Sets the Include chapter number checkbox
     * @param {boolean} condition
     */
    async setIncludeChapterNumber(condition) {
        try {
            const selector = Caption.SELECTORS.MODAL_WINDOW.CHAPTER_CHECKBOX.ELEMENT_SELECTOR;
            const checkbox = new Checkbox(this.tester, selector);
            await checkbox.set(condition);
        } catch (error) {
            throw new Error(
                `Caption.setIncludeChapterNumber: Failed to set include chapter number to '${condition}'. ${error.message}`,
                { cause: error }
            );
        }
    }

    /**
     * Applies caption settings
     */
    async #applyCaptionSettings() {
        try {
            const okButtonSelectors = Caption.SELECTORS.MODAL_WINDOW.OK_BUTTON.ELEMENT_SELECTOR;
            await this.captionModalButton.closeModal(okButtonSelectors);
        } catch (error) {
            throw new Error(`Caption.applyCaptionSettings: Failed to apply caption settings. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = Caption;
