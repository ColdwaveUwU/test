const HomeTab = require("../hometab");
const selectors = require("./selectors.json");
const { ModalButton, Input, DropdownInput, Dropdown, Checkbox } = require("../../../../elements");

/**
 * @typedef {Object} LineOption
 * @property {'At least'|'Multiple'|'Exactly'} spacingType
 * @property {number} lineHeight
 * @property {number} beforePar
 * @property {number} afterPar
 * @property {boolean} dontAddIntr
 */
/**
 * @typedef {Object} SpaceOption
 * @property {boolean} beforeAdd
 * @property {boolean} afterAdd
 */
/**
 * @typedef {Object} LineSpacingOption
 * @property {LineOption} line
 * @property {SpaceOption} space
 */
/**
 * Sets the line spacing value
 * @param {string} size
 * @param {LineSpacingOption} options
 */

/**
 * Object with color settings.
 * @typedef {Object} Color
 * @property {number} type - Setting type
 * @property {number} [index] - color index
 * @property {number} [subIndex] - color subIndex(shade)
 * @property {number} [x] - The x coordinate of the color, used when adjusting the color using advanced settings.
 * @property {number} [y] - The y coordinate of the color, used when adjusting the color using advanced settings
 * @property {number} [hue] - Hue adjustment coordinates in a vertical column
 * @property {number} [hex] - hex color number
 * @property {number} [r] - r color number
 * @property {number} [g] - g color number
 * @property {number} [b] - b color number
 */

/**
 * @typedef {Object} BulletsListSettings
 * @property {
 * "Symbol: ·" |
 * "Symbol: o" |
 * "Symbol: §" |
 * "Symbol: v" |
 * "Symbol: Ø" |
 * "Symbol: ü" |
 * "Symbol: ¨" |
 * "Symbol: –" |
 * "New bullet"
 * } type - The type of the bullets list
 * @property {"Left" | "Center" | "Right"} alignment - The alignment of the bullets list
 * @property {
 * "Like a text" |
 * "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" |
 * "22" | "24" | "26" | "28" | "36" | "48" | "72" | "96"
 * } size - The size of the bullets list
 * @property {boolean} bold - true to enable Bold, false to disable Bold
 * @property {boolean} italic - true to enable Italic, false to disable Italic
 * @property {Color} color - The color of the bullets list
 */

/**
 * @typedef {Object} NumberingListSettings
 * @property {
 * "None" |
 * "1, 2, 3,..." |
 * "a, b, c,..." |
 * "A, B, C,..." |
 * "i, ii, iii,..." |
 * "I, II, III,..." |
 * "More types"
 * } type - The type of the numbering list
 * @property {"Left" | "Center" | "Right"} alignment - The alignment of the bullets list
 ** @property {
 * "Like a text" |
 * "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" |
 * "22" | "24" | "26" | "28" | "36" | "48" | "72" | "96"
 * } size - The size of the numbering list
 * @property {boolean} bold - true to enable Bold, false to disable Bold
 * @property {boolean} italic - true to enable Italic, false to disable Italic
 * @property {Color} color - The color of the numbering list
 * @property {string} numberFormat - The numbering format
 * @property {string} font - The font of the numbering list
 */

/**
 * @typedef {Object} MultilevelListSettings
 * @property {string} listLevel - The list level
 * @property {string} type - The type of the list
 * @property {string} numberFormat - The numbering format
 * @property {string} includeLevelNumber - The include level number
 * @property {string} size - The size of the list
 * @property {boolean} bold - true to enable Bold, false to disable Bold
 * @property {boolean} italic - true to enable Italic, false to disable Italic
 * @property {Color} color - The color of the numbering list
 * @property {string} font - The font of the numbering list
 * @property {string} startAt - The start at of the list
 * @property {boolean} restartList - true to enable Restart list, false to disable Restart list
 * @property {string} alignment - The alignment of the list
 * @property {string} alignmentAt - The alignment at of the list
 * @property {string} textIndent - The text indent of the list
 * @property {string} followNumberWith - The follow number with of the list
 * @property {string} tabStopAt - The tab stop at of the list
 */

class TextForm extends HomeTab {
    constructor(tester) {
        super(tester);
    }

    static SELECTORS = selectors;

