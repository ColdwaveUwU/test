const Plugin = require("../plugin");

/**
 * Represents a plugin for interacting with YouTube
 * @extends {Plugin}
 */
class YoutubePlugin extends Plugin {
    /**
     * @param {Tester} tester - Tester class
     */
    constructor(tester) {
        super(tester);
    }

    /**
     * Adds Youtube videos to the editor
     * @param {string} url - video url.
     */
    async addVideo(url) {
        if (!this.pluginStarted) {
            await this.openPlugin("YouTube");
        }

        this.tester.changeCurrentFrame(this.frames.frameEditorPlugin);
        await this.tester.inputToForm(url, "#textbox_url");
        await this.tester.click("#textbox_button");
        await this.closePlugin();
    }
}

module.exports = YoutubePlugin;
