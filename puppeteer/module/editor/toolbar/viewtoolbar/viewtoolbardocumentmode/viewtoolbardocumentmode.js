const selectors = require("./selectors.json");
const { Dropdown } = require("../../../../elements");
class ViewToolbarDocumentMode {
    constructor(tester = RegularTester) {
        this.tester = tester;
    }

    static SELECTORS = selectors;

    #dropdown = null;
    #modes = {
        EDIT: "Editing",
        VIEWING: "Viewing",
        REVIEWING: "Reviewing",
    };
    #getDocumentModeDropdown() {
        if (!this.#dropdown) {
            const { SELECTOR, ELEMENTS, DESCRIPTION } = ViewToolbarDocumentMode.SELECTORS;
            this.#dropdown = new Dropdown(this.tester, {
                selector: SELECTOR,
                elementsSelector: ELEMENTS,
                descriptionSelector: DESCRIPTION,
            });
        }
        return this.#dropdown;
    }
    /**
     * Toggles the view mode.
     * @param {Editing | Reviewing | Viewing} mode - editing mode
     * @returns {Promise<void>}
     * @throws {Error} If the specified mode is not found.
     */
    async #toggleViewMode(mode) {
        const docModeDropdown = this.#getDocumentModeDropdown();
        await docModeDropdown.selectDropdownItem(mode);
    }

    /**
     * Clicks Review mode button
     * @return {Promise<void>}
     */
    async toggleReviewingMode() {
        await this.#toggleViewMode(this.#modes.REVIEWING);
    }

    /**
     * Clicks Vewing mode button
     * @return {Promise<void>}
     */
    async toggleViewingMode() {
        await this.#toggleViewMode(this.#modes.VIEWING);
    }

    /**
     * Clicks Edit mode button
     * @return {Promise<void>}
     */
    async toggleEditMode() {
        await this.#toggleViewMode(this.#modes.EDIT);
    }
}

module.exports = ViewToolbarDocumentMode;
