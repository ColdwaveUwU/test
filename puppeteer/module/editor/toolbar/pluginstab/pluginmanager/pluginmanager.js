const PluginTab = require("../pluginstab");
const selectors = require("./selectors.json");
const { ModalButton, Input, Button } = require("../../../../elements");

class PluginManager extends PluginTab {
    /**
     * @param {Tester} tester - Tester class
     */
    constructor(tester) {
        super(tester);
        this.frames = {};
    }

    /**
     * @enum
     */
    static PLUGIN_MANAGER_SELECTORS = selectors;

    #pluginManagerModalButton = null;
    /**
     * Get or create Plugin Manager modal button
     * @returns {ModalButton}
     */
    #getPluginManagerModalButton() {
        if (!this.#pluginManagerModalButton) {
            const selectors = PluginManager.PLUGIN_MANAGER_SELECTORS;
            this.#pluginManagerModalButton = new ModalButton(
                this.tester,
                selectors.PLUGIN_MANAGER_BUTTON,
                selectors.PLUGIN_MANAGER_WINDOW,
                selectors.CLOSE_BUTTON
            );
        }
        return this.#pluginManagerModalButton;
    }

    /**
     * Opens the plugin manager
     */
    async openPluginManager() {
        this.frames.frameEditor = this.tester.frame;

        try {
            const pluginManagerButton = this.#getPluginManagerModalButton();
            await pluginManagerButton.openModal();
        } catch (error) {
            throw new Error(`openPluginManager: Failed to open plugin manager. \n${error.message}`, {
                cause: error,
            });
        }
        this.frames.pluginManagerFrame = await this.tester.findFrameByUrl("https://onlyoffice.github.io");
        this.tester.changeCurrentFrame(this.frames.pluginManagerFrame);
    }

    /**
     * Search for a plugin by name
     * @param {string} pluginName - plugin name.
     */
    async searchPlugin(pluginName) {
        const searchPluginInputSelector = PluginManager.PLUGIN_MANAGER_SELECTORS.SEARCH_PLUGIN_INPUT;
        const searchPluginInput = new Input(this.tester, searchPluginInputSelector);

        try {
            await searchPluginInput.set(pluginName);
        } catch (error) {
            throw new Error(`searchPlugin: Failed to search plugin "${pluginName}". \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Click on install button
     */
    async clickInstallButton() {
        this.tester.changeCurrentFrame(this.frames.pluginManagerFrame);

        const installButtonSelector = PluginManager.PLUGIN_MANAGER_SELECTORS.INSTALL_BUTTON;
        const installButton = new Button(this.tester, installButtonSelector);

        try {
            await this.tester.frame.waitForFunction(
                (selector) => {
                    const elements = document.querySelectorAll(selector);
                    return elements.length === 1;
                },
                {},
                installButtonSelector
            );

            await installButton.click();
        } catch (error) {
            throw new Error(`clickInstallButton: Failed to click install button. \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Closes the plugin manager
     */
    async closePluginManager() {
        this.tester.changeCurrentFrame(this.frames.frameEditor);

        try {
            const pluginManagerButton = this.#getPluginManagerModalButton();
            await pluginManagerButton.closeModal();
        } catch (error) {
            throw new Error(`closePluginManager: Failed to close plugin manager. \n${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Install a plugin
     * @param {string} pluginName - plugin name.
     */
    async installPlugin(pluginName) {
        await this.openPluginManager();
        await this.tester.waitSelector(PluginManager.PLUGIN_MANAGER_SELECTORS.PLUGIN_LOADER);
        await this.searchPlugin(pluginName);
        await this.clickInstallButton();
        await this.closePluginManager();
    }
}

module.exports = PluginManager;
