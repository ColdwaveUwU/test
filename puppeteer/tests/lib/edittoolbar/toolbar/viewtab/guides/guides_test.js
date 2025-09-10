// Create a new pptx file for testing
const { Guides } = require("lib");
Tester.createFile("pptx");
// Show guides
Guides.ShowGuides(true);
// Add vertical guide
Guides.AddVerticalGuide();
// Add horizontal guide
Guides.AddHorizontalGuide();
// Enable smart guides
Guides.SmartGuides(true);
// Clear all guides
Guides.ClearGuides();
Tester.close();
