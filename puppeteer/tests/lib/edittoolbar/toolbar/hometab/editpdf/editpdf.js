const { EditPdf } = require("lib"); // Import the EditPdf class from the library

// Open the PDF file for editing
Tester.openFile("pdf/headings.pdf");

// Click the "Edit PDF" button
EditPdf.clickEditPdf();
EditPdf.clickEditPdf(false);

// Insert a blank page before the current page
// This method will automatically call clickEditPdf() if the edit panel is hidden.
EditPdf.insertPage("Insert blank page before");

// Rotate the page to the right
// This method also ensures the edit panel is open before execution.
EditPdf.rotatePage("Rotate right");

// Delete the current page
// If the edit panel is hidden, it will be opened automatically before performing the action.
EditPdf.deletePage();

// Enable text editing mode
// If the edit panel is closed, it will be opened automatically before executing this action.
EditPdf.editText();

// Close the testing session
Tester.close();
