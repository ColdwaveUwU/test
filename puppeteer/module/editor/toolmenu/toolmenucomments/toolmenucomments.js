const ToolMenu = require("../toolmenu");
const selectors = require("./selectors.json");
const { createExecuteAction, createErrorHandler } = require("../../../../engine/script/js");
const { Button, Input, Dropdown } = require("../../../elements");

/**
 * @typedef {Object} SortMethod
 * @property {
 * "Newest"
 * | "Oldest"
 * | "Author A to Z"
 * | "Author Z to A"
 * | "From top"
 * | "From bottom"
 * | "Show comments"
 * | "Add comment to document"
 * } [sortMethod] - sorting method
 */

/**
 * @typedef {Object} ShowCommentsOptions
 * @property {
 * | "Open"
 * | "Resolved"
 * | "All"
 * } [showComments] - show comments options
 */

/**
 * @typedef {Object} DeletedComment
 * @property {number} number - starts from 1
 * @property {number} [replyNumber] - starts from 1
 */

/**
 * @typedef {Object} UpdatedComment
 * @property {number} number - starts from 1
 * @property {number} [replyNumber] - starts from 1
 * @property {string} text - comment text
 */

/**
 * @typedef {Object} ReplyComment - reply comment
 * @property {string} text - reply text
 * @property {string} userName - reply user name
 * @property {string} date - reply date
 * @property {number} index - reply index
 * @property {string} selector - reply selector
 */

/**
 * @typedef {Object} MainCommentInfo - info about comment
 * @property {string} text - comment text
 * @property {string} selector - comment selector
 * @property {number} index - comment index
 * @property {string} userName - comment user name
 * @property {string} date - comment date
 * @property {ReplyComment} replyComments - reply comments
 */

