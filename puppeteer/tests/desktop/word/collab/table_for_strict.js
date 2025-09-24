const { FileMenu, Verification, Table } = require("lib");

var RandomNumber = function (length) {
    return Math.floor(Math.random() * length) + 1;
};

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
    Table.insertTable(RandomNumber(10), RandomNumber(8));
    FileMenu.save();
});

user2.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
    Tester.lockParagraph();
    Tester.keyDown("Control");
    Tester.keyPress("A");
    Tester.keyPress("C");
    Tester.keyUp("Control");
    Tester.keyPress("Delete");
    Tester.lockParagraph();
    Tester.keyDown("Control");
    Tester.keyPress("V");
    Tester.keyUp("Control");
    FileMenu.save();
});

user1.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
});

collab.wait([user2]);
collab.wait([user2]);
FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check("word/document.xml", "boolean(//w:document[1]/w:body[1]/w:tbl[1])", true);
console.log(Verification.isSuccess());

Tester.close();
