const { TestData, ToolMenuSearch, ToolMenuChats, ToolMenuComments } = require("lib");
Tester.createFile("pptx");

Tester.keyPress("Tab");
Tester.input(TestData.LOREM_IPSUM());
ToolMenuSearch.findText(TestData.ONE_WORD_TEXT());
ToolMenuChats.sendMessage(TestData.LOREM_IPSUM());


const lastMessage = ToolMenuChats.getLastMessage();
if (lastMessage !== TestData.LOREM_IPSUM()) {
    throw new Error(`The chat messages don't match`);
}

ToolMenuComments.addComment(TestData.LOREM_IPSUM());
const firstComment = ToolMenuComments.getComments();

if (firstComment[0].text !== TestData.LOREM_IPSUM()) {
    throw new Error(`The comments messages don't match`);
}

ToolMenuComments.editComment({ text: "comments" });
const editComment = ToolMenuComments.getComments();

if (editComment[0].text !== "comments") {
    throw new Error(`The comments messages don't match`);
}

ToolMenuComments.addReplyComment(TestData.ONE_WORD_TEXT());
const lastComment = ToolMenuComments.getLastComment();

if (lastComment.replyComments[0].text !== TestData.ONE_WORD_TEXT()) {
    throw new Error(`The comments messages don't match`);
}
Tester.close();
