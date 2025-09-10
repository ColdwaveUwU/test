const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const ProviderAddon = require("../../engine/provider_addon");
const { OCISOwnCloud, NCOCOwnCloud } = require("./owncloudProviders");
const OwnCloudSettingsSelectors = require("./owncloudProviders/config/OwnCloudFileMenu.json");

class OwnCloudProvider extends ProviderAddon {
    constructor(tester) {
        super();
        this.tester = tester;
        this.page = null;
        this.userName = "";
        this.folderName = "";
        this.strategy = this.getOwnCloudProvider();
        this.selectors = OwnCloudSettingsSelectors;
    }

    /**
     * Get the appropriate OwnCloud provider based on the URL.
     * @returns {OCISOwnCloud | NCOCOwnCloud} The OwnCloud provider instance.
     */
    getOwnCloudProvider() {
        const link = this.tester.url;
        switch (link) {
            case "https://oo-ocis.qa-onlyoffice.net":
                return new OCISOwnCloud(this);
            case "https://ncoc.teamlab.info/oc":
                return new NCOCOwnCloud(this);
            default:
                throw new Error("Unsupported OwnCloud instance");
        }
    }

    /**
     * Create a new file of the specified type in OwnCloud.
     * @param {string} fileType - The type of file to create.
     */
    async createFile(fileType) {
        const extension = this.#getFileExtension(fileType);
        await this.strategy.navigateToOwnCloud();
        await this.strategy.createTargetFile(extension);
    }

    /**
     * Open a file in OwnCloud using the specified path.
     * @param {string} pathToFile - The path to the file to open.
     */
    async openFile(pathToFile) {
        const fileName = path.basename(pathToFile);
        const { tokenizedFilePath, token, fileExtension } = await this.#prepareFile(fileName, pathToFile);
        try {
            await this.strategy.navigateToOwnCloud();
            await this.strategy.uploadFile(tokenizedFilePath, token, fileExtension);
        } finally {
            fs.unlinkSync(tokenizedFilePath);
        }
    }

    /**
     * Prepare a file for upload by tokenizing its name.
     * @param {string} fileName - The name of the file.
     * @param {string} filePath - The path to the file.
     * @returns {Promise<{tokenizedFilePath: string, token: string, fileExtension: string}>} An object containing the tokenized file path, token, and file extension.
     */
    async #prepareFile(fileName, filePath) {
        const token = this.#generateToken(fileName);
        const fileExtension = path.extname(filePath);
        const tokenizedFilePath = path.join(path.dirname(filePath), `${token}${fileExtension}`);
        fs.copyFileSync(filePath, tokenizedFilePath);
        return { tokenizedFilePath, token, fileExtension };
    }

    /**
     * Generate a unique token based on the file name.
     * @param {string} fileName - The name of the file.
     * @returns {string} A unique token.
     */
    #generateToken(fileName) {
        return crypto.createHash("sha256").update(`${fileName}-${Date.now()}-${Math.random()}`).digest("hex");
    }

    /**
     * Get the file extension based on the input file type.
     * @param {string} fileType - The type of file.
     * @returns {string} The file extension.
     */
    #getFileExtension(fileType) {
        const extension = this.tester.getFileExtensionByInput(fileType);
        if (!extension) {
            throw new Error(`Unsupported file type: ${fileType}`);
        }
        return extension;
    }

    /**
     * Connect to a file using the specified URL.
     * @param {string} url - The URL of the file to connect to.
     */
    async connectToFile(url) {
        this.page = this.tester.getPage();
        await this.strategy.connectToFile(url);
    }

    /**
     * Handles the folder selection process after saving a copy in OwnCloud.
     * @returns {Object} The configuration for choosing a folder after saving a copy.
     */
    async actionChooseFolderAfterSaveCopy() {
        return OwnCloudSettingsSelectors.file.childElements[1];
    }
}

module.exports = OwnCloudProvider;
