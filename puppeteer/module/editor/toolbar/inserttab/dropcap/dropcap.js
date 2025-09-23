const InsertTab = require("../inserttab");
const { Color } = require("../../../../common");
const { DROPCAP } = require("./selectors.json");
const { Dropdown, Input } = require("../../../../elements");
class DropCap extends InsertTab {
    static DROPCAP_SELECTORS = DROPCAP;

    constructor(tester) {
        super(tester, DROPCAP.BUTTON);
        this.color = new Color(this.tester);
    }

    /**
     * Activates a section if it is not already active.
     * @param {string} isActiveSelector - Selector to check if the section is active.
     * @param {string} sectionSelector - Selector for the section to activate.
     */
    async #activateSection(isActiveSelector, sectionSelector) {
        if (!(await this.tester.checkSelector(isActiveSelector))) {
            await this.tester.click(sectionSelector);
        }
    }

    /**
     * Sets the font for Drop Cap.
     * @param {string} font - Font name to set.
     */
    async #setFont(font) {
        const dropCapFontSelectors = DropCap.DROPCAP_SELECTORS.DROPCAP.FONT;
        const inputElement = new Input(this.tester, dropCapFontSelectors.INPUT);
        await inputElement.set(font);
    }

    /**
     * Sets the text input value for a given selector.
     * @param {string} value - The value to set.
     * @param {string} selector - The selector for the input field.
     */
    async #setTextValue(value, selector) {
        const inputElement = new Input(this.tester, selector, false);
        await inputElement.set(value);
    }

    /**
     * Sets a border property by opening the menu if necessary and selecting a color.
     * @param {string} property - The color property to set.
     * @param {string} selector - The selector for the border property.
     * @param {string} menuSelector - The selector for the menu.
     */
    async #setBorderColor(property, selector, menuSelector) {
        if (!(await this.tester.checkSelector(menuSelector))) {
            await this.tester.click(selector);
        }
        await this.color.selectColor(menuSelector, property);
    }

    /**
     * Sets the Drop Cap type.
     * @param {"None" | "In text" | "In margin" | "Drop Cap Settings"} dropCapType - The Drop Cap type to select.
     */
    async setDropCap(dropCapType) {
        const dropCapSelectors = DropCap.DROPCAP_SELECTORS;
        const dropDownButton = new Dropdown(this.tester, {
            selector: dropCapSelectors.BUTTON.SELECTOR,
            elementsSelector: dropCapSelectors.BUTTON.ELEMENTS_SELECTOR,
        });
        await dropDownButton.selectDropdownItem(dropCapType);
    }

    /**
     * Configures Drop Cap settings including font, borders, and margins.
     * @param {{dropCap: {pos: string | undefined, font: string | undefined, rowHeight: string | number | undefined, distance: string | number | undefined},
     *          borders: {size: number | string | undefined, borderColor: Color | undefined,
     *                    borderLine: "UPPER" | "CENTER" | "DOWN" |
     *                    "OUT" | "LEFT" | "FULL" | "RIGHT"| "NONE" | undefined, backgroundColor: Color | undefined },
     *          margins: {top: number | undefined, left: number | undefined, bottom: number | undefined, right: number | undefined}}} settings - The settings object.
     * @returns {Promise<void>}
     */
    async setDropCapSettings({ dropCap, borders, margins }) {
        await this.setDropCap("Drop Cap Settings");

        if (dropCap) {
            const { pos, font, rowHeight, distance } = dropCap;
            await this.#activateSection(DROPCAP.SECTION.DROPCAP_ACTIVE, DROPCAP.SECTION.DROPCAP);
            if (pos) {
                const positionSelector = DROPCAP.DROPCAP.POSITIONS[pos.toUpperCase()];
                if (positionSelector) {
                    await this.tester.click(positionSelector);
                }
            }
            if (font) {
                await this.#setFont(font);
            }
            if (rowHeight) {
                await this.#setTextValue(rowHeight, DROPCAP.DROPCAP.INPUTS.ROW_HEIGHT);
            }
            if (distance) {
                await this.#setTextValue(distance, DROPCAP.DROPCAP.INPUTS.DISTANCE);
            }
        }

        if (borders) {
            const { size, borderColor, borderLine, backgroundColor } = borders;
            await this.#activateSection(DROPCAP.SECTION.BORDERS_ACTIVE, DROPCAP.SECTION.BORDERS);
            if (size) {
                await this.tester.click(DROPCAP.BORDER.SIZE);
                await this.tester.click(`${DROPCAP.BORDER.SIZE_VAL}[data-value="${size}"]`);
            }
            if (borderColor) {
                await this.#setBorderColor(borderColor, DROPCAP.BORDER.COLOR, DROPCAP.BORDER.COLOR_ACTIVE);
            }
            if (borderLine) {
                const borderLineType = DROPCAP.BORDER.LINES[borderLine.toUpperCase()];
                if (borderLineType) {
                    await this.tester.click(borderLineType);
                }
            }
            if (backgroundColor) {
                await this.#setBorderColor(
                    backgroundColor,
                    DROPCAP.BORDER.BACKGROUND_COLOR,
                    DROPCAP.BORDER.BACKGROUND_COLOR_ACTIVE
                );
            }
        }

        if (margins) {
            await this.#activateSection(DROPCAP.SECTION.MARGINS_ACTIVE, DROPCAP.SECTION.MARGINS);
            for (const [side, value] of Object.entries(margins)) {
                if (value) {
                    const inputMarginSettingsElement = new Input(
                        this.tester,
                        DROPCAP.MARGINS[side.toUpperCase()],
                        false
                    );
                    await inputMarginSettingsElement.set(value);
                }
            }
        }

        await this.tester.click(DROPCAP.OK_BUTTON);
    }
}

module.exports = DropCap;
