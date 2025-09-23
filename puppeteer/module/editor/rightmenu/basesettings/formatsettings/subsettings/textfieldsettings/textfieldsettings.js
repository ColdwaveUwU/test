const FormatSettings = require("../../formatsettings");
const RightMenu = require("../../../../rightmenu");
const { Color } = require("../../../../../../common");
const selectors = require("./selectors.json");
const { Dropdown, Checkbox, Input } = require("../../../../../../elements");
/**
 * Class representing the settings for a text field in RightMenu.
 * Extends FormatSettings to provide specific interactions.
 */
class TextFieldSettings extends FormatSettings {
    constructor(tester = RegularTester) {
        super(tester);
        this.rightMenu = new RightMenu(this.tester);
    }

    static TEXTFIELD_SELECTORS = selectors;

    async openTextFieldSettings() {
        await this.rightMenu.openSettings(this);
    }

    /**
     * Sets the role in the textfield settings.
     * @param {string} role - The role to be selected.
     * @throws {Error} If the specified role is not found.
     */
    async setRole(role) {
        const ROLES_SELECTORS = TextFieldSettings.TEXTFIELD_SELECTORS.ROLES;
        const setRoleDropdown = new Dropdown(this.tester, {
            selector: ROLES_SELECTORS.ROLES,
            elementsSelector: ROLES_SELECTORS.ROLES_ITEMS.ELEMENTS,
            descriptionSelector: ROLES_SELECTORS.ROLES_ITEMS.DESCRIPTION,
        });

        await setRoleDropdown.selectDropdownItem(role);
    }

