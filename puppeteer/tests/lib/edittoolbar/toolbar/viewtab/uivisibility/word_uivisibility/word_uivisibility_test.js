// Create a new xlsx file for testing
const { UIVisibility } = require("lib");
Tester.createFile("docx");
// Show statusbar
UIVisibility.setStatusbarVisibility(false);
// Show left panel
UIVisibility.setLeftPanelVisibility(false);
// Show right panel
UIVisibility.setRightPanelVisibility(false);
// Show rulers (CDE only)
UIVisibility.setRulersVisibility(false);
// Show toolbar
UIVisibility.setToolbarVisibility(false);
Tester.close();
