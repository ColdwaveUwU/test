// This test verifies that the function for replacing all found words works correctly in the document editor.

const { Replace, FileMenu, Verification } = require("lib");

Tester.createFile("docx");

Tester.input("Lorem ipsum dolor sit amet, lorem ipsum.");

Replace.selectAll();

Replace.replace({
    find: "Lorem",
    replace: "test",
    method: "all",
    sensitive: false,
    words: false,
});

FileMenu.downloadAs("docx");

Verification.openFile(); 
Verification.check("word/document.xml", "//w:t/text()", "test ipsum dolor sit amet, test ipsum.");

console.log(Verification.isSuccess());

Tester.close();