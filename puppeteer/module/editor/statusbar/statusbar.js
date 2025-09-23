const { Input, Dropdown } = require("../../elements");
const selectors = require("./selectors.json");
class StatusBar {
    constructor(tester = RegularTester) {
        this.tester = tester;
    }

    static STATUS_BAR_SELECTORS = selectors;

    /**
     * Set target page in StatusBar
     * @param {number} pageNumber
     * @returns {Promise<void>}
     */
    async goToPage(pageNumber) {
        try {
            const GO_TO_PAGE_SELECTOR = StatusBar.STATUS_BAR_SELECTORS.GO_TO_PAGE;

            const countPages = await this.getCountPages();
            if (countPages < pageNumber + 1) {
                throw new Error("The page index value is out of range of the number of pages");
            }

            const goToPageDropdown = new Dropdown(this.tester, {
                selector: GO_TO_PAGE_SELECTOR.GO_TO_PAGE_DROPDOWN,
                menuSelector: GO_TO_PAGE_SELECTOR.GO_TO_PAGE_DROPDOWN_MENU,
            });
            await goToPageDropdown.selectDropdown();
            const waitGoToPage = this.tester.frame.waitForFunction(
                (pageNumber) => {
                    return pageNumber === window.Asc.editor.getCurrentPage() + 1;
                },
                {},
                pageNumber
            );
            const inputPageForm = new Input(this.tester, GO_TO_PAGE_SELECTOR.GO_TO_PAGE_INPUT_FORM, true);
            await inputPageForm.set(pageNumber);
            await waitGoToPage;
        } catch (error) {
            throw new Error(`goToPage: Failed to go to page. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Get count pages in editor
     * @returns {Promise<number>}
     */
    async getCountPages() {
        try {
            return await this.tester.frame.evaluate(() => window.Asc.editor.getCountPages());
        } catch (error) {
            throw new Error(`getCountPages: Failed to get pages count. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Get current page number
     * @returns {Promise<number>}
     */
    async getCurrentPage() {
        try {
            return await this.tester.frame.evaluate(() => window.Asc.editor.getCurrentPage() + 1);
        } catch (error) {
            throw new Error(`getCurrentPage: Failed to get current page number. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = StatusBar;
