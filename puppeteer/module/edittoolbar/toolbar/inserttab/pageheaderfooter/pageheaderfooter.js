const InsertTab = require("../inserttab");

/**
 * @typedef {Object} NumberPosition
 * @property {string} [top]
 * @property {string} [bottom]
 */
class PageHeaderFooter extends InsertTab {
    constructor(tester) {
        super(tester, "#id-toolbar-btn-editheader");
    }

    /**
     * Open header&footer dropdown
     */
    async clickHeaderFooter() {
        await this.clickTargetButton();
    }

    async #closeHeaderFooter() {
        await this.tester.keyPress("Escape");
    }

    /**
     * Edits the page header
     * @param {string} headerText
     */
    async editHeader(headerText) {
        await this.clickHeaderFooter();
        await this.tester.selectByText("Edit header", `${this.targetButton} ul.dropdown-menu li a`);

        if (headerText) {
            await this.tester.input(headerText);
        }
    }

    /**
     * Edits the page footer
     * @param {string} footerText
     */
    async editFooter(footerText) {
        await this.clickHeaderFooter();
        await this.tester.selectByText("Edit footer", `${this.targetButton} ul.dropdown-menu li a`);

        if (footerText) {
            await this.tester.input(footerText);
        }
    }

    async close() {
        await this.#closeHeaderFooter();
    }

    /**
     * remove Header
     */
    async removeHeader() {
        await this.clickHeaderFooter();
        await this.tester.selectByText("Remove header", `${this.targetButton} ul.dropdown-menu li a`);
    }

    /**
     * remove Footer
     */
    async removeFooter() {
        await this.clickHeaderFooter();
        await this.tester.selectByText("Remove footer", `${this.targetButton} ul.dropdown-menu li a`);
    }

    /**
     * Adds the page number to a specific position
     * @param {NumberPosition} [numberPosition] - if not specified, the current position is used
     */
    async insertPageNumber(numberPosition = {}) {
        await this.clickHeaderFooter();
        await this.tester.click(`${this.targetButton} ul.dropdown-menu li.dropdown-submenu a`);
        const hasKeys = Object.keys(numberPosition).length > 0;
        console.log(`${this.targetButton} ul.dropdown-menu.shifted-left li a`);
        if (!hasKeys) {
            await this.tester.selectByText(
                "To current position",
                `${this.targetButton} ul.dropdown-menu.shifted-left li a`
            );
        } else {
            const targetNumberPosition = {
                top: "",
                bottom: "",
                ...numberPosition,
            };

            await this.tester.frame.evaluate(
                (targetNumberPosition, buttonSelector) => {
                    const posSelectors = `${buttonSelector} #id-toolbar-menu-pageposition div.item`;
                    const elements = document.querySelectorAll(posSelectors);
                    const topElements = Array.from(elements).slice(0, 3);
                    const bottomElements = Array.from(elements).slice(3, 6);

                    const createPositionObject = (elements) => {
                        return {
                            left: elements[0],
                            center: elements[1],
                            right: elements[2],
                        };
                    };

                    const positions = {
                        top: createPositionObject(topElements),
                        bottom: createPositionObject(bottomElements),
                    };
                    console.log(positions);
                    if (targetNumberPosition?.top) {
                        const topPosition = targetNumberPosition.top.toLowerCase();
                        positions.top[topPosition].click();
                    } else if (targetNumberPosition?.bottom) {
                        const bottomPosition = targetNumberPosition.bottom.toLowerCase();
                        positions.bottom[bottomPosition].click();
                    }
                },
                targetNumberPosition,
                this.targetButton
            );
        }
    }

    /**
     * Insert number of pages
     */
    async insertPagesNumber() {
        await this.clickHeaderFooter();
        await this.tester.selectByText("Insert number of pages", `${this.targetButton} ul.dropdown-menu li a`);
    }
}

module.exports = PageHeaderFooter;
