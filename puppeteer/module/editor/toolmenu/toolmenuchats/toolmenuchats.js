const ToolMenu = require("../toolmenu");
const { createExecuteAction, createErrorHandler } = require("../../../../engine/script/js");
const { Button, Input } = require("../../../elements");
const selectors = require("./selectors.json");

/**
 * @typedef {Object} MessageInfo
 * @property {string} userName
 * @property {string} userMessage
 */

class ToolMenuChats extends ToolMenu {
    /**
     * @enum
     */
    static SELECTORS = selectors;

    constructor(tester) {
        super(ToolMenuChats.SELECTORS.CHAT_SELECTOR, tester);
        this.handleError = createErrorHandler(this.constructor.name);
        this.executeAction = createExecuteAction(this.tester, this.handleError);
    }

    /**
     * Gets the first message in the chat
     * @returns {Promise<MessageInfo>}
     */
    async getFirstMessage() {
        const messages = await this.#parseChats();
        return messages[0].userMessage;
    }

    /**
     * Gets the last message in the chat
     * @returns {Promise<MessageInfo>}
     */
    async getLastMessage() {
        const messages = await this.#parseChats();
        return messages.at(-1).userMessage;
    }

    /**
     * Gets the user's messages
     * @param {string} userName
     * @returns {Promise<Array<string>>}
     */
    async getUserMessages(userName) {
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
        return await this.#parseChats();
    }

    /**
     * Get the names of all users in the chat
     * @returns {Promise<Array<string>>}
     */
    async getUsers() {
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
        const methodName = "sendMessage";
        const selectors = ToolMenuChats.SELECTORS;
        const messages = await this.#parseChats();

        await this.executeAction(Input, selectors.CHAT_INPUT_SELECTOR, "set", methodName, [text], [false, ""]);
        await this.executeAction(Button, selectors.CHAT_SEND_BUTTON_SELECTOR, "click", methodName);
        await this.#waitForNewMessage(messages.length);
    }

    /**
     * Parses messages from the chat
     * @returns {Promise<Array<MessageInfo>>}
     */
    async #parseChats() {
        await this.openMenu();
        const selectors = ToolMenuChats.SELECTORS;
        const messages = await this.tester.frame.evaluate(
            (chatMessagesSelector, userNameSelector, userMessageSelector) => {
                const messagesInfo = Array.from(document.querySelectorAll(chatMessagesSelector)).map((message) => {
                    const userName = message.querySelector(userNameSelector).textContent.trim();
                    const userMessage = message.querySelector(userMessageSelector).textContent.trim();
                    return { userName: userName, userMessage: userMessage };
                });
                return messagesInfo;
            },
            selectors.CHAT_MESSAGES_SELECTOR,
            selectors.CHAT_USER_NAME_SELECTOR,
            selectors.CHAT_USER_MESSAGE_SELECTOR
        );
        return messages;
    }

    /**
     * Wait for new message to appear in chat
     * @param {number} initialMessageCount - Initial count of messages before new message
     */
    async #waitForNewMessage(initialMessageCount, timeout = 5000) {
        const selectors = ToolMenuChats.SELECTORS;
        try {
            await this.tester.frame.waitForFunction(
                (initialMessageCount, selector) => {
                    const usersMessages = selector;
                    const currentMessageCount = document.querySelectorAll(usersMessages).length;
                    return currentMessageCount > initialMessageCount;
                },
                { polling: 100, timeout: timeout },
                initialMessageCount,
                selectors.CHAT_MESSAGES_SELECTOR
            );
        } catch (error) {
            this.handleError("waitForNewMessage", error);
        }
    }
}

module.exports = ToolMenuChats;
