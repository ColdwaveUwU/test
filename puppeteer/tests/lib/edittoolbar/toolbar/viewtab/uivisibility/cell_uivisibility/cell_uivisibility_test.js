// Create a new xlsx file for testing
const { UIVisibility } = require("lib");
Tester.createFile("xlsx");
// Show statusbar
UIVisibility.setStatusbarVisibility(false);
// Show left panel
UIVisibility.setLeftPanelVisibility(false);
// Show right panel
UIVisibility.setRightPanelVisibility(false);
// Show formula bar (CSE only)
UIVisibility.setFormulaBarVisibility(false);
// Show heading (CSE only)
UIVisibility.setHeadingVisibility(false);
// Show gridlines (CSE only)
UIVisibility.setGridlinesVisibility(false);
// Show zeros (CSE only)
UIVisibility.setZerosVisibility(false);
// Show toolbar
UIVisibility.setToolbarVisibility(false);
Tester.close();
