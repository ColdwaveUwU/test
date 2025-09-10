// Create a new xlsx file for testing
const { UIVisibility } = require("lib");
Tester.createFile("pptx");
// Show statusbar
UIVisibility.setStatusbarVisibility(false);
// Show left panel
UIVisibility.setLeftPanelVisibility(false);
// Show right panel
UIVisibility.setRightPanelVisibility(false);
// Show notes (CPE only)
UIVisibility.setNotesVisibility(false);
// Show toolbar
UIVisibility.setToolbarVisibility(false);
Tester.close();
