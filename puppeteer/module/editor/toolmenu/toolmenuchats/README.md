# ToolMenuChats

This library provides a set of functions to interact with chats and messaging features in the document editor. You can use these functions to check for active chats and send messages.

## How to Include

```javascript
const { ToolMenuChats } = require("lib");
```

## Methods

### `sendMessage`

```javascript
/**
 * Sends a message in the chat.
 * @param {string} text - The text message to send.
 * @returns {Promise<void>}
 */
ToolMenuChats.sendMessage(text);
```

This function sends a message in the chat. You can specify the text message to send as a parameter.

### `getFirstMessage`, `getLastMessage`

```javascript
/**
 * Gets the first message in the chat
 * @returns {MessageInfo}
 */
ToolMenuChats.getFirstMessage();
/**
 * Gets the last message in the chat
 * @returns {MessageInfo}
 */
ToolMenuChats.getLastMessage();
```

Returns the first or last message in the chat as a MessageInfo object with the userName(string) and user Message(string) keys.

### `getUserMessages`

```javascript
/**
 * Gets the user's messages
 * @param {string} userName
 * @returns {Array<MessageInfo>}
 */
ToolMenuChats.getUserMessages(userName);
```

Returns all messages sent by the user as an array of MessageInfo.

### `getMessages`

```javascript
/**
 * Get all messages on the page in the format {userName, userMessage}
 * @returns {Array<MessageInfo>}
 */
ToolMenuChats.getMessages();
```

Returns all chat messages as an array of {userName, userMessage} objects

### `getUsers`

```javascript
/**
 * Get the names of all users in the chat
 * @returns {Array<string>}
 */
ToolMenuChats.getUsers();
```

Returns an array of user names in the chat

## Example Usage

```javascript
// Include the Chats library
const { ToolMenuChats } = require("lib");
Tester.createFile("docx");
// Send a message in the chat
ToolMenuChats.sendMessage("Hello, world!");

const firstMessage = ToolMenuChats.getFirstMessage();
// Outputs the text of the first message in the chat
console.log(firstMessage);

const lastMessage = ToolMenuChats.getLastMessage();
// Outputs the text of the last message in the chat
console.log(lastMessage);

const userMessages = ToolMenuChats.getUserMessages("John Smith");
// Outputs  first message
console.log(userMessages[0]);
// Outputs an array of messages from the user "John Smith"
console.log(userMessages);

const messages = ToolMenuChats.getMessages();
// Outputs the user name and the text of the first message
console.log(messages[0].userName, messages[0].userMessage);

const usersNames = ToolMenuChats.getUsers();
// Outputs the name of the user who sent the first message
console.log(usersNames[0]);
Tester.close();
```
