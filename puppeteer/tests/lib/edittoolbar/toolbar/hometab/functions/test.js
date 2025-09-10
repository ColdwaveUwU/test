// Include the Functions library
const { Functions } = require("lib");

// Open the file new.xlsx
Tester.createFile("xlsx");

// Add test data in first row
Tester.input("10");
Tester.keyPress("Tab");
Tester.input("20");
Tester.keyPress("Tab");
Tester.input("30");
Tester.keyPress("Tab");
Tester.input("40");
Tester.keyPress("ArrowDown");

// Test basic function selection from dropdown
Functions.setFunction("SUM");
Functions.setFunctionArguments(["A1:D1"]);

// Move to next cell and test AVERAGE function
Tester.keyPress("ArrowDown");
Functions.setFunction("AVERAGE");
Functions.setFunctionArguments(["A1:D1"]);

// Move to next cell and test MIN function
Tester.keyPress("ArrowDown");
Functions.setFunction("MIN");
Functions.setFunctionArguments(["A1:D1"]);

// Move to next cell and test MAX function
Tester.keyPress("ArrowDown");
Functions.setFunction("MAX");
Functions.setFunctionArguments(["A1:D1"]);

// Move to next cell and test COUNT function
Tester.keyPress("ArrowDown");
Functions.setFunction("COUNT");
Functions.setFunctionArguments(["A1:D1"]);

// Test inserting a custom function from Additional menu
Tester.keyPress("ArrowDown");
Functions.insertFunction({
    functionName: "AVERAGE",
    parameters: ["A1:D1"],
});

// Test inserting another custom function
Tester.keyPress("ArrowDown");
Functions.insertFunction({
    functionName: "POWER",
    parameters: ["A1", "2"],
});

// Test inserting function with multiple parameters
Tester.keyPress("ArrowDown");
Functions.insertFunction({
    functionName: "IF",
    parameters: ["A1>15", '"High"', '"Low"'],
});

// Close the test example
Tester.close();
