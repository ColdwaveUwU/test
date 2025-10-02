const PluginsTab = require("../pluginstab");
const PluginManager = require("../pluginmanager");
const { Button } = require("../../../../elements");

/**
 * Class interacting with plugins
 */
class Plugin extends PluginsTab {
    /**
     * @param {TesterImp} tester - Tester class
     * @param {string} selector - plugin button selector
     */
    constructor(tester) {
        super(tester);
        this.frames = {};
        this.pluginSelector = "";
        this.pluginStarted = false;
        this.pluginManager = new PluginManager(tester);
    }

    /**
     * Changes current frame to the plugin frame
     */
    async waitFramePlugin() {
        try {
            this.frames.frameEditor = this.tester.frame;
            if (!this.frames.frameEditorPlugin) {
                this.frames.frameEditorPlugin = await this.tester.findFrameByUrl("https://onlyoffice.github.io");
            }

            this.tester.changeCurrentFrame(this.frames.frameEditorPlugin);
            this.pluginStarted = true;
        } catch (error) {
            throw new Error(`waitFramePlugin: Failed to wait for plugin frame. ${error.message}`, { cause: error });
        }
    }

    /**
     * Gets installed plugins and finds the plugin GUID by name
     * @param {string} pluginName - plugin name.
     */
    async getPluginGuid(pluginName) {
        try {
            const installedPlugins = await this.tester.frame.evaluate(async () => {
                return window.Asc.editor.pluginMethod_GetInstalledPlugins();
            });

            const foundPlugin = installedPlugins.find(
                (plugin) => plugin.obj && plugin.obj.name && plugin.obj.name.toLowerCase() === pluginName.toLowerCase()
            );

            return foundPlugin ? foundPlugin.obj.guid : false;
        } catch (error) {
            throw new Error(`getPluginGuid: Failed to getPluginGuid. ${error.message}`, { cause: error });
        }
    }

    /**
     * Main function for interacting with plugins,
     * changes tester.frame to the plugin frame
     */
    async openPlugin(pluginName) {
        try {
            if (pluginName) {
                let pluginGuid = await this.getPluginGuid(pluginName);
                if (!pluginGuid) {
                    await this.pluginManager.installPlugin(pluginName);
                    pluginGuid = await this.getPluginGuid(pluginName);
                }

                const pluginSelector = `[data-plugin-guid='${pluginGuid}']`;
                const pluginButton = new Button(this.tester, pluginSelector);

                try {
                    await pluginButton.click();
                } catch (error) {
                    throw new Error(`openPlugin: Failed to open plugin. \n${error.message}`, {
                        cause: error,
                    });
                }
                await this.waitFramePlugin();
            }
        } catch (error) {
            throw new Error(`openPlugin: Failed to openPlugin. ${error.message}`, { cause: error });
        }
    }

    /**
     * Closes the plugin tab by click on OK button, changes the Tester frame to "frameEditor"
     */
    async closeButton() {
        try {
            this.tester.changeCurrentFrame(this.frames.frameEditor);
            await this.tester.click(`.footer.center button[result="0"]`);
        } catch (error) {
            throw new Error(`closeButton: Failed to close plugin. ${error.message}`, { cause: error });
        }
    }
}

module.exports = Plugin;
