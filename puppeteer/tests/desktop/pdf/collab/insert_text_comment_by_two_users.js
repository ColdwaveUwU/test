//https://bugzilla.onlyoffice.com/show_bug.cgi?id=70287
const { FileMenu, ViewToolbarComment, EditPdf, TestData } = require("lib");

Tester.openFile("pdf/headings.pdf");

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
    EditPdf.clickEditPdf();
    ViewToolbarComment.clickTextComment("Insert text comment");
    Tester.input(TestData.ONE_WORD_TEXT());
});

user2.doSync(async function () {
    EditPdf.clickEditPdf();
    ViewToolbarComment.clickTextComment("Insert text comment");
    Tester.input("Hello World!");
    FileMenu.save();
});

user1.doSync(async function () {
    FileMenu.save();
});

user1.wait();
user2.wait();

Tester.close();
