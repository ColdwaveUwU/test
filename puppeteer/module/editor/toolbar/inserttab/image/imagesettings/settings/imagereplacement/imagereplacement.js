const path = require("path");
const { ImageInsert } = require("../../../imageinsert");
const { Dropdown, ModalButton, Input } = require("../../../../../../../elements");
const selectors = require("./selectors.json");

/**
 * Class representing the image replacement functionality.
 */
class ImageReplacement {
    /**
     * @param {TesterImp} tester - The Tester class
     * @param {BasicImageSettings} basicImageSettings - The basic image settings.
     */
    constructor(tester, basicImageSettings) {
        this.tester = tester || RegularTester;
        this.basicImageSettings = basicImageSettings;
    }

    static REPLACE_TYPE = {
        FILE: "From file",
        URL: "From URL",
        STORAGE: "From storage",
    };

    static SELECTORS = selectors;

    #replaceImageDropdown = null;

    #getReplaceImageDropdown() {
        if (!this.#replaceImageDropdown) {
            const { SELECTOR, ELEMENTS } = ImageReplacement.SELECTORS.REPLACE_IMAGE_DROPDOWN;
            this.#replaceImageDropdown = new Dropdown(this.tester, { selector: SELECTOR, elementsSelector: ELEMENTS });
        }
        return this.#replaceImageDropdown;
    }

    async #replaceFromFile(directoryPath, replaceFileDropdown, type) {
        try {
            const [fileChooser] = await Promise.all([
                this.tester.page.waitForFileChooser(),
                replaceFileDropdown.selectDropdownItem(type),
            ]);
            await fileChooser.accept([directoryPath]);
        } catch (error) {
            throw new Error(`#replaceFromFile: ${error.message}`, { cause: error });
        }
    }

    async #replaceFromUrl(url, replaceFileDropdown, type) {
        try {
            const imageInsert = new ImageInsert(this.tester);
            await imageInsert.initSelectors();
            const { INSERT_METHODS } = imageInsert.currentSelectors;

            const { id } = await replaceFileDropdown.getDropdownItem("description", type);
            const replaceModalWindow = new ModalButton(
                this.tester,
                id,
                INSERT_METHODS.FROM_URL.WINDOW,
                INSERT_METHODS.FROM_URL.OK_BUTTON
            );
            await replaceModalWindow.openModal();

            const FormInput = new Input(this.tester, INSERT_METHODS.FROM_URL.INPUT_FORM, false);
            await FormInput.set(url);
            await replaceModalWindow.closeModal();

            const loading = this.tester.page.waitForResponse((response) => response.ok());
            await loading;
        } catch (error) {
            throw new Error(`#replaceFromUrl: ${error.message}`, { cause: error });
        }
    }

    async #replaceFromStorage(replaceFileDropdown, type) {
        try {
            await replaceFileDropdown.selectDropdownItem(type);
        } catch (error) {
            throw new Error(`#replaceFromStorage: ${error.message}`, { cause: error });
        }
    }

    async replaceFile(sourceType, sourceValue = null) {
        try {
            const replaceFileDropdown = this.#getReplaceImageDropdown();
            const replaceTypes = ImageReplacement.REPLACE_TYPE;
            switch (sourceType) {
                case ImageInsert.LOAD_METHODS.FromFile:
                    const directoryPath = path.join(workDirectory, "files", "images", sourceValue);
                    await this.#replaceFromFile(directoryPath, replaceFileDropdown, replaceTypes.FILE);
                    break;
                case ImageInsert.LOAD_METHODS.FromUrl:
                    await this.#replaceFromUrl(sourceValue, replaceFileDropdown, replaceTypes.URL);
                    break;
                case ImageInsert.LOAD_METHODS.FromStorage:
                    await this.#replaceFromStorage(replaceFileDropdown, replaceTypes.STORAGE);
                    break;
                default:
                    throw new Error("Invalid source type specified. Use 'File', 'Url', or 'Storage'.");
            }
        } catch (error) {
            throw new Error(`replaceFile: ${error.message}`, { cause: error });
        }
    }
}

module.exports = ImageReplacement;