    /**
     * Map of settings keys to method names for Table of Contents settings
     */
    static SETTINGS_MAP = {
        bulletsListSettings: {
            type: "setListSettingsType",
            alignment: "setListSettingsAlignment",
            size: "setListSettingsSize",
            bold: "setListSettingsBold",
            italic: "setListSettingsItalic",
            color: "setListSettingsColor",
        },
        numberingListSettings: {
            type: "setListSettingsType",
            alignment: "setListSettingsAlignment",
            numberFormat: "setListSettingsNumberFormat",
            font: "setListSettingsFont",
            size: "setListSettingsSize",
            bold: "setListSettingsBold",
            italic: "setListSettingsItalic",
            color: "setListSettingsColor",
        },
        multilevelListSettings: {
            listLevel: "selectListSettingsListLevel",
            type: "setListSettingsType",
            numberFormat: "setListSettingsNumberFormat",
            includeLevelNumber: "setListSettingsIncludeLevelNumber",
            size: "setListSettingsSize",
            bold: "setListSettingsBold",
            italic: "setListSettingsItalic",
            color: "setListSettingsColor",
            font: "setListSettingsFont",
            startAt: "setListSettingsStartAt",
            restartList: "setListSettingsRestartList",
            alignment: "setListSettingsAlignment",
            alignmentAt: "setListSettingsAlignmentAt",
            textIndent: "setListSettingsTextIndent",
            followNumberWith: "setListSettingsFollowNumberWith",
            tabStopAt: "addTabStopAt",
        },
    };

    /**
     * Lazy getter for list settings modal
     */
    get listSettingsModal() {
        if (!this._listSettingsModal) {
            this._listSettingsModal = new ModalButton(
                this.tester,
                "",
                TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.WINDOW,
                TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.FOOTER_BUTTONS.OK_BUTTON
            );
        }
        return this._listSettingsModal;
    }

    /**
     * Lazy getter for new style modal
     */
    get newStyleModal() {
        if (!this._newStyleModal) {
            this._newStyleModal = new ModalButton(
                this.tester,
                "",
                TextForm.SELECTORS.NEW_STYLE_MODAL.WINDOW,
                TextForm.SELECTORS.NEW_STYLE_MODAL.OK_BUTTON
            );
        }
        return this._newStyleModal;
    }

    /**
     * Sets the borders
     * @param {
     * "Bottom borders"
     * | "Top borders"
     * | "Left borders"
     * | "Right borders"
     * | "No borders"
     * | "All borders"
     * | "Outside borders"
     * | "Inside borders"
     * | "Border style"
     * | "Border color"
     * } optionValue - The value of the borders to select.
     */
    async setBorders(optionValue) {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.BORDERS;
        try {
            const dropdown = new Dropdown(this.tester, dropdownSelector);
            await dropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("setBorders", error);
        }
    }

    /**
     * Sets the border style
     * @param {"0.5  pt" | "1  pt" | "1.5  pt" | "2.25  pt" | "3  pt" | "6  pt"} optionValue - The value of the border style to select.
     */
    async setBorderStyle(optionValue) {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.BORDER_STYLE;
        const borderStyleDropdown = new Dropdown(this.tester, dropdownSelector);
        try {
            await Promise.all([borderStyleDropdown.selectDropdownItem(optionValue), this.setBorders("Border style")]);
        } catch (error) {
            this.#handleError("setBorderStyle", error);
        }
    }

    /**
     * Sets the style
     * @param {
     * "Normal" |
     * "No spacing" |
     * "Heading 1" |
     * "Heading 2" |
     * "Heading 3" |
     * "Heading 4" |
     * "Heading 5" |
     * "Heading 6" |
     * "Heading 7" |
     * "Heading 8" |
     * "Heading 9" |
     * "Title" |
     * "Subtitle" |
     * "Subtle emphasis" |
     * "Emphasis" |
     * "Intense emphasis" |
     * "Strong" |
     * "Quote" |
     * "Intense quote" |
     * "Subtle reference" |
     * "Intense reference" |
     * "Book title" |
     * "List paragraph" |
     * "Caption" |
     * "Header" |
     * "Footer" |
     * "Footnote text" |
     * "Endnote text"
     * } optionValue - The value of the style to select.
     */
    async setStyle(optionValue) {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.STYLE;
        try {
            const dropdown = new Dropdown(this.tester, dropdownSelector);
            await dropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("setStyle", error);
        }
    }

    /**
     * Adds a new style
     * @param {string} styleName - The name of the style to add.
     * @param {string} nextParagraphStyle - The next paragraph style to set.
     */
    async addNewStyle(styleName, nextParagraphStyle = null) {
        try {
            await this.openNewStyleModal();
            await this.setNewStyleName(styleName);
            if (nextParagraphStyle) {
                await this.setNextParagraphStyle(nextParagraphStyle);
            }
            await this.applyNewStyle();
        } catch (error) {
            this.#handleError("addNewStyle", error);
        }
    }

