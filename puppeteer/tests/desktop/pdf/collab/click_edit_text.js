//https://bugzilla.onlyoffice.com/show_bug.cgi?id=73220
//https://bugzilla.onlyoffice.com/show_bug.cgi?id=71973
const { FileMenu, EditPdf, ToolbarComment } = require("lib");

Tester.openFile("pdf/ONLYOFFICE_Sample_Document_PDF.pdf");

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
    EditPdf.clickEditPdf();
    EditPdf.editText();
});

user2.doSync(async function () {
    EditPdf.clickEditPdf();
    ToolbarComment.selectStamp("Final"); // Select the 'Final' stamp
});

user1.doSync(async function () {
    Tester.keyPress("F5");
});
user1.wait();
user2.wait();

Tester.close();