const { TestData, ToolMenuSearch, ToolMenuChats, ToolMenuComments } = require("lib");
Tester.createFile("docx");

Tester.input(TestData.LOREM_IPSUM());
Tester.keyDown("Enter");
ToolMenuSearch.findText(TestData.ONE_WORD_TEXT());
ToolMenuChats.sendMessage(TestData.LOREM_IPSUM());

const lastMessage = ToolMenuChats.getLastMessage();
if (lastMessage !== TestData.LOREM_IPSUM()) throw new Error(`The chat messages don't match`);

Tester.input(TestData.getParagraphAutoIndex());

Tester.keyDown("Shift");
for (let i = 0; i < 10; i++) Tester.keyPress("ArrowLeft");
Tester.keyUp("Shift");

ToolMenuComments.addComment(TestData.LOREM_IPSUM());
Tester.sleep(600);
//падает без sleep
const firstComment = ToolMenuComments.getComments();

if (firstComment[0].text !== TestData.LOREM_IPSUM()) throw new Error(`The comments messages don't match`);

ToolMenuComments.editComment({ text: "comments" });
const editComment = ToolMenuComments.getComments();

if (editComment[0].text !== "comments") throw new Error(`The comments messages don't match`);

ToolMenuComments.addReplyComment(TestData.ONE_WORD_TEXT());
const lastComment = ToolMenuComments.getLastComment();

if (lastComment.replyComments[0].text !== TestData.ONE_WORD_TEXT())
    throw new Error(`The comments messages don't match`);

Tester.close();
