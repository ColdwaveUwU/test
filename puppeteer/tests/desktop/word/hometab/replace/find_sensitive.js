// This test verifies that the find functionality with case sensitivity works correctly in a document editor.

const { Replace } = require("lib");

Tester.createFile("docx");

Tester.input("Lorem ipsum dolor sit amet, lorem ipsum.");

Replace.selectAll();

Replace.find({
    find: "Lorem",
    sensitive: true,
    words: false,
});

Tester.close();