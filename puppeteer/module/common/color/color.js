const { ColorSettingID, ModalDialogSelectors, ColorMenuType } = require("../../../constants");
const { ModalButton, Input, Dropdown } = require("../../elements");

/**
 * @typedef {Object} BaseColorProp
 * @property {number} type - The type of color setting
 * @property {number} [index] - The color index
 */

/**
 * @typedef {BaseColorProp} ThemeColorProp
 * @property {number} subIndex - The color sub-index (shade)
 */

/**
 * @typedef {BaseColorProp} EyeDropperColorProp
 * @property {number} x - The X coordinate of the color, used for advanced color settings
 * @property {number} y - The Y coordinate of the color, used for advanced color settings
 */

/**
 * @typedef {BaseColorProp} CustomColorProp
 * @property {number} [hex] - The hexadecimal color value
 * @property {number} [r] - The red component of the color
 * @property {number} [g] - The green component of the color
 * @property {number} [b] - The blue component of the color
 */

/**
 * @typedef {EyeDropperColorProp} CustomClickColorProp
 * @property {number} hue - The hue adjustment coordinate, used in a vertical column
 */

/**
 * @typedef {BaseColorProp | ThemeColorProp | EyeDropperColorProp
 *          | CustomColorProp | CustomClickColorProp} ColorSettingsObject
 */

class Color {
    constructor(tester) {
        this.tester = tester || RegularTester;

        this.Type = {
            Auto: 0,
            Theme: 1,
            Standard: 2,
            EyeDropper: 3,
            Custom: 4,
            CustomClick: 5,
        };
        this.MoreColorsModal = new ModalButton(
            this.tester,
            "",
            ModalDialogSelectors.MODAL_WINDOW,
            ModalDialogSelectors.APPLY_BUTTON
        );
    }

    /**
     * Selects a color based on the provided color settings.
     * @param {string} selector - The CSS selector to locate the color picker element.
     * @param {ColorSettingsObject} color - The color properties used to select the color.
     */
    async selectColor(selector, color) {
        switch (color.type) {
            case this.Type.Auto:
                await this.#selectAutoColor(selector);
                break;
            case this.Type.Theme:
                /**
                 * @param {string} selector
                 * @param {ThemeColorProp} color
                 */
                await this.#selectThemeColor(selector, color);
                break;
            case this.Type.Standard:
                /**
                 * @param {string} selector
                 * @param {BaseColorProp} color
                 */
                await this.#selectStandardColor(selector, color);
                break;
            case this.Type.EyeDropper:
                /**
                 * @param {string} selector
                 * @param {EyeDropperColorProp} color
                 */
                await this.#selectEyeDropperColor(selector, color);
                break;
            case this.Type.Custom:
                /**
                 * @param {string} selector
                 * @param {CustomColorProp} color
                 */
                await this.#selectCustomColor(selector, color);
                break;
            case this.Type.CustomClick:
                /**
                 * @param {string} selector
                 * @param {CustomClickColorProp} color
                 */
                await this.#selectCustomClickColor(selector, color);
                break;
            default:
                /**
                 * @param {string} selector
                 * @param {BaseColorProp} color
                 */
                await this.#selectDefaultColor(selector, color);
                break;
        }
    }

