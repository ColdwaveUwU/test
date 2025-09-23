const path = require("path");
const fs = require("fs");
const { authorizeUser } = require("../../../engine/script/js");
const selectors = require("./selectors.json");
const OwnCloudBaseProvider = require("../owncloud.js");
class OCISOwnCloud extends OwnCloudBaseProvider {
    constructor(tester) {
        super(tester);
    }

    static OCIS_SELECTORS = selectors;

    async createFile(fileType) {
        const extension = this.getFileExtension(fileType);
        await this.navigateToOwnCloud();
        await this.createTargetFile(extension);
    }

    async openFile(pathToFile) {
        const fileName = path.basename(pathToFile);
        const { tokenizedFilePath, token, fileExtension } = await this.prepareFile(fileName, pathToFile);
        try {
            await this.navigateToOwnCloud();
            await this.uploadFile(tokenizedFilePath, token, fileExtension);
        } finally {
            fs.unlinkSync(tokenizedFilePath);
        }
    }

    async navigateToOwnCloud() {
        this.tester.page = this.tester.getPage();
        this.tester.folderName = this.tester.config.testOptions.testFolder;
        await this.tester.page.goto(this.tester.url, { waitUntil: "networkidle2" });
        await this.authorize();
        const isFolderCreated = await this.isFolderCreated();
        if (!isFolderCreated) {
            throw new Error(`The folder with the name ${this.tester.folderName} does not exist`);
        }
        await this.openFolder();
    }

    async authorize() {
        const { userName, password } = this.tester.config.testOptions;
        this.tester.userName = userName;

        const authorizeSelectors = OCISOwnCloud.OCIS_SELECTORS.AUTHORIZATION;
        await authorizeUser(
            this.tester.page,
            {
                userName,
                userNameSelector: authorizeSelectors.USERNAME,
            },
            {
                password,
                passwordSelector: authorizeSelectors.PASSWORD,
            },
            authorizeSelectors.LOGIN_BUTTON
        );
        await this.tester.page.waitForSelector(authorizeSelectors.MAIN_CONTENT);
    }

    async createTargetFile(extension) {
        const createFileSelectors = OCISOwnCloud.OCIS_SELECTORS.CREATE_FILE;
        await this.tester.click(createFileSelectors.NEW_FILE_BUTTON, "none");
        await this.tester.selectByText(
            this.tester.getFileExtensionByInput(extension),
            createFileSelectors.FILE_EXTENSION,
            "none"
        );
        await this.changeCreatedFileName(this.tester.fileName);
        await this.tester.page.waitForSelector(createFileSelectors.CREATE_FILE);
        await this.tester.click(createFileSelectors.CREATE_FILE, "none");
        await this.tester.waitEditor();
    }

    async uploadFile(tokenizedFilePath, token, fileExtension) {
        const uploadFileSelectors = OCISOwnCloud.OCIS_SELECTORS.UPLOAD;
        await this.tester.click(uploadFileSelectors.UPLOAD_MENU_BUTTON, "none");
        await this.tester.page.waitForSelector(uploadFileSelectors.INPUT_FORM);
        await this.tester.uploadFile(tokenizedFilePath, uploadFileSelectors.INPUT_FORM);
        await this.tester.page.waitForSelector(uploadFileSelectors.DOWNLOAD_SUCCESS, { timeout: 0 });
        await this.openEditor(token, fileExtension);
    }

    async openEditor(fileName, fileExtension) {
        const fullFileName = `${fileName}${fileExtension}`;
        const url = `${this.tester.url}/external-onlyoffice/personal/${this.tester.userName}/${this.tester.folderName}/${fullFileName}`;
        await this.tester.page.goto(url);
        await this.tester.waitEditor();
    }

    async isFolderCreated() {
        const folderSelectors = OCISOwnCloud.OCIS_SELECTORS.FOLDER;
        await this.tester.page.waitForSelector(folderSelectors.FOLDER_NAME_SELECTOR);
        return this.tester.page.evaluate(
            (folderName, folderNameSelector) =>
                Array.from(document.querySelectorAll(folderNameSelector)).some(
                    (folder) => folder.textContent === folderName
                ),
            this.tester.folderName,
            folderSelectors.FOLDER_NAME_SELECTOR
        );
    }

    async openFolder() {
        await this.tester.page.goto(
            `${this.tester.url}/files/spaces/personal/${this.tester.userName}/${this.tester.folderName}`,
            { waitUntil: "networkidle2", timeout: 0 }
        );
    }

    async changeCreatedFileName(fileName) {
        const fileNameInputSelector = OCISOwnCloud.OCIS_SELECTORS.CREATE_FILE.FILE_NAME_INPUT;
        const tokenizedFileName = this.generateToken(fileName);
        this.tester.tokenizedFileName = tokenizedFileName;
        await this.tester.click(fileNameInputSelector, "none");
        await this.tester.input(tokenizedFileName);
    }

    async connectToFile(url) {
        await this.tester.page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
        await this.authorize();
        await this.tester.waitEditor();
    }
}

module.exports = OCISOwnCloud;
