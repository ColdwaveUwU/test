const CollaborationTab = require("../collaborationtab");
const { Input, Button } = require("../../../../elements");
const selectors = require("./selectors.json");

class AddComment extends CollaborationTab {
    constructor(tester) {
        super(tester);
    }

    /**
     * @enum
     */
    static SELECTORS = selectors;

    /**
     * Add a reply to the comment.
     */
    async #addReply() {
        const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
        const addReplyButton = new Button(this.tester, modalSelectors.ADD_REPLY_BUTTON);
        try {
            await addReplyButton.click();
        } catch (error) {
            throw new Error(
                `addReply: Failed to add reply with selector"${modalSelectors.ADD_REPLY_BUTTON}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Insert a comment into the document.
     * Text must be entered before calling this method.
     */
    async insertComment() {
        try {
            const addCommentSelectors = AddComment.SELECTORS.ADD_COMMENT_BUTTON;
            const addButton = new Button(this.tester, addCommentSelectors.ELEMENT_SELECTOR);
            try {
                await addButton.click();
            } catch (error) {
                throw new Error(
                    `insertComment: Failed to insert comments with selector"${addCommentSelectors.ELEMENT_SELECTOR}". ${error.message}`,
                    {
                        cause: error,
                    }
                );
            }
        } catch (error) {
            throw new Error("Failed to insert comment. Text must be entered before calling this method.", {
                cause: error,
            });
        }
    }

    /**
     * Set the comment text.
     * @param {string} [text] - The text to be added as a comment
     */
    async setComment(text) {
        const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
        const input = new Input(this.tester, modalSelectors.COMMENT_POPOVER, false, modalSelectors.COMMENT_INPUT);
        try {
            await input.set(text);
        } catch (error) {
            throw new Error(
                `setComment: Failed to set comment with selector"${modalSelectors.COMMENT_INPUT}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Add a comment to the document.
     */
    async addComment() {
        const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
        const addButton = new Button(this.tester, modalSelectors.ADD_BUTTON);
        try {
            await addButton.click();
        } catch (error) {
            throw new Error(
                `addComment: Failed to add comments with selector"${modalSelectors.ADD_BUTTON}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Cancel the comment.
     */
    async cancelComment() {
        const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
        const cancelButton = new Button(this.tester, modalSelectors.CANCEL_BUTTON);
        try {
            await cancelButton.click();
        } catch (error) {
            throw new Error(
                `cancelComment: Failed to cancel comments with selector"${modalSelectors.CANCEL_BUTTON}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Delete the comment.
     */
    async deleteComment() {
        const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
        const deleteButton = new Button(this.tester, modalSelectors.DELETE_BUTTON);
        try {
            await deleteButton.click();
        } catch (error) {
            throw new Error(
                `deleteComment: Failed to delete comments with selector"${modalSelectors.DELETE_BUTTON}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Edit the comment.
     * @param {string} [text] - New comment text
     */
    async editComment(text) {
        const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
        const editButton = new Button(this.tester, modalSelectors.EDIT_BUTTON);
        try {
            await editButton.click();
            await this.setComment(text);
            await this.addComment();
        } catch (error) {
            throw new Error(
                `editComment: Failed to edit comment with selector"${modalSelectors.EDIT_BUTTON}: ${text}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Resolve the comment.
     */
    async resolveComment() {
        const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
        const resolveButton = new Button(this.tester, modalSelectors.RESOLVE_BUTTON);
        try {
            await resolveButton.click();
        } catch (error) {
            throw new Error(
                `resolveComment: Failed to resolve comment with selector"${modalSelectors.RESOLVE_BUTTON}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Add a reply to the comment.
     * @param {string} [text] - Text of the reply.
     */
    async addReplyComment(text) {
        const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
        const replyButton = new Button(this.tester, modalSelectors.REPLY_BUTTON);
        try {
            await replyButton.click();
            await this.setComment(text);
            await this.#addReply();
        } catch (error) {
            throw new Error(
                `addReplyComment: Failed to add reply comment comment with selector"${modalSelectors.REPLY_BUTTONN}: ${text}". ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Edit a reply to the comment. If index is not provided, the last reply will be edited.
     * @param {string} [text] - Text that will replace the existing reply.
     * @param {number} [replyIndex] - Index of the reply to edit.
     */
    async editReplyComment(text, replyIndex = -1) {
        try {
            const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
            try {
                await this.tester.frame.waitForFunction(
                    (itemSelector, editButtonSelector, index) => {
                        const items = document.querySelectorAll(itemSelector);
                        if (items.length === 0) return false;

                        const targetIndex = index === -1 ? items.length - 1 : index;
                        if (targetIndex < 0 || targetIndex >= items.length) return false;

                        const targetItem = items[targetIndex];
                        const editButton = targetItem.querySelector(editButtonSelector);
                        if (editButton) {
                            editButton.click();
                            return true;
                        }
                        return false;
                    },
                    {},
                    modalSelectors.REPLY_ITEM,
                    modalSelectors.REPLY_EDIT_BUTTON,
                    replyIndex
                );
            } catch (error) {
                throw new Error(
                    `Failed to wait "${modalSelectors.REPLY_ITEM} & ${modalSelectors.REPLY_EDIT_BUTTON}". ${error.message}`,
                    {
                        cause: error,
                    }
                );
            }

            await this.setComment(text);
            await this.addComment();
        } catch (error) {
            throw new Error(
                `editReplyComment: Failed to edit reply comment (${replyIndex}): ${text}" . ${error.message}`,
                {
                    cause: error,
                }
            );
        }
    }

    /**
     * Delete a reply to the comment. If index is not provided, the last reply will be deleted.
     * @param {number} [replyIndex] - Index of the reply to delete.
     */
    async deleteReplyComment(replyIndex = -1) {
        const modalSelectors = AddComment.SELECTORS.COMMENT_POPOVER;
        try {
            await this.tester.frame.waitForFunction(
                (itemSelector, deleteButtonSelector, index) => {
                    const items = document.querySelectorAll(itemSelector);
                    if (items.length === 0) return false;

                    const targetIndex = index === -1 ? items.length - 1 : index;
                    if (targetIndex < 0 || targetIndex >= items.length) return false;

                    const targetItem = items[targetIndex];
                    const deleteButton = targetItem.querySelector(deleteButtonSelector);
                    if (deleteButton) {
                        deleteButton.click();
                        return true;
                    }
                    return false;
                },
                {},
                modalSelectors.REPLY_ITEM,
                modalSelectors.REPLY_DELETE_BUTTON,
                replyIndex
            );
        } catch (error) {
            throw new Error(`deleteReplyComment: Failed to delete reply comment (${replyIndex})" . ${error.message}`, {
                cause: error,
            });
        }
    }
}

module.exports = AddComment;
