const FormTab = require("../formtab");
const { CheckboxSettings } = require("../../../../editor/rightmenu");
const selectors = require("./selectors.json");

class Checkbox extends FormTab {
    constructor(tester) {
        super(tester, "Forms");
        this.checkboxSettings = new CheckboxSettings(this.tester);
    }

    static CHECKBOX_SELECTORS = selectors;

    /**
     * Open checkbox settings
     */
    async #openCheckboxSettings() {
        await this.checkboxSettings.openCheckboxSettings();
    }

    /**
     * Inserts checkbox in pdf-editor
     */
    async insertCheckbox() {
        await this.tester.click(Checkbox.CHECKBOX_SELECTORS.TOOLMENU_CHECKBOX_BTN);
    }

    /**
     * Set role in checkbox settings
     * @param {string} role - target role
     */
    async setRole(role) {
        await this.#openCheckboxSettings();
        await this.checkboxSettings.setRole(role);
    }

    /**
     * Set fields in checkbox settings
     * @param {Object} settings - target settings
     */
    async setFields(settings) {
        await this.#openCheckboxSettings();
        await this.checkboxSettings.setFields(settings);
    }

    /**
     * Set default checkbox in checkbox settings
     * @param {boolean} [isDefault=true] - target default checkbox
     */
    async setDefaultCheckbox(isDefault = true) {
        await this.#openCheckboxSettings();
        await this.checkboxSettings.setDefaultCheckbox(isDefault);
    }

    /**
     * Set fixed size in checkbox settings
     * @param {boolean} [isFixed=true] - target fixed size
     */
    async setFixedSize(isFixed = true) {
        await this.#openCheckboxSettings();
        await this.checkboxSettings.setFixedSize(isFixed);
    }

    /**
     * Set color in checkbox settings
     * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
     *          backgroundColor: Color | undefined}} colorOptions - target color options
     */
    async setColor({ border, backgroundColor }) {
        await this.#openCheckboxSettings();
        await this.checkboxSettings.setColor({ border, backgroundColor });
    }

    /**
     * Set required in checkbox settings
     * @param {boolean} [isRequired=true] - target required
     */
    async setRequired(isRequired = true) {
        await this.#openCheckboxSettings();
        await this.checkboxSettings.setRequired(isRequired);
    }

    /**
     * Delete checkbox in checkbox settings
     */
    async delete() {
        await this.#openCheckboxSettings();
        await this.checkboxSettings.delete();
    }

    /**
     * Lock checkbox in checkbox settings
     */
    async lock() {
        await this.#openCheckboxSettings();
        await this.checkboxSettings.lock();
    }
}

module.exports = Checkbox;
