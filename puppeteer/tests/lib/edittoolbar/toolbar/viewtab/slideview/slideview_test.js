// Create a new pptx file for testing
const { SlideView } = require("lib");
Tester.createFile("pptx");
// Set normal slide view
SlideView.setNormalView();
// Set slide master view
SlideView.setSlideMasterView();
Tester.close();
