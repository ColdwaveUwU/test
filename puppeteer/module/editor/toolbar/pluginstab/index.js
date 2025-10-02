const PluginManager = require("./pluginmanager");
const YoutubePlugin = require("./plugins/youtube");
const HighlightCodePlugin = require("./plugins/highlightcode");

const PluginsTab = {
    PluginManager,
    YoutubePlugin,
    HighlightCodePlugin,
};

module.exports = PluginsTab;