    /**
     * Selects the "Auto" color option.
     * @param {string} selector - The CSS selector to locate the color picker element.
     */
    async #selectAutoColor(selector) {
        await this.tester.click(`${selector} li:nth-child(1)`);
    }

    /**
     * Selects a color from the "Theme" options.
     * @param {string} selector - The CSS selector to locate the color picker element.
     * @param {ThemeColorProp} color - The color properties with index and subIndex.
     */
    async #selectThemeColor(selector, color) {
        const subIndexRow = 10;
        await new Dropdown(this.tester, {
            selector: selector,
        }).selectDropdown();
        const index = color.index + subIndexRow * color.subIndex;
        await this.tester.click(`${selector} a[idx="${index}"]`);
    }

    /**
     * Selects a color from the "Standard" options.
     * @param {string} selector - The CSS selector to locate the color picker element.
     * @param {BaseColorProp} color - The color properties with index.
     */
    async #selectStandardColor(selector, color) {
        await new Dropdown(this.tester, {
            selector: selector,
        }).selectDropdown();
        const standardColorOffset = 60;
        const index = color.index + standardColorOffset;
        await this.tester.click(`${selector} a[idx="${index}"]`);
    }

    /**
     * Selects a color using the "EyeDropper" tool.
     * @param {string} selector - The CSS selector to locate the color picker element.
     * @param {EyeDropperColorProp} color - The color properties with X and Y coordinates.
     */
    async #selectEyeDropperColor(selector, color) {
        const { menuType } = color;
        const x = color.x - 1;
        const y = color.y - 1;
        await this.#selectDropdownOption(selector, "Eyedropper", menuType);
        await this.tester.clickMouseInsideMain(x, y);
    }

    /**
     * Selects a custom color by entering RGB or HEX values.
     * @param {string} selector - The CSS selector to locate the color picker element.
     * @param {CustomColorProp} color - The color properties including hex or RGB values.
     */
    async #selectCustomColor(selector, color) {
        const { menuType } = color;
        const waitOpenColorMenu = this.tester.frame.waitForSelector(ColorSettingID.Colorpicker);
        await this.#selectDropdownOption(selector, "More colors", menuType);
        await waitOpenColorMenu;
        if (color.hex) {
            await this.#inputHexColor(color.hex);
        } else {
            await this.#inputRgbColor(color);
        }
        await this.#confirmSelection();
    }

    /**
     * Inputs the hex color value.
     * @param {string} hex - The hexadecimal color value.
     */
    async #inputHexColor(hex) {
        await this.#setInput(hex, ColorSettingID.Hex.SELECTOR, ColorSettingID.Hex.TARGET_SELECTOR);
    }

    /**
     * Inputs the RGB color values.
     * @param {CustomColorProp} color - The color properties including R, G, and B values.
     */
    async #inputRgbColor(color) {
        const colorInputs = [
            { id: ColorSettingID.Red, value: color.r },
            { id: ColorSettingID.Green, value: color.g },
            { id: ColorSettingID.Blue, value: color.b },
        ];

        for (const input of colorInputs) {
            await this.#setInput(input.value, input.id);
        }
    }

    /**
     * Selects a custom color using advanced color picker (clicking inside the color picker).
     * @param {string} selector - The CSS selector to locate the color picker element.
     * @param {CustomClickColorProp} color - The color properties including X, Y, and hue values.
     */
    async #selectCustomClickColor(selector, color) {
        const { menuType } = color;
        await this.#selectDropdownOption(selector, "More colors", menuType);
        await this.tester.mouseClickInsideElement(`${ColorSettingID.Colorpicker} .cnt-hb`, color.x, color.y);
        await this.tester.mouseClickInsideElement(`${ColorSettingID.Colorpicker} .cnt-sat`, 0, color.hue);
        await this.#confirmSelection();
    }

    /**
     * Selects a default color by index.
     * @param {string} selector - The CSS selector to locate the color picker element.
     * @param {BaseColorProp} color - The color properties with index.
     */
    async #selectDefaultColor(selector, color) {
        await this.tester.click(`${selector} a[idx="${color.index}"]`);
    }

    /**
     * Confirms the color selection by clicking the confirm button and checking the modal window.
     */
    async #confirmSelection() {
        if (await this.MoreColorsModal.isModalOpen()) {
            await this.MoreColorsModal.closeModal();
        }
    }

    /**
     * Sets the value of an input field.
     * @param {string} value - The value to set in the input field.
     * @param {string} selector - The CSS selector to locate the input field.
     */
    async #setInput(value, selector, target) {
        const input = new Input(this.tester, selector, false, target);
        await input.set(value);
    }

    async #selectDropdownOption(selector, option, type) {
        const menuOptions = ColorMenuType[type];
        const dropdown = new Dropdown(this.tester, {
            selector: selector,
            elementsSelector: `${selector} li[id]`,
            elementsValue: menuOptions,
        });
        await dropdown.selectDropdownItem(option);
    }
}

module.exports = Color;
