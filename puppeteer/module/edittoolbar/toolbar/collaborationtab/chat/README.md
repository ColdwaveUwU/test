# Chat

Library for interacting with the chat functionality in the Collaboration tab.

## Table of Contents

-   [**Methods**](#methods)
    -   [`Chat.open()`](#chatopen)
    -   [`Chat.close()`](#chatclose)
    -   [`Chat.sendMessage(message)`](#chatsendmessagemessage)
    -   [`Chat.getUsers()`](#chatgetusers)
    -   [`Chat.getMessages()`](#chatgetmessages)
    -   [`Chat.getUserMessages(userName)`](#chatgetusermessagesusername)
    -   [`Chat.getFirstMessage()`](#chatgetfirstmessage)
    -   [`Chat.getLastMessage()`](#chatgetlastmessage)
-   [**Example**](#example)

## Methods

### Chat.open()

```javascript
/**
 * Opens the chat window
 */
Chat.open();
```

### Chat.close()

```javascript
/**
 * Closes the chat windown
 */
Chat.close();
```

### Chat.sendMessage(message)

```javascript
/**
 * Adds and sends a message in the chat.
 * @param {string} message - The text of the message you want to send.
 */
Chat.sendMessage(message);
```

### Chat.getUsers()

```javascript
/**
 * Get the names of all users in the chat
 * @returns {Array<string>}
 */
Chat.getUsers();
```

### Chat.getMessages()

```javascript
/**
 * Get all messages on the page in the format {userName, userMessage}
 * @returns {Array<MessageInfo>}
 */
Chat.getMessages();
```

### Chat.getUserMessages(userName)

```javascript
/**
 * Gets the user's messages
 * @param {string} userName
 * @returns {Array<string>}
 */
Chat.getUserMessages(userName);
```

### Chat.getFirstMessage()

```javascript
/**
 * Gets the first message in the chat
 * @returns {MessageInfo}
 */
Chat.getFirstMessage();
```

### Chat.getLastMessage()

```javascript
/**
 * Gets the last message in the chat
 * @returns {MessageInfo}
 */
Chat.getLastMessage();
```

## Example

```javascript
// Import the Chat library
const { Chat } = require("lib");
// Create a new file
Tester.createFile("docx");

// Open the chat
Chat.open();

// Add a message
Chat.sendMessage("Test message");

const firstMessage = Chat.getFirstMessage();
// Outputs the text of the first message in the chat
console.log(firstMessage);

const lastMessage = Chat.getLastMessage();
// Outputs the text of the last message in the chat
console.log(lastMessage);

const userMessages = Chat.getUserMessages("John Smith");
// Outputs  first message
console.log(userMessages[0]);
// Outputs an array of messages from the user "John Smith"
console.log(userMessages);

const messages = Chat.getMessages();
// Outputs the user name and the text of the first message
console.log(messages[0].userName, messages[0].userMessage);

const usersNames = Chat.getUsers();
// Outputs the name of the user who sent the first message
console.log(usersNames[0]);

// Close the chat
Chat.close();

// Close the test
Tester.close();
```
