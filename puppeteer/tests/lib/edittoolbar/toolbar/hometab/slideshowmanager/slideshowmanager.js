// Include the SlideShowManager library
const { SlideShowManager } = require("lib");

// Open the file new.docx
Tester.createFile("pptx");

// Click on Add slide button
SlideShowManager.addSlide();

// Add slide with "Comparison" layout
SlideShowManager.addSlide("Comparison");

// Duplicate slide
SlideShowManager.duplicateSlide();

// Change slide layout to "Title only"
SlideShowManager.changeSlideLayout("Title Only");

// Close the test example
Tester.close();
