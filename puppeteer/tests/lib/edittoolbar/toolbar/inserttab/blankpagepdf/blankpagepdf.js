const { EditPdf, BlankPagePdf } = require("lib"); // Import the EditPdf class from the library

// Open the PDF file for editing
Tester.openFile("pdf/test.pdf");

// Click the "Edit PDF" button
EditPdf.clickEditPdf();

// Click on default Blank Page button
BlankPagePdf.blankPage();

// Select "Insert blank page after" option from the list
BlankPagePdf.blankPage("Insert blank page after");

// Close the testing session
Tester.close();
