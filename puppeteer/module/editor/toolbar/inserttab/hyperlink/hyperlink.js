const InsertTab = require("../inserttab");

/**
 * @typedef {Object} ExternalLink
 * @property {string} link - url link
 * @property {string} [display] - display text
 * @property {string} [screenTip] - screenTip text
 */

/**
 * @typedef {Object} InternalLink
 * @property {string} [linkTo] - The target location within the document.
 * @property {"Beginning of document" | "Headings" | "Bookmarks"} [display] - The display text for the hyperlink.
 * @property {string} [screenTip] - The screen tip (tooltip) for the hyperlink.
 */

class Hyperlink extends InsertTab {
    constructor(tester) {
        super(tester, "span.slot-inshyperlink");
    }

    #linkModalWindowSelector = "#window-hyperlink";

    /**
     * Enters values into hyperlink fields
     * @param {string} targetLink
     */
    async #fillLinkForm(targetLink) {
        const formSelectors = {
            link: "#id-dlg-hyperlink-url input",
            display: "#id-dlg-hyperlink-display input",
            screenTip: "#id-dlg-hyperlink-tip input",
        };

        for (const [key, value] of Object.entries(targetLink)) {
            if (value && formSelectors[key]) {
                if (key === "display") {
                    await this.tester.frame.evaluate((selector) => {
                        const textarea = document.querySelector(selector);
                        textarea.focus();
                        textarea.select();
                    }, formSelectors[key]);
                }
                await this.tester.inputToForm(value, formSelectors[key]);
            }
        }
    }

    /**
     * Accepts changes in the hyperlink window
     */
    async #submitForm() {
        const okButton = `${this.#linkModalWindowSelector} div.footer button[result="ok"]`;
        await this.tester.click(okButton);

        if (await this.tester.checkSelector(this.#linkModalWindowSelector)) {
            console.error("Hyperlink: Error when submitting the hyperlink form.");
        }
    }

    /**
     * click hyperlink button
     */
    async clickHyperlink() {
        const waitHyperLinksOpen = this.tester.frame.waitForSelector("#window-hyperlink");
        await this.clickTargetButton();
        await waitHyperLinksOpen;
    }

    /**
     * Adds an external hyperlink
     * @param {ExternalLink} linkSetting
     */
    async addExternalLink(linkSetting) {
        await this.clickHyperlink();

        const targetLink = {
            link: "",
            display: "",
            screenTip: "",
            ...linkSetting,
        };

        await this.tester.click("#id-dlg-hyperlink-external");

        if (targetLink?.link) {
            await this.#fillLinkForm(targetLink);
            await this.#submitForm();
        } else {
            console.error("Hyperlink.addExternalLink(): The link is not specified.");
        }
    }

    /**
     * Adds internal hyperlink
     * @param {InternalLink} [linkSetting] - The settings for the internal link.
     */
    async placeInDoc(linkSetting) {
        const targetLink = {
            linkTo: "Beginning of document",
            display: "",
            screenTip: "",
            ...linkSetting,
        };
        await this.clickHyperlink();
        await this.tester.click("#id-dlg-hyperlink-internal");
        await this.tester.selectByText(targetLink.linkTo, "#id-dlg-hyperlink-list div.item div.name");

        await this.#fillLinkForm(targetLink);
        await this.#submitForm();
    }
}

module.exports = Hyperlink;