    /**
     * Opens the new style modal
     * @return {Promise<void>}
     */
    async openNewStyleModal() {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.NEW_STYLE;
        try {
            const dropdown = new Dropdown(this.tester, dropdownSelector);
            await Promise.all([
                dropdown.selectDropdownItem("New style from selection"),
                this.newStyleModal.isModalOpen(),
            ]);
        } catch (error) {
            this.#handleError("openNewStyleModal", error);
        }
    }

    /**
     * Sets the new style name
     * @param {string} styleName - The name of the style to set.
     */
    async setNewStyleName(styleName) {
        const inputSelector = TextForm.SELECTORS.NEW_STYLE_MODAL.TITLE_INPUT;
        const input = new Input(this.tester, inputSelector, false);
        try {
            await input.set(styleName, 100);
        } catch (error) {
            this.#handleError("setNewStyleName", error);
        }
    }

    /**
     * Sets the next paragraph style
     * @param {
     * "Same as created new style" |
     * "Normal" |
     * "No spacing" |
     * "Heading 1" |
     * "Heading 2" |
     * "Heading 3" |
     * "Heading 4" |
     * "Heading 5" |
     * "Heading 6" |
     * "Heading 7" |
     * "Heading 8" |
     * "Heading 9" |
     * "Title" |
     * "Subtitle" |
     * "Subtle emphasis" |
     * "Emphasis" |
     * "Intense emphasis" |
     * "Strong" |
     * "Quote" |
     * "Intense quote" |
     * "Subtle reference" |
     * "Intense reference" |
     * "Book title" |
     * "List paragraph" |
     * "Caption" |
     * "Header" |
     * "Footer" |
     * "Footnote text" |
     * "Endnote text"
     * } optionValue - The value of the next paragraph style to select.
     */
    async setNextParagraphStyle(optionValue) {
        const dropdownSelector = TextForm.SELECTORS.NEW_STYLE_MODAL.NEXT_PARAGRAPH_STYLE;
        try {
            const dropdown = new Dropdown(this.tester, dropdownSelector);
            await dropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("setNextParagraphStyle", error);
        }
    }

    /**
     * Applies the new style
     * @return {Promise<void>}
     */
    async applyNewStyle() {
        try {
            await this.newStyleModal.closeModal();
        } catch (error) {
            this.#handleError("applyNewStyle", error);
        }
    }

    /**
     * Sets the border color
     * @param {Color} color - The color to set.
     */
    async setBorderColor(color) {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.BORDER_COLOR;
        try {
            await this.setBorders("Border color");
            await this.color.selectColor(dropdownSelector, color);
        } catch (error) {
            this.#handleError("setBorderColor", error);
        }
    }

    /**
     * Sets the text direction
     * @param { "Left-to-right" | "Right-to-left" } optionValue - The value of the text direction to select.
     */
    async setTextDirection(optionValue) {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.TEXT_DIRECTION;
        try {
            const dropdown = new Dropdown(this.tester, dropdownSelector);
            await dropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("setTextDirection", error);
        }
    }

    /**
     * Sets the list settings
     * @param {MultilevelListSettings} settings - The settings to set.
     * @return {Promise<void>}
     */
    async setMultiLevelListSettings(settings) {
        await this.openMultilevelListSettings();
        await this.setSettingsByMap(settings, TextForm.SETTINGS_MAP.multilevelListSettings);
        await this.applyListSettings();
    }

    /**
     * Sets the numbering list settings
     * @param {NumberingListSettings} settings - The settings to set.
     * @return {Promise<void>}
     */
    async setNumberingListSettings(settings) {
        await this.openNumberingListSettings();
        await this.setSettingsByMap(settings, TextForm.SETTINGS_MAP.numberingListSettings);
        await this.applyListSettings();
    }

    /**
     * Sets the bullets list settings
     * @param {BulletsListSettings} settings - The settings to set.
     * @return {Promise<void>}
     */
    async setBulletsListSettings(settings) {
        await this.openBulletsListSettings();
        await this.setSettingsByMap(settings, TextForm.SETTINGS_MAP.bulletsListSettings);
        await this.applyListSettings();
    }

