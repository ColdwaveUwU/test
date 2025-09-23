const FormatSettings = require("../../formatsettings");
const RightMenu = require("../../../../rightmenu");
const { Color } = require("../../../../../../common");
const { Dropdown, Input, Checkbox } = require("../../../../../../elements");
const selectors = require("./selectors.json");

/**
 * Class representing the settings for a text field in RightMenu.
 * Extends FormatSettings to provide specific interactions.
 */
class CheckboxSettings extends FormatSettings {
    constructor(tester = RegularTester) {
        super(tester);
        this.rightMenu = new RightMenu(this.tester);
    }

    static CHECKBOX_SELECTORS = selectors;

    /**
     * Opens the checkbox settings.
     */
    async openCheckboxSettings() {
        await this.rightMenu.openSettings(this);
    }

    /**
     * Sets the role in the checkbox.
     * @param {string} role - The role to be selected.
     * @throws {Error} If the specified role is not found.
     */
    async setRole(role) {
        const ROLES_SELECTORS = CheckboxSettings.CHECKBOX_SELECTORS.ROLES;
        const setRoleDropdown = new Dropdown(this.tester, {
            selector: ROLES_SELECTORS.ROLES,
            elementsSelector: ROLES_SELECTORS.ROLES_ITEMS.ELEMENTS,
            descriptionSelector: ROLES_SELECTORS.ROLES_ITEMS.DESCRIPTION,
        });

        await setRoleDropdown.selectDropdownItem(role);
    }

    /**
     * Sets various fields in the checkbox settings.
     * @param {{fieldName: string}} settings - Object containing field values,
     * the field name matches the corresponding field in the settings menu
     */
    async setFields(settings) {
        const FIELDS_SELECTORS = CheckboxSettings.CHECKBOX_SELECTORS.FIELDS;
        const fields = {
            key: FIELDS_SELECTORS.KEY,
            tag: FIELDS_SELECTORS.TAG,
            tip: FIELDS_SELECTORS.TIP,
        };

        for (const [field, selector] of Object.entries(fields)) {
            const value = settings[field];
            if (value !== undefined) {
                const fieldInputElement = new Input(this.tester, selector.SELECTOR, false, selector.TARGET);
                await fieldInputElement.set(value);
            }
        }
    }

    /**
     * Sets the default checkbox.
     * @param {boolean} [isDefault=true] - Whether the checkbox is default.
     */
    async setDefaultCheckbox(isDefault = true) {
        const DEFAULT_CHECKBOX = CheckboxSettings.CHECKBOX_SELECTORS.DEFAULT_CHECKBOX;
        const checkbox = new Checkbox(this.tester, DEFAULT_CHECKBOX);
        await checkbox.set(isDefault);
    }

    /**
     * Sets the fixed size of the checkbox.
     * @param {boolean} [isFixed=true] - Whether the checkbox is fixed.
     */
    async setFixedSize(isFixed = true) {
        const FIXED_SIZE_CHECKBOX = CheckboxSettings.CHECKBOX_SELECTORS.FIXED_SIZE_CHECKBOX;
        const checkbox = new Checkbox(this.tester, FIXED_SIZE_CHECKBOX);
        await checkbox.set(isFixed);
    }

    /**
     * Sets color options for the checkbox.
     * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
     *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
     */
    async setColor({ border, backgroundColor }) {
        const COLOR_SELECTORS = CheckboxSettings.CHECKBOX_SELECTORS.COLOR;
        const color = new Color(this.tester);

        if (border) {
            const { colorIndex, noBorder } = border;
            const borderDropdown = new Dropdown(this.tester, { selector: COLOR_SELECTORS.BORDER.BORDER_COLOR });
            await borderDropdown.selectDropdown();

            if (noBorder) {
                await this.tester.click(COLOR_SELECTORS.BORDER.NO_BORDER);
            } else {
                await color.selectColor(COLOR_SELECTORS.BORDER.BORDER_COLOR_LIST, {
                    index: colorIndex,
                });
            }
        }

        if (backgroundColor) {
            const backgroundDropdown = new Dropdown(this.tester, {
                selector: COLOR_SELECTORS.BACKGROUND.BACKGROUND_COLOR,
            });
            await backgroundDropdown.selectDropdown();
            await color.selectColor(COLOR_SELECTORS.BACKGROUND.BACKGROUND_COLOR_LIST, backgroundColor);
        }
    }

    /**
     * Sets the required state of the checkbox.
     * @param {boolean} [isRequired=true] - Whether the field is required.
     */
    async setRequired(isRequired = true) {
        const REQUIRED_CHECKBOX = CheckboxSettings.CHECKBOX_SELECTORS.REQUIRED_CHECKBOX;
        const checkbox = new Checkbox(this.tester, REQUIRED_CHECKBOX);
        await checkbox.set(isRequired);
    }

    /**
     * Deletes the checkbox.
     */
    async delete() {
        const DELETE_BUTTON = CheckboxSettings.CHECKBOX_SELECTORS.DELETE_BUTTON;
        await this.tester.click(DELETE_BUTTON);
    }

    /**
     * Locks the checkbox settings.
     */
    async lock() {
        const LOCK_BUTTON = CheckboxSettings.CHECKBOX_SELECTORS.LOCK_BUTTON;
        await this.tester.click(LOCK_BUTTON);
    }
}

module.exports = CheckboxSettings;
