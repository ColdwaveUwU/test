const LayoutTab = require("../layouttab");
const { Dropdown } = require("../../../../elements");
const selectors = require("./selectors.json");
const colorsOptions = require("./colorsoptions.json");

class ColorsLayout extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static COLORS_SELECTORS = selectors;

    /**
     * @enum
     */
    static COLORS_OPTIONS = colorsOptions;

    /**
     * Select color theme from dropdown menu
     * @param {string} [colorTheme]
     */
    async setColorTheme(colorTheme) {

        const colorsMenuSelectors = ColorsLayout.COLORS_SELECTORS.COLORS_MENU;
        try {
            const colorsDropdown = new Dropdown(this.tester, {
                selector: colorsMenuSelectors.MENU_SELECTOR,
                elementsValue: ColorsLayout.COLORS_OPTIONS,
                elementsSelector: colorsMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                descriptionSelector: colorsMenuSelectors.DESCRIPTION_SELECTOR,
            });

            await colorsDropdown.selectDropdownItem(colorTheme);
        } catch (error) {
            throw new Error(`setColorTheme: Failed to select color theme option "${colorTheme}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = ColorsLayout;