    /**
     * Open Multilevel List settings menu item
     * @return {Promise<void>}
     */
    async openMultilevelListSettings() {
        const selector = TextForm.SELECTORS.TOOLBAR.MULTILEVELS_BUTTON;
        const dropdown = new Dropdown(this.tester, selector);
        try {
            await Promise.all([dropdown.selectDropdownItem("List settings"), this.listSettingsModal.isModalOpen()]);
            await this.clickMoreListSettings();
        } catch (error) {
            this.#handleError("openMultilevelListSettings", error);
        }
    }

    /**
     * Open Numbering List settings menu item
     * @return {Promise<void>}
     */
    async openNumberingListSettings() {
        const selector = TextForm.SELECTORS.TOOLBAR.NUMBERING_BUTTON;
        const dropdown = new Dropdown(this.tester, selector);
        try {
            await Promise.all([dropdown.selectDropdownItem("List settings"), this.listSettingsModal.isModalOpen()]);
        } catch (error) {
            this.#handleError("openNumberingListSettings", error);
        }
    }

    /**
     * Open Bullets List settings menu item
     * @return {Promise<void>}
     */
    async openBulletsListSettings() {
        const selector = TextForm.SELECTORS.TOOLBAR.BULLETS_BUTTON;
        const dropdown = new Dropdown(this.tester, selector);
        try {
            await Promise.all([dropdown.selectDropdownItem("List settings"), this.listSettingsModal.isModalOpen()]);
        } catch (error) {
            this.#handleError("openBulletsListSettings", error);
        }
    }

    /**
     * Click the more list settings button
     * @return {Promise<void>}
     */
    async clickMoreListSettings() {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.MORE_LIST_SETTINGS_BUTTON;
        try {
            await this.tester.click(selector);
        } catch (error) {
            this.#handleError("clickMoreListSettings", error);
        }
    }

