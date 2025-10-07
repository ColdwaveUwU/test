const { FileMenu, Verification, TestData, ToolMenuChats, ToolMenuComments, Image } = require("lib");

Tester.createFile("pptx");
let collab = Tester.startCollaboration();
let user1 = collab.addUser({
    name: "user1",
    firstName: "name",
    lastName: "lastname",
});

let user2 = collab.addUser({
    name: "user2",
    firstName: "name",
    lastName: "lastname",
});

user1.doSync(async function () {
    FileMenu.setAdvancedSettings({
        collab: {
            coEditingMode: "Strict",
        },
    });
});

user2.doSync(async function () {
    FileMenu.setAdvancedSettings({
        collab: {
            coEditingMode: "Strict",
        },
    });
});

user1.doSync(async function () {
    Tester.lockParagraph();
    Tester.keyPress("Tab");
    Tester.input(TestData.ONE_WORD_TEXT());
    Tester.deleteText();
    Tester.input(TestData.ONE_WORD_TEXT());
    FileMenu.save();
});

user2.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
});

user1.doSync(async function () {
    ToolMenuComments.addComment(TestData.LOREM_IPSUM());
    FileMenu.save();
});

user2.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
    ToolMenuComments.addReplyComment(TestData.ONE_WORD_TEXT());
    const firstComment = ToolMenuComments.getComments();
    const lastComment = ToolMenuComments.getLastComment();

    if (lastComment.replyComments[0].text !== TestData.ONE_WORD_TEXT()) {
        throw new Error(`The comments messages don't match`);
    }

    if (firstComment[0].text !== TestData.LOREM_IPSUM()) {
        throw new Error(`The comments messages don't match`);
    }
});

user1.doSync(async function () {
    ToolMenuChats.sendMessage(TestData.LOREM_IPSUM());
});

user2.doSync(async function () {
    const firstMessage = ToolMenuChats.getLastMessage();
    if (firstMessage !== TestData.LOREM_IPSUM()) {
        throw new Error(`The chat messages don't match`);
    }
    ToolMenuChats.sendMessage(TestData.ONE_WORD_TEXT());
});

user1.doSync(async function () {
    const lastMessage = ToolMenuChats.getLastMessage();
    if (lastMessage !== TestData.ONE_WORD_TEXT()) {
        throw new Error(`The chat messages don't match`);
    }
});

user1.doSync(async function () {
    Image.fromFile("png/testFile.png");
    FileMenu.save();
});

collab.wait([user2]);
collab.wait([user2]);
FileMenu.downloadAs("pptx");
Verification.openFile();
Verification.check("ppt/slides/slide1.xml", "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]", "SimpleTestText");
Verification.check("ppt/slides/slide1.xml", "count(//p:pic[1])", 1);
console.log(Verification.isSuccess());
Tester.close();
