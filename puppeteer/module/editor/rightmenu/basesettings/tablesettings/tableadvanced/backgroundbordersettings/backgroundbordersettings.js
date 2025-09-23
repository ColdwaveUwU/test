const BaseSettings = require("../../../basesettings");
const { Color } = require("../../../../../../common");
const selectors = require("./selectors.json");
const { Dropdown } = require("../../../../../../elements");

/**
 * @typedef {Object} BackgroundBorderSettingsObject
 * @property {BorderSettings} [border] - The border color settings.
 * @property {string} [borderType] - The border type.
 * @property {import("../../../../../common/color/color").ColorSettingsObject} [borderColor] - The border color settings.
 * @property {import("../../../../../common/color/color").ColorSettingsObject} [tableBackground] - The table background color settings.
 */

class BackgroundBorderSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    static BACKGROUND_BORDER_SELECTORS = selectors;

    /**
     * @typedef {Object} BorderSettings
     * @property {string} [size] - The border size.
     * @property {import("../../../../../common/color/color").ColorSettingsObject} [color] - The border color.
     */
    /**
     * Sets the border settings.
     * @param {BorderSettings} settings
     */
    async #setBorderSettings(settings) {
        const borderSelectors = BackgroundBorderSettings.BACKGROUND_BORDER_SELECTORS?.BORDER;

        if (settings.size) {
            const { SELECTOR, ELEMENTS_SELECTORS } = borderSelectors.SIZE_DROPDOWN;
            const borderSizeDropdown = new Dropdown(this.tester, {
                selector: SELECTOR,
                elementsSelector: ELEMENTS_SELECTORS,
            });
            await borderSizeDropdown.selectDropdownItem(settings.size);
        }

        if (settings.color) {
            const colorSelectors = borderSelectors.COLOR;
            const colorDropdown = new Dropdown(this.tester, { selector: colorSelectors });
            const color = new Color(this.tester);

            await colorDropdown.selectDropdown();
            await color.selectColor(colorSelectors, settings.color);
        }
    }

    /**
     * Sets the border type.
     * @param {string} type - The border type.
     */
    async #setBorderTypeSettings(type) {
        if (typeof type !== "string") {
            throw new Error(`Invalid border type: expected string, got "${type}"`);
        }
        const selector = BackgroundBorderSettings.BACKGROUND_BORDER_SELECTORS?.BORDER_TYPES.replace("{prop}", type);
        await this.tester.click(selector);
    }

    /**
     * Sets the border color.
     * @param {import("../../../../../common/color/color").ColorSettingsObject} color - The border color settings.
     */
    async #setBorderColorSettings(color) {
        const selector = BackgroundBorderSettings.BACKGROUND_BORDER_SELECTORS?.BORDER_COLOR;
        const dropdown = new Dropdown(this.tester, { selector });
        const colorPicker = new Color(this.tester);

        await dropdown.selectDropdown();
        await colorPicker.selectColor(selector, color);
    }

    /**
     * Sets the table background color.
     * @param {import("../../../../../common/color/color").ColorSettingsObject} color - The background color settings.
     */
    async #setTableBackgroundSettings(color) {
        const selector = BackgroundBorderSettings.BACKGROUND_BORDER_SELECTORS?.TABLE_BACKGROUND;
        const dropdown = new Dropdown(this.tester, { selector });
        const colorPicker = new Color(this.tester);

        await dropdown.selectDropdown();
        await colorPicker.selectColor(selector, color);
    }

    async #setCellColor(color) {
        const selector = BackgroundBorderSettings.BACKGROUND_BORDER_SELECTORS.TABLE_CELL_COLOR;
        const dropdown = new Dropdown(this.tester, { selector });
        const colorPicker = new Color(this.tester);

        await dropdown.selectDropdown();
        await colorPicker.selectColor(selector, color);
    }

    /**
     * Applies the background and border settings.
     * @param {BackgroundBorderSettingsObject} settings
     */
    async applySettings(settings) {
        const handlers = {
            border: this.#setBorderSettings.bind(this),
            borderType: this.#setBorderTypeSettings.bind(this),
            borderColor: this.#setBorderColorSettings.bind(this),
            cellColor: this.#setCellColor.bind(this),
            tableBackground: this.#setTableBackgroundSettings.bind(this),
        };

        await this.applySettingsMap(settings, handlers, "BackgroundBorder");
    }
}

module.exports = BackgroundBorderSettings;
