# ToolMenuChats

This library implements interaction with the Chat panel functionality.

## Table of Contents

-   [**Types**](#types)
    -   [`MessageInfo`](#messageinfo)
-   [**Methods**](#methods)
    -   [`ToolMenuChats.getFirstMessage()`](#toolmenuchatsgetfirstmessage)
    -   [`ToolMenuChats.getLastMessage()`](#toolmenuchatsgetlastmessage)
    -   [`ToolMenuChats.getUserMessages(userName)`](#toolmenuchatsgetusermessagesusername)
    -   [`ToolMenuChats.getMessages()`](#toolmenuchatsgetmessages)
    -   [`ToolMenuChats.getUsers()`](#toolmenuchatsgetusers)
    -   [`ToolMenuChats.sendMessage(text)`](#toolmenuchatssendmessagetext)
-   [**Example**](#example)

## Types

### MessageInfo

Object representing a chat message.

```javascript
/**
 * @typedef {Object} MessageInfo
 * @property {string} userName
 * @property {string} userMessage
 */
```

## Methods

### ToolMenuChats.getFirstMessage()

```javascript
/**
 * Gets the first message in the chat
 * @returns {Promise<MessageInfo>}
 */
ToolMenuChats.getFirstMessage();
```

### ToolMenuChats.getLastMessage()

```javascript
/**
 * Gets the last message in the chat
 * @returns {Promise<MessageInfo>}
 */
ToolMenuChats.getLastMessage();
```

### ToolMenuChats.getUserMessages(userName)

```javascript
/**
 * Gets the user's messages
 * @param {string} userName - The name of the user whose messages to retrieve.
 * @returns {Promise<Array<string>>}
 */
ToolMenuChats.getUserMessages(userName);
```

### ToolMenuChats.getMessages()

```javascript
/**
 * Get all messages on the page in the format {userName, userMessage}
 * @returns {Promise<Array<MessageInfo>>}
 */
ToolMenuChats.getMessages();
```

### ToolMenuChats.getUsers()

```javascript
/**
 * Get the names of all users in the chat
 * @returns {Promise<Array<string>>}
 */
ToolMenuChats.getUsers();
```

### ToolMenuChats.sendMessage(text)

```javascript
/**
 * Send message by chats
 * @param {string} text - The text message to send.
 */
ToolMenuChats.sendMessage(text);
```

## Example

```javascript
// Include the ToolMenuChats library
const { ToolMenuChats } = require("lib");

// Create a new document
Tester.createFile("docx");

// Send a message in the chat
ToolMenuChats.sendMessage("Hello, world!");

// Send multiple messages
ToolMenuChats.sendMessage("First message");
ToolMenuChats.sendMessage("Second message");
ToolMenuChats.sendMessage("Third message");

// Get the first message in the chat
const firstMessage = ToolMenuChats.getFirstMessage();
console.log(`First message: ${firstMessage}`);

// Get the last message in the chat
const lastMessage = ToolMenuChats.getLastMessage();
console.log(`Last message: ${lastMessage}`);

// Get all messages
const allMessages = ToolMenuChats.getMessages();
console.log(`Total messages: ${allMessages.length}`);

// Display all messages
allMessages.forEach((msg, index) => {
    console.log(`Message ${index + 1}: ${msg.userName} - ${msg.userMessage}`);
});

// Get messages from specific user
const userMessages = ToolMenuChats.getUserMessages("John Smith");
console.log(`John Smith's messages:`);
userMessages.forEach((msg) => {
    console.log(`  - ${msg}`);
});

// Get all users in the chat
const users = ToolMenuChats.getUsers();
console.log(`Users in chat: ${users.join(", ")}`);

// Close the test example
Tester.close();
```
