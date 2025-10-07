const { ToolMenuChats } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Input sample text into the document
Tester.input("This is a test document for chat functionality.");

// Open chats menu
ToolMenuChats.openMenu();

// Close chats menu
ToolMenuChats.closeMenu();


// Send first message
ToolMenuChats.sendMessage("Hello, this is the first test message!");

// Send second message
ToolMenuChats.sendMessage("This is the second message for testing.");

// Send third message
ToolMenuChats.sendMessage("Testing chat functionality with multiple messages.");

// Get all messages and verify count
const allMessages = ToolMenuChats.getMessages();
console.log(`Total messages count: ${allMessages.length}`);
if (allMessages.length !== 3) {
    throw new Error("Incorrect number of messages");
}

// Get first message and verify it
const firstMessage = ToolMenuChats.getFirstMessage();
console.log(`First message: ${firstMessage}`);
if (!firstMessage.includes("Hello, this is the first test message!")) {
    throw new Error("First message is incorrect");
}

// Get last message and verify it
const lastMessage = ToolMenuChats.getLastMessage();
console.log(`Last message: ${lastMessage}`);
if (!lastMessage.includes("Testing chat functionality with multiple messages.")) {
    throw new Error("Last message is incorrect");
}

// Get all users in the chat
const users = ToolMenuChats.getUsers();
console.log(`Total users count: ${users.length}`);
console.log(`Users in chat: ${users.join(", ")}`);

// Get messages for the current user
const userMessages = ToolMenuChats.getUserMessages(users[0]);
console.log(`Messages from user ${users[0]}: ${userMessages.length}`);
if (userMessages.length !== 3) {
    throw new Error("Incorrect number of user messages");
}

// Verify all messages from the user
userMessages.forEach((msg, index) => {
    console.log(`User message ${index + 1}: ${msg}`);
});

// Close the test
Tester.close();
