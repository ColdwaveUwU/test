const { ToolMenuSearch } = require("lib");

// Create a new DOCX file for testing
Tester.createFile("docx");

// Input sample text into the document
Tester.input("Lorem Ipsum is simply dummy text of the printing and typesetting industry.");
Tester.input(" Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
Tester.input(" The quick brown fox jumps over the lazy dog.");

// Test findText method with basic search
ToolMenuSearch.findText("Lorem");

// Test findText with case-sensitive option
ToolMenuSearch.findText("LOREM", { sensitive: true, words: false });

// Test findText with whole words option
ToolMenuSearch.findText("Lorem", { sensitive: false, words: true });

// Test replaceText with single replacement
ToolMenuSearch.replaceText({
    find: "Lorem",
    replace: "Sample",
    method: "once",
    sensitive: false,
    words: false,
    resultIndex: 2,
});

// Test replaceText with replace all occurrences
ToolMenuSearch.replaceText({
    find: "ipsum",
    replace: "text",
    method: "all",
    sensitive: false,
    words: false,
});


// Test replaceText with case-sensitive and whole words options
ToolMenuSearch.replaceText({
    find: "quick",
    replace: "fast",
    method: "once",
    sensitive: true,
    words: true,
});

// Close the test
Tester.close();
