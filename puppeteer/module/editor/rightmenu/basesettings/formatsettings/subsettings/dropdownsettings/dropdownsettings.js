const FormatSettings = require("../../formatsettings");
const RightMenu = require("../../../../rightmenu");
const { Color } = require("../../../../../../common");
const selectors = require("./selectors.json");
const { Dropdown, Input, Checkbox } = require("../../../../../../elements");
/**
 * Class representing the settings for a text field in RightMenu.
 * Extends FormatSettings to provide specific interactions.
 */
class DropdownSettings extends FormatSettings {
    constructor(tester = RegularTester) {
        super(tester);
        this.rightMenu = new RightMenu(this.tester);
    }

    static DROPDOWN_SELECTORS = selectors;

    async openDropdownSettings() {
        await this.rightMenu.openSettings(this);
    }

    /**
     * Sets the role in the dropdown.
     * @param {string} role - The role to be selected.
     * @throws {Error} If the specified role is not found.
     */
    async setRole(role) {
        const ROLES_SELECTORS = DropdownSettings.DROPDOWN_SELECTORS.ROLES;
        const setRoleDropdown = new Dropdown(this.tester, {
            selector: ROLES_SELECTORS.ROLES,
            elementsSelector: ROLES_SELECTORS.ROLES_ITEMS.ELEMENTS,
            descriptionSelector: ROLES_SELECTORS.ROLES_ITEMS.DESCRIPTION,
        });

        await setRoleDropdown.selectDropdownItem(role);
    }

    /**
     * Sets various fields in the dropdown settings.
     * @param {{fieldName: string}} settings - Object containing field values,
     * the field name matches the corresponding field in the settings menu
     */
    async setFields(settings) {
        const FIELDS_SELECTORS = DropdownSettings.DROPDOWN_SELECTORS.FIELDS;
        const fields = {
            key: FIELDS_SELECTORS.KEY,
            placeholder: FIELDS_SELECTORS.PLACEHOLDER,
            tag: FIELDS_SELECTORS.TAG,
            tip: FIELDS_SELECTORS.TIP,
        };

        for (const [field, selector] of Object.entries(fields)) {
            const value = settings[field];
            if (value !== undefined) {
                const inputFieldElements = new Input(this.tester, selector.SELECTOR, false, selector.TARGET);
                await inputFieldElements.set(value);
            }
        }
    }

    /**
     * Sets value options in the dropdown.
     * @param {{value: string | undefined, index: number | undefined,deleteValue: boolean | undefined, defaultValue: boolean | undefined}} valueOption - Object containing value options.
     * @param {boolean} [fixedSize=false] - Whether the value list has a fixed size.
     */
    async setValueOptions(valueOption, fixedSize = false) {
        const VALUES_SELECTORS = DropdownSettings.DROPDOWN_SELECTORS.VALUE_OPT;
        const { value, index, deleteValue, defaultValue } = valueOption;

        const parseCreatedValues = () =>
            this.tester.parseItems(
                VALUES_SELECTORS.CREATED_VALUES.LIST,
                VALUES_SELECTORS.CREATED_VALUES.ITEM,
                VALUES_SELECTORS.CREATED_VALUES.DESCRIPTION
            );

        let createdValues = await parseCreatedValues();
        let foundValueObject = createdValues.find((item) => item.description === value);

        if (!foundValueObject) {
            const valueInputElement = new Input(this.tester, VALUES_SELECTORS.VALUE_INPUT);
            await valueInputElement.set(value);
            await this.tester.click(VALUES_SELECTORS.VALUE_ADD_BUTTON);
            createdValues = await parseCreatedValues();
            foundValueObject = createdValues.find((item) => item.description === value);
        }

        if (index) {
            while (index !== foundValueObject.index) {
                await this.tester.click(
                    index < foundValueObject.index ? VALUES_SELECTORS.UP_BUTTON : VALUES_SELECTORS.DOWN_BUTTON
                );
                createdValues = await parseCreatedValues();
                foundValueObject = createdValues.find((item) => item.description === value);
            }
        }

        if (deleteValue) {
            await this.tester.click(foundValueObject.id);
            await this.tester.click(VALUES_SELECTORS.DELETE_BUTTON);
        }

        if (fixedSize) {
            const checkbox = new Checkbox(this.tester, VALUES_SELECTORS.FIXED_SIZE_CHECKBOX);
            await checkbox.set(fixedSize);
        }

        if (defaultValue && value) {
            const defaultValueDropdown = new Dropdown(this.tester, {
                selector: VALUES_SELECTORS.DEFAULT_VALUE_DROPDOWN.SELECTOR,
                elementsSelector: VALUES_SELECTORS.DEFAULT_VALUE_DROPDOWN.ELEMENTS,
            });
            await defaultValueDropdown.selectDropdownItem(value);
        }
    }

    /**
     * Sets color options for the dropdown.
     * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
     *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
     */
    async setColor({ border, backgroundColor }) {
        const COLOR_SELECTORS = DropdownSettings.DROPDOWN_SELECTORS.COLOR;
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
     * Sets the required state of the dropdown.
     * @param {boolean} [isRequired=true] - Whether the field is required.
     */
    async setRequired(isRequired = true) {
        const REQUIRED_CHECKBOX = DropdownSettings.DROPDOWN_SELECTORS.REQUIRED_CHECKBOX;
        const checkbox = new Checkbox(this.tester, REQUIRED_CHECKBOX);
        await checkbox.set(isRequired);
    }

    /**
     * Deletes the dropdown.
     */
    async delete() {
        const DELETE_BUTTON = DropdownSettings.DROPDOWN_SELECTORS.DELETE_BUTTON;
        await this.tester.click(DELETE_BUTTON);
    }

    /**
     * Locks the dropdown settings.
     */
    async lock() {
        const LOCK_BUTTON = DropdownSettings.DROPDOWN_SELECTORS.LOCK_BUTTON;
        await this.tester.click(LOCK_BUTTON);
    }
}

module.exports = DropdownSettings;
