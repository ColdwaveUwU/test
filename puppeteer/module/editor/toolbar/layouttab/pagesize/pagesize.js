const LayoutTab = require("../layouttab");
const { Dropdown, ModalButton } = require("../../../../elements");
const { PageSizeSettings } = require("../../../modalwindows");
const selectors = require("./selectors.json");
class PageSize extends LayoutTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static PAGE_SIZE_SELECTORS = selectors;

    /**
     * Templates page size
     * @enum
     */
    static TEMPLATES = [
        "US Letter",
        "US Legal",
        "A4",
        "A5",
        "B5",
        "Envelope #10",
        "Envelope DL",
        "Tabloid",
        "A3",
        "Tabloid Oversize",
        "ROC 16K",
        "Envelope Choukei 3",
        "Super B/A3",
        "Custom page size",
    ];

    #pageSizeDropdown = null;
    #pageSizeSettingsModal = null;
    #pageSizeSettings = null;

    get pageSizeDropdown() {
        if (!this.#pageSizeDropdown) {
            const setSizeSelectors = PageSize.PAGE_SIZE_SELECTORS.PAGE_SIZE_DROPDOWN;
            this.#pageSizeDropdown = new Dropdown(this.tester, {
                selector: setSizeSelectors.MENU_SELECTOR,
                elementsValue: PageSize.TEMPLATES,
                elementsSelector: setSizeSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                descriptionSelector: setSizeSelectors.DESCRIPTION_SELECTOR,
            });

        }
        return this.#pageSizeDropdown;
    }

    get pageSizeSettings() {
        if (!this.#pageSizeSettings && this.#pageSizeSettingsModal) {
            this.#pageSizeSettings = new PageSizeSettings(this.tester, this.#pageSizeSettingsModal);
        }
        return this.#pageSizeSettings;
    }

    /**
     * Sets the page size using a predefined template.
     * @param {string} pageSizeTemplateName - The name of the page size template.
     */
    async setSize(pageSizeTemplateName) {
        try {
            await this.pageSizeDropdown.selectDropdownItem(pageSizeTemplateName);
        } catch (error) {
            this.#handleError("setSize", error);
        }
    }

    #getPageSizeSettingsModal(selector) {
        if (!this.#pageSizeSettingsModal) {
            const pageSizeSettingsModalSelectors = PageSize.PAGE_SIZE_SELECTORS.MODAL_WINDOW;
            this.#pageSizeSettingsModal = new ModalButton(
                this.tester,
                selector,
                pageSizeSettingsModalSelectors.WINDOW,
                pageSizeSettingsModalSelectors.OK_BUTTON
            );
        }
        return this.#pageSizeSettingsModal;
    }

    /**
     * Opens 'Page size' modal
     */
    async openPageSizeSettings() {
        try {
            const { id } = await this.pageSizeDropdown.getDropdownItem("index", 14);
            const settingsModalWindow = this.#getPageSizeSettingsModal(id);
            await settingsModalWindow.openModal();
        } catch (error) {
            this.#handleError("openPageSizeSettings", error);
        }
    }

    /**
    * @typedef {"US Letter" | "US Legal" | "A4" | "A5" | "B5" |
    * "Envelope #10" | "Envelope DL" | "Tabloid" | "A3" | "Tabloid Oversize" |
    * "ROC 16K" | "Envelope Choukei 3" | "Super B/A3" | "A0" | "A1" | "A2" | "A7" | "Custom"} PageSizePreset
    */
    /**
    * Sets a custom page size.
    * @param {{preset: Readonly<PageSizePreset>,
    *          width: number | string | undefined,
    *          height: number | string | undefined}} sizeOption - The custom page size options.
    * @throws {Error} If the custom page size option is not found.
    */
    async setCustomSize(sizeOption) {
        await this.openPageSizeSettings();
        await this.pageSizeSettings.setCustomSize(sizeOption);
    }

    /**
     * Handles errors by throwing a new error with method name and original error message.
     * @param {string} methodName The name of the method where the error occurred.
     * @param {Error} error The original error object.
     */
    #handleError(methodName, error) {
        throw new Error(`PageSize.${methodName}: ${error.message}`, {
            cause: error,
        });
    }
}

module.exports = PageSize;
