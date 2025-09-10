// Include the ParagraphSettings library
const { ParagraphSettings } = require("lib");

// Include the Color library
const { Color } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Set "Exactly" line spacing
ParagraphSettings.selectLineSpacing("Exactly");

// Set line spacing value "0.3"
ParagraphSettings.setLineSpacing("0.3");

// Increase line spacing value by click on arrow up
ParagraphSettings.increaseLineSpacing();

// Decrease line spacing value by click on arrow down
ParagraphSettings.decreaseLineSpacing();

// Set spacing before value "0.5"
ParagraphSettings.setSpacingBefore("0.5");

// Increase spacing before value by click on arrow up
ParagraphSettings.increaseSpacingBefore();

// Decrease spacing before value by click on arrow down
ParagraphSettings.decreaseSpacingBefore();

// Set spacing after value "0.7"
ParagraphSettings.setSpacingAfter("0.7");

// Increase spacing after value by click on arrow up
ParagraphSettings.increaseSpacingAfter();

// Decrease spacing after value by click on arrow down
ParagraphSettings.decreaseSpacingAfter();

// Click "Don't add interval" checkbox
ParagraphSettings.clickDontAddInterval();

// Set left indent value "0.6"
ParagraphSettings.setLeftIndent("0.6");

// Increase left indent value by click on arrow up
ParagraphSettings.increaseLeftIndent();

// Decrease left indent value by click on arrow down
ParagraphSettings.decreaseLeftIndent();

// Set right indent value "0.8"
ParagraphSettings.setRightIndent("0.8");

// Increase right indent value by click on arrow up
ParagraphSettings.increaseRightIndent();

// Decrease right indent value by click on arrow down
ParagraphSettings.decreaseRightIndent();

// Set First line special indent
ParagraphSettings.selectSpecialIndent("Hanging");

// Set special indent value "0.4"
ParagraphSettings.setSpecialIndent("0.4");

// Increase special indent value by click on arrow up
ParagraphSettings.increaseSpecialIndent();

// Decrease special indent value by click on arrow down
ParagraphSettings.decreaseSpecialIndent();

// Set Standard background color with index 3 (orange)
ParagraphSettings.clickBackgroundColor({ type: Color.Type.Standard, index: 3 });

// Open Advanced settings window
ParagraphSettings.showAdvancedSettings();

// Close the test example
Tester.close();
