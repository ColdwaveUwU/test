function PageBreakActions(Base) {
    return class extends Base {
        /**
         * Click insert page break button
         */
        async insertPageBreak() {
            const insertPageBreakButton = "section.panel.active span.btn-pagebreak div button";
            await this.clickTargetButton(insertPageBreakButton);
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
            const dropdownSelector = "section.panel.active span.btn-pagebreak div";

            const openPageBreaksDropdown = async () => {
                await this.tester.selectDropdown(dropdownSelector);
            };

            const insertBreak = async (text) => {
                await openPageBreaksDropdown();
                await this.tester.selectByText(text, `${dropdownSelector} ul.dropdown-menu li`);
            };

            if (pageBreaksOptions?.pageBreak) {
                await insertBreak("Insert page break");
            }

            if (pageBreaksOptions?.columnBreak) {
                await insertBreak("Insert column break");
            }

            if (pageBreaksOptions?.section) {
                const sectionOptions = {
                    nextPage: "Next Page",
                    contPage: "Continuous page",
                    evenPage: "Even page",
                    oddPage: "Odd Page",
                };

                for (const [key, value] of Object.entries(pageBreaksOptions.section)) {
                    if (value && sectionOptions[key]) {
                        await openPageBreaksDropdown();
                        await this.tester.click(`${dropdownSelector} li.dropdown-submenu a`);
                        await this.tester.selectByText(
                            sectionOptions[key],
                            `${dropdownSelector} li.dropdown-submenu ul.dropdown-menu li`
                        );
                    }
                }
            }
        }
    };
}

module.exports = PageBreakActions;
