const { TestData } = require("lib"); // Run file with --url_param 'type=mobile'
Tester.createFile("docx");
// Try entering some text and check if it doesn't enter.
const initialInput = TestData.getParagraphAutoIndex();
Tester.input(initialInput);
const { selectedText: initialSelectedText } = Tester.verifyInput(initialInput);

if (!initialSelectedText) {
    // Click on the pencil icon in the bottom-right corner to edit.
    Tester.click(".fab.fab-right-bottom");
    Tester.click("#area_id_parent");

    // Enter text and confirm that it appears as expected.
    const editedInput = TestData.getParagraphAutoIndex();
    Tester.input(editedInput);

    const { isMatch: isEditedInputMatched } = Tester.verifyInput(editedInput);
    Tester.deleteText();
    console.log(`Input after editing verification: ${isEditedInputMatched}`);

    if (!isEditedInputMatched) {
        throw new Error(`Error verifying input after editing.`);
    }

    // Click the "Finish Editing" button (the checkmark in the top-left corner).
    Tester.click(".back-reader-mode.link");

    // Try entering text again and ensure it appears as expected.
    const finalInput = TestData.getParagraphAutoIndex();
    Tester.input(finalInput);
    const { selectedText: finalSelectedText } = Tester.verifyInput(finalInput);
    console.log(`Final input verification: "${finalSelectedText}"`);

    if (finalSelectedText) {
        throw new Error(`Error, text should appear after editing.`);
    }

    Tester.close();
} else {
    throw new Error(`Error, text should not be entered in viewing mode.`);
}