    /**
     * Sets various fields in the textfield settings.
     * @param {{fieldName: string}} settings - Object containing field values,
     * the field name matches the corresponding field in the settings menu
     */
    async setFields(settings) {
        const FIELDS_SELECTORS = TextFieldSettings.TEXTFIELD_SELECTORS.FIELDS;
        const fields = {
            key: FIELDS_SELECTORS.KEY,
            placeholder: FIELDS_SELECTORS.PLACEHOLDER,
            tag: FIELDS_SELECTORS.TAG,
            tip: FIELDS_SELECTORS.TIP,
            defaultValue: FIELDS_SELECTORS.DEF_VALUE,
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
     * Sets the format of the text field.
     * @param {string} format - The format to be set. Available formats:
     *                         None, Digits, Letters, Arbitrary Mask, Regular expression
     */
    async setFormat(format) {
        const FORMAT_SELECTORS = TextFieldSettings.TEXTFIELD_SELECTORS.FORMAT_OPT.FORMATS;
        const formatDropdown = new Dropdown(this.tester, {
            selector: FORMAT_SELECTORS.FORMATS_DROPDOWN,
            elementsSelector: FORMAT_SELECTORS.FORMATS_LIST,
        });
        await formatDropdown.selectDropdownItem(format);
    }

    /**
     * Sets the regular expression for the text field.
     * @param {string} regex - The regular expression to be set.
     */
    async setRegEx(regex) {
        const regExInputForm = new Input(this.tester, TextFieldSettings.TEXTFIELD_SELECTORS.FORMAT_OPT.REGEX_INPUT);
        await this.setFormat("Regular expression");
        await regExInputForm.set(regex);
    }

    /**
     * Sets the arbitrary mask for the text field.
     * @param {string} mask - The mask to be set. Available mask options:
     *                        phone-usa, phone-intl, zip-us, ssn-us, passport-uk, credit-card
     */
    async setMask(mask) {
        const setMaskSelectors = TextFieldSettings.TEXTFIELD_SELECTORS.FORMAT_OPT.MASKS;

        const setMaskDropdown = new Dropdown(this.tester, {
            selector: setMaskSelectors.MASKS_DROPDOWN,
            elementsSelector: setMaskSelectors.MASKS_LIST,
        });
        await this.setFormat("Arbitrary Mask");
        await setMaskDropdown.selectDropdownItem(mask);
    }

    /**
     * Sets the allowed symbols for the text field.
     * @param {string} symbols - The symbols to be set.
     */
    async setAllowedSymbols(symbols) {
        const ALLOWED_SYMBOLS_INPUT = TextFieldSettings.TEXTFIELD_SELECTORS.FORMAT_OPT.ALLOWED_SYM_INPUT;
        const allowedSymbolsInputElement = new Input(this.tester, ALLOWED_SYMBOLS_INPUT, false);
        await allowedSymbolsInputElement.set(symbols);
    }

    /**
     * Sets the fixed size for the text field.
     * @param {boolean} [isRequired=true]
     */
    async setFixedSize(isRequired = true) {
        const FIXED_SIZE_CHECKBOX = TextFieldSettings.TEXTFIELD_SELECTORS.FORMAT_OPT.FIXED_SIZE_CHECKBOX;
        const checkbox = new Checkbox(this.tester, FIXED_SIZE_CHECKBOX);
        await checkbox.set(isRequired);
    }

    /**
     * Sets the auto fit for the text field.
     * @param {boolean} [isAutoFit=true]
     */
    async setAutoFit(isAutoFit = true) {
        const AUTO_FIT_CHECKBOX = TextFieldSettings.TEXTFIELD_SELECTORS.FORMAT_OPT.AUTO_FIT_CHECKBOX;
        const checkbox = new Checkbox(this.tester, AUTO_FIT_CHECKBOX);
        await checkbox.set(isAutoFit);
    }

    /**
     * Sets the multiline for the text field.
     * @param {boolean} [isMultiline=false]
     */
    async setMultiline(isMultiline = false) {
        const MULTILINE_CHECKBOX = TextFieldSettings.TEXTFIELD_SELECTORS.FORMAT_OPT.MULTILINE_CHECKBOX;
        const checkbox = new Checkbox(this.tester, MULTILINE_CHECKBOX);
        await checkbox.set(isMultiline);
    }

    /**
     * Sets the char limit for the text field.
     * @param {boolean} [isCharLimit=false]
     */
    async setCharLimit(isCharLimit = false) {
        const CHAR_LIMIT_CHECKBOX = TextFieldSettings.TEXTFIELD_SELECTORS.CELL_OPT.CHAR_LIMIT_CHECKBOX;
        const checkbox = new Checkbox(this.tester, CHAR_LIMIT_CHECKBOX);
        await checkbox.set(isCharLimit);
    }

    /**
     * Sets the combo chars for the text field.
     * @param {boolean} [isComboChars=false]
     */
    async setComboChars(isComboChars = false) {
        const COMBO_CHARS_CHECKBOX = TextFieldSettings.TEXTFIELD_SELECTORS.CELL_OPT.COMBO_CHARS_CHECKBOX;
        const checkbox = new Checkbox(this.tester, COMBO_CHARS_CHECKBOX);
        await checkbox.set(isComboChars);
    }

    /**
     * Sets the required for the text field.
     * @param {boolean} [isRequired=true]
     */
    async setRequired(isRequired = true) {
        const REQUIRED_CHECKBOX = TextFieldSettings.TEXTFIELD_SELECTORS.REQUIRED_CHECKBOX;
        const checkbox = new Checkbox(this.tester, REQUIRED_CHECKBOX);
        await checkbox.set(isRequired);
    }

    async setCharLimitValue(value) {
        const { CHAR_LIMIT_CHECKBOX, CHAR_LIMIT_INPUT } = TextFieldSettings.TEXTFIELD_SELECTORS.CELL_OPT;
        const checkbox = new Checkbox(this.tester, CHAR_LIMIT_CHECKBOX);
        await checkbox.set(true);

        const inputForm = new Input(this.tester, CHAR_LIMIT_INPUT);
        await inputForm.setInputSettings(value);
    }

    /**
     * Sets the cell width option for the text field.
     * @param {string} option - The option to be set.
     */
    async setCellWidthOption(option) {
        const FIXED_SIZE_CHECKBOX = TextFieldSettings.TEXTFIELD_SELECTORS.FORMAT_OPT.FIXED_SIZE_CHECKBOX;
        const cellOptSelectors = TextFieldSettings.TEXTFIELD_SELECTORS.CELL_OPT;
        const cellWidthOptionDropdown = new Dropdown(this.tester, {
            selector: cellOptSelectors.CELL_WIDTH_DROPDOWN.SELECTOR,
            elementsSelector: cellOptSelectors.CELL_WIDTH_DROPDOWN.ELEMENTS,
        });

        const checkbox = new Checkbox(this.tester, FIXED_SIZE_CHECKBOX);
        await checkbox.set(false);
        await cellWidthOptionDropdown.selectDropdownItem(option);
    }

    async setCellWidthValue(value) {
        const { COMBO_CHARS_CHECKBOX, CELL_WIDTH_INPUT } = TextFieldSettings.TEXTFIELD_SELECTORS.CELL_OPT;
        const checkbox = new Checkbox(this.tester, COMBO_CHARS_CHECKBOX);
        await checkbox.set(true);

        const inputForm = new Input(this.tester, CELL_WIDTH_INPUT);
        await inputForm.setInputSettings(value);
    }

    /**
     * Sets color options for the combobox.
     * @param {{border: {colorIndex: number, noBorder: boolean | undefined} | undefined,
     *          backgroundColor: Color | undefined}} colorOptions - Object containing border and background color configurations.
     */
    async setColor({ border, backgroundColor }) {
        const COLOR_SELECTORS = TextFieldSettings.TEXTFIELD_SELECTORS.COLOR;
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
     * Deletes the text field.
     */
    async delete() {
        const DELETE_BUTTON = TextFieldSettings.TEXTFIELD_SELECTORS.DELETE_BUTTON;
        await this.tester.click(DELETE_BUTTON);
    }

    /**
     * Locks the text field settings.
     */
    async lock() {
        const LOCK_BUTTON = TextFieldSettings.TEXTFIELD_SELECTORS.LOCK_BUTTON;
        await this.tester.click(LOCK_BUTTON);
    }
}

module.exports = TextFieldSettings;