class ToolMenuComments extends ToolMenu {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(ToolMenuComments.SELECTORS.COMMENTS_MENU, tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Checking empty comments
     * @returns {Promise<boolean>}
     */
    async checkEmptyComments() {
        const emptyCommentsSelector = ToolMenuComments.SELECTORS.EMPTY_COMMENTS;
        return await this.executeAction(Button, emptyCommentsSelector, "checkSelector", "checkEmptyComments");
    }

    /**
     * Adding a comment
     * @param {string} text - comment text
     */
    async addComment(text) {
        const methodName = "addComment";
        const selectors = ToolMenuComments.SELECTORS;
        await this.openMenu();
        await this.executeAction(Button, selectors.TOOLMENU_COMMENTS.ADD_COMMENT_BUTTON, "click", methodName);
        await this.executeAction(Input, selectors.COMMENT_WINDOW.COMMENT_INPUT, "set", methodName, [text], [false, ""]);
        await this.executeAction(Button, selectors.COMMENT_WINDOW.ADD_COMMENT_BUTTON, "click", methodName);
    }

    /**
     * Adding a comment to the document
     * @param {string} text - comment text
     */
    async addCommentToDocument(text) {
        const methodName = "addCommentToDocument";
        const selectors = ToolMenuComments.SELECTORS.TOOLMENU_COMMENTS;
        await this.sortComments("Add comment to document");
        await this.executeAction(Input, selectors.NEW_COMMENT_INPUT, "set", methodName, [text], [false, ""]);
        await this.executeAction(Button, selectors.ADD_COMMENT_TO_DOCUMENT_BUTTON, "click", methodName);
    }

    /**
     * Get the latest comment
     * @returns {Promise<MainCommentInfo>}
     */
    async getLastComment() {
        const comments = await this.#parseComments();
        return comments.at(-1);
    }

    /**
     * Get the first comment
     * @returns {Promise<MainCommentInfo>}
     */
    async getFirstComment() {
        const comments = await this.#parseComments();
        return comments[0];
    }

    /**
     * Get all comments
     * @returns {Promise<Array<MainCommentInfo>>}
     */
    async getComments() {
        return await this.#parseComments();
    }

    /**
     * @param {number} commentNumber - comment number
     * @returns {Promise<MainCommentInfo>}
     */
    async getComment(commentNumber) {
        const comments = await this.#parseComments();
        try {
            const foundComment = comments.find((c) => c.index === commentNumber);
            if (!foundComment) {
                throw new Error(`Comment with number ${commentNumber} was not found`);
            }
            return foundComment;
        } catch (error) {
            this.handleError("getComment", error);
        }
    }

    /**
     * @param {string} text - reply text
     * @param {number} commentNumber - comment number (default is 1)
     */
    async addReplyComment(text, commentNumber = 1) {
        const methodName = "addReplyComment";
        const commentsChangeSelector = ToolMenuComments.SELECTORS.TOOLMENU_COMMENTS.COMMENTS_CHANGE_BUTTON;
        const comment = await this.getComment(commentNumber);
        const itemSelectors = this.#buildCommentItemSelectors(comment);
        await this.executeAction(Button, itemSelectors.addReplyButton, "click", methodName);
        await this.executeAction(Input, itemSelectors.areaText, "set", methodName, [text], [false, ""]);
        await this.executeAction(Button, commentsChangeSelector, "click", methodName);
    }

    /**
     * Editing comment
     * @param {UpdatedComment} commentNumber - comment number
     */
    async editComment(commentNumber) {
        const { number = 1, replyNumber = null, text } = commentNumber;
        const okButtonSelector = ToolMenuComments.SELECTORS.TOOLMENU_COMMENTS.COMMENTS_CHANGE_BUTTON;
        const comment = await this.getComment(number);
        const itemSelectors = this.#buildCommentItemSelectors(comment, replyNumber);
        await this.executeAction(Button, itemSelectors.editButton, "click", "editComment");
        await this.executeAction(Input, itemSelectors.areaText, "set", "editComment", [text], [false, ""]);
        await this.executeAction(Button, okButtonSelector, "click", "editComment");
    }

    /**
     * Delete comment.
     * @param {DeletedComment} comment default comment.number = 1;
     */
    async deleteComment(commentNumber) {
        const { number, replyNumber = null } = commentNumber;
        if (await this.checkEmptyComments()) {
            throw new Error("Set comments");
        }
        const comment = await this.getComment(number);
        const commentSeletors = this.#buildCommentItemSelectors(comment, replyNumber);
        await this.executeAction(Button, commentSeletors.deleteButton, "click", "deleteComment");
    }

    /**
     * Set Resolve Comment.
     * @param {number} commentNumber - comment number
     */
    async setResolve(commentNumber = 1) {
        const comment = await this.getComment(commentNumber);
        const itemSelectors = this.#buildCommentItemSelectors(comment);
        await this.executeAction(Button, itemSelectors.resolveButton, "click", "setResolve");
    }

    /**
     * Sort comments
     * @param {SortMethod} [sortMethod] - sorting method
     */
    async sortComments(sortMethod) {
        await this.openMenu();
        const selectors = ToolMenuComments.SELECTORS.TOOLMENU_COMMENTS.SORT_DROPDOWN;
        await this.executeAction(Dropdown, selectors, "selectDropdownItem", "sortComments", [sortMethod]);

        // TODO: A mechanism for waiting for comments to be sorted is required.
        const noWaitOptions = ["Show comments", "Add comment to document", "Open", "Resolved", "All"];
        if (!noWaitOptions.includes(sortMethod)) {
            await this.tester.sleep(1000);
        }
    }

    /**
     * @param {ShowCommentsOptions} [showComments] - Show comments options
     */
    async showComments(showComments) {
        await this.sortComments("Show comments");
        await this.sortComments(showComments);
    }

    /**
     * Close comments
     * @returns {Promise<void>}
     */
    async closeComments() {
        const closeSelector = ToolMenuComments.SELECTORS.COMMENTS_CLOSE_BUTTON;
        await this.executeAction(Button, closeSelector, "click", "closeComments");
    }

    /**
     * @param {MainCommentInfo} comments comment objects
     * @param {number} [replyNumber] - reply number (default is null)
     * @returns {Object} - comment item selectors
     */
    #buildCommentItemSelectors(comment, replyNumber = null) {
        try {
            const baseSelectors = ToolMenuComments.SELECTORS.COMMENT_ITEM_BASE;
            const mainCommentSelector = !replyNumber ? baseSelectors.mainCommentSelector : "";
            let commentSelector = comment.selector;

            if (replyNumber) {
                const replyComment = this.#getReplyComment(comment, replyNumber);
                commentSelector = replyComment.selector;
            }
            return Object.fromEntries(
                Object.entries(baseSelectors).map(([key, value]) => {
                    const selector = value
                        .replace("${userCommentId}", commentSelector)
                        .replace("${mainCommentSelector}", mainCommentSelector);

                    return [key, selector];
                })
            );
        } catch (error) {
            this.handleError("buildCommentItemSelectors", error);
        }
    }

