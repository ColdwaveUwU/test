const BaseSettings = require("../basesettings");
const selectors = require("./selectors.json");

class MailMergeSettings extends BaseSettings {
    constructor(tester = RegularTester) {
        super(tester, selectors.RIGHT_MENU);
    }

    static MAILMERGE_SELECTORS = selectors;

    /**
     * Set the state of a checkbox.
     * @param {"Highlight" | "Preview" | "All" | "Current" | "From"} [name] - Name of the checkbox to set.
     * @param {boolean} [isChecked = true] - Whether the checkbox should be checked or not.
     */
    async setCheckbox(name, isChecked = true) {
        try {
            const checkboxName = name.toUpperCase();
            const checkboxSelector = MailMergeSettings.MAILMERGE_SELECTORS.CHECKBOXES[checkboxName];

            if (!checkboxSelector) {
                throw new Error(`Checkbox with name "${name}" not found`);
            }

            await this.tester.clickCheckbox({
                selector: checkboxSelector,
                condition: isChecked,
            });
        } catch (error) {
            throw new Error(`setCheckbox: Failed to set checkbox: "${name}". ${error.message}`, { cause: error });
        }
    }

    /**
     * Edits the record list.
     */
    async editRecList() {
        await this.tester.click(MailMergeSettings.MAILMERGE_SELECTORS.BUTTONS.EDIT_REC_LIST);
    }

    /**
     * Navigate to the next record.
     * @param {number} [count] - The number of times to navigate to the next record.
     */
    async next(count = 1) {
        for (let i = 0; i < count; i++) {
            await this.tester.click(MailMergeSettings.MAILMERGE_SELECTORS.BUTTONS.NEXT);
        }
    }

    /**
     * Navigate to the previous record.
     * @param {number} [count] - The number of times to navigate to the previous record.
     */
    async prev(count = 1) {
        for (let i = 0; i < count; i++) {
            await this.tester.click(MailMergeSettings.MAILMERGE_SELECTORS.BUTTONS.PREV);
        }
    }

    /**
     * Navigate to the first record.
     */
    async first() {
        await this.tester.click(MailMergeSettings.MAILMERGE_SELECTORS.BUTTONS.FIRST);
    }

    /**
     * Navigate to the last record.
     */
    async last() {
        await this.tester.click(MailMergeSettings.MAILMERGE_SELECTORS.BUTTONS.LAST);
    }

    /**
     * Sets the format of the document.
     * By default, format is set to PDF.
     * @param {"Docx" | "PDF"} [format] - The format to set.
     */
    async setFormat(format) {
        try {
            const formatSelectors = MailMergeSettings.MAILMERGE_SELECTORS.FORMATS;
            await this.tester.selectDropdown(formatSelectors.ELEMENT_SELECTOR);
            await this.tester.selectByText(format, formatSelectors.DROPDOWN_ELEMENTS_SELECTOR);
        } catch (error) {
            throw new Error(`setFormat: Failed to set format: "${format}". ${error.message}`, { cause: error });
        }
    }

    /**
     * Sets the value of the "from" and "to" fields.
     * @param {number} [from] - The value to set in the "from" field.
     * @param {number} [to] - The value to set in the "to" field.
     */
    async setRange(from, to) {
        await this.tester.inputToForm(from, MailMergeSettings.MAILMERGE_SELECTORS.FIELD_FROM);
        await this.tester.inputToForm(to, MailMergeSettings.MAILMERGE_SELECTORS.FIELD_TO);
    }

    /**
     * Saves the document.
     */
    async save() {
        await this.tester.click(MailMergeSettings.MAILMERGE_SELECTORS.BUTTONS.SAVE);
    }

    /**
     * Downloads the document.
     */
    async download() {
        await this.tester.click(MailMergeSettings.MAILMERGE_SELECTORS.BUTTONS.DOWNLOAD);
    }
}

module.exports = MailMergeSettings;
