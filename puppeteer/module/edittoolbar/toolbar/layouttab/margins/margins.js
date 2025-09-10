const LayoutTab = require("../layouttab");
const { Input } = require("../../../../elements");

class Margins extends LayoutTab {
    constructor(tester) {
        super(tester, "span#slot-btn-pagemargins div button");
    }

    static SELECTORS = {
        DROPDOWN_MENU: {
            DEFAULT_MARGIN: "ul.dropdown-menu.menu-margins li a div",
            CUSTOM_MARGIN: "ul.dropdown-menu.menu-margins li:nth-child(7) > a",
        },
        CUSTOM_MARGIN_MODAL: "#window-page-margins",
        MULTIPLE_PAGES_DROPDOWN: "#page-margins-cmb-multiple-pages",
        ORIENTATION_DROPDOWN: "#page-margins-cmb-orientation",
        GUTTER_VALUE_INPUT: "#page-margins-spin-gutter",
        GUTTER_POSITION_DROPDOWN: "#page-margins-spin-gutter-position",
        MODAL_FOOTER_BUTTON: ".footer button",
        MODALS_MASK: '.modals-mask[counter="0"]',
        INPUT_FIELDS: {
            TOP: "#page-margins-spin-top",
            BOTTOM: "#page-margins-spin-bottom",
            LEFT: "#page-margins-spin-left",
            RIGHT: "#page-margins-spin-right",
            INSIDE: "#page-margins-spin-left",
            OUTSIDE: "#page-margins-spin-right",
        },
        DROPDOWN_TEXT_SELECTOR: ".dropdown-menu.ps-container.oo li a",
    };

    /**
     * Sets the page margin by selecting the specified margin name from the dropdown menu.
     * @param {"Last Custom" | "Normal" | "Narrow" | "Moderate" | "Wode" | "Custom margins"} marginName - The name of the margin to select
     */
    async #selectMarginDropdownOption(marginName) {
        try {
            const selector =
                marginName === "Custom margins"
                    ? Margins.SELECTORS.DROPDOWN_MENU.CUSTOM_MARGIN
                    : Margins.SELECTORS.DROPDOWN_MENU.DEFAULT_MARGIN;
            await this.clickTargetButton();
            await this.tester.selectByText(marginName, selector);
        } catch (error) {
            throw new Error(`Error, wrong option name: ${marginName}`, { cause: error });
        }
    }

    /**
     * Get custom margin options by multiPage
     * @param {"Normal" | "Mirror margins"} multiPage
     * @returns {{top: string, bottom: string, left: string, right: string} | {top: string, bottom: string, inside: string, outside: string}}
     */
    #getCustomMarginSettingSelectors(multiPage) {
        const { INPUT_FIELDS } = Margins.SELECTORS;
        const commonSelectors = {
            top: INPUT_FIELDS.TOP,
            bottom: INPUT_FIELDS.BOTTOM,
        };

        const additionalSelectors = {
            Normal: {
                left: INPUT_FIELDS.LEFT,
                right: INPUT_FIELDS.RIGHT,
            },
            "Mirror margins": {
                inside: INPUT_FIELDS.INSIDE,
                outside: INPUT_FIELDS.OUTSIDE,
            },
        };

        return { ...commonSelectors, ...(additionalSelectors[multiPage] || {}) };
    }

    /**
     * Set margin option by margin templates
     * @param {"Last Custom" | "Normal" | "Narrow" | "Moderate" | "Wode"} marginName
     */
    async setMargin(marginName) {
        try {
            await this.#selectMarginDropdownOption(marginName);
        } catch (error) {
            throw new Error(`Error in setMargin function: ${error.message}`, { cause: error });
        }
    }

    /**
     * Sets custom margins and other page settings.
     * @param {{margins: {top: string, bottom: string, left: string, right: string}, gutterPos: {value: string, pos: string},
     *          orientation: string, multiPage: string}} customSettings
     */
    async setCustomMargin(customSettings) {
        try {
            await this.#selectMarginDropdownOption("Custom margins");
            const modalSelector = Margins.SELECTORS.CUSTOM_MARGIN_MODAL;
            const isModalOpen = await this.tester.checkSelector(modalSelector);
            if (!isModalOpen) {
                throw new Error("Error in setCustomMargin: Custom margin modal is not open");
            }

            const selectFromDropdown = async (dropdownMenuSelector, dropdownText) => {
                const selectSpan = `${dropdownMenuSelector} span`;
                await this.tester.selectDropdown(selectSpan);
                await this.tester.selectByText(dropdownText, Margins.SELECTORS.DROPDOWN_TEXT_SELECTOR);
            };

            const defaultMultiPage = await this.tester.getTextElement(
                `${Margins.SELECTORS.MULTIPLE_PAGES_DROPDOWN} .input-group > input`,
                "value"
            );
            const { margins, gutterPos, orientation, multiPage = defaultMultiPage } = customSettings;

            if (defaultMultiPage !== multiPage) {
                await selectFromDropdown(Margins.SELECTORS.MULTIPLE_PAGES_DROPDOWN, multiPage);
            }

            if (margins) {
                const selectors = this.#getCustomMarginSettingSelectors(multiPage);
                for (const [key, selector] of Object.entries(selectors)) {
                    if (margins[key] !== undefined) {
                        const marginInput = new Input(this.tester, selector);
                        await marginInput.set(margins[key]);
                    }
                }
            }

            if (orientation) {
                await selectFromDropdown(Margins.SELECTORS.ORIENTATION_DROPDOWN, orientation);
            }

            if (gutterPos) {
                const { value, pos } = gutterPos;
                if (value) {
                    const gutterInput = new Input(this.tester, Margins.SELECTORS.GUTTER_VALUE_INPUT);
                    await gutterInput.set(value);
                }

                if (pos && multiPage === "Normal") {
                    await selectFromDropdown(Margins.SELECTORS.GUTTER_POSITION_DROPDOWN, pos);
                }
            }

            await Promise.all([
                this.tester.selectByText("OK", Margins.SELECTORS.MODAL_FOOTER_BUTTON),
                this.tester.checkSelector(Margins.SELECTORS.MODALS_MASK),
            ]);
        } catch (error) {
            throw new Error(`Error in setCustomMargin function ${error.message}`, { cause: error });
        }
    }
}

module.exports = Margins;
