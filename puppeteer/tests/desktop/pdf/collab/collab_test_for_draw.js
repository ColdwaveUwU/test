//https://bugzilla.onlyoffice.com/show_bug.cgi?id=70275
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
    ViewToolbarComment.clickComment();
    ViewToolbarComment.penOne({ type: 5, x: 50, y: 100, hue: 45 }, 0, 0, 30, 30, "0.5 mm");
    ViewToolbarComment.penOne({ index: 5 }, 0, 0, 100, 230, "3.5 mm");
    ViewToolbarComment.penTwo({ type: 5, x: 28, y: 14, hue: 28 }, 0, 0, 203, 78, "1 mm");
    ViewToolbarComment.penTwo({ index: 5 }, 0, 0, -100, -20);
});

user1.wait();
user2.wait();

Tester.close();
