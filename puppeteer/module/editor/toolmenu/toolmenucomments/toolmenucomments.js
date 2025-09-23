const ToolMenu = require("../toolmenu");

/**
 * @typedef {Object} DeletedComment
 * @property {number} number - starts from 1
 * @property {number} [replyNumber] - starts from 1
 */
/**
 * @typedef {Object} UpdatedComment
 * @property {number} number - starts from 1
 * @property {number} [replyNumber] - starts from 1
 * @property {boolean} newText
 * @property {string} text
 */
/**
 * @typedef {Object} ReplyComment - reply comment
 * @property {string} text
 * @property {number} index
 */
/**
 * @typedef {Object} MainCommentInfo - info about comment
 * @property {string} text
 * @property {number} index
 * @property {ReplyComment} replyComments
 */

class ToolMenuComments extends ToolMenu {
    constructor(tester) {
        super("#left-btn-comments", tester);
    }

    #waitUpdateCommentsView(commentsElementsSelector) {
        return this.tester.frame.waitForFunction(
            (commentsElementsSelector) => {
                const commentsCount = window.editor.pluginMethod_GetAllComments().length;
                const commentElements = document.querySelectorAll(commentsElementsSelector).length;
                return commentsCount == commentElements;
            },
            {},
            commentsElementsSelector
        );
    }
    /**
     * Checking empty comments
     */
    async checkEmptyComments() {
        const emptyCommentsSelector = this.selector + " .empty-text";
        return await this.tester.checkSelector(emptyCommentsSelector);
    }

    async addComment(text) {
        await this.tester.click("#left-btn-comments");
        await this.tester.click("#comments-btn-add");
        const inputFormSelector = ".msg-reply";
        const sendSelector = "#id-comments-change-popover";
        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }
        await this.tester.click(inputFormSelector);
        await this.tester.inputToForm(text, inputFormSelector);
        await this.tester.click(sendSelector);
    }

    /**
     * Gets the created comments from the comments window
     * @returns {Promise<Array<MainCommentInfo>>}
     */
    async #parseComments() {
        const commentsElementsSelector = "#comments-box .user-comment-item";
        await this.#waitUpdateCommentsView(commentsElementsSelector);
        /**
         * @type {Array<MainCommentInfo>}
         */
        const comments = await this.tester.frame.evaluate((commentsElementsSelector) => {
            const commentElements = document.querySelectorAll(commentsElementsSelector);

            return Array.from(commentElements).map((comment, index) => {
                const numberElement = index + 1; // number for nth-child
                const mainCommentText = comment.querySelector(".user-message.user-select").textContent.trim();
                const childComments = Array.from(comment.querySelectorAll(".reply-item-ct")).map(
                    (childComment, childIndex) => {
                        const replyCommentNumber = childIndex + 1; // number for nth-child
                        const childCommentText = childComment
                            .querySelector(".user-message.user-select")
                            .textContent.trim();
                        return { text: childCommentText, number: replyCommentNumber };
                    }
                );
                return { text: mainCommentText, number: numberElement, replyComments: childComments };
            });
        }, commentsElementsSelector);
        return comments;
    }

    /**
     * Get the latest comment
     * @returns {Promise<MainCommentInfo>}
     */
    async getLastComment() {
        /**
         * @type {Array<MainCommentInfo>}
         */
        const comments = await this.#parseComments();
        return comments.at(-1);
    }

    /**
     * Get the first comment
     * @returns {Promise<MainCommentInfo>}
     */
    async getFirstComment() {
        /**
         * @type {Array<MainCommentInfo>}
         */
        const comments = await this.#parseComments();
        return comments[0];
    }

    /**
     * Get all comments
     * @returns {Promise<Array<MainCommentInfo>>}
     */
    async getComments() {
        /**
         * @type {Array<MainCommentInfo>}
         */
        const comments = await this.#parseComments();
        return comments;
    }

    /**
     * @param {string} text
     * @param {number} commentNumber
     */
    async addReplyComment(text, commentNumber = 1) {
        const userCommentSelector = `#comments-box .ps-container.oo div:nth-child(${commentNumber}).item`;
        const addReplySelector = `${userCommentSelector} .user-comment-item .user-reply`;
        const areaTextSelector = `${userCommentSelector} .user-comment-item .user-select.textarea-control`;
        const commentsChangeSelector = "#id-comments-change";

        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }
        if (await this.checkEmptyComments()) {
            throw new Error("Set comments");
        }
        await this.tester.click(addReplySelector);
        await this.tester.inputToForm(text, areaTextSelector);
        await this.tester.click(commentsChangeSelector);
    }

    /**
     * Editing comment
     * @param {UpdatedComment} comment default comment.number = 1;
     */
    async editComment(comment) {
        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }

        if (await this.checkEmptyComments()) {
            throw new Error("Set comments");
        }

        /**
         * @type {Array<MainCommentInfo>}
         */
        const comments = await this.#parseComments();
        const { number = 1, replyNumber = null, newText = true, text = "" } = comment;
        const foundComment = comments.find((c) => c.number === number);

        if (!foundComment) {
            throw new Error("The comment was not found");
        }

        const mainCommentSelector = `#comments-box .item:nth-child(${number})`;
        const okButtonSelector = "#id-comments-change";
        let targetSelector, editButtonSelector, textareaSelector;

        if (replyNumber !== null) {
            const foundReplyComment = foundComment.replyComments.find((r) => r.number === replyNumber);
            if (foundReplyComment) {
                targetSelector = `${mainCommentSelector} .user-comment-item div:nth-child(${4 + replyNumber})`; // number div in DOM
                editButtonSelector = `${targetSelector} .btn-edit`;
            }
        }

        if (!targetSelector) {
            targetSelector = mainCommentSelector;
            editButtonSelector = `${targetSelector} .edit-ct .btn-edit-common`;
        }

        textareaSelector = `${targetSelector} textarea.msg-reply`;

        await this.tester.click(editButtonSelector);
        if (newText) {
            await this.tester.frame.evaluate((selector) => {
                const textarea = document.querySelector(selector);
                textarea.focus();
                textarea.select();
            }, textareaSelector);
        }
        await this.tester.inputToForm(text, textareaSelector);
        await this.tester.click(okButtonSelector);
    }

    /**
     * Delete comment.
     * @param {DeletedComment} comment
     */
    async deleteComment(comment) {
        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }

        if (await this.checkEmptyComments()) {
            throw new Error("Set comments");
        }

        /**
         * @type {Array<MainCommentInfo>}
         */
        const comments = await this.#parseComments();
        const { number, replyNumber = null } = comment;
        const foundComment = comments.find((c) => c.number === number);

        if (!foundComment) throw new Error("The comment was not found");

        const mainCommentSelector = `#comments-box .item:nth-child(${number})`;
        let targetSelector, deleteCommentSelector;

        if (replyNumber !== null) {
            const foundReplyComment = foundComment.replyComments.find((r) => r.number === replyNumber);
            if (foundReplyComment) {
                targetSelector = `${mainCommentSelector} .user-comment-item div:nth-child(${4 + replyNumber})`; // number div in DOM
                deleteCommentSelector = `${targetSelector} .btn-delete`;
            }
        }

        if (!targetSelector) {
            targetSelector = mainCommentSelector;
            deleteCommentSelector = `${targetSelector} .edit-ct .btn-delete`;
        }
        await this.tester.click(deleteCommentSelector);
    }

    /**
     * Set Resolve Comment.
     * @param {number} commentNumber
     */
    async setResolve(commentNumber = 1) {
        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }
        if (await this.checkEmptyComments()) {
            throw new Error("Set comments");
        }
        const userCommentSelector = `#comments-box .ps-container.oo div:nth-child(${commentNumber}).item`;
        const resolveSelector = `${userCommentSelector} .btn-resolve`;
        await this.tester.click(resolveSelector);
    }

    /**
     * @param {string} sortMethod
     */
    async sortComments(sortMethod) {
        const dropdownSelector = "#comments-btn-sort";

        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }
        await this.tester.selectDropdown(dropdownSelector);

        switch (sortMethod) {
            case "newest":
                await this.tester.selectByText("Newest", "#comments-btn-sort .menu-item.checkable");
                break;
            case "oldest":
                await this.tester.selectByText("Oldest", "#comments-btn-sort .menu-item.checkable");
                break;
            case "az":
                await this.tester.selectByText("Author A to Z", "#comments-btn-sort .menu-item.checkable");
                break;
            case "za":
                await this.tester.selectByText("Author Z to A", "#comments-btn-sort .menu-item.checkable");
                break;
            default:
                console.error(`Invalid sortMethod: ${sortMethod}`);
        }
        await this.#parseComments();
    }

    /**
     * @returns {Promise<void>}
     */
    async closeComments() {
        const closeSelector = "#comments-btn-close";
        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }
        await this.tester.click(closeSelector);
    }
}
module.exports = ToolMenuComments;
