// Include the Hyphenation library
const { Hyphenation } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Select hyphenation "Automatic"
Hyphenation.setHyphenation("Automatic");

// Open "Hyphenation" window
Hyphenation.openHyphenationWindow();

// Specify hyphenation options
const hyphenationOptions = {
    automaticallyHyphenate: false,
    hyphenateWordsInCaps: false,
    hyphenationZone: { value: "0.65" },
    limitConsecutiveHyphens: { value: "3" },
};

// Apply hyphenation options
Hyphenation.applySettings(hyphenationOptions);

// Click OK button in "Hyphenation" window
Hyphenation.clickOkButton();

// Wait for saving previously applied options
Tester.waitAutosave();

// Specify hyphenation options
const hyphenationOptions2 = {
    automaticallyHyphenate: true,
    hyphenationZone: { value: "0.8" },
    limitConsecutiveHyphens: { value: "2" },
};

// Set hyphenation options
Hyphenation.setHyphenationSettings(hyphenationOptions2);

// Close the test example
Tester.close();
