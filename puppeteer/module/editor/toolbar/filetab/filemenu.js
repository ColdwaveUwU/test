const selectors = require("./selectors.json");
const elementsValue = require("./elementsValue.json");
const Toolbar = require("../../toolbar/toolbar");
const path = require("path");
const { Dropdown, ModalButton, Input } = require("../../../elements");
const AdvancedSettings = require("./advancedsettings");

class FileMenu extends Toolbar {
    constructor(tester) {
        super(tester, "File");
    }

    static FILEMENU_SELECTORS = selectors;
    static ELEMENTS_VALUE = elementsValue;

    async clickFileMenu() {
        await this.openTargetTab();
    }
    /**
     * Creates a promise that resolves when a popup is opened on the specified page within a timeout period.
     * Sets the tester's page to the newly opened popup page.
     * @param {import('puppeteer').Page} targetPage - The Puppeteer page to listen for the popup event.
     * @param {number} [timeoutMs=10000] - The maximum time to wait for the popup to open, in milliseconds.
     * @returns {Promise<void>} Resolves when the popup is opened and the tester's page is set.
     * @throws {Error} If the popup does not open within the timeout period or if an unexpected error occurs.
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

    /**
     * Creates a new document of the specified type using the file menu.
     * @param {"Blank" | "DOC" | "SAMPLE"} createNewType - The type of document to create (e.g., "blank", "template").
     * @throws {Error} Throws an error if the creation process fails.
     */
    async createNew(createNewType) {
        try {
            const createNewSelectors = FileMenu.FILEMENU_SELECTORS.PANEL_MENU.CREATE_NEW;
            const targetPage = this.tester.getPage();
            await this.tester.click(createNewSelectors.BUTTON);
            const blankType = createNewType.toUpperCase().replace(/\s/g, "");
            await this.tester.click(createNewSelectors[blankType]);
            await this.#createPopupPromise(targetPage);
            await this.tester.waitEditor();
        } catch (error) {
            throw new Error(`createNew: Failed to create new document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Saves the current document by clicking the save button in the file menu.
     * @throws {Error} Throws an error if the save operation fails.
     */
    async save() {
        try {
            const saveSelectors = FileMenu.FILEMENU_SELECTORS.PANEL_MENU.SAVE;
            await this.tester.click(saveSelectors.BUTTON);
        } catch (error) {
            throw new Error(`save: Failed to save the document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Initiates the "Download As" for a file in the editor, selecting the desired format and encoding.
     * Handles modal dialogs and dropdowns for file type and encoding selection, and waits for the download to complete.
     * @param {string} format - The file format to download as (e.g., "txt", "pdf").
     * @param {string} [encode="Unicode (UTF-8)"] - The encoding to use for the downloaded file.
     * @returns {Promise<void>} Resolves when the download process is complete.
     */
    async downloadAs(format, encode = "Unicode (UTF-8)") {
        try {
            const downloadSelectors = FileMenu.FILEMENU_SELECTORS.PANEL_MENU.DOWNLOAD_AS;
            const downloadCompleted = this.tester.handleFileDownload();

            await this.tester.click(downloadSelectors.BUTTON);
            const { SELECTOR, WARNING, OPTIONS } = downloadSelectors.FILE_TYPE[format.toUpperCase()];
            await this.tester.click(SELECTOR);
            if (WARNING) {
                const warningModal = new ModalButton(
                    this.tester,
                    null,
                    downloadSelectors.WARNING_WINDOW.SELECTOR,
                    downloadSelectors.WARNING_WINDOW.OK_BUTTON
                );
                if (await warningModal.waitModalLoaded()) {
                    await warningModal.closeModal();
                }
            }

            if (OPTIONS) {
                const encodingModal = new ModalButton(this.tester, null, OPTIONS.MODAL_WINDOW, OPTIONS.OK_BUTTON);
                if (await encodingModal.waitModalLoaded()) {
                    const dropdownElement = new Dropdown(this.tester, {
                        selector: OPTIONS.SELECTOR,
                        elementsSelector: OPTIONS.ELEMENTS_SELECTOR,
                        elementsValue: FileMenu.ELEMENTS_VALUE.ENCODING,
                    });

                    await dropdownElement.selectDropdownItem(encode);
                    await encodingModal.closeModal(OPTIONS.OK_BUTTON);
                }
            }

            const filePath = await downloadCompleted;
            const fileInfo = {
                name: path.basename(filePath),
                extension: path.extname(filePath).substring(1),
            };
            return fileInfo;
        } catch (error) {
            throw new Error(`downloadAs: Failed to download file. ${error.message}`, { cause: error });
        }
    }

    /**
     * Saves a copy of the current file in the specified format and encoding.
     * @param {string} format - The file format to save as (e.g., 'txt', 'pdf').
     * @param {string} [encode="Unicode (UTF-8)"] - The encoding to use for the saved file.
     * @returns {Promise<void>} Resolves when the save operation is complete.
     */
    async saveCopyAs(format, encode = "Unicode (UTF-8)") {
        try {
            const saveCopyAsSelectos = FileMenu.FILEMENU_SELECTORS.PANEL_MENU.SAVE_COPY_AS;
            await this.tester.click(saveCopyAsSelectos.BUTTON);
            const { SELECTOR, WARNING, OPTIONS } = saveCopyAsSelectos.FILE_TYPE[format.toUpperCase()];
            await this.tester.click(SELECTOR);
            if (WARNING) {
                const warningModal = new ModalButton(
                    this.tester,
                    null,
                    saveCopyAsSelectos.WARNING_WINDOW.SELECTOR,
                    saveCopyAsSelectos.WARNING_WINDOW.OK_BUTTON
                );
                if (await warningModal.waitModalLoaded()) {
                    await warningModal.closeModal();
                }
            }

            if (OPTIONS) {
                const encodingModal = new ModalButton(this.tester, null, OPTIONS.MODAL_WINDOW, OPTIONS.OK_BUTTON);
                if (await encodingModal.waitModalLoaded()) {
                    const dropdownElement = new Dropdown(this.tester, {
                        selector: OPTIONS.SELECTOR,
                        elementsSelector: OPTIONS.ELEMENTS_SELECTOR,
                        elementsValue: FileMenu.ELEMENTS_VALUE.ENCODING,
                    });

                    await dropdownElement.selectDropdownItem(encode);
                    await encodingModal.closeModal(OPTIONS.OK_BUTTON);
                }
            }
        } catch (error) {
            throw new Error(`saveCopyAs: Failed to saveCopyAs the document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Renames a file or item using the provided new name.
     * Opens the rename modal, sets the new name in the input form, and confirms the action.
     * @param {string} newName - The new name to assign.
     * @returns {Promise<void>} Resolves when the rename operation is complete.
     */
    async rename(newName) {
        try {
            const renameSelectors = FileMenu.FILEMENU_SELECTORS.PANEL_MENU.RENAME;
            const renameButton = new ModalButton(
                this.tester,
                renameSelectors.BUTTON,
                renameSelectors.MODAL_WINDOW.MODAL_WINDOW_SELECTOR,
                renameSelectors.MODAL_WINDOW.OK_BUTTON
            );
            await renameButton.openModal();

            const inputNewNameForm = new Input(this.tester, renameSelectors.MODAL_WINDOW.INPUT_FORM, false);
            await inputNewNameForm.set(newName);
            await renameButton.closeModal();
        } catch (error) {
            throw new Error(`rename: Failed to rename the document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Protects the document by performing the specified protection action.
     *
     * Supported actions:
     * - "ADD": Adds password protection to the document.
     * - "CHANGE": Changes the existing password protection.
     * - "DELETE": Removes password protection from the document.
     *
     * @async
     * @param {string} action - The protection action to perform ("ADD", "CHANGE", or "DELETE").
     * @param {Object} [passwordObj] - The password object containing password details (required for "ADD" and "CHANGE").
     * @param {string} passwordObj.password - The password to set.
     * @param {string} passwordObj.repeatPassword - The repeated password for confirmation.
     * @throws {Error} Throws an error if the action is unknown, unhandled, or if any step fails.
     */
    async protect(action, passwordObj) {
        const { FILEMENU_SELECTORS } = FileMenu;
        const { PANEL_MENU } = FILEMENU_SELECTORS;
        const protectSelectors = PANEL_MENU.PROTECT;
        const targetAction = action.toUpperCase();

        try {
            await this.tester.click(protectSelectors.BUTTON);

            const actionSelector = protectSelectors.ACTIONS[targetAction];
            if (!actionSelector) {
                throw new Error(`Unknown protection action: ${action}`);
            }

            if (targetAction === "ADD" || targetAction === "CHANGE") {
                const { password, repeatPassword } = passwordObj;

                const passwordModalWindow = new ModalButton(
                    this.tester,
                    actionSelector,
                    protectSelectors.MODAL_WINDOW.MODAL_WINDOW_SELECTOR,
                    protectSelectors.MODAL_WINDOW.OK_BUTTON
                );
                await passwordModalWindow.openModal();

                const inputPassword = new Input(
                    this.tester,
                    protectSelectors.MODAL_WINDOW.PASSWORD_FORM.INPUT_PASSWORD,
                    false
                );
                const inputRepeatPassword = new Input(
                    this.tester,
                    protectSelectors.MODAL_WINDOW.PASSWORD_FORM.INPUT_REPEAT,
                    false
                );

                await inputPassword.set(password);
                await inputRepeatPassword.set(repeatPassword);
                await passwordModalWindow.closeModal();
            } else if (targetAction === "DELETE") {
                await this.tester.click(actionSelector);
            } else {
                throw new Error(`Unhandled protection action: ${action}`);
            }
        } catch (error) {
            throw new Error(`protect: Failed to protect the document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Adds one or more properties to the file menu.
     * @param {Array<Object>|Object} properties - An array of property objects or a single property object.
     *        Each property object should have either:
     *        - `staticElement`: The static element to add.
     *        - `newProp`: The new property to add.
     * @throws {Error} Throws if a property does not have the required fields or if adding fails.
     */
    async addProperties(properties) {
        if (!Array.isArray(properties)) {
            properties = [properties];
        }

        try {
            await this.tester.click(FileMenu.FILEMENU_SELECTORS.PANEL_MENU.INFO.BUTTON);

            for (const property of properties) {
                if (property.staticElement) {
                    await this.#addStaticProperty(property.staticElement);
                } else if (property.newProp) {
                    await this.#addNewProperty(property.newProp);
                } else {
                    throw new Error("Property must have either staticElement or newProp defined");
                }
            }
        } catch (error) {
            throw new Error(`addProperties: Failed to add properties. ${error.message}`, { cause: error });
        }
    }

    /**
     * Adds or sets a static property in the file menu panel by its title and value.
     * @param {Object} options - Options for the static property.
     * @param {string} [options.title=""] - The title of the static property to set.
     * @param {string} [options.value=""] - The value to assign to the static property.
     * @throws {Error} Throws if the static property title is unknown.
     * @returns {Promise<void>} Resolves when the property has been set.
     */
    async #addStaticProperty({ title = "", value = "" }) {
        const staticSelectors = FileMenu.FILEMENU_SELECTORS.PANEL_MENU.INFO.PROPERTIES.STATIC;
        const selector = Object.entries(staticSelectors).find(
            ([key]) => key.toUpperCase() === title.toUpperCase()
        )?.[1];

        if (!selector) {
            throw new Error(`Unknown static property title: ${title}`);
        }

        const input = new Input(this.tester, selector, false);
        await input.set(value);
    }

    /**
     * Adds a new property to the file menu by interacting with the modal dialog.
     * @param {Object} options - The options for the new property.
     * @param {string} [options.title=""] - The title of the new property.
     * @param {string} [options.value=""] - The value of the new property.
     * @param {string} [options.type=""] - The type of the new property (e.g., "BOOLEAN").
     * @throws {Error} If title or value is not provided.
     * @returns {Promise<void>} Resolves when the property has been added.
     */
    async #addNewProperty({ title = "", value = "", type = "" }) {
        if (!title || !value) {
            throw new Error("New property must have title and value");
        }

        const selectors = FileMenu.FILEMENU_SELECTORS.PANEL_MENU.INFO.PROPERTIES.ADD_PROPERTY;
        const propertyTypes = FileMenu.ELEMENTS_VALUE.NEW_PROPERTY_VALUE;

        const modal = new ModalButton(
            this.tester,
            selectors.BUTTON,
            selectors.MODAL_WINDOW.MODAL_WINDOW_SELECTOR,
            selectors.MODAL_WINDOW.OK_BUTTON
        );
        await modal.openModal();

        const titleInputForm = new Input(this.tester, selectors.MODAL_WINDOW.TITLE, false);
        await titleInputForm.set(title);

        if (type) {
            const selectTypeDropdown = new Dropdown(this.tester, {
                selector: selectors.MODAL_WINDOW.TYPE.SELECTOR,
                elementsSelector: selectors.MODAL_WINDOW.TYPE.ELEMENTS_SELECTOR,
                elementsValue: Object.values(propertyTypes.TYPE),
            });
            await selectTypeDropdown.selectDropdownItem(type);

            if (type === propertyTypes.TYPE.BOOLEAN && value) {
                const selectBooleanDropdown = new Dropdown(this.tester, {
                    selector: selectors.MODAL_WINDOW.VALUE.BOOLEAN.SELECTOR,
                    elementsSelector: selectors.MODAL_WINDOW.VALUE.BOOLEAN.ELEMENTS_SELECTOR,
                    elementsValue: propertyTypes.VALUE.BOOLEAN,
                });
                await selectBooleanDropdown.selectDropdownItem(value);
                await modal.closeModal();
                return;
            }
        }

        await new Input(this.tester, selectors.MODAL_WINDOW.VALUE, false).set(value);
        await modal.closeModal();
    }

    /**
     * Retrieves the value or text content of a DOM element specified by the selector.
     * If `isInput` is true, it targets the input element within the selector.
     * @param {string} selector - The CSS selector for the target element.
     * @param {boolean} [isInput=false] - Whether to select an input element within the selector.
     * @returns {Promise<string|undefined>} The value or text content of the element, or undefined if not found.
     */
    async #getElementInfo(selector, isInput = false) {
        return await this.tester.frame.evaluate(
            (selector, isInput) => {
                const el = document.querySelector(isInput ? `${selector} input` : selector);
                return el ? el.value ?? el.textContent : undefined;
            },
            selector,
            isInput
        );
    }

    /**
     * Retrieves document information from the file menu panel.
     * @returns {Promise<{common: Object, statistics: Object, properties: Object}>}
     *   An object containing the document's common, statistics, and properties information.
     * @throws {Error} If unable to retrieve document information.
     */
    async getDocumentInfo() {
        try {
            const { COMMON, STATISTICS, PROPERTIES } = FileMenu.FILEMENU_SELECTORS.PANEL_MENU.INFO;

            const fetchFields = async (fields, isInput = false) => {
                const result = {};
                for (const [key, selector] of Object.entries(fields)) {
                    result[key.toLowerCase()] = await this.#getElementInfo(selector, isInput);
                }
                return result;
            };

            await this.tester.click(FileMenu.FILEMENU_SELECTORS.PANEL_MENU.INFO.BUTTON);

            const common = await fetchFields(COMMON);
            const statistics = await fetchFields(STATISTICS);
            const properties = await fetchFields(PROPERTIES.STATIC, true);
            return { common, statistics, properties };
        } catch (error) {
            throw new Error(`getDocumentInfo: Failed to get document information. ${error.message}`);
        }
    }

    async setAdvancedSettings(settings) {
        const advancedSettingsSelectors = FileMenu.FILEMENU_SELECTORS.PANEL_MENU.ADV_SETTINGS;
        const advancedSettings = new AdvancedSettings(this.tester);
        try {
            await this.tester.click(advancedSettingsSelectors.BUTTON);
            await advancedSettings.setSettings(settings);
            await this.tester.click(advancedSettingsSelectors.APPLY);
        } catch (error) {
            throw new Error(`setAdvancedSettings: Failed to set advanced settings. ${error.message}`);
        }
    }
}

module.exports = FileMenu;
