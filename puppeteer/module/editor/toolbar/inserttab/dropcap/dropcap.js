const InsertTab = require("../inserttab");
const { Color } = require("../../../../common");
const { DROPCAP } = require("./selectors.json");
const { Dropdown, Input, ModalButton, StateButton, Button } = require("../../../../elements");

class DropCap extends InsertTab {
    static DROPCAP_SELECTORS = DROPCAP;
    #dropCapDropdown = null;

    constructor(tester) {
        super(tester, DROPCAP.BUTTON);
        this.color = new Color(this.tester);
    }

    #getDropcapDropdown() {
        if (!this.#dropCapDropdown) {
            const dropCapSelectors = DropCap.DROPCAP_SELECTORS;
            this.#dropCapDropdown = new Dropdown(this.tester, {
                selector: dropCapSelectors.BUTTON.SELECTOR,
                elementsSelector: dropCapSelectors.BUTTON.ELEMENTS_SELECTOR,
            });
        }
        return this.#dropCapDropdown;
    }
    /**
     * Activates a section if it is not already active.
     * @param {string} isActiveSelector - Selector to check if the section is active.
     * @param {string} sectionSelector - Selector for the section to activate.
     */
    async #activateSection(sectionSelector) {
        const sectionButton = new StateButton(this.tester, sectionSelector);
        await sectionButton.setState(true);
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
    async #setBorderColor(property, selector) {
        const borderColorDropdown = new Dropdown(this.tester, { selector: selector });
        await borderColorDropdown.selectDropdown();
        await this.color.selectColor(selector, property);
    }

    /**
     * Sets the Drop Cap type.
     * @param {"None" | "In text" | "In margin" | "Drop Cap Settings"} dropCapType - The Drop Cap type to select.
     */
    async setDropCap(dropCapType) {
        const dropDownButton = this.#getDropcapDropdown();
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
        const dropDownButton = this.#getDropcapDropdown();
        const { id } = await dropDownButton.getDropdownItem("description", "Drop Cap Settings");

        const dropCapModalWindow = new ModalButton(
            this.tester,
            id,
            ".modal.advanced-settings-dlg",
            ".modal.advanced-settings-dlg button[result=ok]"
        );
        await dropCapModalWindow.openModal();

        if (dropCap) {
            const { pos, font, rowHeight, distance } = dropCap;
            await this.#activateSection(DROPCAP.SECTION.DROPCAP);
            if (pos) {
                const positionSelector = DROPCAP.DROPCAP.POSITIONS[pos.toUpperCase()];
                const positionButton = new StateButton(this.tester, positionSelector);
                await positionButton.setState(true);
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
            await this.#activateSection(DROPCAP.SECTION.BORDERS);
            debugger;
            if (size) {
                const sizeDropdown = new Dropdown(this.tester, {
                    selector: DROPCAP.BORDER.SIZE,
                    elementsSelector: DROPCAP.BORDER.SIZE_VAL,
                    descriptionSelector: "span",
                });
                await sizeDropdown.selectDropdownItem(size);
            }
            if (borderColor) {
                await this.#setBorderColor(borderColor, DROPCAP.BORDER.COLOR);
            }
            if (borderLine) {
                const borderLineType = DROPCAP.BORDER.LINES[borderLine.toUpperCase()];
                const borderLineButton = new Button(this.tester, borderLineType);
                await borderLineButton.click();
            }
            if (backgroundColor) {
                await this.#setBorderColor(backgroundColor, DROPCAP.BORDER.BACKGROUND_COLOR);
            }
        }

        if (margins) {
            await this.#activateSection(DROPCAP.SECTION.MARGINS);
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

        await dropCapModalWindow.closeModal();
    }
}

module.exports = DropCap;
