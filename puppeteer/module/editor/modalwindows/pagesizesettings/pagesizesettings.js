/**
 * @typedef PageSizeSettings
 * @property {string} type
 * @property {string} settings
 */
const { Dropdown, Input } = require("../../../elements");
const selectors = require("./selectors.json");

class PageSizeSettings {
    constructor(tester, pageSizeSettingsModal) {
        this.tester = tester;
        this.pageSizeSettingsModal = pageSizeSettingsModal;
    }

    static SELECTORS = selectors;

    static PRESETS = [
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
        "A0",
        "A1",
        "A2",
        "A7",
        "Custom",
    ];

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
        await this.pageSizeSettingsModal.openModal();     
        try {
            const { preset, width, height } = sizeOption;

            if (preset) {
                await this.#selectPreset(preset);
            }

            if (width) {
                await this.#setWidth(width);
            }

            if (height) {
                await this.#setHeight(height);
            }

            await this.clickOkButton();
        } catch (error) {
            this.#handleError("setCustomSize", error);
        }
    }

    /**
    * Selects a preset page size.
    * @param {PageSizePreset} preset - The name of the preset size.
    * @throws {Error} If the preset option is not found.
    */
    async #selectPreset(preset) {
        const presetDropdownSelectors = PageSizeSettings.SELECTORS.PRESET_DROPDOWN;
        try {
            const presetDropdown = new Dropdown(this.tester, {
                selector: presetDropdownSelectors.MENU_SELECTOR,
                elementsValue: PageSizeSettings.PRESETS,
                elementsSelector: presetDropdownSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                descriptionSelector: presetDropdownSelectors.DESCRIPTION_SELECTOR,
            }); 
            await presetDropdown.selectDropdownItem(preset);
        } catch (error) {
            this.#handleError("selectPreset", error);
        }
    }

    /**
     * Inputs a width value if provided.
     * @param {number | string | undefined} width - The width value.
     */
    async #setWidth(width) {
        const widthInputSelector = PageSizeSettings.SELECTORS.WIDTH_INPUT;
        try {
            const widthInput = new Input(this.tester, widthInputSelector);
            await widthInput.set(width);
        } catch (error) {
            this.#handleError("setWidth", error);
        }
    }

    /**
     * Inputs a height value if provided.
     * @param {number | string | undefined} height - The height value.
     */
    async #setHeight(height) {
        const heightInputSelector = PageSizeSettings.SELECTORS.HEIGHT_INPUT;
        try {
            const heightInput = new Input(this.tester, heightInputSelector);
            await heightInput.set(height);
        } catch (error) {
            this.#handleError("setHeight", error);
        }
    }

    /**
     * Clicks Ok button
     */
    async clickOkButton() {
        try {
            await this.pageSizeSettingsModal.closeModal(PageSizeSettings.SELECTORS.OK_BUTTON);
        } catch (error) {
            this.#handleError("clickOkButton", error);
        }
    }

    /**
     * Handles errors by throwing a new error with method name and original error message.
     * @param {string} methodName The name of the method where the error occurred.
     * @param {Error} error The original error object.
     */
    #handleError(methodName, error) {
        throw new Error(`PageSizeSettings.${methodName}: ${error.message}`, {
            cause: error,
        });
    }
}

module.exports = PageSizeSettings;
