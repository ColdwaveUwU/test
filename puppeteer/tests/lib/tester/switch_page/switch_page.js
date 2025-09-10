const { FileMenu } = require("lib"); // Import the FileMenu module from the library

// Create a new file with the specified format
Tester.createFile("docx");

// Input text into the file
Tester.input("Page1");
// Create a new document with the specified template
FileMenu.createNew("Blank");
Tester.input("Page2");
Tester.closePage();
Tester.input("Page1_1");
FileMenu.createNew("Blank");
Tester.switchToPreviousPage();
Tester.input("Page1_2");
Tester.switchToNextPage();
Tester.input("Page3");
// Close the document
Tester.close();
