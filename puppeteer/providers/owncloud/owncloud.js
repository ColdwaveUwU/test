const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const ProviderAddon = require("../../engine/provider_addon");

class OwnCloudBaseProvider extends ProviderAddon {
    constructor(tester) {
        super();
        this.tester = tester;
        this.page = null;
        this.userName = "";
        this.folderName = "";
    }

    /**
     * Prepare a file for upload by tokenizing its name.
     * @param {string} fileName - The name of the file.
     * @param {string} filePath - The path to the file.
     * @returns {Promise<{tokenizedFilePath: string, token: string, fileExtension: string}>} An object containing the tokenized file path, token, and file extension.
     */
    async prepareFile(fileName, filePath) {
        const token = this.generateToken(fileName);
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
    generateToken(fileName) {
        return crypto.createHash("sha256").update(`${fileName}-${Date.now()}-${Math.random()}`).digest("hex");
    }

    /**
     * Get the file extension based on the input file type.
     * @param {string} fileType - The type of file.
     * @returns {string} The file extension.
     */
    getFileExtension(fileType) {
        const extension = this.tester.getFileExtensionByInput(fileType);
        if (!extension) {
            throw new Error(`Unsupported file type: ${fileType}`);
        }
        return extension;
    }
}

module.exports = OwnCloudBaseProvider;
