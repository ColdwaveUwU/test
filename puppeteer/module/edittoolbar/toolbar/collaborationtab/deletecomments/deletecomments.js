const CollaborationTab = require("../collaborationtab");
const { OptionsButton } = require("../../../../elements");
const selectors = require("./selectors.json");

class DeleteComments extends CollaborationTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static DELETE_COMMENTS_SELECTORS = selectors;

    /**
     * @enum
     */
    static TYPES = {
        DELETE_COMMENTS: ["Delete current comments", "Delete my comments", "Delete all comments"],
    };

    /**
     * Click the default delete comments button or click the delete comments button with options.
     * @param {"Delete current comments" | "Delete my comments" | "Delete all comments"} [optionValue]
     */
    async deleteComments(optionValue) {
        const deleteCommentsSelectors = DeleteComments.DELETE_COMMENTS_SELECTORS.DELETE_COMMENTS;
        const deleteCommentsButton = new OptionsButton(
            this.tester,
            deleteCommentsSelectors.ELEMENT_SELECTOR,
            deleteCommentsSelectors.DEFAULT_BUTTON,
            {
                elementsSelector: deleteCommentsSelectors.DROPDOWN_ELEMENTS_SELECTOR,
                elementsValue: DeleteComments.TYPES.DELETE_COMMENTS,
            }
        );
        try {
            await deleteCommentsButton.setOption(optionValue);
        } catch (error) {
            throw new Error(`deleteComments: Failed to delete comments ${optionValue}". ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = DeleteComments;
