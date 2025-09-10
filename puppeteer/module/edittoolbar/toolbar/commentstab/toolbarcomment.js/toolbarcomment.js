const CommentTab = require("../commentstab.js");
const selectors = require("./selectors.json");
class ToolbarComment extends CommentTab {
    constructor(tester) {
        super(tester);
    }

    static COMMENT_TAB_SELECTORS = selectors;

    /**
     * @enum
     */
    static STAMP_TYPES = [
        "Approved Date",
        "Received Date",
        "Reviewed Date",
        "Revised Date",
        "Expired",
        "Approved",
        "Complete",
        "Confidential",
        "Draft",
        "Final",
        "For Comment",
        "For Public Release",
        "Information Only",
        "Not Approved",
        "Not For Public Release",
        "Preliminary Results",
        "Revised",
        "Void",
        "Initial",
        "Sign Here",
        "Witness",
    ];

    /**
     * Opens the dropdown to select stamp types.
     */

    async #openStampDropdown() {
        await this.tester.click(ToolbarComment.COMMENT_TAB_SELECTORS.STAMP_DROPDOWN_BUTTON);
    }

    /**
     * Clicks the stamp button to set the default stamp.
     */

    async #clickStampButton() {
        await this.tester.click(ToolbarComment.COMMENT_TAB_SELECTORS.STAMP_BUTTON);
    }

    /**
     * Selects a stamp by its label.
     * If stampName is not provided, the stamp button will be clicked.
     * @param {"Approved Date" | "Received Date" | "Reviewed Date" | "Revised Date" | "Expired"
     *        | "Approved" | "Complete" | "Confidential" | "Draft" | "Final" | "For Comment"
     *        | "For Public Release" | "Information Only" | "Not Approved" | "Not For Public Release"
     *        | "Preliminary Results" | "Revised" | "Void" | "Initial" | "Sign Here" | "Witness"} [stampName]
     */
    async selectStamp(stampName) {
        if (!stampName) {
            await this.#clickStampButton();
            return;
        }
        await this.#openStampDropdown();

        const stampTypes = await this.tester.parseItems(
            ToolbarComment.COMMENT_TAB_SELECTORS.STAMP_TYPES_LIST,
            ToolbarComment.COMMENT_TAB_SELECTORS.STAMP_TYPE_ELEMENT
        );

        const stampsWithDescriptions = stampTypes.map((item, index) => ({
            description: ToolbarComment.STAMP_TYPES[index],
            count: item.count,
            index: item.index,
            id: item.id,
        }));

        const normalizedStampName = stampName.replace(/\s+/g, "_").toUpperCase();
        const stamp = stampsWithDescriptions.find(
            (stamp) => stamp.description.toUpperCase().replace(/\s+/g, "_") === normalizedStampName
        );

        if (!stamp) {
            throw new Error(`No stamp found. Name: "${stampName}".`);
        }

        const elementExists = await this.tester.checkSelector(stamp.id);
        if (elementExists) {
            await this.tester.click(stamp.id);
        } else {
            throw new Error(`Element with selector "${stamp.id}" not found on the page.`);
        }
    }
}

module.exports = ToolbarComment;
