const SubSettings = require("../subsettings");
const selectors = require("./selectors.json");
const { Dropdown } = require("../../../../../../elements");
class DocContent extends SubSettings {
    constructor(tester) {
        super();
        this.tester = tester;
    }

    static DOCCONTENT_SELECTORS = selectors;

    /**
     *
     * @param {{numeral?: string}} docContentSettings
     */
    async setSettings(docContentSettings) {
        const docContentSelectors = DocContent.DOCCONTENT_SELECTORS;

        if (docContentSettings?.numeral) {
            const numberalSelectors = docContentSelectors.NUMBERAL;
            const numberalDropdown = new Dropdown(this.tester, {
                selector: numberalSelectors.SELECTOR,
                elementsSelector: numberalSelectors.ELEMENTS_SELECTOR,
            });
            await numberalDropdown.getItemsAndSelectDropdown(docContentSettings.numeral);
        }
    }
}

module.exports = DocContent;
