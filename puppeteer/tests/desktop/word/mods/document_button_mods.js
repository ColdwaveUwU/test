const { TestData, ViewToolbarDocumentMode, Review } = require("lib");

Tester.createFile("docx");
let testText;

// Insert a text template and verify input
testText = TestData.getParagraphAutoIndex();
Tester.input(testText);
let { isMatch, inputText: expectedText, selectedText } = Tester.verifyInput(testText);
Tester.deleteText();
if (!isMatch) {
    throw new Error(`Error with verify input: expected "${expectedText}", but got "${selectedText}".`);
}
console.log(isMatch);

ViewToolbarDocumentMode.toggleReviewingMode();
console.log("Switching to reviewing");

testText = TestData.ONE_WORD_TEXT();
Tester.input(testText);

if (!Review.isReviewActive()) {
    throw new Error(`Error, reviewing is not active.`);
}

({ isMatch, inputText: expectedText, selectedText } = Tester.verifyInput(testText));
Tester.deleteText();
if (!isMatch) {
    throw new Error(`Error with verify input: expected "${expectedText}", but got "${selectedText}".`);
}
console.log(isMatch);

ViewToolbarDocumentMode.toggleViewingMode();
console.log("Switching to viewing");

// Verify that text input is disabled (text should not be entered).
testText = TestData.getParagraphAutoIndex();
Tester.input(testText);
({ isMatch, inputText: expectedText, selectedText } = Tester.verifyInput(testText));
Tester.deleteText();
if (isMatch) {
    throw new Error(`Error with verify input: expected "${expectedText}", but got "${selectedText}".`);
}
console.log(isMatch);

ViewToolbarDocumentMode.toggleEditMode();
console.log("Switching to editing");

// Check that text input is enabled (text should be entered)
testText = TestData.getParagraphAutoIndex();
Tester.input(testText);
({ isMatch, inputText: expectedText, selectedText } = Tester.verifyInput(testText));
Tester.deleteText();
if (!isMatch) {
    throw new Error(`Error with verify input: expected "${expectedText}", but got "${selectedText}".`);
}
console.log(isMatch);

Tester.close();
