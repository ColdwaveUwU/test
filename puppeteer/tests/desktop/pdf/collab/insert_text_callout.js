//https://bugzilla.onlyoffice.com/show_bug.cgi?id=70580
const { FileMenu, ViewToolbarComment } = require("lib");

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
    ViewToolbarComment.clickTextComment("Insert text comment");
    ViewToolbarComment.clickTextComment("Insert text callout");
    Tester.input("1");
    FileMenu.save();
});

user2.doSync(async function () {
    FileMenu.save();
});

user1.wait();
user2.wait();

Tester.close();
