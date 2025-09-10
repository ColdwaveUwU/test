const CollaborationTab = require("../collaborationtab");
const DocumentUploader = require("../../../../common/documentuploader");
const { OptionsButton } = require("../../../../elements");

class DocumentsCompare extends CollaborationTab {
    constructor(tester, selectors, types) {
        super(tester);
        this.selectors = selectors;
        this.types = types;
    }

    #documentUploader = new DocumentUploader(this.tester);

    async fromFile(filePath) {
        const waitLoading = this.#documentUploader.uploadFromFile(filePath);
        await this.#setCompare(this.types[0]);
        await waitLoading;
    }

    async fromUrl(url) {
        await this.#setCompare(this.types[1]);
        await this.#documentUploader.uploadFromUrl(url);
    }

    async fromStorage() {
        await this.#setCompare(this.types[2]);
        await this.#documentUploader.uploadFromStorage();
    }

    async setSettings(optionValue) {
        try {
            await this.#setCompare(this.types[3]);
            const modal = await this.tester.checkSelector(this.selectors.COMPARISON_SETTINGS.MODAL_WINDOW);

            if (!modal) throw new Error("Comparison settings modal not found!");

            if (optionValue) {
                const radioSelector =
                    optionValue === "Character level"
                        ? this.selectors.COMPARISON_SETTINGS.CHARACTER_LEVEL_RADIO
                        : this.selectors.COMPARISON_SETTINGS.WORD_LEVEL_RADIO;

                await this.tester.checkSelector(radioSelector);
                await this.tester.click(radioSelector);
            }

            await this.tester.click(this.selectors.COMPARISON_SETTINGS.OK_BUTTON);
            await this.tester.checkSelector(this.selectors.COMPARISON_SETTINGS.MODAL_WINDOW, { hidden: true });
        } catch (error) {
            throw new Error(`setSettings: Failed to set comparison settings: "${optionValue}".\n${error.message}`, {
                cause: error,
            });
        }
    }

    async #setCompare(optionValue) {
        try {
            const compareButton = new OptionsButton(
                this.tester,
                this.selectors.COMPARE_CHANGES.ELEMENT_SELECTOR,
                this.selectors.COMPARE_CHANGES.DEFAULT_BUTTON,
                {
                    elementsSelector: this.selectors.COMPARE_CHANGES.DROPDOWN_ELEMENTS_SELECTOR,
                    elementsValue: this.types,
                }
            );
            await compareButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`setCompare: Failed to set compare option: "${optionValue}".\n${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = DocumentsCompare;
