// This test verifies that the find functionality with word matching works correctly in a document editor.

const { Replace } = require("lib");

Tester.createFile("docx");

Tester.input("Lorem ipsum dolor sit amet, lorem ipsum.");

Replace.selectAll();

Replace.find({
    find: "Lorem",
    sensitive: false,
    words: true,
});

Tester.close();