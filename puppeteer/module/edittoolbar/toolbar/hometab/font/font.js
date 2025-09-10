const HomeTab = require("../hometab");
const { Dropdown, Button, Input } = require("../../../../elements");
const selectors = require("./selectors.json");
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

class Font extends HomeTab {
    constructor(tester) {
        super(tester);
    }

    static FONT_SELECTORS = selectors;

    /**
     * Click the bold button
     * @return {Promise<void>}
     */
    async clickBold() {
        await this.#executeAction(Button, Font.FONT_SELECTORS.BOLD_BUTTON, "click", "clickBold");
    }

    /**
     * Click the italic button
     * @return {Promise<void>}
     */
    async clickItalic() {
        await this.#executeAction(Button, Font.FONT_SELECTORS.ITALIC_BUTTON, "click", "clickItalic");
    }

    /**
     * Click the underline button
     * @return {Promise<void>}
     */
    async clickUnderline() {
        await this.#executeAction(Button, Font.FONT_SELECTORS.UNDERLINE_BUTTON, "click", "clickUnderline");
    }

    /**
     * Click the strikeout button
     * @return {Promise<void>}
     */
    async clickStrikeout() {
        await this.#executeAction(Button, Font.FONT_SELECTORS.STRIKEOUT_BUTTON, "click", "clickStrikeout");
    }

    /**
     * Click the superscript button
     * @return {Promise<void>}
     */
    async clickSuperscript() {
        await this.#executeAction(Button, Font.FONT_SELECTORS.SUPERSCRIPT_BUTTON, "click", "clickSuperscript");
    }

    /**
     * Click the subscript button
     * @return {Promise<void>}
     */
    async clickSubscript() {
        await this.#executeAction(Button, Font.FONT_SELECTORS.SUBSCRIPT_BUTTON, "click", "clickSubscript");
    }

    /**
     * Click the increase font size button
     * @return {Promise<void>}
     */
    async clickIncFont() {
        await this.#executeAction(Button, Font.FONT_SELECTORS.INCREASE_FONT_BUTTON, "click", "clickIncFont");
    }

    /**
     * Click the decrease font size button
     * @return {Promise<void>}
     */
    async clickDecFont() {
        await this.#executeAction(Button, Font.FONT_SELECTORS.DECREASE_FONT_BUTTON, "click", "clickDecFont");
    }

    /**
     * Select a font from the list
     * @param {string} fontName - The font name to select
     */
    async selectFont(fontName) {
        const fontNameSelectors = Font.FONT_SELECTORS.FONT_NAME;
        const input = new Input(this.tester, fontNameSelectors.selector, true);
        try {
            await this.tester.frame.evaluate(
                (selector) => document.querySelector(`${selector} input`).select(),
                fontNameSelectors.selector
            );
            await input.set(fontName, 100, false);
        } catch (error) {
            this.#handleError("selectFont", error);
        }
    }

    /**
     * Set the font size
     * @param {string} size - The font size to set
     * @return {Promise<void>}
     */
    async setFontSize(size) {
        const sizeSelectors = Font.FONT_SELECTORS.FONT_SIZE_DROPDOWN;
        await this.#executeAction(Input, sizeSelectors.selector, "set", "setFontSize", [size, 100]);
    }

    /**
     * @param { "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "22" | "24" | "26" | "28" | "36" | "48" | "72" | "96" } size - The font size to select
     * @return {Promise<void>}
     */
    async selectFontSize(size) {
        const sizeSelectors = Font.FONT_SELECTORS.FONT_SIZE_DROPDOWN;
        await this.#executeAction(Dropdown, sizeSelectors, "selectDropdownItem", "selectFontSize", [size]);
    }

    /**
     * Click the change case button
     * @param {
     * "Sentence case." |
     *  "lowercase" |
     *  "UPPERCASE" |
     *  "Capitalize Each Word" |
     *  "tOGGLE cASE"
     * } textCase - The text case to select
     * @return {Promise<void>}
     */
    async clickChangeCase(textCase) {
        const changeCaseSelectors = Font.FONT_SELECTORS.CHANGE_CASE_DROPDOWN;
        await this.#executeAction(Dropdown, changeCaseSelectors, "selectDropdownItem", "clickChangeCase", [textCase]);
    }

    /**
     * Click the highlight button
     * @param {Color|boolean} param
     * @return {Promise<void>}
     */
    async clickHightlight(param) {
        const highlightDropdown = new Dropdown(this.tester, {
            selector: Font.FONT_SELECTORS.HIGHLIGHT_BUTTON,
        });

        try {
            if (typeof param !== "boolean" && typeof param !== "object") {
                throw new Error(
                    `clickHightlight expects a boolean (noFill) or a color (object), but got: ${typeof param}`
                );
            }

            let color = null;
            let noFill = null;

            if (typeof param === "boolean") {
                noFill = param;
            } else {
                color = param;
            }

            if (color) {
                await highlightDropdown.selectDropdown();
                await this.color.selectColor(Font.FONT_SELECTORS.HIGHLIGHT_BUTTON, color);
            }

            if (noFill) {
                await highlightDropdown.selectDropdown();
                await this.tester.clickCheckbox({
                    selector: Font.FONT_SELECTORS.NO_FILL_CHECKBOX,
                    condition: noFill,
                });
            }
        } catch (error) {
            this.#handleError("clickHightlight", error);
        }
    }

    /**
     * Click the clear style button
     * @return {Promise<void>}
     */
    async clickClearStyle() {
        await this.#executeAction(Button, Font.FONT_SELECTORS.CLEAR_STYLE_BUTTON, "click", "clickClearStyle");
    }

    /**
     * @param {Color} color - The color to select
     * @return {Promise<void>}
     */
    async clickFontColor(color) {
        await this.#selectColor(Font.FONT_SELECTORS.FONT_COLOR_BUTTON, color, "clickFontColor");
    }

    /**
     * @param {Color} color - The color to select
     * @return {Promise<void>}
     */
    async clickFillColor(color) {
        await this.#selectColor(Font.FONT_SELECTORS.FILL_COLOR_BUTTON, color, "clickFillColor");
    }

    /**
     * @param {string} selector - The selector of the color dropdown
     * @param {Color} color - The color to select
     * @param {string} methodName - The name of the method that called this method
     * @return {Promise<void>}
     */
    async #selectColor(selector, color, methodName) {
        try {
            const colorDropdown = new Dropdown(this.tester, { selector });
            await colorDropdown.selectDropdown();
            await this.color.selectColor(selector, color);
        } catch (error) {
            this.#handleError(methodName, error);
        }
    }

    /**
     * Universal method for executing actions on elements with error handling
     * @param {Object} elementClass Element class to instantiate (Button, DropdownInput, etc.)
     * @param {string} selector Selector for the element
     * @param {string} action Action method to call on the element
     * @param {string} methodName Name of the calling method for error handling
     * @param {Array} actionParams Parameters to pass to the action method
     * @param {Array} constructorParams Additional parameters to pass to the element constructor
     */
    async #executeAction(elementClass, selector, action, methodName, actionParams = [], constructorParams = []) {
        const element = new elementClass(this.tester, selector, ...constructorParams);
        try {
            await element[action](...actionParams);
        } catch (error) {
            this.#handleError(methodName, error);
        }
    }

    /**
     * Handles errors by throwing a new error with method name and original error message.
     * @param {string} methodName The name of the method where the error occurred.
     * @param {Error} error The original error object.
     */
    #handleError(methodName, error) {
        throw new Error(`Font.${methodName}: ${error.message}`, {
            cause: error,
        });
    }
}

module.exports = Font;
