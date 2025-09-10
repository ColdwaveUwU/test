const { Frame, Page, JSHandle } = require("../../engine/node_modules/puppeteer");

/**
 * @typedef TargetPlugin
 * @property {string} key
 * @property {string} pluginId
 */
/**
 * @typedef PagePlugin
 * @property {string} pluginId
 * @property {string} pluginName
 */

/**
 * @typedef PagePlugins
 * @property {Array<PagePlugin>} [plugins]
 * @property {Array<PagePlugin>} [morePlugins]
 */

/**
 * Class interacting with plugins
 */
class Plugin {
    /**
     * @param {TesterImp} tester - Tester class
     * @param {string} selector - plugin button selector
     */
    constructor(tester) {
        this.tester = tester || RegularTester;
        this.frames = {};
        this.pluginSelector = "";
        this.pluginStarted = false;
    }

    /**
     * Attaches a listener for the "frameattached" event to handle frame plugin attachment.
     */
    waitFramePlugin() {
        return new Promise((resolve) => {
            this.tester.page.once("frameattached", async (frame) => {
                await frame.waitForNavigation({ waitUntil: "networkidle0" });
                this.frames.frameEditorPlugin = frame;
                this.tester.changeCurrentFrame(this.frames.frameEditorPlugin);
                this.pluginStarted = true;
                resolve();
            });
        });
    }

    /**
     * Clicks on the selected plugin by selector.
     */
    async clickPlugins() {
        try {
            this.frames.frameEditor = this.tester.frame;
            const pluginsSelector = 'li a[data-tab="plugins"][data-title="Plugins"]';
            await this.tester.click(pluginsSelector);
        } catch (error) {
            throw new Error(`clickPlugins: Failed to clickPlugins. ${error.message}`, { cause: error });
        }
    }

    /**
     * Gets a list of available plugins on the page
     * @returns {Promise<PagePlugins>}
     */
    async getPluginsFromPage() {
        /**
         * @type {Frame}
         */
        const currentFrame = this.tester.getFrame();
        /**
         * @param {NodeList} pluginElements
         * @returns
         */
        const extractPluginInfo = (pluginElements) => {
            /**
             * @type {Array<PagePlugin>}
             */
            const plugins = [];
            pluginElements.forEach((plugin) => {
                /**
                 * @type {Element}
                 */
                const pluginElement = plugin.querySelector(".caption");
                plugins.push({
                    pluginId: plugin.firstElementChild.id,
                    pluginName: pluginElement.textContent,
                });
            });
            return plugins;
        };

        const stringExtractPluginInfo = extractPluginInfo.toString();

        const getFromPanel = async () => {
            const result = await currentFrame.evaluateHandle(async (stringExtractPluginInfo) => {
                const extractPluginInfoFunction = new Function(`return (${stringExtractPluginInfo})`)();
                const pluginsPanelElements = document.querySelectorAll("#plugins-panel span.btn-slot.text.x-huge");
                console.log(pluginsPanelElements);
                const plugins = extractPluginInfoFunction(pluginsPanelElements);
                return await plugins;
            }, stringExtractPluginInfo);
            return await result.jsonValue();
        };

        const getFromMore = async () => {
            const result = await currentFrame.evaluateHandle(async (stringExtractPluginInfo) => {
                const extractPluginInfoFunction = new Function(`return (${stringExtractPluginInfo})`)();
                const morePluginElements = document.querySelectorAll(
                    '#toolbar div[data-tab="plugins"] span.btn-slot.text.x-huge'
                );
                return extractPluginInfoFunction(morePluginElements);
            }, stringExtractPluginInfo);
            return await result.jsonValue();
        };

        try {
            const [panelPlugins, morePlugins] = await Promise.all([getFromPanel(), getFromMore()]);
            return {
                plugins: panelPlugins,
                morePlugins: morePlugins,
            };
        } catch (error) {
            throw new Error(`getPluginsFromPage: Failed to getPluginsFromPage. ${error.message}`, { cause: error });
        }
    }

    /**
     *
     * @param {string} pluginName
     * @param {PagePlugins} plugins
     * @returns {TargetPlugin | null}
     */
    findPluginIdByName(pluginName, plugins) {
        /**
         * @type {Array<PagePlugin>}
         */
        const allPlugins = [...plugins?.plugins, ...plugins?.morePlugins];
        const plugin = allPlugins.find((item) => item.pluginName === pluginName);
        return plugin
            ? { pluginId: plugin.pluginId, key: plugins.morePlugins.includes(plugin) ? "morePlugins" : "plugins" }
            : null;
    }

    /**
     * Main function for interacting with plugins,
     * changes tester.frame to the plugin frame
     */
    async openPlugin(pluginName) {
        try {
            const promise = this.waitFramePlugin();
            await this.clickPlugins();

            if (pluginName) {
                const plugins = await this.getPluginsFromPage();
                const targetPlugin = this.findPluginIdByName(pluginName, plugins);

                /**
                 * @param {string} selector
                 */
                const openPluginFunction = async (selector) => {
                    const pluginSelector = `#${selector}`;
                    await this.tester.click(pluginSelector);
                };

                if (targetPlugin) {
                    if (targetPlugin.key === "morePlugins") {
                        await this.tester.selectDropdown(
                            "#plugins-panel div.more-box",
                            '#toolbar div[data-tab="plugins"]'
                        );
                    }
                    await openPluginFunction(targetPlugin.pluginId);
                } else {
                    console.log(`The plugin '${pluginName}' is not installed.`);
                    await this.tester.close();
                }
            }
            await promise;
        } catch (error) {
            throw new Error(`openPlugin: Failed to openPlugin. ${error.message}`, { cause: error });
        }
    }

    /**
     * Closes the plugin tab, changes the Tester frame to "frameEditor"
     */
    async closePlugin() {
        try {
            this.tester.changeCurrentFrame(this.frames.frameEditor);
            await this.tester.click(`.footer.center button[result="0"]`);
        } catch (error) {
            throw new Error(`closePlugin: Failed to close plugin. ${error.message}`, { cause: error });
        }
    }
}

module.exports = Plugin;
