const FormTab = require("../formtab");
const { DropdownSettings } = require("../../../rightmenu");
const selectors = require("./selectors.json");

class Dropdown extends FormTab {
    constructor(tester) {
        super(tester, "Forms");
        this.dropdownSettings = new DropdownSettings(this.tester);
    }

    static DROPDOWN_SELECTORS = selectors;

    /**
     * Opens the dropdown settings
     */
    async #openDropdownSettings() {
        await this.dropdownSettings.openDropdownSettings();
    }

    /**
     * Inserts a dropdown into the form
     */
    async insertDropdown() {
        await this.tester.click(Dropdown.DROPDOWN_SELECTORS.TOOLMENU_DROPDOWN_BTN);
    }

    /**
     * Set role in dropdown settings
     * @param {string} role - target role
     */
    async setRole(role) {
        await this.#openDropdownSettings();
        await this.dropdownSettings.setRole(role);
    }

    /**
     * Sets various fields in the dropdown settings.
     * @param {{fieldName: string}} settings - Object containing field values,
     * the field name matches the corresponding field in the settings menu
     */
    async setFields(settings) {
        await this.#openDropdownSettings();
        await this.dropdownSettings.setFields(settings);
    }

    /**
     * Sets value options in the dropdown.
     * @param {{value: string | undefined, index: number | undefined,deleteValue: boolean | undefined, defaultValue: boolean | undefined}} valueOption - Object containing value options.
     * @param {boolean} [fixedSize=false] - Whether the value list has a fixed size.
     */
    async setValueOptions({ value, index, deleteValue = false, defaultValue = false }, fixedSize) {
        await this.#openDropdownSettings();
        await this.dropdownSettings.setValueOptions({ value, index, deleteValue, defaultValue }, fixedSize);
    }

    /**
     * Sets color options for the dropdown.
     * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
     *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
     */
    async setColor(colorOptions) {
        await this.#openDropdownSettings();
        await this.dropdownSettings.setColor(colorOptions);
    }

    /**
     * Sets the required state of the dropdown.
     * @param {boolean} [isRequired=true] - Whether the field is required.
     */
    async setRequired(isRequired) {
        await this.#openDropdownSettings();
        await this.dropdownSettings.setRequired(isRequired);
    }

    /**
     * Deletes the dropdown.
     */
    async delete() {
        await this.#openDropdownSettings();
        await this.dropdownSettings.delete();
    }

    /**
     * Locks or unlock the dropdown settings.
     */
    async lock() {
        await this.#openDropdownSettings();
        await this.dropdownSettings.lock();
    }
}

module.exports = Dropdown;
