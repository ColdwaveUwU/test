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
            const numeralSelectors = docContentSelectors.NUMBERAL;
            try {
                const numeralDropdown = new Dropdown(this.tester, {
                    selector: numeralSelectors.SELECTOR,
                    elementsSelector: numeralSelectors.ELEMENTS_SELECTOR,
                });
                await numeralDropdown.selectDropdownItem(docContentSettings.numeral);
            } catch (err) {
                throw new Error(
                    `Failed to set numeral="${docContentSettings.numeral}" ` +
                        `(selector="${numeralSelectors.SELECTOR}", elementsSelector="${numeralSelectors.ELEMENTS_SELECTOR}"): ${err.message}`
                );
            }
        }
    }
}

module.exports = DocContent;
