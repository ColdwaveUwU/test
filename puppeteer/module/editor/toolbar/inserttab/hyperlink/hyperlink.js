const InsertTab = require("../inserttab");
const { ModalButton, Input, StateButton } = require("../../../../elements");
const selectors = require("./selectors.json");
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

    static HYPERLINK_SELECTORS = selectors;
    #linkModalWindowSelector = "#window-hyperlink";

    #hyperlinkDropdown = null;
    #getHyperlinkDropdown() {
        if (!this.#hyperlinkDropdown) {
            const { HYPERLINK_MODAL } = Hyperlink.HYPERLINK_SELECTORS;
            this.#hyperlinkDropdown = new ModalButton(
                this.tester,
                HYPERLINK_MODAL.SELECTOR,
                HYPERLINK_MODAL.WINDOW,
                HYPERLINK_MODAL.OK_BUTTON
            );
        }
        return this.#hyperlinkDropdown;
    }

    /**
     * Enters values into hyperlink fields
     * @param {string} targetLink
     */
    async #fillLinkForm(targetLink) {
        const formSelectors = Hyperlink.HYPERLINK_SELECTORS.INPUT_FORMS;

        for (const [key, value] of Object.entries(targetLink)) {
            if (value && formSelectors[key]) {
                const inputForm = new Input(this.tester, formSelectors[key], false);
                await inputForm.set(value);
            }
        }
    }

    /**
     * Accepts changes in the hyperlink window
     */
    async #submitForm() {
        const modalWindow = this.#getHyperlinkDropdown();
        await modalWindow.closeModal();
    }

    /**
     * click hyperlink button
     */
    async clickHyperlink() {
        const hyperlinkModalButton = this.#getHyperlinkDropdown();
        await hyperlinkModalButton.openModal();
    }

    /**
     * Adds an external hyperlink
     * @param {ExternalLink} linkSetting
     */
    async addExternalLink(linkSetting) {
        const externalLinkSelectors = Hyperlink.HYPERLINK_SELECTORS.TYPES.EXTERNAL_LINK;
        await this.clickHyperlink();

        const targetLink = {
            link: "",
            display: "",
            screenTip: "",
            ...linkSetting,
        };

        const externalLinkButton = new StateButton(this.tester, externalLinkSelectors.BUTTON);
        await externalLinkButton.setState(true);

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
        const placeInDocSelectors = Hyperlink.HYPERLINK_SELECTORS.TYPES.PLACE;
        const targetLink = {
            linkTo: "Beginning of document",
            display: "",
            screenTip: "",
            ...linkSetting,
        };
        await this.clickHyperlink();
        const externalLinkButton = new StateButton(this.tester, placeInDocSelectors.BUTTON);
        await externalLinkButton.setState(true);

        await this.tester.selectByText(targetLink.linkTo, "#id-dlg-hyperlink-list div.item div.name");

        await this.#fillLinkForm(targetLink);
        await this.#submitForm();
    }
}

module.exports = Hyperlink;
