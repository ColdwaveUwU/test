const { FileMenu } = require("../../../../module/editor");
const { Dropdown, Input } = require("../../../../module/elements");
const selectors = require("./selectors.json");

class WopiFileMenu extends FileMenu {
    constructor(tester) {
        super(tester);
    }

    static WOPI_FILEMENU_SELECTORS = { ...selectors, ...FileMenu.FILEMENU_SELECTORS };

    /**
     *
     * @param {string} [newFileName]
     */
    async #renameBeforeSaving(newFileName) {
        const renameSelectors = WopiFileMenu.WOPI_FILEMENU_SELECTORS.NEW_NAME;
        if (newFileName) {
            const inputForm = new Input(this.tester, renameSelectors.INPUT_FORM);
            await inputForm.set(newFileName);
        }

        await this.tester.click(renameSelectors.OK_BUTTON);
    }

    /**
     *
     */
    async createNew() {
        console.log(`createNew not available in provider ${globalThis.providerName}`);
    }

    /**
     *
     * @param {string} format
     * @param {string} [newFileName]
     * @param {string} [encode]
     */
    async saveCopyAs(format, newFileName = "", encode = "Unicode (UTF-8)") {
        try {
            const saveCopyAsSelectos = WopiFileMenu.WOPI_FILEMENU_SELECTORS.PANEL_MENU.SAVE_COPY_AS;

            await this.tester.click(saveCopyAsSelectos.BUTTON);
            const fileTypeSelector = saveCopyAsSelectos.FILE_TYPE[format.toUpperCase()];
            await this.tester.click(fileTypeSelector);
            await this.#renameBeforeSaving(newFileName);

            const modalWindowIsClosed = await this.tester.checkModalMask();
            if (!modalWindowIsClosed) {
                await this.tester.click(saveCopyAsSelectos.WARNING_WINDOW.OK_BUTTON);

                const encodingWindowIsClosed = await this.tester.checkModalMask();
                if (!encodingWindowIsClosed) {
                    const dropdownElement = new Dropdown(this.tester, {
                        selector: saveCopyAsSelectos.ENCODING_WINDOW.SELECTOR,
                        elementsSelector: saveCopyAsSelectos.ENCODING_WINDOW.ELEMENTS_SELECTOR,
                        elementsValue: FileMenu.ELEMENTS_VALUE.ENCODING,
                    });

                    await dropdownElement.selectDropdownItem(encode);
                    await this.tester.click(saveCopyAsSelectos.ENCODING_WINDOW.OK_BUTTON);
                }
            }
        } catch (error) {
            throw new Error(`saveCopyAs: Failed to saveCopyAs the document. ${error.message}`, { cause: error });
        }
    }

    /**
     *
     * @param {} settings
     */
    async setAdvancedSettings(settings) {
        const excludedKeysStructure = {
            editing: {
                autosave: true,
            },
            collab: {
                coEditing: true,
            },
        };

        const filterObjectByExclusions = (inputObject, exclusionsMap, currentPath = []) => {
            if (inputObject === null || typeof inputObject !== "object") {
                return inputObject;
            }

            if (Array.isArray(inputObject)) {
                return inputObject.map((item, index) =>
                    filterObjectByExclusions(item, exclusionsMap, [...currentPath, index])
                );
            }

            return Object.entries(inputObject).reduce((filteredObject, [property, value]) => {
                if (exclusionsMap && property in exclusionsMap) {
                    if (exclusionsMap[property] === true) {
                        console.log(
                            `The key "${[...currentPath, property].join(".")}" is excluded in ${
                                globalThis.providerName
                            }`
                        );
                        return filteredObject;
                    } else if (typeof exclusionsMap[property] === "object") {
                        filteredObject[property] = filterObjectByExclusions(value, exclusionsMap[property], [
                            ...currentPath,
                            property,
                        ]);
                        return filteredObject;
                    }
                }

                filteredObject[property] = filterObjectByExclusions(value, undefined, [...currentPath, property]);
                return filteredObject;
            }, {});
        };

        const filteredSettings = filterObjectByExclusions(settings, excludedKeysStructure);

        await super.setAdvancedSettings(filteredSettings);
    }
}

module.exports = WopiFileMenu;
