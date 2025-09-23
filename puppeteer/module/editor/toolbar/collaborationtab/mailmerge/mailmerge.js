const CollaborationTab = require("../collaborationtab");
const DocumentUploader = require("../../../../common/documentuploader");
const { OptionsButton } = require("../../../../elements");
const { MailMergeSettings } = require("../../../rightmenu");
const selectors = require("./selectors.json");

class MailMerge extends CollaborationTab {
    constructor(tester) {
        super(tester);
        this.mailMergeSettings = new MailMergeSettings(this.tester);
    }

    #documentUploader = new DocumentUploader(this.tester);

    /**
     * @enum
     */
    static MAIL_MERGE_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        MAIL_MERGE: ["From File", "From URL", "From Storage"],
    };

    /**
     * Load document from file for mail merge
     * By default, file is loaded from puppeteer/files folder
     * @param {string} [filePath] - File path or name of the file.
     */
    async fromFile(filePath) {
        const waitLoading = this.#documentUploader.uploadFromFile(filePath);
        await this.#setMailMerge(MailMerge.TYPES.MAIL_MERGE[0]);
        await waitLoading;
    }

    /**
     * Load document from URL
     * @param {string} [url] - URL of the document.
     */
    async fromUrl(url) {
        await this.#setMailMerge(MailMerge.TYPES.MAIL_MERGE[1]);
        await this.#documentUploader.uploadFromUrl(url);
    }

    /**
     * Load document from storage
     */
    async fromStorage() {
        await this.#setMailMerge(MailMerge.TYPES.MAIL_MERGE[2]);
        await this.#documentUploader.uploadFromStorage();
    }

    /**
     * Sets the state of a checkbox.
     * @param {"Highlight" | "Preview" | "All" | "Current" | "From"} [name] - Name of the checkbox to set.
     * @param {boolean} [isChecked = true] - Whether the checkbox should be checked or not.
     */
    async setCheckbox(name, isChecked = true) {
        await this.mailMergeSettings.setCheckbox(name, isChecked);
    }

    /**
     * Navigate to the next record.
     * @param {number} [count = 1] - The number of times to navigate to the next record.
     */
    async next(count = 1) {
        await this.mailMergeSettings.next(count);
    }

    /**
     * Navigate to the previous record.
     * @param {number} [count = 1] - The number of times to navigate to the previous record.
     */
    async prev(count = 1) {
        await this.mailMergeSettings.prev(count);
    }

    /**
     * Navigate to the first record.
     */
    async first() {
        await this.mailMergeSettings.first();
    }

    /**
     * Navigate to the last record.
     */
    async last() {
        await this.mailMergeSettings.last();
    }

    /**
     * Set the format of the document.
     * By default, format is set to PDF.
     * @param {"Docx" | "PDF"} [format] - The format to set.
     */
    async setFormat(format) {
        await this.mailMergeSettings.setFormat(format);
    }

    /**
     * Set the range of records to merge.
     * @param {number} [from] - The start record.
     * @param {number} [to] - The end record.
     */
    async setRange(from, to) {
        await this.mailMergeSettings.setRange(from, to);
    }

    /**
     * Save the document.
     */
    async save() {
        await this.mailMergeSettings.save();
    }

    /**
     * Download the document.
     */
    async download() {
        await this.mailMergeSettings.download();
    }

    /**
     * Set the mail merge option
     * @param {string} [optionValue] - The value of the mail merge option to set.
     */
    async #setMailMerge(optionValue) {
        try {
            const mailMergeSelectors = MailMerge.MAIL_MERGE_SELECTORS.MAIL_MERGE;
            const mailMergeButton = new OptionsButton(
                this.tester,
                mailMergeSelectors.ELEMENT_SELECTOR,
                mailMergeSelectors.DEFAULT_BUTTON,
                {
                    elementsSelector: mailMergeSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                    elementsValue: MailMerge.TYPES.MAIL_MERGE,
                }
            );
            await mailMergeButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`setMailMerge: Failed to set mail merge option: "${optionValue}". \n${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = MailMerge;
