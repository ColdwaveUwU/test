const ProviderAddon = require("../../engine/provider_addon");

class WopiProvider extends ProviderAddon {
    constructor(tester) {
        super();
        this.tester = tester;
    }

    /**
     * Creates the URL to open a file in the editor.
     * @param {string} filename - The name of the file.
     * @returns {string} The constructed URL.
     */
    #createFileUrl(filename) {
        return `${this.tester.url}/wopi-action/${filename}?action=edit`;
    }

    /**
     * Creates the URL to create a new file.
     * @param {string} extension - The file extension.
     * @returns {string} The constructed URL.
     */
    #createNewFileUrl(extension) {
        return `${this.tester.url}/wopi-new?fileExt=${extension}`;
    }

    /**
     * Opens a file using the WOPI provider.
     * @param {string} pathToFile - path to test file
     * @param {string} [toFile="documents"] - The directory where the file is located or should be opened from. Defaults to "documents".
     */
    async openFile(pathToFile) {
        try {
            const requestUrl = `${this.tester.url}/upload`;
            const resultJson = await this.tester.uploadTestFile(pathToFile, requestUrl);
            const newPageUrl = this.#createFileUrl(resultJson.filename);

            await this.tester.navigateToEditor(newPageUrl);
        } catch (error) {
            throw new Error(`Failed to open file: ${error.message}`);
        }
    }

    /**
     * Creates a new file using the WOPI provider.
     * @param {string} input - The input string to determine the file extension for the new file.
     */
    async createFile(input) {
        try {
            const extension = this.tester.getFileExtensionByInput(input);
            if (!extension) {
                throw new Error(`Unsupported input: ${input}`);
            }

            const url = this.#createNewFileUrl(extension);
            await this.tester.navigateToEditor(url);
        } catch (error) {
            throw new Error(`Failed to create file: ${error.message}`);
        }
    }

    /**
     * Connects to an uploaded file.
     * @param {string} url - The URL of the file.
     */
    async connectToFile(url) {
        try {
            await this.tester.page.goto(url);
            await this.tester.waitEditor();
        } catch (error) {
            throw new Error(`Failed to connect to file: ${error.message}`);
        }
    }
}

module.exports = WopiProvider;
