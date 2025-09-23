const CollaborationTab = require("../collaborationtab");
const { ToolMenuChats } = require("../../../toolmenu");
const selectors = require("./selectors.json");

class Chat extends CollaborationTab {
    constructor(tester) {
        super(tester);
    }

    #toolMenuChats = new ToolMenuChats(this.tester);
    /**
     * @enum
     */
    static CHAT_SELECTORS = selectors;

    /**
     * Opens the chat window
     */
    async open() {
        await this.tester.click(Chat.CHAT_SELECTORS.ELEMENT_SELECTOR);
    }

    /**
     * Closes the chat
     */
    async close() {
        await this.tester.click(Chat.CHAT_SELECTORS.CHAT_CLOSE_BUTTON_SELECTOR);
    }

    /**
     * Adds a message to the chat
     * @param {string} [message] - The message to add
     */
    async sendMessage(message) {
        await this.#toolMenuChats.sendMessage(message);
    }

    /**
     * Get the names of all users in the chat
     * @returns {Promise<Array<string>>}
     */
    async getUsers() {
        return await this.#toolMenuChats.getUsers();
    }

    /**
     * Get all messages on the page in the format {userName, userMessage}
     * @returns {Promise<Array<MessageInfo>>}
     */
    async getMessages() {
        return await this.#toolMenuChats.getMessages();
    }

    /**
     * Gets the user's messages
     * @param {string} userName
     * @returns {Promise<Array<string>>}
     */
    async getUserMessages(userName) {
        return await this.#toolMenuChats.getUserMessages(userName);
    }

    /**
     * Gets the first message in the chat
     * @returns {Promise<MessageInfo>}
     */
    async getFirstMessage() {
        return await this.#toolMenuChats.getFirstMessage();
    }

    /**
     * Gets the last message in the chat
     * @returns {Promise<MessageInfo>}
     */
    async getLastMessage() {
        return await this.#toolMenuChats.getLastMessage();
    }
}

module.exports = Chat;