    /**
     * Sets the list settings start at input
     * @param {string} value - The value to set.
     */
    async setListSettingsStartAt(value) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.START_AT_INPUT;
        const input = new Input(this.tester, selector, false);
        try {
            await input.set(value, 100);
        } catch (error) {
            this.#handleError("setListSettingsStartAt", error);
        }
    }

    /**
     * Sets the list settings restart list checkbox
     * @param {boolean} condition - true to enable Restart list, false to disable Restart list
     */
    async setListSettingsRestartList(condition) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.RESTART_LIST_CHECKBOX;
        const restartListCheckbox = new Checkbox(this.tester, selector);
        try {
            await restartListCheckbox.set(condition);
        } catch (error) {
            this.#handleError("setListSettingsRestartList", error);
        }
    }

    /**
     * Sets the numbering format
     * @param {string} format - The format to set.
     * @return {Promise<void>}
     */
    async setListSettingsNumberFormat(format) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.NUMBERING_FORMAT_INPUT;
        const formatInput = new Input(this.tester, selector, false);
        try {
            await formatInput.set(format, 100);
        } catch (error) {
            this.#handleError("setNumberingFormat", error);
        }
    }

    /**
     * Sets the font for the bullets list
     * @param {string} font - The font to set.
     * @return {Promise<void>}
     */
    async setListSettingsFont(font) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.FONT_DROPDOWN;
        try {
            const dropdown = new DropdownInput(this.tester, selector);
            await dropdown.set(font);
        } catch (error) {
            this.#handleError("setListSettingsFont", error);
        }
    }

    /**
     * Sets the bullets list settings type dropdown
     * @param {
     * "Symbol: ·" |
     * "Symbol: o" |
     * "Symbol: §" |
     * "Symbol: v" |
     * "Symbol: Ø" |
     * "Symbol: ü" |
     * "Symbol: ¨" |
     * "Symbol: –" |
     * "New bullet" |
     * "None" |
     * "1, 2, 3,..." |
     * "a, b, c,..." |
     * "A, B, C,..." |
     * "i, ii, iii,..." |
     * "I, II, III,..." |
     * "More types"
     * } optionValue - The value of the type to select.
     */
    async setListSettingsType(optionValue) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.TYPE_DROPDOWN;
        try {
            const dropdown = new Dropdown(this.tester, selector);
            await dropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("setListSettingsType", error);
        }
    }

    /**
     * Sets the list settings alignment at input
     * @param {string} value - The value to set.
     */
    async setListSettingsAlignmentAt(value) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.ALIGNMENT_AT_INPUT;
        try {
            const input = new Input(this.tester, selector, false);
            await input.set(value, 100);
        } catch (error) {
            this.#handleError("setListSettingsAlignmentAt", error);
        }
    }

    /**
     * Sets the list settings text indent input
     * @param {string} value - The value to set.
     */
    async setListSettingsTextIndent(value) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.TEXT_INDENT_INPUT;
        try {
            const input = new Input(this.tester, selector, false);
            await input.set(value, 100);
        } catch (error) {
            this.#handleError("setListSettingsTextIndent", error);
        }
    }

    /**
     * Sets the list settings follow number with dropdown
     * @param {"Tab character" | "Space" | "None"} optionValue - The value of the follow number with to select.
     */
    async setListSettingsFollowNumberWith(optionValue) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.FOLLOW_NUMBER_WITH_DROPDOWN;
        try {
            const dropdown = new Dropdown(this.tester, selector);
            await dropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("setListSettingsFollowNumberWith", error);
        }
    }

    /**
     * Selects the list level
     * @param { "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5" | "Level 6" | "Level 7" | "Level 8" } value - The value to select.
     */
    async selectListSettingsListLevel(value) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.LIST_LEVEL_ITEMS;
        try {
            await this.tester.selectByText(value, selector);
        } catch (error) {
            this.#handleError("selectListSettingsListLevel", error);
        }
    }

    /**
     * Sets the list settings include level number input
     * @param {string} value - The value to set.
     */
    async setListSettingsIncludeLevelNumber(optionValue) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.INCLUDE_LEVEL_NUMBER_DROPDOWN;
        try {
            const dropdown = new Dropdown(this.tester, selector);
            await dropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("setListSettingsIncludeLevelNumber", error);
        }
    }

    /**
     * Adds a tab stop at input
     * @param {string} value - The value to set. If not provided, the tab stop will be added without a value.
     */
    async addTabStopAt(value = null) {
        const inputSelector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.TAB_STOP_AT_INPUT;
        const checkboxSelector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.TAB_STOP_AT_CHECKBOX;
        const addStopAtCheckbox = new Checkbox(this.tester, checkboxSelector);
        try {
            await addStopAtCheckbox.set(true);
            if (value) {
                const input = new Input(this.tester, inputSelector, false);
                await input.set(value);
            }
        } catch (error) {
            this.#handleError("addTabStopAt", error);
        }
    }

    /**
     * Sets the bullets list settings alignment dropdown
     * @param {"Left" | "Center" | "Right"} optionValue - The value of the alignment to select.
     */
    async setListSettingsAlignment(optionValue) {
        const dropdownSelector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.ALIGNMENT_DROPDOWN;
        try {
            const dropdown = new Dropdown(this.tester, dropdownSelector);
            await dropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("setListSettingsAlignment", error);
        }
    }

    /**
     * Sets the bullets list settings size dropdown
     * @param {
     * "Like a text" |
     * "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" |
     * "22" | "24" | "26" | "28" | "36" | "48" | "72" | "96"
     * } optionValue - The value of the size to select.
     */
    async setListSettingsSize(optionValue) {
        const dropdownSelector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.SIZE_DROPDOWN;
        try {
            const dropdown = new Dropdown(this.tester, dropdownSelector);
            await dropdown.selectDropdownItem(optionValue);
        } catch (error) {
            this.#handleError("setListSettingsSize", error);
        }
    }

    /**
     * Sets the bullets list settings Bold formatting button
     * @param {boolean} condition - true to enable Bold, false to disable Bold
     */
    async setListSettingsBold(condition) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.FORMATTING_BUTTONS.BOLD;
        const listSettingsCheckbox = new Checkbox(this.tester, selector);
        try {
            await listSettingsCheckbox.set(condition);
        } catch (error) {
            this.#handleError("setListSettingsBold", error);
        }
    }

    /**
     * Sets the bullets list settings Italic formatting button
     * @param {boolean} condition - true to enable Italic, false to disable Italic
     */
    async setListSettingsItalic(condition) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.FORMATTING_BUTTONS.ITALIC;
        const listSettingsCheckbox = new Checkbox(this.tester, selector);
        try {
            await listSettingsCheckbox.set(condition);
        } catch (error) {
            this.#handleError("setListSettingsItalic", error);
        }
    }

    /**
     * Sets the bullets list settings color
     * @param {Color} color - The color to set.
     */
    async setListSettingsColor(color) {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.COLOR_SECTION;
        try {
            await this.tester.click(selector.COLOR_BUTTON);
            await this.color.selectColor(selector.COLOR_BUTTON, color);
        } catch (error) {
            this.#handleError("setListSettingsColor", error);
        }
    }

    /**
     * Applies the bullets list settings
     * @return {Promise<void>}
     */
    async applyListSettings() {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.FOOTER_BUTTONS.OK_BUTTON;
        try {
            await this.listSettingsModal.closeModal(selector);
        } catch (error) {
            this.#handleError("applyListSettings", error);
        }
    }

    /**
     * Closes the bullets list settings modal window
     * @return {Promise<void>}
     */
    async cancelListSettings() {
        const selector = TextForm.SELECTORS.LIST_SETTINGS_MODAL_WINDOW.FOOTER_BUTTONS.CANCEL_BUTTON;
        try {
            await this.listSettingsModal.closeModal(selector);
        } catch (error) {
            this.#handleError("cancelListSettings", error);
        }
    }

    /**
     * Clicks the decrease indent button
     * @return {Promise<void>}
     */
    async clickDecIndent() {
        const selector = TextForm.SELECTORS.TOOLBAR.DECREMENT_INDENT_BUTTON;
        try {
            await this.tester.click(selector);
        } catch (error) {
            this.#handleError("clickDecIndent", error);
        }
    }

    /**
     * Clicks the increase indent button
     * @return {Promise<void>}
     */
    async clickIncIndent() {
        const selector = TextForm.SELECTORS.TOOLBAR.INCREMENT_INDENT_BUTTON;
        try {
            await this.tester.click(selector);
        } catch (error) {
            this.#handleError("clickIncIndent", error);
        }
    }

    /**
     * Closes the paragraph settings
     * @return {Promise<void>}
     */
    async closeParagraphSettings() {
        const selector = TextForm.SELECTORS.TOOLBAR.CLOSE_PARAGRAPH_SETTINGS_BUTTON;
        try {
            if (await this.#checkActive(selector)) {
                await this.tester.click(selector);
            }
        } catch (error) {
            this.#handleError("closeParagraphSettings", error);
        }
    }

    /** TODO:
     * Sets the line spacing value
     * @param {string} size
     * @param {LineSpacingOption} options
     */
    async clickLineSpacing(size, options = {}) {
        const openLineSpacing = async () => {
            await this.tester.selectDropdown("#id-toolbar-btn-linespace");
        };

        const setLineSpacingSize = async (sizeValue) => {
            const lineSpacingSizes = ["1.0", "1.25", "1.5", "2.0", "2.5", "3.0"];
            if (lineSpacingSizes.includes(sizeValue)) {
                await openLineSpacing();
                await this.tester.selectByText(sizeValue, "#id-toolbar-btn-linespace ul.dropdown-menu a");
            }
        };

        const setOptionLineSpacing = async (options) => {
            await openLineSpacing();
            await this.tester.selectByText("Line spacing options", "#id-toolbar-btn-linespace ul.dropdown-menu a");

            const optionActions = {
                spacingType: async (value) => {
                    await this.tester.selectDropdown("#paragraph-combo-line-rule");
                    await this.tester.selectByText(value, "#paragraph-combo-line-rule ul.dropdown-menu a");
                },
                lineHeight: async (value) => {
                    await this.tester.inputToForm(value, "#paragraph-spin-line-height input");
                    await this.tester.keyPress("Enter");
                },
                beforePar: async (value) => {
                    await this.tester.inputToForm(value, "#paragraph-spin-spacing-before input");
                    await this.tester.keyPress("Enter");
                },
                afterPar: async (value) => {
                    await this.tester.inputToForm(value, "#paragraph-spin-spacing-after input");
                    await this.tester.keyPress("Enter");
                },
                dontAddIntr: async () => {
                    await this.tester.click("#paragraph-checkbox-add-interval label");
                },
            };

            for (const [option, value] of Object.entries(options)) {
                if (value && optionActions[option]) {
                    await optionActions[option](value);
                }
            }
        };

        const setSpaceOptions = async (options) => {
            const getMenuItemText = async (nthChild) => {
                await openLineSpacing();
                return this.tester.frame.evaluate((nth) => {
                    const element = document.querySelector(`#id-toolbar-btn-linespace > ul > li:nth-child(${nth}) a`);
                    return element ? element.textContent.trim().split(" ")[0] : null;
                }, nthChild);
            };

            const beforeText = await getMenuItemText(9);
            const afterText = await getMenuItemText(10);

            const spaceActions = {
                beforeAdd: async () => {
                    if (beforeText !== "Add") {
                        await openLineSpacing();
                        await this.tester.click("#id-toolbar-btn-linespace > ul > li:nth-child(9) a");
                    }
                },
                afterAdd: async () => {
                    if (afterText !== "Add") {
                        await openLineSpacing();
                        await this.tester.click("#id-toolbar-btn-linespace > ul > li:nth-child(10) a");
                    }
                },
            };

            for (const [option, value] of Object.entries(options)) {
                if (value && spaceActions[option]) {
                    await spaceActions[option]();
                }
            }
        };

        if (size) {
            await setLineSpacingSize(size);
            await this.closeParagraphSettings();
        }

        if (options.line) {
            await setOptionLineSpacing(options.line);
            await this.closeParagraphSettings();
        }

        if (options.space) {
            await setSpaceOptions(options.space);
            await this.closeParagraphSettings();
        }
    }

    /**
     * @param {
     * "None" |
     * "Filled round bullets" |
     * "Hollow round bullets" |
     * "Filled square bullets" |
     * "Star bullets" |
     * "Arrow bullets" |
     * "Checkmark bullets" |
     * "Filled rhombus bullets" |
     * "Dash bullets" |
     * } bullet - The value of the bullets to select.
     */
    async clickBullets(bullet) {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.BULLETS_DROPDOWN;
        const dropdown = new Dropdown(this.tester, dropdownSelector);
        try {
            await dropdown.selectDropdownItem(bullet);
        } catch (error) {
            this.#handleError("clickBullets", error);
        }
    }

    /**
     * @param {"none" | "A" | "aDot" | "aBrace" | "numberDot" | "numberBrace" | "iDot" | "iLower"} numbering
     * @return {Promise<void>}
     */
    async clickNumbering(numbering) {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.NUMBERING_DROPDOWN;
        const dropdown = new Dropdown(this.tester, dropdownSelector);
        try {
            await dropdown.selectDropdownItem(numbering);
        } catch (error) {
            this.#handleError("clickNumbering", error);
        }
    }

    /**
     * @param {"none" | "variosnumbullets" | "numbered" | "symbols" | "articles" | "chapters" | "numberedheadings" | "variosheadings"} multilevels
     * @return {Promise<void>}
     */
    async clickMultilevels(multilevels) {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.MULTILEVELS_DROPDOWN;
        const dropdown = new Dropdown(this.tester, dropdownSelector);
        try {
            await dropdown.selectDropdownItem(multilevels);
        } catch (error) {
            this.#handleError("clickMultilevels", error);
        }
    }

    /**
     * Changes the multilevel list level
     * @param {
     * "Level 1" |
     * "Level 2" |
     * "Level 3" |
     * "Level 4" |
     * "Level 5" |
     * "Level 6" |
     * "Level 7" |
     * "Level 8" |
     * "Level 9"
     * } optionValue - The value of the list level to select.
     * @return {Promise<void>}
     */
    async changeMultilevelListLevel(optionValue) {
        const multilevelsDropdownSelector = TextForm.SELECTORS.TOOLBAR.MULTILEVELS_BUTTON;
        const changeListLevelDropdownSelector = TextForm.SELECTORS.TOOLBAR.MULTILEVELS_CHANGE_LIST_LEVEL_BUTTON;
        try {
            await this.#changeListLevel(multilevelsDropdownSelector, changeListLevelDropdownSelector, optionValue);
        } catch (error) {
            this.#handleError("changeListLevel", error);
        }
    }

    /**
     * Changes the numbering list level
     * @param {
     * "Level 1" |
     * "Level 2" |
     * "Level 3" |
     * "Level 4" |
     * "Level 5" |
     * "Level 6" |
     * "Level 7" |
     * "Level 8" |
     * "Level 9"
     * } optionValue - The value of the list level to select.
     * @return {Promise<void>}
     */
    async changeNumberingListLevel(optionValue) {
        const numberingDropdownSelector = TextForm.SELECTORS.TOOLBAR.NUMBERING_BUTTON;
        const changeListLevelDropdownSelector = TextForm.SELECTORS.TOOLBAR.NUMBERING_CHANGE_LIST_LEVEL_BUTTON;
        try {
            await this.#changeListLevel(numberingDropdownSelector, changeListLevelDropdownSelector, optionValue);
        } catch (error) {
            this.#handleError("changeNumberingListLevel", error);
        }
    }

    /**
     * Changes the bullets list level
     * @param {
     * "Level 1" |
     * "Level 2" |
     * "Level 3" |
     * "Level 4" |
     * "Level 5" |
     * "Level 6" |
     * "Level 7" |
     * "Level 8" |
     * "Level 9"
     * } optionValue - The value of the list level to select.
     * @return {Promise<void>}
     */
    async changeBulletsListLevel(optionValue) {
        const bulletsDropdownSelector = TextForm.SELECTORS.TOOLBAR.BULLETS_BUTTON;
        const changeListLevelDropdownSelector = TextForm.SELECTORS.TOOLBAR.BULLETS_CHANGE_LIST_LEVEL_BUTTON;
        try {
            await this.#changeListLevel(bulletsDropdownSelector, changeListLevelDropdownSelector, optionValue);
        } catch (error) {
            this.#handleError("changeBulletsListLevel", error);
        }
    }

    /**
     * Click on the Align left button
     * @return {Promise<void>}
     */
    async clickAlignLeft() {
        const selector = TextForm.SELECTORS.TOOLBAR.ALIGN_LEFT_BUTTON;
        try {
            await this.tester.click(selector);
        } catch (error) {
            this.#handleError("clickAlignLeft", error);
        }
    }

    /**
     * Click on the Align center button
     * @return {Promise<void>}
     */
    async clickAlignCenter() {
        const selector = TextForm.SELECTORS.TOOLBAR.ALIGN_CENTER_BUTTON;
        try {
            await this.tester.click(selector);
        } catch (error) {
            this.#handleError("clickAlignCenter", error);
        }
    }

    /**
     * Click on the Align right button
     * @return {Promise<void>}
     */
    async clickAlignRight() {
        const selector = TextForm.SELECTORS.TOOLBAR.ALIGN_RIGHT_BUTTON;
        try {
            await this.tester.click(selector);
        } catch (error) {
            this.#handleError("clickAlignRight", error);
        }
    }

    /**
     * Click on the Justified button
     * @return {Promise<void>}
     */
    async clickJustified() {
        const selector = TextForm.SELECTORS.TOOLBAR.ALIGN_JUSTIFIED_BUTTON;
        try {
            await this.tester.click(selector);
        } catch (error) {
            this.#handleError("clickJustified", error);
        }
    }

    /**
     * Selects the non-printing characters
     * @param {
     * "Nonprinting characters" |
     * "Hidden table borders" |
     * "All"
     * } select - The value of the non-printing characters to select.
     * @return {Promise<void>}
     */
    async selectNonPrintChar(select) {
        const dropdownSelector = TextForm.SELECTORS.TOOLBAR.NON_PRINT_CHAR_DROPDOWN;
        const dropdown = new Dropdown(this.tester, dropdownSelector);
        try {
            if (select === "All") {
                for (const item of ["Nonprinting characters", "Hidden table borders"]) {
                    await dropdown.selectDropdownItem(item);
                }
            } else {
                await dropdown.selectDropdownItem(select);
            }
        } catch (error) {
            this.#handleError("selectNonPrintChar", error);
        }
    }

    /**
     * Clicks the shading button and selects the color
     * @param {Color} color - The color to select.
     * @return {Promise<void>}
     */
    async clickShading(color) {
        const selector = TextForm.SELECTORS.TOOLBAR.SHADING_BUTTON;
        try {
            await this.tester.selectDropdown(selector);
            await this.color.selectColor(selector, color);
        } catch (error) {
            this.#handleError("clickShading", error);
        }
    }

    /**
     * @param {object} listDropdownSelectors
     * @param {object} changeListLevelDropdownSelectors
     * @param {string} optionValue
     * @return {Promise<void>}
     */
    async #changeListLevel(listDropdownSelectors, changeListLevelDropdownSelectors, optionValue) {
        const listDropdown = new Dropdown(this.tester, listDropdownSelectors);
        const changeListLevelDropdown = new Dropdown(this.tester, changeListLevelDropdownSelectors);
        try {
            await Promise.all([
                listDropdown.selectDropdownItem("Change list level"),
                changeListLevelDropdown.selectDropdownItem(optionValue),
            ]);
        } catch (error) {
            this.#handleError("changeListLevel", error);
        }
    }

    /**
     * Checks if the selector is active
     * @param {string} selector
     * @return {Promise<boolean>}
     */
    async #checkActive(selector) {
        const activeSelector = selector + ".active";
        return await this.tester.checkSelector(activeSelector);
    }

    /**
     * Handles errors by throwing a new error with method name and original error message.
     * @param {string} methodName The name of the method where the error occurred.
     * @param {Error} error The original error object.
     */
    #handleError(methodName, error) {
        throw new Error(`TextForm.${methodName}: ${error.message}`, {
            cause: error,
        });
    }
}
module.exports = TextForm;
