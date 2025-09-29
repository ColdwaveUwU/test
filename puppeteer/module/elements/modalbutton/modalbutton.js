const UIElement = require("../uielement");
const selectors = require("./selectors.json");
const { createErrorHandler } = require("../../../engine/script/js/utils");

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
    /**
     * Selectors for the modal button
     */
    static SELECTORS = selectors;

    constructor(tester, selector, modalWindowSelector, closeButtonSelector, target = "frame") {
        super(tester, selector, target);
        this.modalWindowSelector = modalWindowSelector;
        this.closeButtonSelector = closeButtonSelector;
        this.handleError = createErrorHandler(this.constructor.name);
        this.target = target;
    }

    #modalId = null;

    /**
     * Waiting for modal windows to close
     * @param {number} [modalCounter]
     * @returns {Promise<import("puppeteer").HandleFor<ReturnType<Func>>>}
     */
    async waitModalWindowClosed() {
        if (!this.#modalId) {
            throw new Error("waitModalWindowClosed: modalId is not set. Cannot wait for closing.");
        }

        const modalId = this.#modalId;

        await this.context.waitForFunction(
            async (id) => {
                const el = document.getElementById(id);
                if (!el) return true;
                return !el.checkVisibility();
            },
            { polling: 100, timeout: 10000 },
            modalId
        );

        this.#modalId = null;
    }

    /**
     * Checks if the modal is open using the provided selector checker.
     * @param {"check"|"wait"} type - Type of check: "check" uses checkSelector, "wait" uses waitSelector
     * @returns {Promise<boolean>}
     */
    async #checkModalOpen(type = "check") {
        try {
            const selector = `${this.modalWindowSelector}.notransform`;
            const isOpen =
                type === "wait"
                    ? await this.tester.waitSelector(selector, this.target)
                    : await this.tester.checkSelector(selector, this.target);

            if (isOpen) {
                this.#modalId = await this.context.evaluate((sel) => {
                    const modal = document.querySelector(sel);
                    return modal ? modal.getAttribute("id") : null;
                }, selector);
            } else {
                this.#modalId = null;
            }

            return isOpen;
        } catch (error) {
            this.handleError("checkModalOpen", error, `Failed to ${type} if modal is open.`);
        }
    }

    async isModalOpen() {
        return await this.#checkModalOpen("check");
    }

    async waitModalLoaded() {
        return await this.#checkModalOpen("wait");
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
            const modalOpened = await this.waitModalLoaded();

            if (!modalOpened) {
                this.handleError("openModal", error, `Modal window ${this.modalWindowSelector} is not open.`);
            }
        } catch (error) {
            this.handleError("openModal", error, "Failed to open modal window.");
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
            if (!(await this.tester.checkSelector(this.modalWindowSelector, this.target))) {
                return;
            }
            const waitForModal = this.waitModalWindowClosed();
            await this.click(1, closeButtonSelector);
            await waitForModal;
        } catch (error) {
            this.handleError("closeModal", error, "Failed to close modal window.");
        }
    }

    /**
     * Resize window by changing CSS style properties
     * @param {number} newWidth - New width in pixels (or null to keep current)
     * @param {number} newHeight - New height in pixels (or null to keep current)
     * @param {string} containerSelector - The selector for the modal window's container element. Defaults to the instance's containerSelector.
     */
    async resizeWindow(newWidth = null, newHeight = null, containerSelector = ModalButton.SELECTORS.CONTAINER) {
        try {
            const element = await this.tester.frame.$(this.modalWindowSelector);
            if (!element) {
                this.handleError("resizeWindow", error, `Window not found: ${this.modalWindowSelector}`);
            }

            const currentSize = await this.getWindowSize();

            const targetWidth = newWidth !== null ? newWidth : currentSize.width;
            const targetHeight = newHeight !== null ? newHeight : currentSize.height;

            await element.evaluate(
                (el, width, height, containerSelector) => {
                    el.style.width = `${width}px`;
                    el.style.height = `${height}px`;

                    const bodyElement = el.querySelector(".body");
                    if (bodyElement) {
                        const headerElement = el.querySelector(".header");
                        const headerHeight = headerElement ? headerElement.offsetHeight : 35; // default header height
                        const bodyHeight = height - headerHeight;
                        bodyElement.style.height = `${bodyHeight}px`;

                        const containerElement = bodyElement.querySelector(containerSelector);
                        if (containerElement) {
                            const containerHeight = bodyHeight;
                            containerElement.style.height = `${containerHeight}px`;
                        }
                    }
                },
                targetWidth,
                targetHeight,
                containerSelector
            );
        } catch (error) {
            this.handleError("resizeWindow", error, "Failed to resize window.");
        }
    }

    /**
     * Move window to new position by changing CSS style properties
     * @param {number} newLeft - New left position in pixels (or null to keep current)
     * @param {number} newTop - New top position in pixels (or null to keep current)
     */
    async moveWindow(newLeft = null, newTop = null) {
        try {
            const element = await this.tester.frame.$(this.modalWindowSelector);
            if (!element) {
                this.handleError("moveWindow", error, `Window not found: ${this.modalWindowSelector}`);
            }

            const currentPosition = await this.getWindowPosition();
            const targetLeft = newLeft !== null ? newLeft : currentPosition.left;
            const targetTop = newTop !== null ? newTop : currentPosition.top;

            await element.evaluate(
                (el, left, top) => {
                    el.style.left = `${left}px`;
                    el.style.top = `${top}px`;
                },
                targetLeft,
                targetTop
            );
        } catch (error) {
            this.handleError("moveWindow", error, "Failed to move window.");
        }
    }

    /**
     * Get current window dimensions
     * @returns {Promise<{width: number, height: number}>}
     */
    async getWindowSize() {
        try {
            const element = await this.tester.frame.$(this.modalWindowSelector);
            if (!element) {
                this.handleError("getWindowSize", error, `Window not found: ${this.modalWindowSelector}`);
            }

            const boundingBox = await element.boundingBox();
            if (!boundingBox) {
                this.handleError("getWindowSize", error, "Could not get window bounding box");
            }

            return {
                width: Math.round(boundingBox.width),
                height: Math.round(boundingBox.height),
            };
        } catch (error) {
            this.handleError("getWindowSize", error, "Failed to get window size.");
        }
    }

    /**
     * Get current window position
     * @returns {Promise<{left: number, top: number}>}
     */
    async getWindowPosition() {
        try {
            const element = await this.tester.frame.$(this.modalWindowSelector);
            if (!element) {
                this.handleError("getWindowPosition", error, `Window not found: ${this.modalWindowSelector}`);
            }

            const boundingBox = await element.boundingBox();
            if (!boundingBox) {
                this.handleError("getWindowPosition", error, "Could not get window bounding box");
            }

            return {
                left: Math.round(boundingBox.x),
                top: Math.round(boundingBox.y),
            };
        } catch (error) {
            this.handleError("getWindowPosition", error, "Failed to get window position.");
        }
    }
}

module.exports = ModalButton;
