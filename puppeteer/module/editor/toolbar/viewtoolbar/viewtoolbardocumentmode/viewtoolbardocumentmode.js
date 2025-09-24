const { ViewToolbarDocumentModeSelectors } = require("../../../../../constants");

class ViewToolbarDocumentMode {
    static Modes = {
        EDIT: "Editing",
        VIEWING: "Viewing",
        REVIEWING: "Reviewing",
    };

    constructor(tester = RegularTester) {
        this.tester = tester;
        this.editingModes = null;
    }

    /**
     * Retrieves available editing modes.
     * @returns {Promise<Array<{ description: string, count: number, index: number, id: string }>>}
     */
    async #getEditingModes() {
        const { MODE_LIST, ITEM, MODE_DESCRIPTION } = ViewToolbarDocumentModeSelectors.EDITING_MODE;
        return await this.tester.parseItems(MODE_LIST, ITEM, MODE_DESCRIPTION);
    }

    /**
     * Checks if the editing button is active and retrieves editing modes if not cached.
     * @returns {Promise<boolean>} element activity status
     */
    async #isActive() {
        const isActive = await this.tester.checkSelector(
            `${ViewToolbarDocumentModeSelectors.EDITING_BUTTON} > div.active`
        );

        if (isActive && this.editingModes === null) {
            this.editingModes = await this.#getEditingModes();
        }

        return isActive;
    }

    /**
     * Finds the ID of the specified editing mode.
     * @param {string} mode - The mode to find
     * @returns {string | undefined} The ID of the mode, or undefined if not found
     */
    #findModeId(mode) {
        const modeEntry = this.editingModes.find((editMode) => editMode.description === mode);
        return modeEntry ? modeEntry.id : undefined;
    }

    /**
     * Toggles the view mode.
     * @param {string} mode - editing mode
     * @returns {Promise<void>}
     * @throws {Error} If the specified mode is not found.
     */
    async #toggleViewMode(mode) {
        const [isOpen] = await Promise.all([
            this.#isActive(),
            this.tester.click(ViewToolbarDocumentModeSelectors.EDITING_BUTTON),
        ]);

        if (isOpen) {
            const elementId = this.#findModeId(mode);

            if (elementId) {
                await this.tester.click(elementId);
            } else {
                throw new Error(`Mode "${mode}" not found.`);
            }
        }
    }

    /**
     * Clicks Review mode button
     * @return {Promise<void>}
     */
    async toggleReviewingMode() {
        await this.#toggleViewMode(ViewToolbarDocumentMode.Modes.REVIEWING);
    }

    /**
     * Clicks Vewing mode button
     * @return {Promise<void>}
     */
    async toggleViewingMode() {
        await this.#toggleViewMode(ViewToolbarDocumentMode.Modes.VIEWING);
    }

    /**
     * Clicks Edit mode button
     * @return {Promise<void>}
     */
    async toggleEditMode() {
        await this.#toggleViewMode(ViewToolbarDocumentMode.Modes.EDIT);
    }
}

module.exports = ViewToolbarDocumentMode;
