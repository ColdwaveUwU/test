// https://bugzilla.onlyoffice.com/show_bug.cgi?id=76661
// Test scenario: Collaborative table cell deletion
// 1. User1 creates a 3x3 table (9 cells total)
// 2. User2 selects cells using navigation keys (Arrow Left + Shift + Arrow Up x2)
// 3. User1 selects cells using navigation keys (Shift + Arrow Right x2) and deletes them with Backspace
// 4. Verify that 2 cells were deleted, leaving 7 cells in the table
// Expected result: Table should have 7 cells remaining after deletion operation

const { Table, FileMenu, Verification } = require("lib");
Tester.createFile("docx");
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
    Table.insertTable(3, 3);
});

user2.doSync(async function () {
    Tester.keyPress("ArrowLeft");
    Tester.keyDown("ShiftLeft");
    for (let i = 0; i < 2; i++) {
        Tester.keyPress("ArrowUp");
    }
    Tester.keyUp("ShiftLeft");
});

user1.doSync(async function () {
    Tester.keyDown("ShiftLeft");
    for (let i = 0; i < 2; i++) {
        Tester.keyPress("ArrowRight");
    }
    Tester.keyUp("ShiftLeft");
    Tester.keyPress("Backspace");
    FileMenu.downloadAs("docx");
    // Getting verification results
    Verification.openFile();
    Verification.check("word/document.xml", "count(//w:tc)", 7);
    let isSuccess = Verification.isSuccess();
    console.log(isSuccess);
});

collab.wait([user1]);
collab.wait([user2]);

Tester.close();
