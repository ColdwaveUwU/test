// https://bugzilla.onlyoffice.com/show_bug.cgi?id=76784
// Test scenario: Copy and paste PDF form text field with auto-fit enabled
// 1. Open a PDF file with forms (script-form.pdf)
// 2. Enter PDF edit mode
// 3. Insert a fixed text field in the PDF editor
// 4. Enable auto-fit feature for the text field (automatically adjusts text size to fit field)
// 5. Copy the text field using Ctrl+C
// 6. Paste the copied text field using Ctrl+V
// 7. Save the document using Ctrl+S
// 8. Download the PDF file
// Expected result: The copied text field should retain the auto-fit property and function correctly

const { TextField, FileMenu, EditPdf } = require("lib");

// Open the PDF file for testing
Tester.openFile("pdf/script-form.pdf");
EditPdf.clickEditPdf();

// Inserts fixed text field in pdf-editor
TextField.insertFixedTextField();

// set auto fit for TextField in PDF-form
TextField.setAutoFit(true);
// Copy paste the text field
Tester.keyDown("ControlLeft");
Tester.keyPress("C");
Tester.keyUp("ControlLeft");
Tester.keyDown("ControlLeft");
Tester.keyPress("V");
Tester.keyUp("ControlLeft");
// Save the document
Tester.keyDown("ControlLeft");
Tester.keyPress("S");
Tester.keyUp("ControlLeft");

FileMenu.downloadAs("pdf");

// close test
Tester.close();
