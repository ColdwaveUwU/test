const { FileMenu, ToolMenuChats, ToolMenuComments, TestData, Verification } = require("lib");

Tester.openFile("docx/new.docx");
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
    Tester.input("hello");
    Tester.keyPress("Enter");
    Tester.input(TestData.LOREM_IPSUM());
    Tester.keyPress("Enter");
    FileMenu.save();
});

user2.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
    FileMenu.downloadAs("docx");
});

user1.doSync(async function () {
    ToolMenuComments.addComment(TestData.LOREM_IPSUM());
    const firstComment = ToolMenuComments.getComments();
    if (firstComment[0].text !== TestData.LOREM_IPSUM()) {
        throw new Error(`The comments messages don't match`);
    }
    FileMenu.save();
});

user2.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
    ToolMenuComments.sortComments("newest");
    const firstComment = ToolMenuComments.getComments();
    if (firstComment[0].text !== TestData.LOREM_IPSUM()) {
        throw new Error(`The comments messages don't match`);
    }
});

user1.doSync(async function () {
    ToolMenuChats.sendMessage(TestData.LOREM_IPSUM());
    ToolMenuChats.clickChat();
    const lastMessage = ToolMenuChats.getLastMessage();
    if (lastMessage !== TestData.LOREM_IPSUM()) {
        throw new Error(`The chat messages don't match`);
    }
});

user2.doSync(async function () {
    ToolMenuChats.sendMessage(TestData.ONE_WORD_TEXT());
    ToolMenuChats.clickChat();
    const lastMessage1 = ToolMenuChats.getFirstMessage();
    const lastMessage2 = ToolMenuChats.getLastMessage();
    if (lastMessage1 !== TestData.LOREM_IPSUM()) {
        throw new Error(`The chat messages don't match`);
    }
    if (lastMessage2 !== TestData.ONE_WORD_TEXT()) {
        throw new Error(`The chat messages don't match`);
    }
});

user1.doSync(async function () {
    Tester.reloadPage();
    ToolMenuChats.clickChat();
    const lastMessage1 = ToolMenuChats.getFirstMessage();
    const lastMessage2 = ToolMenuChats.getLastMessage();
    if (lastMessage1 !== TestData.LOREM_IPSUM()) {
        throw new Error(`The chat messages don't match`);
    }
    if (lastMessage2 !== TestData.ONE_WORD_TEXT()) {
        throw new Error(`The chat messages don't match`);
    }
});

collab.wait([user1]);
collab.wait([user2]);
FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check(
    "word/document.xml",
    "/w:document/w:body/w:p[2]/w:r[1]/w:t[1]/text()[1]",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat faucibus eros, sed mattis tortor consectetur cursus. Mauris non eros odio. Curabitur velit metus, placerat sit amet tempus cursus, pulvinar sed enim. Vivamus odio arcu, volutpat gravida imperdiet vitae, mollis eget augue. Sed ultricies viverra convallis. Fusce pharetra mi eget"
);
console.log(Verification.isSuccess());

Tester.close();
