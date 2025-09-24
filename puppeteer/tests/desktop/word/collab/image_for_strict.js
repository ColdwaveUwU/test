const { FileMenu, Verification, Image } = require("lib");

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
    Image.fromFile("png/testFile.png");
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
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/a:graphic[1]/a:graphicData[1]/pic:pic[1]/pic:blipFill[1]/a:blip[1]/@r:embed",
    "rId8"
);
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[8]/@Id", "rId8");
Verification.check("word/_rels/document.xml.rels", "//defns:Relationship[8]/@Target", "media/image1.png");
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/wp:extent[1]/@cy",
    "2872734"
);
Verification.check(
    "word/document.xml",
    "//mc:AlternateContent[1]/mc:Choice[1]/w:drawing[1]/wp:inline[1]/wp:extent[1]/@cx",
    "5940425"
);
console.log(Verification.isSuccess());

Tester.close();
