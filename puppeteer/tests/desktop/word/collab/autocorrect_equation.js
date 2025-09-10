// https://bugzilla.onlyoffice.com/show_bug.cgi?id=72024
const { FileMenu } = require("lib");

Tester.openFile("docx/Formulas.docx");
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
    Tester.keyPress("End");
    Tester.keyPress("ArrowLeft");
    Tester.keyPress("+");
    Tester.keyPress("Space");
    Tester.input("/summ");
    Tester.keyPress("Space");
});

user2.doSync(async function () {
    FileMenu.downloadAs("docx");
});

collab.wait([user1]);
collab.wait([user2]);

Tester.close();
