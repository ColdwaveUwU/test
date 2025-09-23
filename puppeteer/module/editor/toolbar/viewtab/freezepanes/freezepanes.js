const ViewTab = require("../viewtab");
const selectors = require("./selectors.json");
const { OptionsButton } = require("../../../../elements");

/**
 * Class for interacting with the "Freeze Panes" button
 * in the View tab of a spreadsheet editor.
 * Extends the base ViewTab functionality.
 */
class FreezePanes extends ViewTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * @enum {Object} TYPES
     * List of possible options in the "Freeze Panes" dropdown menu.
     */
    static TYPES = {
        FREEZE_PANES: ["Freeze Panes", "Freeze top row", "Freeze first column", "Show frozen panes shadow"],
    };

    /**
     * Checks whether a given option in the "Freeze Panes" dropdown is currently selected (checked).
     *
     * @private
     * @param {string} name - The name of the freeze pane option to check.
     * @returns {Promise<boolean>} True if the option is selected; otherwise, false.
     */
    async #isChecked(name) {
        const items = await this.tester.parseItems(FreezePanes.SELECTORS.FREEZE_PANES.DROPDOWN_ELEMENTS_SELECTOR, "a");

        const target = Array.from(items).find((el) => {
            const text = el?.description || "";
            return text.trim() === name;
        });

        return target.className.includes(".checked");
    }

    /**
     * Sets the "Freeze Panes" option in the dropdown menu.
     *
     * @param {string} optionValue - The name of the freeze pane option to select.
     * @throws {Error} If the freeze pane option is not found or an error occurs during selection.
     */
    async setFreezePanes(optionValue) {
        const freezePanesSelectors = FreezePanes.SELECTORS.FREEZE_PANES;
        const freezePanesButton = new OptionsButton(
            this.tester,
            freezePanesSelectors.ELEMENT_SELECTOR,
            freezePanesSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: freezePanesSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: FreezePanes.TYPES.FREEZE_PANES,
            }
        );
        try {
            await freezePanesButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`setFreezepanes: Failed to set freeze panes ${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Sets the "Freeze Panes" option.
     */
    async FreezePanes() {
        await this.setFreezePanes("Freeze Panes");
    }

    /**
     * Sets the "Unfreeze Panes" option.
     */
    async UnfreezePanes() {
        await this.setFreezePanes("Freeze Panes");
    }

    /**
     * Sets the "Freeze top row" option.
     */
    async FreezeTopRow() {
        await this.setFreezePanes("Freeze top row");
    }

    /**
     * Sets the "Freeze first column" option.
     */
    async FreezeFirstColumn() {
        await this.setFreezePanes("Freeze first column");
    }

    /**
     * Toggles the "Show frozen panes shadow" option.
     *
     * @param {boolean} condition - The desired state of the option (true for checked, false for unchecked).
     * @throws {Error} If the option is not found or an error occurs during selection.
     */
    async ShowFrozenPanesShadow(condition) {
        const name = "Show frozen panes shadow";
        const isChecked = await this.#isChecked(name);
        if (isChecked !== condition) {
            await this.setFreezePanes(name);
        }
    }
}

module.exports = FreezePanes;
