const { FileMenu } = require("lib");
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
    Tester.input("Test1");
    Tester.keyDown("Shift");
    for (let i = 0; i < 5; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.dispatchEvent("onInputHW", {
        data: "hello",
    });
    Tester.keyUp("Shift");
    Tester.input("Test1");
    Tester.keyDown("Shift");
    for (let i = 0; i < 5; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");
});
user1.doSync(async function () {
    Tester.input("Test1");
    Tester.keyDown("Shift");
    for (let i = 0; i < 5; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.dispatchEvent("onInputHW", {
        data: "hello",
    });
    Tester.keyUp("Shift");
    Tester.input("Test1");
    Tester.keyDown("Shift");
    for (let i = 0; i < 5; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");
});
user2.do(async function () {
    Tester.input("Test2");
    Tester.keyDown("Shift");
    for (let i = 0; i < 5; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");
    Tester.input("Test2");
    Tester.keyDown("Shift");
    for (let i = 0; i < 5; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");
});

user1.wait();
user1.close();

collab.wait([user2]);
user2.do(async function () {
    Tester.input("Test2");
    Tester.keyDown("Shift");
    for (let i = 0; i < 5; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");
    Tester.input("Test2");
    Tester.keyDown("Shift");
    for (let i = 0; i < 5; i++) {
        Tester.keyPress("ArrowLeft");
    }
    Tester.keyUp("Shift");
});
collab.wait([user2]);
FileMenu.downloadAs("docx");
Tester.close();
