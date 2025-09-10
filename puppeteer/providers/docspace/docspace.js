const path = require("path");
const fs = require("fs");
const ProviderAddon = require("../../engine/provider_addon");
const { DocSpaceSelectors } = require("../../constants");
const { waitWithSpinner } = require("../../engine/script/js");

class DocSpaceProvider extends ProviderAddon {
    constructor(tester) {
        super();
        this.tester = tester;
        this.page = null;
    }
    #url = "";
    #folderName = "";
    #folderId = "";
    #networkIdle = "networkidle0";
    #chunkSize = 10 * 1024 * 1024;
    /**
     * @enum
     */
    #endPoints = {
        auth: "https://docspace-test.qa-onlyoffice.net/api/2.0/authentication",
        /**
         * Return Get the "My documents" section endpoint
         * @returns {string}
         */
        getMyDocSection: () => {
            return `${this.#url}/api/2.0/files/@my`;
        },
        /**
         * Return Get folder information endpoint
         * @param {string} currentFolderId
         */
        getFolderInfo: (currentFolderId) => {
            `${this.#url}/api/2.0/files/folder/${currentFolderId}`;
        },
        /**
         * Return Get file information endpoint
         * @returns {string}
         */
        getFileInfo: () => {
            return `${this.#url}/api/2.0/files/${this.#folderId}/file`;
        },
        /**
         * Return Chunked upload endpoint
         * @returns {string}
         */
        chunkedUpload: () => {
            return `${this.#url}/api/2.0/files/${this.#folderId}/upload/create_session`;
        },
    };

    /**
     * @enum
     */
    #fileTypes = { docx: "New document", xlsx: "New spreadsheet", pptx: "New presentation", pdf: "Blank" };

    /**
     * Return Folder URL
     * @returns {string}
     */
    #createFolderUrl() {
        return `${this.#url}/rooms/personal/filter?folder=${this.#folderId}`;
    }

    /**
     * Return File URL
     * @param {number} fileId
     * @returns {string}
     */
    #createFileUrl(fileId) {
        return `${this.#url}/doceditor?fileId=${fileId}`;
    }

    /**
     * Send post request with body
     * @param {string} url
     * @param {Object} body
     * @returns
     */
    async #postRequest(url, body) {
        return this.page.evaluate(
            async (url, body) => {
                const performFetchRequest = async (url, options = {}) => {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error(`Request failed: ${response.statusText}`);
                    }
                    const result = await response.json();
                    if (result.status !== 0) {
                        throw new Error(`Error in response: ${result.message}`);
                    }
                    return result.response;
                };
                const headers = {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                };
                const options = {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                };
                return await performFetchRequest(url, options);
            },
            url,
            body
        );
    }

    /**
     * Send get request
     * @param {string} url
     * @param {string} params
     * @returns
     */
    async #getRequest(url, params) {
        const queryString = new URLSearchParams(params).toString();
        return this.page.evaluate(
            async (url, queryString) => {
                const performFetchRequest = async (url, options = {}) => {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error(`Request failed: ${response.statusText}`);
                    }
                    const result = await response.json();
                    if (result.status !== 0) {
                        throw new Error(`Error in response: ${result.message}`);
                    }
                    return result.response;
                };
                const headers = {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                };
                const options = { method: "GET", headers };
                return performFetchRequest(`${url}?${queryString}`, options);
            },
            url,
            queryString
        );
    }

    /**
     * Authorizes the DocSpace user
     */
    async #authorize() {
        const { userName, password } = this.tester.config.testOptions;
        const isAuthenticated = await this.page.evaluate(
            async (userName, password, authEndpoint) => {
                const response = await fetch(authEndpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                const authCheck = await response.json();

                if (!authCheck.response) {
                    const loginResponse = await fetch(authEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            UserName: userName,
                            Password: password,
                            Session: false,
                        }),
                    });

                    const loginResult = await loginResponse.json();
                    location.reload();

                    return loginResult;
                }

                return true;
            },
            userName,
            password,
            this.#endPoints.auth
        );

        if (!isAuthenticated) {
            throw new Error("Authentication failed");
        }
    }

    /**
     * Get the ID of the test folder, if the folder has not been created, return the ID of the current folder
     * @returns {{targetFolderId: number | undefined, currentFolderId: number}}
     */
    async #getTestFolderId() {
        const params = { filterType: "FoldersOnly", searchInContent: true, withsubfolders: true };
        const response = await this.#getRequest(this.#endPoints.getMyDocSection(), params);

        const folder = response.folders.find((folder) => folder.title === this.#folderName);
        return { targetFolderId: folder?.id, currentFolderId: response.current.id };
    }

    /**
     * Create Test Folder
     * @param {number} currentFolderId
     * @returns
     */
    async #createTestFolder(currentFolderId) {
        const body = { title: this.#folderName };
        const response = await this.#postRequest(this.#endPoints.getFolderInfo(currentFolderId), body);
        return response.id;
    }

    /**
     * Navigate to docspace and authorize user
     */
    async #navigateToDocSpace() {
        await this.page.goto(this.#url, { waitUntil: this.#networkIdle, timeout: 0 });
        const isLoginPage = await this.page.$(DocSpaceSelectors.LOGIN_FORM);
        if (isLoginPage) {
            await this.#authorize();
            await this.page.waitForSelector(DocSpaceSelectors.DOC_CATALOG);
        }
    }

    /**
     * navigate to the test folder, if the test folder is not created, create a test folder
     */
    async #navigateToTargetFolder() {
        const { targetFolderId, currentFolderId } = await this.#getTestFolderId();
        const testFolderId = targetFolderId || (await this.#createTestFolder(currentFolderId));
        this.#folderId = testFolderId;

        const folderUrl = this.#createFolderUrl();
        await this.page.goto(folderUrl, { waitUntil: this.#networkIdle, timeout: 0 });
    }

    /**
     * Create target file
     * @param {string} fileType
     * @returns {number}
     */
    async #createTargetFile(fileType) {
        const extension = this.tester.getFileExtensionByInput(fileType);

        const fileNameWithExtension = `${this.#fileTypes[extension] || "New document"}.${extension}`;
        const fileInfo = await this.#postRequest(this.#endPoints.getFileInfo(), { title: fileNameWithExtension });
        const { id } = fileInfo;
        return id;
    }

    /**
     * Upload a file to docspace
     * @param {string} pathToFile
     * @returns {number} created file id
     */
    async #uploadFile(pathToFile) {
        const fileStats = fs.statSync(pathToFile);
        const fileSize = fileStats.size;
        const fileName = path.basename(pathToFile);
        const relativePath = "";

        const result = await waitWithSpinner(this.page, `Uploading file ${fileName}...`, async () => {
            const response = await this.#postRequest(this.#endPoints.chunkedUpload(), {
                CreateNewIfExist: true,
                folderId: this.#folderId,
                fileName,
                fileSize,
                relativePath,
                createOn: new Date().toISOString(),
            });

            const { location } = response.data;
            const fileBuffer = fs.readFileSync(pathToFile);
            const chunks = [];

            for (let offset = 0; offset < fileSize; offset += this.#chunkSize) {
                chunks.push(fileBuffer.slice(offset, offset + this.#chunkSize));
            }

            const uploadPromises = chunks.map((chunk, index) =>
                this.page.evaluate(
                    async (location, chunkBase64, fileName, index) => {
                        const byteCharacters = atob(chunkBase64);
                        const byteNumbers = new Uint8Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const blob = new Blob([byteNumbers], { type: "application/octet-stream" });
                        const chunkFormData = new FormData();
                        chunkFormData.append("file", blob, fileName);

                        const chunkResponse = await fetch(`${location}&chunkNumber=${index + 1}&upload=true`, {
                            method: "POST",
                            body: chunkFormData,
                        });

                        if (!chunkResponse.ok) {
                            throw new Error(`Failed to upload chunk: ${chunkResponse.statusText}`);
                        }

                        return chunkResponse;
                    },
                    location,
                    Buffer.from(chunk).toString("base64"),
                    fileName,
                    index
                )
            );

            await Promise.all(uploadPromises);

            const finalResponse = await this.page.evaluate(async (location) => {
                const finalizeResponse = await fetch(`${location}&finalize=true`, { method: "POST" });
                if (!finalizeResponse.ok) {
                    throw new Error(`Failed to finalize upload: ${finalizeResponse.statusText}`);
                }
                return finalizeResponse.json();
            }, location);

            return finalResponse.data.id;
        });

        return result;
    }

    /**
     * Create test file with extension
     * @param {string} fileType - file extension or type ("New Document" ant etc.)
     */
    async createFile(fileType) {
        this.#url = this.tester.config.testOptions.url;
        this.#folderName = this.tester.config.testOptions.testFolder;
        this.page = this.tester.getPage();

        await this.#navigateToDocSpace();
        await this.#navigateToTargetFolder();
        const fileId = await this.#createTargetFile(fileType);

        const fileUrl = this.#createFileUrl(fileId);
        await this.page.goto(fileUrl);
        await this.tester.waitEditor();
    }

    /**
     * Download and open the text file in docspace
     * @param {string} pathToFile - file path
     */
    async openFile(pathToFile) {
        this.#url = this.tester.config.testOptions.url;
        this.#folderName = this.tester.config.testOptions.testFolder;
        this.page = this.tester.getPage();

        await this.#navigateToDocSpace();
        await this.#navigateToTargetFolder();
        const fileId = await this.#uploadFile(pathToFile);
        const fileUrl = this.#createFileUrl(fileId);
        await this.page.goto(fileUrl);
        await this.tester.waitEditor();
    }

    /**
     * Connects to an uploaded file in DocSpace.
     * @param {string} url - The URL of the file to connect to.
     */
    async connectToFile(url) {
        this.#url = this.tester.config.testOptions.url;
        this.page = this.tester.getPage();

        await this.page.goto(this.#url, { waitUntil: this.#networkIdle, timeout: 0 });
        await this.#authorize();
        await this.page.goto(url);
        await this.tester.waitEditor();
    }
}

module.exports = DocSpaceProvider;
