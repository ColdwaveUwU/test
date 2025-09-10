const { authorizeUser } = require("../../../engine/script/js");
const { OwnCloudSelectors } = require("../../../constants");
const path = require("path");

class NCOCOwnCloud {
    constructor(provider) {
        this.provider = provider;
        this.selectors = OwnCloudSelectors.NCOC;
    }

    /**
     * Get the base URL of the provider.
     * @returns {string} The base URL.
     */
    #getBaseUrl() {
        return this.provider.tester.url;
    }

    /**
     * Get the URL for the application.
     * @returns {string} The application URL.
     */
    #getAppUrl() {
        return `${this.#getBaseUrl()}/apps/onlyoffice/`;
    }

    /**
     * Get the URL for the files app with the current folder name.
     * @returns {string} The files app URL.
     */
    #getFilesUrl() {
        return `${this.#getBaseUrl()}/apps/files/?dir=${this.provider.folderName}`;
    }

    /**
     * Get the folder URL for accessing the specific folder.
     * @returns {string} The folder URL.
     */
    #getFolderUrl() {
        return `${this.provider.tester.url}/oc/remote.php/dav/files/admin/${this.provider.folderName}`;
    }

    /**
     * Get the URL for creating a new file.
     * @returns {string} The URL for file creation.
     */
    #getCreateFileUrl() {
        return `${this.#getBaseUrl()}/apps/onlyoffice/ajax/new`;
    }

    /**
     * Get the ID of a file by its name.
     * @param {string} fileName - The name of the file to find.
     * @returns {Promise<string|null>} The file ID or null if not found.
     */
    async #getFileID(fileName) {
        await this.provider.page.reload();
        await this.provider.page.waitForNavigation({ waitUntil: "load" });
        return await this.provider.page.evaluate((fileName) => {
            const targetFile = window.FileList.files.find((file) => file.name === fileName);
            return targetFile ? targetFile.id : null;
        }, fileName);
    }

    /**
     * Open the editor for a specific file.
     * @param {string} [fileId] - The ID of the file to open.
     * @param {string} [fileName] - The name of the file to open.
     */
    async #openEditor(fileId, fileName) {
        const curFileId = fileId || (await this.#getFileID(fileName));
        const url = `${this.#getAppUrl()}${curFileId}`;
        await this.provider.page.goto(url, { timeout: 0 });
        await this.provider.tester.waitEditor();
    }

    /**
     * Check if the target folder exists.
     * @returns {Promise<boolean>} True if the folder exists, otherwise false.
     */
    async #isFolderCreated() {
        return await this.provider.page.evaluate(
            async (url, contentType) => {
                const options = {
                    method: "PROPFIND",
                    headers: {
                        "Content-Type": contentType,
                    },
                };
                try {
                    const response = await fetch(url, options);
                    return response.status !== 404;
                } catch (error) {
                    console.error("Request failed", error);
                    return false;
                }
            },
            this.#getFolderUrl(),
            this.selectors.CONTENT_TYPE_XML
        );
    }

    /**
     * Open the specified folder in OwnCloud.
     */
    async #openFolder() {
        await this.provider.page.goto(this.#getFilesUrl(), {
            waitUntil: "networkidle2",
            timeout: 0,
        });
    }

    /**
     * Navigate to the OwnCloud page and authorize the user.
     */
    async navigateToOwnCloud() {
        this.provider.page = this.provider.tester.getPage();
        this.provider.folderName = this.provider.tester.config.testOptions.testFolder;
        await this.provider.page.goto(this.#getBaseUrl(), { waitUntil: "networkidle2" });
        await this.authorize();
        if (!(await this.#isFolderCreated())) {
            throw new Error(`The folder with the name ${this.provider.folderName} does not exist`);
        }
        await this.#openFolder();
    }

    /**
     * Authorize the user with the provided credentials.
     */
    async authorize() {
        const { userName, password } = this.provider.tester.config.testOptions;
        this.provider.userName = userName;
        await Promise.all([
            authorizeUser(
                this.provider.page,
                {
                    userName,
                    userNameSelector: this.selectors.USERNAME,
                },
                {
                    password,
                    passwordSelector: this.selectors.PASSWORD,
                },
                this.selectors.LOGIN_BUTTON
            ),
            this.provider.page.waitForNavigation({ waitUntil: "load" }),
        ]);
    }

    /**
     * Create a target file with the specified extension.
     * @param {string} extension - The file extension to create.
     */
    async createTargetFile(extension) {
        const response = await this.provider.page.evaluate(
            async (ext, url, folderName) => {
                const formData = new FormData();

                const fileNames = {
                    docx: "Document.docx",
                    pdf: "Document.pdf",
                    pptx: "Presentation.pptx",
                    xlsx: "Spreadsheet.xlsx",
                };

                const fileName = fileNames[ext.toLowerCase()] || "Document.docx";

                formData.append("name", fileName);
                formData.append("dir", `/${folderName}`);

                const options = {
                    method: "POST",
                    body: formData,
                    headers: {
                        Requesttoken: window.oc_requesttoken,
                    },
                };

                const response = await fetch(url, options);
                return response.json();
            },
            extension,
            this.#getCreateFileUrl(),
            this.provider.folderName
        );

        const fileId = response.id;
        await this.#openEditor(fileId);
    }

    /**
     * Upload a file to the OwnCloud.
     * @param {string} tokenizedFilePath - The path of the file to upload.
     */
    async uploadFile(tokenizedFilePath) {
        await Promise.all([
            this.provider.page.waitForSelector(this.selectors.UPLOAD_PROGRESS_SELECTOR, { timeout: 0, visible: true }),
            this.provider.tester.uploadFile(tokenizedFilePath, this.selectors.FILE_UPLOAD_START_SELECTOR),
            this.provider.page.waitForFunction(
                (uploadProgressSelector) => !document.querySelector(uploadProgressSelector).checkVisibility(),
                { timeout: 0 },
                this.selectors.UPLOAD_PROGRESS_SELECTOR
            ),
        ]);
        const fileName = path.basename(tokenizedFilePath);
        await this.#openEditor("", fileName);
    }

    /**
     * Connect to a file using the specified URL.
     * @param {string} url - The URL of the file to connect to.
     */
    async connectToFile(url) {
        await this.provider.page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
        await this.authorize();
        await this.provider.tester.waitEditor();
    }
}

module.exports = NCOCOwnCloud;
