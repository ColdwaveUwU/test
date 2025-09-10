//https://bugzilla.onlyoffice.com/show_bug.cgi?id=72630
//https://bugzilla.onlyoffice.com/show_bug.cgi?id=72820
//https://bugzilla.onlyoffice.com/show_bug.cgi?id=72877
const { FileMenu, ToolbarComment } = require("lib");

Tester.openFile("pdf/headings.pdf");

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
    ToolbarComment.selectStamp("Complete"); // Select the 'Complete' stamp
    Tester.keyPress("Delete");
});

user2.doSync(async function () {
    ToolbarComment.selectStamp("Final"); // Select the 'Final' stamp
    Tester.keyDown("ControlLeft");
    Tester.keyPress("Z");
    Tester.keyUp("ControlLeft");
    FileMenu.downloadAs("pdf");
});

user1.wait();
user2.wait();

Tester.close();
