const { TextBoxInsert } = require("lib"); // Import the TextBoxInsert class from the library

// Open the file new.docx
Tester.createFile("docx");

// Click on default Text Box button
TextBoxInsert.textBox();

// Draw a text box on the page
TextBoxInsert.drawTextBox();

// Select "Insert vertical text box" option from the list
TextBoxInsert.textBox("Insert vertical text box");

// Draw a text box on the page
TextBoxInsert.drawTextBox();

// Close the test example
Tester.close();
