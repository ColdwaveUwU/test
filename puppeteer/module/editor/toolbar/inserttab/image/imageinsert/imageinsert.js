const selectors = require("./selectors.json");
const InsertTab = require("../../inserttab");
const path = require("path");
const { ModalButton, Input } = require("../../../../../elements");
class ImageInsert extends InsertTab {
    constructor(tester) {
        super(tester);
    }

    #currentSelectors = null;

    /**
     * @enum
     */
    static LOAD_METHODS = {
        FromFile: "File",
        FromUrl: "Url",
        FromStorage: "Storage",
    };

    /**
     * @enum
     */
    static INSERT_IMAGE_SELECTORS = selectors;

    /**
     * Returns the current selectors based on the editor type.
     * @throws {Error}
     * @returns {Object}
     */
    get currentSelectors() {
        if (!this.#currentSelectors) {
            throw new Error("Editor selectors not initialized. Call _ensureSelectorsInitialized() first.");
        }
        return this.#currentSelectors;
    }

    /**
     * Initializes the selectors based on the current editor type.
     */
    async initSelectors() {
        try {
            if (!this.#currentSelectors) {
                const editorType = this.tester.getEditorType();
                this.#currentSelectors =
                    editorType === "slide"
                        ? ImageInsert.INSERT_IMAGE_SELECTORS.PPTX
                        : ImageInsert.INSERT_IMAGE_SELECTORS.OTHER_EDITORS;
                this.targetButton = this.#currentSelectors.INSERT_IMAGE_BUTTON;
            }
        } catch (error) {
            throw new Error(`initSelectors: ${error.message}`, { cause: error });
        }
    }

    /**
     * Clicks the insert image button.
     */
    async clickInsertImage() {
        try {
            await this.initSelectors();
            await this.clickTargetButton();
        } catch (error) {
            throw new Error(`clickInsertImage: ${error.message}`, { cause: error });
        }
    }

    /**
     * Handle for file upload method
     * @param {string} filePath
     * @param {typeof ImageInsert.INSERT_IMAGE_SELECTORS.INSERT_METHODS.FROM_FILE} fromFileSelectors
     */
    async #handleFileUpload(filePath, fromFileSelectors) {
        try {
            const page = this.tester.getPage();
            const loading = page.waitForResponse((response) => response.ok());
            const [fileChooser] = await Promise.all([
                this.tester.page.waitForFileChooser(),
                this.tester.click(fromFileSelectors.FROM_FILE_BUTTON),
            ]);
            await fileChooser.accept([filePath]);
            await loading;
        } catch (error) {
            throw new Error(`handleFileUpload: ${error.message}`, { cause: error });
        }
    }

    /**
     *Handle for from url method
     * @param {string} url
     * @param {typeof ImageInsert.INSERT_IMAGE_SELECTORS.INSERT_METHODS.FROM_URL} fromUrlSelectors
     */
    async #handleUrlInput(url, fromUrlSelectors) {
        try {
            const modalUrlForm = new ModalButton(
                this.tester,
                fromUrlSelectors.FROM_URL_BUTTON,
                fromUrlSelectors.WINDOW,
                fromUrlSelectors.OK_BUTTON
            );
            const inputUrlForm = new Input(this.tester, fromUrlSelectors.INPUT_FORM, false);
            const page = this.tester.getPage();
            await modalUrlForm.openModal();
            await inputUrlForm.set(url);
            const loading = page.waitForResponse((response) => response.ok());
            await modalUrlForm.closeModal();
            await loading;
            if (await this.tester.checkSelector(fromUrlSelectors.ERROR_ELEMENT)) {
                throw new Error("Incorrect URL. The cancel button was pressed.");
            }
        } catch (error) {
            throw new Error(`handleUrlInput: ${error.message}`, { cause: error });
        }
    }

    /**
     * Handle for from storage method
     * @param {typeof ImageInsert.INSERT_IMAGE_SELECTORS.INSERT_METHODS.FROM_STORAGE} fromStorageSelectors
     */
    async #handleStorageSelection(fromStorageSelectors) {
        try {
            await this.tester.click(fromStorageSelectors.FROM_STORAGE_BUTTON);
        } catch (error) {
            throw new Error(`handleStorageSelection: ${error.message}`, { cause: error });
        }
    }

    /**
     * Load image file to editor
     * @param {"File" | "Url" | "Storage"} sourceType
     * @param {string} sourceValue - input value
     */
    async loadFile(sourceType, sourceValue = null) {
        try {
            const loadFileMethod = ImageInsert.LOAD_METHODS;
            await this.clickInsertImage();
            const { INSERT_METHODS, IMAGE_RIGHT_MENU } = this.#currentSelectors;
            switch (sourceType) {
                case loadFileMethod.FromFile:
                    const directoryPath = path.join(workDirectory, "files", "images", sourceValue);
                    await this.#handleFileUpload(directoryPath, INSERT_METHODS.FROM_FILE);
                    break;
                case loadFileMethod.FromUrl:
                    await this.#handleUrlInput(sourceValue, INSERT_METHODS.FROM_URL);
                    break;
                case loadFileMethod.FromStorage:
                    await this.#handleStorageSelection(INSERT_METHODS.FROM_STORAGE);
                    break;
                default:
                    throw new Error("Invalid source type specified. Use 'File', 'Url', or 'Storage'.");
            }
            await this.tester.frame.waitForFunction(
                (rightMenuImageSelector) => {
                    const el = document.querySelector(rightMenuImageSelector);
                    return el && !el.classList.contains("disabled");
                },
                {},
                IMAGE_RIGHT_MENU.IMAGE_BUTTON
            );
        } catch (error) {
            throw new Error(`loadFile: ${error.message}`, { cause: error });
        }
    }
}

module.exports = ImageInsert;
