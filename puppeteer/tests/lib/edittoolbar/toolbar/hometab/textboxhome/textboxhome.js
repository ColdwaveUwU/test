const { TextBoxHome } = require("lib"); // Import the TextBoxHome class from the library

// Open the file new.pptx
Tester.createFile("pptx");

// Click on default Text Box button
TextBoxHome.textBox();

// Draw a text box on the page
TextBoxHome.drawTextBox();

// Select "Insert vertical text box" option from the list
TextBoxHome.textBox("Insert vertical text box");

// Draw a text box on the page
TextBoxHome.drawTextBox();

// Close the test example
Tester.close();
