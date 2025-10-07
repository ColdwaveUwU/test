const { ToolMenuSearch } = require("lib");

// Create a new presentation file for testing
Tester.createFile("pptx");

// Input sample text into the first slide
Tester.input("Introduction to Lorem Ipsum");
Tester.keyPress("Enter");
Tester.input("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
Tester.keyPress("Enter");
Tester.input("The quick brown fox jumps over the lazy dog.");

// Input text into the second slide
Tester.input("Main Content Lorem");
Tester.keyPress("Enter");
Tester.input("Lorem ipsum presentation content");
Tester.keyPress("Enter");
Tester.input("Additional Lorem information");

// Test findText method with basic search
ToolMenuSearch.findText("Lorem");

// Test findText with case-sensitive option
ToolMenuSearch.findText("LOREM", { sensitive: true, words: false });

// Test findText with whole words option
ToolMenuSearch.findText("Introduction", { sensitive: false, words: true });

// Test replaceText with single replacement
ToolMenuSearch.replaceText({
    find: "Lorem",
    replace: "Sample",
    method: "once",
    sensitive: false,
    words: false,
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

// Test search across multiple slides
ToolMenuSearch.findText("Content");

// Test replace with words option
ToolMenuSearch.replaceText({
    find: "information",
    replace: "details",
    method: "once",
    sensitive: false,
    words: true,
});

// Close the test
Tester.close();
