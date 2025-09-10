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
