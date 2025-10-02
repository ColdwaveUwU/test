const Plugin = require("../plugin");

/**
 * @typedef {Object} Option
 * @property {string} language - language name
 * @property {string} style - style name
 * @property {string} tab - tab option
 * @property {string} fontName - font name
 * @property {number} fontSize - font size
 */

/**
 * Represents a plugin for highlighting code
 * @extends {Plugin}
 */
class HighlightCodePlugin extends Plugin {
    /**
     * @param {Tester} tester - Tester class
     */
    constructor(tester) {
        super(tester);
    }

    /**
     * Sets the options for the highlight code plugin.
     * @param {Option} options - object options (language, style, tab, fontName, fontSize)
     */
    async setHighlightCodeOption(options) {
        try {
            const { language, style, tab, fontName, fontSize } = options;

            const selectOption = async (optionSelector, optionValue) => {
                const containerSelector = `#select2-${optionSelector}-container`;
                const dropdownOptionSelector = "li.select2-results__option";

                await this.tester.click(containerSelector);

                const options = await this.tester.parseItems(dropdownOptionSelector);
                const matchedOption = options.find((option) => option.description === optionValue);
                if (!matchedOption) {
                    throw new Error(`Option with value "${optionValue}" not found in "${optionSelector}"`);
                }

                await this.tester.click(matchedOption.className);
            };

            if (language) {
                await selectOption("language_id", language);
            }

            if (style) {
                await selectOption("style_id", style);
            }

            if (tab) {
                const correctTab = tab === "tabs" ? "Use tabs" : `${tab} spaces`;
                await selectOption("tab_replace_id", correctTab);
            }

            // if (rgb || hsl || hex || customColor) {
            //     const backgroundSelector = "#background_color"
            //     await this.tester.click(backgroundSelector)
            //     await this.tester.frame.evaluate(() => {
            //         // $("jq_color").
            //     })
            // }

            if (fontName) {
                await selectOption("fonts", fontName);
            }

            if (fontSize) {
                const fontSizeSelector = "#font_size";
                await this.tester.frame.evaluate((selector) => {
                    const inputElement = document.querySelector(selector);
                    inputElement.select();
                }, fontSizeSelector);
                await this.tester.inputToForm(fontSize, fontSizeSelector);
            }
        } catch (error) {
            throw new Error(`setHighlightCodeOption: Failed to apply code highlight options. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Inputs text into the code highlighting plugin.
     * @param {string} inputText - input text
     * @param {Option} option - object options (language, style, tab, fontName, fontSize)
     */
    async inputHightLightCode(inputText, option) {
        try {
            const textContainerSelector = "#conteiner_id1";

            if (!this.pluginStarted) {
                await this.openPlugin("Highlight code");
            }
            this.tester.changeCurrentFrame(this.frames.frameEditorPlugin);
            const waitPluginLoaded = this.tester.waitSelector(textContainerSelector);
            await waitPluginLoaded;
            if (option) {
                await this.setHighlightCodeOption(option);
            }
            await this.tester.inputToForm(inputText, textContainerSelector);
            await this.closeButton();
        } catch (error) {
            throw new Error(`inputHightLightCode: Failed to input and configure highlighted code. ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = HighlightCodePlugin;