    /**
     * @param {MainCommentInfo} comment - main comment
     * @param {number} replyNumber - reply number
     * @returns {ReplyComment} - reply comment
     */
    #getReplyComment(comment, replyNumber) {
        try {
            const replyComment = comment.replyComments.find((r) => r.index === replyNumber);
            if (!replyComment) {
                throw new Error(`The reply comment with number ${replyNumber} was not found`);
            }
            return replyComment;
        } catch (error) {
            this.handleError("getReplyComment", error);
        }
    }

    /**
     * Waiting for comments view to update
     * @param {string} commentsElementsSelector - comments elements selector
     * @returns {Promise<void>}
     */
    #waitUpdateCommentsView(commentsElementsSelector, timeout = 5000) {
        try {
            return this.tester.frame.waitForFunction(
                (commentsElementsSelector) => {
                    const commentsCount = window.Asc.editor.pluginMethod_GetAllComments().length;
                    const commentElements = document.querySelectorAll(commentsElementsSelector).length;
                    return commentsCount == commentElements;
                },
                { polling: 100, timeout: timeout },
                commentsElementsSelector
            );
        } catch (error) {
            this.handleError("waitUpdateCommentsView", error);
        }
    }

    /**
     * Gets the created comments from the comments window
     * @returns {Promise<Array<MainCommentInfo>>}
     */
    async #parseComments() {
        try {
            await this.openMenu();
            const selectors = ToolMenuComments.SELECTORS.COMENTS_LIST;
            await this.#waitUpdateCommentsView(selectors.elementsSelector);

            return await this.tester.frame.evaluate(
                ({
                    selector,
                    elementsSelector,
                    descriptionSelector,
                    replySelector,
                    userNameSelector,
                    dateSelector,
                }) => {
                    const extractData = (element) => ({
                        text: element.querySelector(descriptionSelector)?.textContent?.trim() || "",
                        userName: element.querySelector(userNameSelector)?.textContent?.trim() || "",
                        date: element.querySelector(dateSelector)?.textContent?.trim() || "",
                    });
                    const buildSelector = (element, baseSelector, nthIndex) => {
                        if (element.id) return `#${element.id}`;
                        const classes = element.className ? ` .${element.className.split(" ").join(".")}` : "";
                        return `${baseSelector}${classes}:nth-child(${nthIndex})`;
                    };

                    const commentElements = Array.from(document.querySelectorAll(elementsSelector));
                    return commentElements.map((commentElement, index) => {
                        const commentIndex = index + 1;
                        const commentSelector = buildSelector(commentElement, selector, commentIndex);
                        const replyElements = Array.from(commentElement.querySelectorAll(`${replySelector}`));

                        const replyComments = replyElements.map((replyElement, replyIndex) => {
                            const nthChildIndex = Array.from(commentElement.children).indexOf(replyElement) + 1;
                            const replyElementSelector = `${commentSelector} div:nth-child(${nthChildIndex})`;
                            return {
                                ...extractData(replyElement),
                                index: replyIndex + 1,
                                selector: replyElementSelector,
                            };
                        });

                        return {
                            ...extractData(commentElement),
                            index: commentIndex,
                            selector: commentSelector,
                            replyComments,
                        };
                    });
                },
                {
                    selector: selectors.selector,
                    elementsSelector: selectors.elementsSelector,
                    descriptionSelector: selectors.descriptionSelector,
                    replySelector: selectors.replySelector,
                    userNameSelector: selectors.userNameSelector,
                    dateSelector: selectors.dateSelector,
                }
            );
        } catch (error) {
            this.handleError("parseComments", error);
        }
    }
}

module.exports = ToolMenuComments;
