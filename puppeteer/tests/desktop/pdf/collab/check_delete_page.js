//https://bugzilla.onlyoffice.com/show_bug.cgi?id=72327
const { FileMenu, EditPdf } = require("lib");

Tester.openFile("pdf/demo.pdf");

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
    EditPdf.clickEditPdf();
    EditPdf.deletePage();
    FileMenu.save();
});

user2.doSync(async function () {
    FileMenu.save();
});

user1.wait();
user2.wait();

Tester.close();
