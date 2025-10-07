const { ToolMenuSearch } = require("lib");

// Create a new spreadsheet file for testing
Tester.createFile("xlsx");

// Input sample text into cells
Tester.input("Revenue");
Tester.keyPress("Tab");
Tester.input("Revenue");
Tester.keyPress("Tab");
Tester.input("Revenue");
Tester.keyPress("Tab");
Tester.input("Revenue");
Tester.keyPress("Tab");
Tester.input("Expenses");
Tester.keyPress("Tab");
Tester.input("Profit");
Tester.keyPress("Enter");

Tester.input("1000");
Tester.keyPress("Tab");
Tester.input("500");
Tester.keyPress("Tab");
Tester.input("500");
Tester.keyPress("Enter");

Tester.input("Lorem ipsum dolor");
Tester.keyPress("Tab");
Tester.input("Lorem text data");
Tester.keyPress("Tab");
Tester.input("Sample Lorem text");
Tester.keyPress("Enter");

// Test findText method with basic search
ToolMenuSearch.findText("Lorem");

// Test findText with case-sensitive option
ToolMenuSearch.findText("LOREM", { sensitive: true, words: false });

// Test findText with whole words option
ToolMenuSearch.findText("Revenue", {
    sensitive: false,
    words: true,
    within: "Workbook",
    search: "By columns",
    lookIn: "Values",
});

// Test replaceText with single replacement
ToolMenuSearch.replaceText({
    find: "Lorem",
    replace: "Test",
    method: "once",
    sensitive: false,
    words: false,
    resultIndex: 2,
});


// Test replaceText with replace all occurrences
ToolMenuSearch.replaceText({
    find: "ipsum",
    replace: "data",
    method: "all",
    sensitive: false,
    words: false,
});

// Test replaceText with case-sensitive option
ToolMenuSearch.replaceText({
    find: "Revenue",
    replace: "Income",
    method: "once",
    sensitive: true,
    words: true,
});

// Test search for numeric values
ToolMenuSearch.findText("1000");

// Test replace numeric values
ToolMenuSearch.replaceText({
    find: "500",
    replace: "750",
    method: "all",
    sensitive: false,
    words: false,
});

// Close the test
Tester.close();
