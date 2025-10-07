const { TestData, ToolMenuChats, ToolMenuComments } = require("lib");
Tester.createFile("xlsx");

Tester.input(TestData.ONE_WORD_TEXT());
ToolMenuChats.sendMessage(TestData.LOREM_IPSUM());

const lastMessage = ToolMenuChats.getLastMessage();
if (lastMessage !== TestData.LOREM_IPSUM()) {
    throw new Error(`The chat messages don't match`);
}

ToolMenuComments.addComment(TestData.LOREM_IPSUM());
//not work getComments();
//not work editComment
ToolMenuComments.addReplyComment(TestData.ONE_WORD_TEXT());
//not work getLastComment();

Tester.close();
