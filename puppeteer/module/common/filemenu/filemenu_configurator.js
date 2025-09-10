const exampleFileMenuConfigs = require("./config/fileMenu.json");
const owncloudFileMenuConfigs = require("../../../providers/owncloud/owncloudProviders/config/OwnCloudFileMenu.json");
const docspaceFileMenuConfigs = require("../../../providers/docspace/config/docspaceFileMenuConfig.json");
const wopiFileMenuConfigs = require("../../../providers/wopi/config/wopiFileMenuConfigs.json");
/**
 * Configurator for file menu actions with provider-specific logic.
 */
class FileMenuConfigurator {
    /**
     * Initializes a new instance of the FileMenuConfigurator class.
     * @param {Object} tester - The tester instance used for configuration.
     */
    constructor(tester) {
        this.tester = tester;
        this.providerAddonClassName = this.tester.providerAddon ? this.tester.providerAddon.constructor.name : null;
        this.exampleFileMenuConfigs = exampleFileMenuConfigs;
    }

    /**
     * Recursively traverses the actions tree to find the deepest childElement
     * and adds the provided JSON object to it.
     *
     * @param {Object} actions - The current action object in the traversal
     * @param {Object} json - The JSON object to add to the deepest childElement
     * @returns {Object} - The modified actions object with the JSON appended
     */
    async #setToLastChildElement(actions, subsetActions) {
        try {
            // Make a deep copy to avoid modifying the original object
            const result = JSON.parse(JSON.stringify(actions));

            if (!result.childElements || result.childElements.length === 0) {
                result.childElements = result.childElements || [];
                result.childElements.push(subsetActions);
                return result;
            }

            const lastChildIndex = result.childElements.length - 1;
            const lastChild = result.childElements[lastChildIndex];

            result.childElements[lastChildIndex] = await this.#setToLastChildElement(lastChild, subsetActions);

            return result;
        } catch (error) {
            throw new Error(`#setToLastChildElement: Failed to set last child element. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Creates a queue of actions based on provided selectors and settings.
     * @param {Object} selectors - The configuration selectors for actions.
     * @param {Object} settings - The settings object containing action configuration.
     * @param {Object|null} subsetActions - Optional subset of actions to append.
     * @returns {Promise<Array>} - The constructed queue of actions.
     */
    async #createActionsQueue(selectors, settings, subsetActions = null) {
        try {
            const editorSettingsByType = this.tester.getSettingsByDocType(selectors);
            const actionsQueue = await this.tester.createActionsQueue({ file: settings }, editorSettingsByType);

            if (subsetActions) {
                actionsQueue[0] = await this.#setToLastChildElement(actionsQueue[0], subsetActions);
            }

            return actionsQueue;
        } catch (error) {
            throw new Error(`#createActionsQueue: Failed to create actions queue. ${error.message}`, { cause: error });
        }
    }
    /**
     * Gets a setting value using provided selectors and path.
     * @param {Object} selectors - Configuration selectors for actions.
     * @param {Object} path - Path object specifying the setting to fetch.
     * @returns {Promise<any>} Resolves to the fetched setting value.
     */
    async #getSettingValue(selectors, path) {
        try {
            const actionsQueue = await this.#createActionsQueue(selectors, { info: { documentInfo: path } });
            return await this.tester.startActions(actionsQueue);
        } catch (error) {
            throw new Error(`#getSettingValue: Failed to get setting value. ${error.message}`, { cause: error });
        }
    }

    /**
     * Retrieves multiple setting values for the given paths and information type.
     * @param {Object} selectors - Configuration selectors for actions.
     * @param {Object} paths - An object mapping keys to path objects for settings retrieval.
     * @param {string} infoType - The type of information to retrieve from paths.
     * @returns {Promise<Object>} A promise resolving to an object containing all retrieved values.
     */
    async #getInfoValues(selectors, paths, infoType) {
        try {
            const promises = Object.entries(paths[infoType]).map(async ([key, path]) => {
                const value = await this.#getSettingValue(selectors, path);
                return { [key]: value };
            });

            const results = await Promise.all(promises);
            return results.reduce((acc, obj) => ({ ...acc, ...obj }), {});
        } catch (error) {
            throw new Error(`#getInfoValues: Failed to get info values. ${error.message}`, { cause: error });
        }
    }

    /**
     * Click the file menu
     * @param {Object} settings - Settings for the click action
     * @returns {Promise<Array>} Action queue
     */
    async clickFileMenu(settings) {
        try {
            return await this.#createActionsQueue(exampleFileMenuConfigs, settings);
        } catch (error) {
            throw new Error(`clickFileMenu: Failed to click file menu. ${error.message}`, { cause: error });
        }
    }

    /**
     * Save the document
     * @param {Object} settings - Settings for the save action
     * @returns {Promise<Array>} Action queue
     */
    async save(settings) {
        try {
            if (this.providerAddonClassName == "WopiProvider") {
                console.log(`[STAND CONFIG] ${this.providerAddonClassName}: disabling auto-save is not implemented.`);
                return;
            }

            return await this.#createActionsQueue(exampleFileMenuConfigs, settings);
        } catch (error) {
            throw new Error(`save: Failed to save the document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Download the document as a specific format
     * @param {string} settings - Format to download as
     * @param {string} encode - Encoding to use
     * @returns {Promise<Array>} Action queue
     */
    async downloadAs(settings, encode) {
        try {
            const downloadAs = {
                downloadAs: {
                    downloadAs: {
                        [settings]: settings === "txt" ? { encoding: { encoding: encode } } : true,
                    },
                },
            };

            if (settings === "rtf") {
                downloadAs.downloadAs.downloadAs[settings] = true;
            }

            return this.#createActionsQueue(exampleFileMenuConfigs, downloadAs);
        } catch (error) {
            throw new Error(`downloadAs: Failed to download document as ${settings}. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Save a copy of the document in a specific format
     * @param {string} settings - Format to save as
     * @param {string} encode - Encoding to use
     * @returns {Promise<Array>} Action queue
     */
    async saveCopyAs(settings, encode) {
        try {
            let saveCopyAsConfig = {
                saveCopyAs: {
                    saveCopyAs: {
                        [settings]: settings === "txt" ? { encoding: { encoding: encode } } : true,
                    },
                },
            };

            if (settings === "rtf") {
                saveCopyAsConfig.saveCopyAs.saveCopyAs[settings] = true;
            }

            switch (this.providerAddonClassName) {
                case "OwnCloudProvider":
                    return this.#createActionsQueue(
                        exampleFileMenuConfigs,
                        saveCopyAsConfig,
                        owncloudFileMenuConfigs.file.childElements[1].chooseFolderAfterSaveCopy
                    );
                case "DocSpaceProvider":
                    return this.#createActionsQueue(
                        exampleFileMenuConfigs,
                        saveCopyAsConfig,
                        docspaceFileMenuConfigs.file.childElements[0].saveHere
                    );
                case "WopiProvider":
                    return this.#createActionsQueue(
                        exampleFileMenuConfigs,
                        saveCopyAsConfig,
                        wopiFileMenuConfigs.file.childElements[0].dialogButtonClickOk
                    );
                default:
                    return this.#createActionsQueue(exampleFileMenuConfigs, saveCopyAsConfig);
            }
        } catch (error) {
            throw new Error(`saveCopyAs: Failed to save a copy of the document as ${settings}. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Rename the document
     * @param {Object} settings - Settings for the rename action
     * @returns {Promise<Array|boolean>} Action queue or false if skipped
     */
    async rename(settings) {
        try {
            let rename = { rename: { rename: { rename: settings } } };

            if (this.providerAddonClassName === "OwnCloudProvider") {
                console.log("[STAND CONFIG] Skip rename scenario for OwnCloudProvider");
                return false;
            }

            return await this.#createActionsQueue(exampleFileMenuConfigs, rename);
        } catch (error) {
            throw new Error(`rename: Failed to rename the document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Create a new document
     * @param {Object} settings - Settings for the create action
     * @returns {Promise<Array>} Action queue
     */
    async createNew(settings) {
        try {
            switch (this.providerAddonClassName) {
                case "OwnCloudProvider":
                    console.log(`[STAND CONFIG] ${this.providerAddonClassName}: creating Blank document only.`);
                    return await this.#createActionsQueue(exampleFileMenuConfigs, { createNew: {} });
                case "DocSpaceProvider":
                    console.log(`[STAND CONFIG] ${this.providerAddonClassName}: creating Blank document only.`);
                    return await this.#createActionsQueue(exampleFileMenuConfigs, { createNew: {} });
                case "WopiProvider":
                    console.log(`[STAND CONFIG] ${this.providerAddonClassName}: 9.0.0.97 createNew is not implemented`);
                    return;
                default:
                    return await this.#createActionsQueue(exampleFileMenuConfigs, {
                        createNew: { createNew: settings },
                    });
            }
        } catch (error) {
            throw new Error(`createNew: Failed to create a new document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Protect the document with password
     * @param {Object} settings - Settings for the protect action
     * @param {string} action - Type of password action
     * @returns {Promise<Array>} Action queue
     */
    async protect(settings, action) {
        try {
            const actionType = action.split("Password")[0];
            return await this.#createActionsQueue(exampleFileMenuConfigs, {
                protect: { protect: { [actionType]: settings[action] } },
            });
        } catch (error) {
            throw new Error(`protect: Failed to protect the document. ${error.message}`, { cause: error });
        }
    }

    /**
     * Add properties to the document
     * @param {Object} settings - Properties to add
     * @returns {Promise<Array>} Action queue
     */
    async addProperties(settings) {
        try {
            return await this.#createActionsQueue(exampleFileMenuConfigs, {
                info: { documentInfo: { properties: settings } },
            });
        } catch (error) {
            throw new Error(`addProperties: Failed to add properties to the document. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Get document information
     * @returns {Promise<Object>} Document information
     */
    async getDocumentInfo() {
        try {
            const paths = {
                common: {
                    owner: { common: { owner: true } },
                    uploaded: { common: { uploaded: true } },
                },
                statistics: {
                    pages: { statistics: { pages: true } },
                    paragraphs: { statistics: { paragraphs: true } },
                    words: { statistics: { words: true } },
                    characters: { statistics: { characters: true } },
                    charactersWithSpaces: { statistics: { charactersWithSpaces: true } },
                },
                properties: {
                    author: { properties: { getAuthor: true } },
                    title: { properties: { getTitle: true } },
                    tags: { properties: { getTag: true } },
                    subject: { properties: { getSubject: true } },
                    comment: { properties: { getComment: true } },
                    customProp: { properties: { getCustomProperty: true } },
                },
            };

            const settingsQueue = await this.#createActionsQueue(exampleFileMenuConfigs, {
                info: { documentInfo: true },
            });
            await this.tester.startActions(settingsQueue);

            const infoActions = ["common", "statistics", "properties"];
            const [common, statistics, properties] = await Promise.all([
                this.#getInfoValues(exampleFileMenuConfigs, paths, infoActions[0]),
                this.#getInfoValues(exampleFileMenuConfigs, paths, infoActions[1]),
                this.#getInfoValues(exampleFileMenuConfigs, paths, infoActions[2]),
            ]);

            return { common, statistics, properties };
        } catch (error) {
            throw new Error(`getDocumentInfo: Failed to get document information. ${error.message}`, { cause: error });
        }
    }

    /**
     * Set advanced settings
     * @param {Object} settings - Advanced settings to apply
     * @returns {Promise<Array>} Action queue
     */
    async setAdvancedSettings(settings) {
        try {
            switch (this.providerAddonClassName) {
                case "OwnCloudProvider":
                    return this.#createActionsQueue(owncloudFileMenuConfigs, { advancedSettings: settings });
                case "WopiProvider":
                    return this.#createActionsQueue(wopiFileMenuConfigs, { advancedSettings: settings });
                default:
                    return this.#createActionsQueue(exampleFileMenuConfigs, { advancedSettings: settings });
            }
        } catch (error) {
            throw new Error(`setAdvancedSettings: Failed to set advanced settings. ${error.message}`, { cause: error });
        }
    }

    /**
     * Apply advanced settings
     * @param {Object} settings - Optional settings for apply action
     * @returns {Promise<Array>} Action queue
     */
    async setAdvancedSettingsApply() {
        try {
            return this.#createActionsQueue(exampleFileMenuConfigs, { advancedSettings: { apply: true } });
        } catch (error) {
            throw new Error(`setAdvancedSettingsApply: Failed to apply advanced settings. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = FileMenuConfigurator;
