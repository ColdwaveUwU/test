const BaseSettings = require("../../../basesettings");
const selectors = require("./selectors.json");
const { Checkbox } = require("../../../../../../elements");
class LineSettings extends BaseSettings {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static LINE_SELECTORS = selectors;

    /**
     * Sets "Page break before" checkbox
     * @param {boolean} [condition]
     */
    async setPageBreakBefore(condition) {
        const pageBreakBeforeSelector = LineSettings.LINE_SELECTORS.PAGE_BREAK_BEFORE_CHECKBOX;
        const checkbox = new Checkbox(this.tester, pageBreakBeforeSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets "Orphan control" checkbox
     * @param {boolean} [condition]
     */
    async setOrphanControl(condition) {
        const orphanControlSelector = LineSettings.LINE_SELECTORS.ORPHAN_CONTROL_CHECKBOX;
        const checkbox = new Checkbox(this.tester, orphanControlSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets "Supress line numbers" checkbox
     * @param {boolean} [condition]
     */
    async setSuppressLineNumbers(condition) {
        const suppressLineNumbersSelector = LineSettings.LINE_SELECTORS.SUPPRESS_LINE_NUMBERS_CHECKBOX;
        const checkbox = new Checkbox(this.tester, suppressLineNumbersSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets "Keep lines together" checkbox
     * @param {boolean} [condition]
     */
    async setKeepLinesTogether(condition) {
        const keepLinesTogetherSelector = LineSettings.LINE_SELECTORS.KEEP_LINES_TOGETHER_CHECKBOX;
        const checkbox = new Checkbox(this.tester, keepLinesTogetherSelector);
        await checkbox.set(condition);
    }

    /**
     * Sets "Keep with next" checkbox
     * @param {boolean} [condition]
     */
    async setKeepWithNext(condition) {
        const keepWithNextSelector = LineSettings.LINE_SELECTORS.KEEP_WITH_NEXT_CHECKBOX;
        const checkbox = new Checkbox(this.tester, keepWithNextSelector);
        await checkbox.set(condition);
    }

    async applySettings(lineSettings) {
        const settingsMap = {
            pageBreakBefore: this.setPageBreakBefore.bind(this),
            orphanControl: this.setOrphanControl.bind(this),
            suppressLineNumbers: this.setSuppressLineNumbers.bind(this),
            keepLinesTogether: this.setKeepLinesTogether.bind(this),
            keepWithNext: this.setKeepWithNext.bind(this),
        };

        for (const [key, method] of Object.entries(settingsMap)) {
            if (lineSettings[key]) {
                await method(lineSettings[key]);
            }
        }
    }
}

module.exports = LineSettings;
