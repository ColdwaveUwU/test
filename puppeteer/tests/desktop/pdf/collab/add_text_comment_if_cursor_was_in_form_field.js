// https://bugzilla.onlyoffice.com/show_bug.cgi?id=70686
const { FileMenu, ViewToolbarComment, Font } = require("lib");

Tester.openFile("pdf/script-form.pdf");

let collab = Tester.startCollaboration();
let user1 = collab.addUser({
    name: "user1",
    firstName: "John",
    lastName: "Smith",
});

let user2 = collab.addUser({
    name: "user2",
    firstName: "Mark",
    lastName: "Pottato",
});

user1.doSync(async function () {
    FileMenu.setAdvancedSettings({
        collab: {
            coEditingMode: "Fast",
        },
    });
});

user2.doSync(async function () {
    FileMenu.setAdvancedSettings({
        collab: {
            coEditingMode: "Fast",
        },
    });
});

user1.doSync(async function () {
    Tester.keyPress("Tab");
    for (let i = 0; i < 2; i++) Tester.keyPress("ArrowRight");
    ViewToolbarComment.clickTextComment();
    Tester.input("Text");
    Tester.keyPress("Tab");
});

user2.doSync(async function () {
   
    FileMenu.downloadAs("pdf");
});

user1.wait();
user2.wait();

Tester.close();