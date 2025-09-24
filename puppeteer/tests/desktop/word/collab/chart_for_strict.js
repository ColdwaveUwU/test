//https://bugzilla.onlyoffice.com/show_bug.cgi?id=66629
//https://bugzilla.onlyoffice.com/show_bug.cgi?id=69536

const { FileMenu, Verification, Chart } = require("lib");

const chartTypes = ["Column", "Line", "Pie", "Bar", "Area", "Radar", "Combo", "XY (Scatter)"];
const randomType = chartTypes[Math.floor(Math.random() * chartTypes.length)];

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
    Chart.createChart({ groupName: randomType, chartName: 1 });
    Chart.closeEditor();
    FileMenu.save();
});

user2.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
    Tester.lockParagraph();
    Tester.keyDown("Control");
    Tester.keyPress("A");
    Tester.keyPress("C");
    Tester.keyUp("Control");
    Tester.keyPress("Delete");
    Tester.lockParagraph();
    Tester.keyDown("Control");
    Tester.keyPress("V");
    Tester.keyUp("Control");
    FileMenu.save();
});

user1.doSync(async function () {
    Tester.waitUpdates();
    FileMenu.save();
    Tester.waitAutosave();
});

collab.wait([user2]);
collab.wait([user2]);
FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//w:document[1]/w:body[1]/w:p[1]/w:r[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/c:chart[1]/@r:id",
    "rId8"
);
console.log(Verification.isSuccess());

Tester.close();
