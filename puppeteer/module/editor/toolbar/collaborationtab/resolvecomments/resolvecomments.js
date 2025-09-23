const CollaborationTab = require("../collaborationtab");
const { OptionsButton } = require("../../../../elements");
const selectors = require("./selectors.json");

class ResolveComments extends CollaborationTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static RESOLVE_COMMENTS_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        RESOLVE_COMMENTS: ["Resolve current comments", "Resolve my comments", "Resolve all comments"],
    };

    /**
     * Click the default resolve comments button or click the resolve comments button with options.
     * @param {"Resolve current comments" | "Resolve my comments" | "Resolve all comments"} [optionValue]
     */
    async resolveComments(optionValue) {
        const resolveCommentsSelectors = ResolveComments.RESOLVE_COMMENTS_SELECTORS.RESOLVE_COMMENTS;
        const resolveCommentsButton = new OptionsButton(
            this.tester,
            resolveCommentsSelectors.ELEMENT_SELECTOR,
            resolveCommentsSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: resolveCommentsSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: ResolveComments.TYPES.RESOLVE_COMMENTS,
            }
        );
        try {
            await resolveCommentsButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`resolveComments: Failed to resolve comments ${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = ResolveComments;
