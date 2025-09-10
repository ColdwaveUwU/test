const FormTab = require("../formtab");
const { ComboBoxSettings } = require("../../../../rightmenu");
const selectors = require("./selectors.json");

class ComboBox extends FormTab {
    constructor(tester) {
        super(tester, "Forms");
        this.comboboxSettings = new ComboBoxSettings(this.tester);
    }

    static COMBO_BOX_SELECTORS = selectors;

    /**
     * Open combobox settings
     */
    async #openComboboxSettings() {
        await this.comboboxSettings.openComboBoxSettings();
    }

    /**
     * Inserts combobox in pdf-editor
     */
    async insertComboBox() {
        await this.tester.click(ComboBox.COMBO_BOX_SELECTORS.TOOLMENU_COMBO_BOX_BTN);
    }

    /**
     * Set role in combobox settings
     * @param {string} role - target role
     */
    async setRole(role) {
        await this.#openComboboxSettings();
        await this.comboboxSettings.setRole(role);
    }

    /**
     * Sets various fields in the combobox settings.
     * @param {{fieldName: string}} settings - Object containing field values,
     * the field name matches the corresponding field in the settings menu
     */
    async setFields(settings) {
        await this.#openComboboxSettings();
        await this.comboboxSettings.setFields(settings);
    }

    /**
     * Sets value options in the combobox.
     * @param {{value: string | undefined, index: number | undefined, defaultValue: boolean | undefined}} valueOption - Object containing value options.
     * @param {boolean} [fixedSize=false] - Whether the value list has a fixed size.
     */
    async setValueOptions({ value, index, deleteValue = false }, fixedSize) {
        await this.#openComboboxSettings();
        await this.comboboxSettings.setValueOptions({ value, index, deleteValue }, fixedSize);
    }

    /**
     * Sets color options for the combobox.
     * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
     *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
     */
    async setColor(colorOptions) {
        await this.#openComboboxSettings();
        await this.comboboxSettings.setColor(colorOptions);
    }

    /**
     * Sets the required state of the combobox.
     * @param {boolean} [isRequired=true] - Whether the field is required.
     */
    async setRequired(isRequired) {
        await this.#openComboboxSettings();
        await this.comboboxSettings.setRequired(isRequired);
    }

    /**
     * Deletes the combobox.
     */
    async delete() {
        await this.#openComboboxSettings();
        await this.comboboxSettings.delete();
    }

    /**
     * Locks or unlock the combobox settings.
     */
    async lock() {
        await this.#openComboboxSettings();
        await this.comboboxSettings.lock();
    }
}

module.exports = ComboBox;
