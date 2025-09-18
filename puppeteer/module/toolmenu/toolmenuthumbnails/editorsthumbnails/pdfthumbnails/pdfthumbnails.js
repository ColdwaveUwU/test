const selectors = require("./selectors.json");
const { Dropdown, Checkbox } = require("../../../../elements");
class PDFThumbnails {
    constructor(tester) {
        this.tester = tester;
    }

    static SELECTORS = selectors;

    /**
     * Click inside thumbnail list
     */
    async clickThumbnailsMenu() {
        await this.tester.click(PDFThumbnails.SELECTORS.THUMB_MENU.MENU.THUNB_LIST);
    }

    /**
     * Sets thumbnails options
     * @param {{size: number | undefined, highlight: boolean | undefined}} options
     * @returns {Promise<void>}
     */
    async setThumbnailsOption(options) {
        const { SIZE, HIGHLIGHT, THUMB_BUTTON_SETTINGS, SETTINGS_MENU } = PDFThumbnails.SELECTORS.THUMB_MENU.OPTIONS;

        const dropdown = new Dropdown(this.tester, {
            selector: THUMB_BUTTON_SETTINGS,
            menuSelector: SETTINGS_MENU,
        });

        const actions = {
            size: async () => await this.tester.mouseClickInsideElement(SIZE, options.size, 0),
            highlight: async () => {
                const checkbox = new Checkbox(this.tester, HIGHLIGHT);
                await checkbox.set(options.highlight);
            },
        };

        for (const key of Object.keys(options)) {
            if (options[key] && actions[key]) {
                await dropdown.selectDropdown();
                await actions[key]();
            }
        }
    }
}

module.exports = PDFThumbnails;
