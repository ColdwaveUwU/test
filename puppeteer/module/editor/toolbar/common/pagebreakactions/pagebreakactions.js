const { createExecuteAction, createErrorHandler } = require("../../../../../engine/script/js");
const { OptionsButton, Button } = require("../../../../elements");
const selectors = require("./selectors.json");
const options = require("./options.json");

/**
 * @typedef {Object} InsertPageBreakObject
 * @property { "Insert page break" | "Insert column break" | "Insert section break" } optionValue - The value of the option to select from the dropdown.
 */

/**
 * @typedef {Object} InsertSectionBreakObject
 * @property { "Next Page" | "Continuous page" | "Even page" | "Odd Page" } optionValue - The value of the option to select from the dropdown.
 */

/**
 * @typedef {Object} SectionBreakOption
 * @property {boolean} nextPage - Add a section break on the next page
 * @property {boolean} contPage - Add a section break on the continuous page
 * @property {boolean} evenPage - Add a section break on the even page
 * @property {boolean} oddPage - Add a section break on the odd page
 */

/**
 * @typedef {Object} PageBreaksOptions
 * @property {boolean} [pageBreak] - Add a page break
 * @property {boolean} [columnBreak] - Add a column break
 * @property {SectionBreakOption} [section] - Add a section break
 */

function PageBreakActions(Base) {
    return class extends Base {
        constructor(tester) {
            super(tester);
            this.handleError = createErrorHandler(this.constructor.name);
            this.executeAction = createExecuteAction(this.tester, this.handleError);
            this.selectors = selectors;
            this.options = options;
        }

        /**
         * Click insert page break button
         * @param { InsertPageBreakObject } [optionValue] - The value of the option to select from the dropdown.
         */
        async insertPageBreak(optionValue = null) {
            const selectors = this.selectors.PAGE_BREAK_BUTTON;
            await this.executeAction(
                OptionsButton,
                selectors.selector,
                "setOption",
                "insertPageBreak",
                [optionValue],
                [selectors.defaultButton, { ...selectors }]
            );
        }

        /**
         * Click insert section break button
         * @param {InsertSectionBreakObject} [optionValue] - The value of the option to select from the dropdown.
         */
        async insertSectionBreak(optionValue) {
            await this.executeAction(Button, selectors.dropdownToggle, "click", "insertSectionBreak");
            await this.insertPageBreak(this.options.pageBreakOptions.sectionBreak);
            await this.insertPageBreak(optionValue);
        }

        /**
         * Adds a page break with settings such as page break, column break, section break
         * @param {PageBreaksOptions} options
         */
        async insertPageBreakWithOptions(options = {}) {
            const pageBreaksOptions = {
                pageBreak: false,
                columnBreak: false,
                ...options,
            };

            if (pageBreaksOptions?.pageBreak) {
                await this.insertPageBreak(this.options.pageBreakOptions.pageBreak);
            }

            if (pageBreaksOptions?.columnBreak) {
                await this.insertPageBreak(this.options.pageBreakOptions.columnBreak);
            }

            if (pageBreaksOptions?.section) {
                const sectionOptions = this.options.sectionBreakOptions;
                for (const [key, value] of Object.entries(pageBreaksOptions.section)) {
                    if (value && sectionOptions[key]) {
                        await this.insertSectionBreak(sectionOptions[key]);
                    }
                }
            }
        }
    };
}

module.exports = PageBreakActions;
