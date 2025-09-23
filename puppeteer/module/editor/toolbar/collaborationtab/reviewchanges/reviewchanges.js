const CollaborationTab = require("../collaborationtab");
const { OptionsButton } = require("../../../../elements");
const selectors = require("./selectors.json");

class ReviewChanges extends CollaborationTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static REVIEW_CHANGES_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        TRACK_CHANGES: ["ON for me", "OFF for me", "ON for me and everyone", "OFF for me and everyone"],
        ACCEPT: ["Accept current change", "Accept all changes"],
        REJECT: ["Reject current change", "Reject All Changes"],
    };

    /**
     * Click the default track changes button or click the track changes button with options.
     * @param {"ON for me" | "OFF for me" | "ON for me and everyone" | "OFF for me and everyone"} [optionValue]
     */
    async trackChanges(optionValue) {
        const trackChangesSelectors = ReviewChanges.REVIEW_CHANGES_SELECTORS.TRACK_CHANGES;
        const trackChangesButton = new OptionsButton(
            this.tester,
            trackChangesSelectors.ELEMENT_SELECTOR,
            trackChangesSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: trackChangesSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: ReviewChanges.TYPES.TRACK_CHANGES,
            }
        );
        try {
            await trackChangesButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`trackChanges: Failed to track changes. ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Click Enable or Cancel button in "Enable track changes" message
     * @param {Boolean} isEnable
     */
    async enableTrackChangesForEveryone(isEnable) {
        const enableMessageSelectors = ReviewChanges.REVIEW_CHANGES_SELECTORS.ENABLE_MESSAGE;
        const enableButtonSelector = isEnable
            ? enableMessageSelectors.ENABLE_BUTTON
            : enableMessageSelectors.CANCEL_BUTTON;

        try {
            await this.tester.checkSelector(enableMessageSelectors.ENABLE_WINDOW);
            await this.tester.click(enableButtonSelector);
        } catch (error) {
            throw new Error(`enableTrackChangesForEveryone: ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Click to previous change
     */
    async previous() {
        try {
            await this.tester.click(ReviewChanges.REVIEW_CHANGES_SELECTORS.PREVIOUS);
        } catch (error) {
            throw new Error(`previous: Failed to click previous ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Click to next change
     */
    async next() {
        try {
            await this.tester.click(ReviewChanges.REVIEW_CHANGES_SELECTORS.NEXT);
        } catch (error) {
            throw new Error(`next: Failed to click next ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Click the accept button or click the accept button with options.
     * @param {"Accept current change" | "Accept all changes"} [optionValue]
     */
    async accept(optionValue) {
        const acceptSelectors = ReviewChanges.REVIEW_CHANGES_SELECTORS.ACCEPT;
        const acceptButton = new OptionsButton(
            this.tester,
            acceptSelectors.ELEMENT_SELECTOR,
            acceptSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: acceptSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: ReviewChanges.TYPES.ACCEPT,
            }
        );
        try {
            await acceptButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`accept: Failed to set accept ${error.message}`, {
                cause: error,
            });
        }
    }

    /**
     * Click the reject button or click the reject button with options.
     * @param {"Reject current change" | "Reject All Changes"} [optionValue]
     */
    async reject(optionValue) {
        const rejectSelectors = ReviewChanges.REVIEW_CHANGES_SELECTORS.REJECT;
        const rejectButton = new OptionsButton(
            this.tester,
            rejectSelectors.ELEMENT_SELECTOR,
            rejectSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: rejectSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: ReviewChanges.TYPES.REJECT,
            }
        );
        try {
            await rejectButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`reject: Failed to set reject ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = ReviewChanges;
