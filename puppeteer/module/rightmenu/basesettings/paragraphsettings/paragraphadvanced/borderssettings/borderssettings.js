const BaseSettings = require("../../../basesettings");
const { Dropdown } = require("../../../../../elements");
const { Color } = require("../../../../../common");
const selectors = require("./selectors.json");

class BordersSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
        this.color = new Color(this.tester);
    }

    /**
     * @enum
     */
    static BORDERS_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        BORDERS_SIZES: ["No borders", "0.5 pt", "1 pt", "1.5 pt", "2.25 pt", "3 pt", "4.5 pt", "6 pt"],
    };

    /**
     * Sets the border size
     * @param {
     *   "No borders" |
     *   "0.5 pt" |
     *   "1 pt" |
     *   "1.5 pt" |
     *   "2.25 pt" |
     *   "3 pt" |
     *   "4.5 pt" |
     *   "6 pt"
     * } size - The border size to set
     */
    async setBorderSize(size) {
        const borderSizeMenuSelectors = BordersSettings.BORDERS_SELECTORS.BORDER_SIZE_MENU;
        const borderSizeDropdown = new Dropdown(this.tester, {
            selector: borderSizeMenuSelectors.MENU_SELECTOR,
            elementsValue: BordersSettings.TYPES.BORDERS_SIZES,
            elementsSelector: borderSizeMenuSelectors.DROPDOWN_ELEMENTS_SELECTOR,
        });

        await borderSizeDropdown.selectDropdownItem(size);
    }

    /**
     * Sets border color
     * @param {Color} color
     */
    async setBorderColor(color) {
        const dropdownSelector = BordersSettings.BORDERS_SELECTORS.BORDER_COLOR_BUTTON;
        await this.tester.click(dropdownSelector);
        await this.color.selectColor(dropdownSelector, color);
    }

    /**
     * Sets the border type by click on button
     * @param {
     *   "Top" |
     *   "Inner" |
     *   "Bottom" |
     *   "Outer" |
     *   "Left" |
     *   "All" |
     *   "Right" |
     *   "No"
     * } type - The border type to set
     */
    async setBorderType(type) {
        const borderButtonSelector = (type) => BordersSettings.BORDERS_SELECTORS[`${type.toUpperCase()}_BORDER_BUTTON`];
        await this.tester.click(borderButtonSelector(type));
    }

    /**
     * Sets background color
     * @param {Color} color
     */
    async setBackgroundColor(color) {
        const dropdownSelector = BordersSettings.BORDERS_SELECTORS.BACKGROUND_COLOR_BUTTON;
        await this.tester.click(dropdownSelector);
        await this.color.selectColor(dropdownSelector, color);
    }

    async applySettings(bordersSettings) {
        const settingsMap = {
            borderSize: this.setBorderSize.bind(this),
            borderColor: this.setBorderColor.bind(this),
            borderType: this.setBorderType.bind(this),
            backgroundColor: this.setBackgroundColor.bind(this),
        };

        for (const [key, method] of Object.entries(settingsMap)) {
            if (bordersSettings[key]) {
                await method(bordersSettings[key]);
            }
        }
    }
}

module.exports = BordersSettings;
