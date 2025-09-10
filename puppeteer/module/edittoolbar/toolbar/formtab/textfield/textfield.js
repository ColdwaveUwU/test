const FormTab = require("../formtab.js");
const { TextFieldSettings } = require("../../../../rightmenu");
const selectors = require("./selectors.json");

class TextField extends FormTab {
    constructor(tester) {
        super(tester, "Forms");
        this.textFieldSettings = new TextFieldSettings(this.tester);
    }

    static TEXTFIELD_SELECTORS = selectors;

    /**
     * Closes the initial popup modal.
     */
    async #closePopup() {
        const popupModal = await this.tester.checkSelector(TextField.TEXTFIELD_SELECTORS.POPUP_MODAL);
        if (popupModal) {
            await this.tester.click(TextField.TEXTFIELD_SELECTORS.POPUP_MODAL);
        }
    }

    /**
     * Inserts a text field into the document.
     */
    async insertFixedTextField() {
        await this.tester.click(TextField.TEXTFIELD_SELECTORS.TOOLMENU_FIXED_TEXTFIELD_BTN);
    }

    /**
     * Inserts an inline text field into the document.
     */
    async insertInlineTextField() {
        await this.#closePopup();
        await this.tester.click(TextField.TEXTFIELD_SELECTORS.TOOLMENU_INLINE_TEXTFIELD_BTN);
        await this.tester.selectByText("Inline", TextField.TEXTFIELD_SELECTORS.TOOLMENU_TEXTFIELD_DROPDOWN_LIST);
    }

    /**
     * Opens the text field settings.
     */
    async #openTextFieldSettings() {
        await this.textFieldSettings.openTextFieldSettings();
    }

    /**
     * Sets the role of the text field.
     * @param {string} role - The role to be set.
     */
    async setRole(role) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setRole(role);
    }

    /**
     * Sets various fields in the textfield settings.
     * @param {{fieldName: string}} settings - Object containing field values,
     * the field name matches the corresponding field in the settings menu
     */
    async setFields(settings) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setFields(settings);
    }

    /**
     * Sets the format of the text field.
     * @param {string} format - The format to be set.
     */
    async setFormat(format) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setFormat(format);
    }

    /**
     * Sets the regular expression for the text field.
     * @param {string} regex - The regular expression to be set.
     */
    async setRegEx(regex) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setRegEx(regex);
    }

    /**
     * Sets the arbitrary mask for the text field.
     * @param {string} mask - The mask to be set. Available mask options:
     *                        phone-usa, phone-intl, zip-us, ssn-us, passport-uk, credit-card
     */
    async setMask(mask) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setMask(mask);
    }

    /**
     * Sets the allowed symbols for the text field.
     * @param {string} symbols - The allowed symbols to be set.
     */
    async setAllowedSymbols(symbols) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setAllowedSymbols(symbols);
    }

    /**
     * Sets the fixed size for the text field.
     * @param {boolean} [isFixedSize=false]
     */
    async setFixedSize(isFixedSize = false) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setFixedSize(isFixedSize);
    }

    /**
     * Sets the auto fit for the text field.
     * @param {boolean} [isAutoFit=false]
     */
    async setAutoFit(isAutoFit = false) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setAutoFit(isAutoFit);
    }

    /**
     * Sets the multiline for the text field.
     * @param {boolean} [isMultiline=false]
     */
    async setMultiline(isMultiline = false) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setMultiline(isMultiline);
    }

    /**
     * Sets the char limit for the text field.
     * @param {boolean} [isCharLimit=false]
     */
    async setCharLimit(isCharLimit = false) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setCharLimit(isCharLimit);
    }

    /**
     * Sets char limit value
     * @param {number} value
     */
    async setCharLimitValue(value) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setCharLimitValue(value);
    }

    /**
     * Sets the combo chars for the text field.
     * @param {boolean} [isComboChars=false]
     */
    async setComboChars(isComboChars = false) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setComboChars(isComboChars);
    }

    /**
     * Sets the required for the text field.
     * @param {boolean} [isRequired=false]
     */
    async setRequired(isRequired = false) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setRequired(isRequired);
    }

    /**
     * Sets the cell width option for the text field.
     * @param {string} option - The option to be set.
     */
    async setCellWidthOption(option) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setCellWidthOption(option);
    }

    /**
     * Sets cell width value
     * @param {import("../../../../elements/input").InputSettings} value
     */
    async setCellWidthValue(value) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setCellWidthValue(value);
    }

    /**
     * Sets the color for the text field.
     * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
     *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
     */
    async setColor({ border, backgroundColor }) {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.setColor({ border, backgroundColor });
    }

    /**
     * Deletes the text field.
     */
    async delete() {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.delete();
    }

    /**
     * Locks the text field settings.
     */
    async lock() {
        await this.#openTextFieldSettings();
        await this.textFieldSettings.lock();
    }
}

module.exports = TextField;
