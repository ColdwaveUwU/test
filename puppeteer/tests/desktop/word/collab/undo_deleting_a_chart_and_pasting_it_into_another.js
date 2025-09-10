// https://bugzilla.onlyoffice.com/show_bug.cgi?id=34272

const { FileMenu, Chart } = require("lib");
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
    // Retrieve the list of charts and log the output
    Chart.createChart("Line", 4);
    Chart.addChart();
});

user2.do(async function () {
    Tester.keyDown("ControlLeft");
    Tester.keyPress("A");
    Tester.keyUp("ControlLeft"); //Select all
    Tester.keyPress("Delete");
});
user1.wait();

user1.do(async function () {
    Tester.keyDown("ControlLeft");
    Tester.keyPress("Z");
    Tester.keyUp("ControlLeft"); //Select all
});

user2.do(async function () {
    Tester.keyDown("ControlLeft");
    Tester.keyPress("Z");
    Tester.keyUp("ControlLeft"); //Select all
});

FileMenu.downloadAs("docx");
Tester.close();