const UIElement = require("../uielement");

/**
 * Represents a UI element that acts as a button to open and close a modal window.
 * Extends the UIElement class and provides methods to interact with modal dialogs.
 *
 * @class
 * @extends UIElement
 *
 * @param {object} tester - The tester instance used for UI interactions.
 * @param {string} selector - The selector for the button element.
 * @param {string} modalWindowSelector - The selector for the modal window element.
 * @param {string} closeButtonSelector - The selector for the modal window's close button.
 * @param {string} [target="frame"] - The target frame or context for the element.
 */
class ModalButton extends UIElement {
    constructor(tester, selector, modalWindowSelector, closeButtonSelector, target = "frame") {
        super(tester, selector, target);
        this.modalWindowSelector = modalWindowSelector;
        this.closeButtonSelector = closeButtonSelector;
    }

    #modalIndex = null;

    /**
     * Checks if the modal window is currently open by verifying the presence of the modal selector.
     * @returns {Promise<boolean>} Resolves to true if the modal is open, otherwise false.
     * @throws {Error} Throws an error if the check fails.
     */
    async isModalOpen() {
        try {
            const isOpen = await this.tester.checkSelector(this.modalWindowSelector);
            this.#modalIndex = isOpen ? await this.tester.getModalCounter() : null;
            return isOpen;
        } catch (error) {
            throw new Error(`ModalButton.isModalOpen: Failed to check if modal is open. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Attempts to open the modal window associated with this button.
     * @async
     * @throws {Error} If the modal window cannot be opened or if an unexpected error occurs.
     * @returns {Promise<void>} Resolves when the modal is open or already open.
     */
    async openModal() {
        try {
            if (await this.isModalOpen()) {
                return;
            }
            await this.click();
            const modalOpened = await this.isModalOpen();

            if (!modalOpened) {
                throw new Error(`Modal window ${this.modalWindowSelector} is not open`);
            }
        } catch (error) {
            throw new Error(`ModalButton.openModal: Failed to open modal window. ${error.message}`, { cause: error });
        }
    }

    /**
     * Closes the modal window if it is currently open.
     * @async
     * @param {string} [closeButtonSelector=this.closeButtonSelector] - The selector for the close button. Defaults to the instance's closeButtonSelector.
     * @returns {Promise<void>} Resolves when the modal window has been closed.
     * @throws {Error} If closing the modal window fails.
     */
    async closeModal(closeButtonSelector = this.closeButtonSelector) {
        try {
            if (!(await this.tester.checkSelector(this.modalWindowSelector))) {
                this.#modalIndex = null;
                return;
            }
            const waitForModal = this.tester.waitModalWindowClosed(this.#modalIndex);
            await this.tester.click(closeButtonSelector);
            await waitForModal;
            this.#modalIndex = null;
        } catch (error) {
            throw new Error(`ModalButton.closeModal: Failed to close modal window. ${error.message}`, { cause: error });
        }
    }
}

module.exports = ModalButton;
