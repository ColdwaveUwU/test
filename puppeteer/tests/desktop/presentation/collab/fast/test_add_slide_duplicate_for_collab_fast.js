const { FileMenu, Verification, TestData, SlideShowManager } = require("lib");

Tester.createFile("pptx");
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
    Tester.input(TestData.ONE_WORD_TEXT());
    Tester.waitAutosave();
});

user2.doSync(async function () {
    SlideShowManager.duplicateSlide();
});

collab.wait([user2]);
collab.wait([user2]);

FileMenu.downloadAs("pptx");
Verification.openFile();
Verification.check("ppt/slides/slide1.xml", "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]", "SimpleTestText");
Verification.check("ppt/slides/slide2.xml", "//p:sp[1]/p:txBody[1]/a:p[1]/a:r[1]/a:t[1]/text()[1]", "SimpleTestText");
console.log(Verification.isSuccess());
Tester.close();
