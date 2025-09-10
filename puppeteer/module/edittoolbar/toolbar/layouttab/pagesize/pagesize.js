const LayoutTab = require("../layouttab");
const selectors = require("./selectors.json");
class PageSize extends LayoutTab {
    constructor(tester) {
        super(tester, PageSize.PAGE_SIZE_SELECTORS.TOOLBAR.PAGE_SIZE_BUTTON);
    }

    /**
     * @enum
     */
    static PAGE_SIZE_SELECTORS = selectors;

    /**
     * Templates page size
     * @enum
     */
    static TEMPLATE = Object.freeze([
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
    ]);

    /**
     * Custom template page size
     * @enum
     */
    static CUSTOM = Object.freeze(["Custom page size"]);

    /**
     * Presets list
     * @enum
     */
    static PRESET = Object.freeze([...PageSize.TEMPLATE, "A0", "A1", "A2", "A7", "Custom"]);

    /**
     * Settings page size names
     * @enum
     */
    static SIZE_NAMES = Object.freeze({
        TEMPLATE: PageSize.TEMPLATE,
        CUSTOM: PageSize.CUSTOM,
        PRESET: PageSize.PRESET,
    });

    /**
     * Sets the page size using a predefined template.
     * @param {string} pageSizeTemplateName - The name of the page size template.
     */
    async setSize(pageSizeTemplateName) {
        await this.clickTargetButton();
        const setSizeSelectors = PageSize.PAGE_SIZE_SELECTORS.TOOLBAR.PAGE_SIZE_DROPDOWN;
        this.#validatePageSize(pageSizeTemplateName, PageSize.SIZE_NAMES.TEMPLATE);

        const item = await this.#getDropdownItem(
            {
                listSelector: setSizeSelectors.LIST_SELECTOR,
                itemSelector: setSizeSelectors.ITEM_SELECTOR,
                descriptionSelector: setSizeSelectors.DESC_SELECTOR,
            },
            pageSizeTemplateName
        );
        await this.tester.click(item.id);
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
        await this.clickTargetButton();
        const customSizeSelectors = {
            ...PageSize.PAGE_SIZE_SELECTORS.MODAL_WINDOW,
            ...PageSize.PAGE_SIZE_SELECTORS.TOOLBAR,
        };
        const waitPageSizeWindow = this.tester.checkSelector(customSizeSelectors.PAGE_SIZE_WINDOW);
        const customItem = await this.#getDropdownItem(
            { listSelector: customSizeSelectors.PAGE_SIZE_DROPDOWN.LIST_SELECTOR },
            PageSize.SIZE_NAMES.CUSTOM[0]
        );
        await this.tester.click(customItem.id);
        await waitPageSizeWindow;

        const { preset, width, height } = sizeOption;

        if (preset) {
            this.#validatePageSize(preset, PageSize.SIZE_NAMES.PRESET);
            await this.#selectPreset(preset);
        }

        await this.#inputSize(width, customSizeSelectors.WIDTH_INPUT);
        await this.#inputSize(height, customSizeSelectors.HEIGHT_INPUT);

        await this.tester.click(customSizeSelectors.APPLY_BUTTON);
        await this.tester.waitModalWindowClosed();
    }

    /**
     * Selects a preset page size.
     * @param {string} preset - The name of the preset size.
     * @throws {Error} If the preset option is not found.
     */
    async #selectPreset(preset) {
        const selectPresetSelectors = PageSize.PAGE_SIZE_SELECTORS.MODAL_WINDOW.PRESET_DROPDOWN;

        await this.tester.selectDropdown(selectPresetSelectors.BUTTON);
        const presetItem = await this.#getDropdownItem(
            { listSelector: selectPresetSelectors.LIST_SELECTOR, itemSelector: selectPresetSelectors.ITEM_SELECTOR },
            preset
        );

        await this.tester.click(presetItem.id);
    }

    /**
     * Inputs a size value if provided.
     * @param {number} value - The size value.
     * @param {string} inputSelector - The input field selector.
     */
    async #inputSize(value, inputSelector) {
        if (value !== undefined) {
            await this.tester.inputToForm(value, inputSelector);
        }
    }

    /**
     * Validates if a given value is in the allowed list.
     * @param {string} value - The value to validate.
     * @param {string[]} validValues - The list of allowed values.
     * @throws {Error} If the value is invalid.
     */
    #validatePageSize(value, validValues) {
        if (!validValues.includes(value)) {
            throw new Error(`Invalid page size '${value}'. Allowed values: ${validValues.join(", ")}`);
        }
    }

    /**
     * Finds an item in a dropdown menu by its description.
     * @param {{listSelector: string,
     *          itemSelector: string | undefined,
     *          descriptionSelector: string | undefined}} dropdownItemsSelectors - The object with CSS selector for the dropdown menu.
     * @param {string} [targetDescription] - The item description to find.
     * @returns {Promise<{id: string, description: string, count: number, index: number}>}
     * @throws {Error} If the item is not found.
     */
    async #getDropdownItem(
        dropdownItemsSelectors = { listSelector: "", itemSelector: "", descriptionSelector: "" },
        targetDescription = ""
    ) {
        const items = await this.tester.parseItems(...Object.values(dropdownItemsSelectors));

        if (!Array.isArray(items) || items.length === 0) {
            throw new Error(`Page size items not found: ${dropdownItemsSelectors}`);
        }

        const item = items.find(({ description }) => description === targetDescription);
        if (!item) {
            throw new Error(`Page size '${targetDescription}' not found in parsed items`);
        }

        return item;
    }
}

module.exports = PageSize;
