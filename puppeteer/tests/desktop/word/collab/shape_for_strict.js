const { FileMenu, Verification, Shape } = require("lib");

var RandomNumber = function (length) {
    return Math.floor(Math.random() * length) + 1;
};

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
    Shape.clickRecentlyShape(2);
    Shape.drawShape();
    FileMenu.save();
});

user2.doSync(async function () {
    FileMenu.save();
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
    FileMenu.save();
});

collab.wait([user2]);
collab.wait([user2]);
FileMenu.downloadAs("docx");
Verification.openFile();
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:anchor[1]/a:graphic[1]/a:graphicData[1]/wps:wsp[1]/wps:spPr[1]/a:prstGeom[1]/@prst",
    "rightArrow"
);
console.log(Verification.isSuccess());

Tester.close();
