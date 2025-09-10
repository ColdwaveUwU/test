const path = require("path");
const selectors = require("./selectors.json");
class DocumentUploader {
    constructor(tester) {
        this.tester = tester || RegularTester;
    }

    static DOC_UPLOADER_SELECTORS = selectors;

    async uploadFromStorage() {
        try {
            if (await this.tester.checkSelector(DocumentUploader.DOC_UPLOADER_SELECTORS.WARNING_MODAL.MODAL_WINDOW)) {
                await this.tester.click(DocumentUploader.DOC_UPLOADER_SELECTORS.WARNING_MODAL.OK_BUTTON);
            }
        } catch (error) {
            throw new Error(`handleStorageSelection: ${error.message}`, { cause: error });
        }
    }

    async uploadFromUrl(url) {
        try {
            const page = this.tester.getPage();
            await this.tester.inputToForm(url, DocumentUploader.DOC_UPLOADER_SELECTORS.URL_MODAL.INPUT_FIELD);

            const loading = page.waitForResponse((response) => response.ok());
            await this.tester.click(DocumentUploader.DOC_UPLOADER_SELECTORS.URL_MODAL.OK_BUTTON);

            if (await this.tester.checkSelector(DocumentUploader.DOC_UPLOADER_SELECTORS.WARNING_MODAL.MODAL_WINDOW)) {
                await this.tester.click(DocumentUploader.DOC_UPLOADER_SELECTORS.WARNING_MODAL.OK_BUTTON);
            }

            await loading;

            if (await this.tester.checkSelector(DocumentUploader.DOC_UPLOADER_SELECTORS.URL_MODAL.ERROR_ELEMENT)) {
                await this.tester.click(DocumentUploader.DOC_UPLOADER_SELECTORS.URL_MODAL.CANCEL_BUTTON);
                throw new Error("Incorrect URL. The cancel button was pressed.");
            }
        } catch (error) {
            throw new Error(`handleUrlInput: \n${error.message}`, { cause: error });
        }
    }

    async uploadFromFile(filePath) {
        try {
            const fullPath = path.join(globalThis.workDirectory, "files", filePath);
            const page = this.tester.getPage();
            const loading = page.waitForResponse((response) => response.ok());
            const fileChooser = await page.waitForFileChooser();
            await fileChooser.accept([fullPath]);

            if (await this.tester.checkSelector(DocumentUploader.DOC_UPLOADER_SELECTORS.WARNING_MODAL.MODAL_WINDOW)) {
                await this.tester.click(DocumentUploader.DOC_UPLOADER_SELECTORS.WARNING_MODAL.OK_BUTTON);
            }

            return loading;
        } catch (error) {
            throw new Error(`handleFileUpload: Failed to load file: "${filePath}". \n${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = DocumentUploader;
