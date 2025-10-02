const SubSettings = require("../subsettings");
const { Checkbox } = require("../../../../../../elements");
const { AutoCorrect } = require("../../../../../modalwindows");
const selector = require("./selectors.json");
/**
 * @typedef MathAutoCorrect
 * @property {boolean} [asType]
 * @property {string} [replace]
 * @property {string} [by]
 * @property {string} [action]
 */

/**
 * @typedef Recognized
 * @property {string} [value]
 * @property {string} [action]
 */

/**
 * @typedef AutoFormat
 * @property {{quotes?: boolean, hyphens?: boolean, hyperlinks?: boolean, addPeriod?: boolean}} replace
 * @property {{bullet?: boolean, numbered?: boolean}} applyType
 */

/**
 * @typedef AutoCorrect
 * @property {boolean} [sentences]
 * @property {boolean} [cells]
 * @property {string} [exceptions]
 * @property {{value?: string, action?: string}} [dontCapitalize]
 */
class Proofing extends SubSettings {
    constructor(tester) {
        super();
        this.tester = tester;
    }

    static PROOFING_SELECTORS = selector;
    /**
     *
     * @param {{spellCheck?: boolean, ignoreUpper?: boolean,
     *          ignoreNumbers?: boolean,
     *          autoCorrect?: { math?: MathAutoCorrect,
     *                          recognized?: Recognized,
     *                          autoFormat?: AutoFormat
     *                          autoCorrect?: AutoCorrect}}} settings
     */
    async setSettings(settings) {
        const { CHECKBOX, AUTOCORRECT } = Proofing.PROOFING_SELECTORS;
        const checkboxMap = {
            spellCheck: CHECKBOX.SPELL_CHECKING,
            ignoreUpper: CHECKBOX.IGNORE_UPPER,
            ignoreNumbers: CHECKBOX.IGNORE_NUMBERS,
        };

        for (const [key, selector] of Object.entries(checkboxMap)) {
            if (typeof settings[key] === "boolean") {
                const checkBox = new Checkbox(this.tester, selector);
                await checkBox.set(settings[key]);
            }
        }

        if (settings?.autoCorrect) {
            await this.tester.click(AUTOCORRECT.BUTTON);
            const autoCorrect = new AutoCorrect(this.tester);
            await autoCorrect.setAutoCorrectSettings(settings.autoCorrect);
        }
    }
}

module.exports = Proofing;
