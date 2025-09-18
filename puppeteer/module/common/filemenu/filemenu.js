const FileMenuConfigurator = require("./filemenu_configurator");
const path = require("path");

class FileMenu {
    constructor(tester = RegularTester) {
        this.tester = tester;
        this.configurator = new FileMenuConfigurator(tester);
    }

    async #startAction(settingsQueue) {
        try {
            if (!settingsQueue) {
                return;
            }
            return await this.tester.startActions(settingsQueue);
        } catch (error) {
            throw new Error(`#startAction: Failed to start action. ${error.message}`, { cause: error });
        }
    }

    /**
     * Waits for the file menu to close.
     * @returns {Promise<boolean>} Resolves when the file menu is closed.
     */
    async #waitFileMenuClosed() {
        try {
            return this.tester.frame.waitForFunction(
                (tabSelector) => {
                    const activeElement = document.querySelector(`${tabSelector}.active`);
                    const tabElement = document.querySelector(tabSelector);
                    return !activeElement && tabElement;
                },
                {},
                this.configurator.exampleFileMenuConfigs.file.selector
            );
        } catch (error) {
            throw new Error(`#waitFileMenuClosed: Failed to wait for file menu to close. ${error.message}`, {
                cause: error,
            });
        }
    }

    async clickFileMenu() {
        try {
            const settingsQueue = await this.configurator.clickFileMenu(true);
            await this.#startAction(settingsQueue);
        } catch (error) {
            throw new Error(`clickFileMenu: Failed to click file menu. ${error.message}`, { cause: error });
        }
    }

    /**
     * Creates a promise that resolves when a new popup page is opened.
     * Sets the new page as the current page in the tester instance.
     * @param {Puppeteer.Page} targetPage - The page to listen for popups on
     * @param {number} timeoutMs - Timeout in milliseconds
     * @returns {Promise<void>} - Resolves when popup is detected
     * @private
     */
    async #createPopupPromise(targetPage, timeoutMs = 10000) {
        try {
            return new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    reject(new Error("Popup did not open within timeout period"));
                }, timeoutMs);

                targetPage.once("popup", async (newPage) => {
                    clearTimeout(timeoutId);
                    this.tester.setPage(newPage);
                    resolve();
                });
            });
        } catch (error) {
            throw new Error(`#createPopupPromise: Failed to create popup promise. ${error.message}`, { cause: error });
        }
    }

    async createNew(settings) {
        try {
            const targetPage = this.tester.getPage();
            const settingsQueue = await this.configurator.createNew(settings);
            await this.#startAction(settingsQueue);

            if (settingsQueue) {
                await this.#createPopupPromise(targetPage);
                await this.tester.waitEditor();
            }
        } catch (error) {
            throw new Error(`createNew: Failed to create new document. ${error.message}`, { cause: error });
        }
    }

    async save() {
        try {
            const settingsQueue = await this.configurator.save({ save: true });
            await this.#startAction(settingsQueue);
        } catch (error) {
            throw new Error(`save: Failed to save the document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Downloads the document in the specified format.
     * @param {string} settings
     * @param {string} encode
     * @returns {Promise<{name: string, extension: string}>
     */
    async downloadAs(settings, encode = "Unicode (UTF-8)") {
        try {
            const downloadCompleted = this.tester.handleFileDownload();
            const settingsQueue = await this.configurator.downloadAs(settings, encode);
            await this.#startAction(settingsQueue);
            const filePath = await downloadCompleted;

            const fileInfo = {
                name: path.basename(filePath),
                extension: path.extname(filePath).substring(1),
            };
            return fileInfo;
        } catch (error) {
            throw new Error(`downloadAs: Failed to download the document as ${settings}. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Saves a copy of the document in the specified format.
     * @param {string} settings - The format in which to save the copy (e.g., "txt", "rtf").
     * @param {string} encode - The encoding to use (default: "Unicode (UTF-8)").
     */
    async saveCopyAs(settings, encode = "Unicode (UTF-8)") {
        try {
            const settingsQueue = await this.configurator.saveCopyAs(settings, encode);
            await this.#startAction(settingsQueue);
        } catch (error) {
            throw new Error(`saveCopyAs: Failed to save a copy of the document as ${settings}. ${error.message}`, {
                cause: error,
            });
        }
    }

    async rename(settings) {
        try {
            const settingsQueue = await this.configurator.rename(settings);
            await this.#startAction(settingsQueue);
        } catch (error) {
            throw new Error(`rename: Failed to rename the document. ${error.message}`, { cause: error });
        }
    }

    async protect(settings) {
        try {
            const protectActions = ["addPassword", "changePassword", "deletePassword"];
            const applicableActions = protectActions.filter((action) => settings[action]);

            for (const action of applicableActions) {
                if (settings[action]) {
                    const settingsQueue = await this.configurator.protect(settings, action);
                    await this.#startAction(settingsQueue);
                }
            }
        } catch (error) {
            throw new Error(`protect: Failed to protect the document. ${error.message}`, { cause: error });
        }
    }

    async getDocumentInfo() {
        try {
            return await this.configurator.getDocumentInfo();
        } catch (error) {
            throw new Error(`getDocumentInfo: Failed to get document information. ${error.message}`, { cause: error });
        }
    }

    async addProperties(settings) {
        try {
            const settingsQueue = await this.configurator.addProperties(settings);
            await this.#startAction(settingsQueue);
        } catch (error) {
            throw new Error(`addProperties: Failed to add properties to the document. ${error.message}`, {
                cause: error,
            });
        }
    }

    async setAdvancedSettings(settings) {
        try {
            const settingsQueue = await this.configurator.setAdvancedSettings(settings);
            await this.#startAction(settingsQueue);
            const settingsQueueApply = await this.configurator.setAdvancedSettingsApply();
            await this.#startAction(settingsQueueApply);
            await this.#waitFileMenuClosed();
        } catch (error) {
            throw new Error(`setAdvancedSettings: Failed to set advanced settings. ${error.message}`, { cause: error });
        }
    }
}

module.exports = FileMenu;
