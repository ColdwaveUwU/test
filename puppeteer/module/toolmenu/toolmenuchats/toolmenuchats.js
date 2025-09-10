/**
 * @typedef {Object} MessageInfo
 * @property {string} userName
 * @property {string} userMessage
 */

const ToolMenu = require("../toolmenu");

class ToolMenuChats extends ToolMenu {
    constructor(tester) {
        super("#left-btn-chat", tester);
    }
    /**
     * Parses messages from the chat
     * @returns {Promise<Array<MessageInfo>>}
     */
    async #parseChats() {
        /**
         * @type {Array<MessageInfo>}
         */
        const messages = await this.tester.frame.evaluate(() => {
            const usersMessages = "#chat-messages .user-content";
            const messagesInfo = Array.from(document.querySelectorAll(usersMessages)).map((message) => {
                const userName = message.querySelector(".user-name").textContent.trim();
                const userMessage = message.querySelector(".message").textContent.trim();
                return { userName: userName, userMessage: userMessage };
            });
            return messagesInfo;
        });
        return messages;
    }
    /**
     * Gets the first message in the chat
     * @returns {Promise<MessageInfo>}
     */
    async getFirstMessage() {
        /**
         * @type {Array<MessageInfo>}
         */
        const messages = await this.#parseChats();
        return messages[0].userMessage;
    }

    /**
     * Gets the last message in the chat
     * @returns {Promise<MessageInfo>}
     */
    async getLastMessage() {
        /**
         * @type {Array<MessageInfo>}
         */
        const messages = await this.#parseChats();
        return messages.at(-1).userMessage;
    }

    /**
     * Gets the user's messages
     * @param {string} userName
     * @returns {Promise<Array<string>>}
     */
    async getUserMessages(userName) {
        /**
         * @type {Array<MessageInfo>}
         */
        const messages = await this.#parseChats();
        const results = messages
            .filter((message) => message.userName === userName)
            .map((message) => message.userMessage);
        return results;
    }

    /**
     * Get all messages on the page in the format {userName, userMessage}
     * @returns {Promise<Array<MessageInfo>>}
     */
    async getMessages() {
        /**
         * @type {Array<MessageInfo>}
         */
        const messages = await this.#parseChats();
        return messages;
    }

    /**
     * Get the names of all users in the chat
     * @returns {Promise<Array<string>>}
     */
    async getUsers() {
        /**
         * @type {Array<MessageInfo>}
         */
        const messages = await this.#parseChats();

        const userNames = new Set();
        messages.forEach((message) => {
            userNames.add(message.userName);
        });

        return Array.from(userNames);
    }

    /**
     * Send message by chats.
     * @param {string} text
     */
    async sendMessage(text) {
        const inputFormSelector = "#chat-msg-text";
        const sendSelector = "#chat-msg-btn-add";
        if (!(await this.checkActive())) {
            await this.tester.click(this.selector);
        }
        const messages = await this.#parseChats();
        const messagesCount = messages.length;

        await this.tester.click(inputFormSelector);
        await this.tester.inputToForm(text, inputFormSelector);
        await this.tester.click(sendSelector);

        await this.tester.frame.waitForFunction(
            (initialMessageCount) => {
                const usersMessages = "#chat-messages .user-content";
                const currentMessageCount = document.querySelectorAll(usersMessages).length;
                return currentMessageCount > initialMessageCount;
            },
            {},
            messagesCount
        );
    }

    async clickChat() {
        await this.tester.click("#left-btn-chat");
    }
}

module.exports = ToolMenuChats;
