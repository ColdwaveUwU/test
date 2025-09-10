const { authorizeUser } = require("../../../engine/script/js");
const { OwnCloudSelectors } = require("../../../constants");

class OCISOwnCloud {
    constructor(provider) {
        this.provider = provider;
        this.selectors = OwnCloudSelectors.OCIS;
    }

    async navigateToOwnCloud() {
        this.provider.page = this.provider.tester.getPage();
        this.provider.folderName = this.provider.tester.config.testOptions.testFolder;
        await this.provider.page.goto(this.provider.tester.url, { waitUntil: "networkidle2" });
        await this.authorize();
        const isFolderCreated = await this.isFolderCreated();
        if (!isFolderCreated) {
            throw new Error(`The folder with the name ${this.provider.folderName} does not exist`);
        }
        await this.openFolder();
    }

    async authorize() {
        const { userName, password } = this.provider.tester.config.testOptions;
        this.provider.userName = userName;
        await authorizeUser(
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
        );
        await this.provider.page.waitForSelector(this.selectors.MAIN_CONTENT);
    }

    async createTargetFile(extension) {
        await this.provider.tester.click(this.selectors.NewFileButton, "none");
        await this.provider.tester.selectByText(
            this.provider.tester.getFileExtensionByInput(extension),
            this.selectors.FileExtension,
            "none"
        );
        await this.changeCreatedFileName(this.provider.tester.fileName);
        await this.provider.page.waitForSelector(this.selectors.CreateFile);
        await this.provider.tester.click(this.selectors.CreateFile, "none");
        await this.provider.tester.waitEditor();
    }

    async uploadFile(tokenizedFilePath, token, fileExtension) {
        await this.provider.tester.click(this.selectors.UPLOAD_MENU_BUTTON, "none");
        await this.provider.page.waitForSelector(this.selectors.InputForm);
        await this.provider.tester.uploadFile(tokenizedFilePath, this.selectors.InputForm);
        await this.provider.page.waitForSelector(this.selectors.DownloadSuccessEl, { timeout: 0 });
        await this.openEditor(token, fileExtension);
    }

    async openEditor(fileName, fileExtension) {
        const fullFileName = `${fileName}${fileExtension}`;
        const url = `${this.provider.tester.url}/external-onlyoffice/personal/${this.provider.userName}/${this.provider.folderName}/${fullFileName}`;
        await this.provider.page.goto(url);
        await this.provider.tester.waitEditor();
    }

    async isFolderCreated() {
        await this.provider.page.waitForSelector(this.selectors.FOLDER_NAME_SELECTOR);
        return this.provider.page.evaluate(
            (folderName, folderNameSelector) =>
                Array.from(document.querySelectorAll(folderNameSelector)).some(
                    (folder) => folder.textContent === folderName
                ),
            this.provider.folderName,
            this.selectors.FOLDER_NAME_SELECTOR
        );
    }

    async openFolder() {
        await this.provider.page.goto(
            `${this.provider.tester.url}/files/spaces/personal/${this.provider.userName}/${this.provider.folderName}`,
            { waitUntil: "networkidle2", timeout: 0 }
        );
    }

    async changeCreatedFileName(fileName) {
        const tokenizedFileName = this.provider.generateToken(fileName);
        this.provider.tester.tokenizedFileName = tokenizedFileName;
        await this.provider.tester.input(tokenizedFileName, this.selectors.FileNameInput, "");
    }

    async connectToFile(url) {
        await this.provider.page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
        await this.authorize();
        await this.provider.tester.waitEditor();
    }
}

module.exports = OCISOwnCloud;
